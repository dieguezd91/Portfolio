import { useEffect, useRef } from 'react';

// ─── Config ──────────────────────────────────────────────────────────────────
const COLORS         = ['#00F5D4', '#FF2D95'];
const CYAN_RATIO     = 0.70;   // 70 % cyan, 30 % pink

const MOUSE_R        = 130;    // repulsion radius (px)
const MOUSE_F        = 0.060;  // repulsion force multiplier
const SPRING_K       = 0.010;  // spring-return strength — lower = slower, more organic
const DAMPING        = 0.97;   // velocity damping per frame
const MICRO_DRIFT    = 0.008;  // per-frame random noise — keeps particles alive at rest
const MAX_SPEED      = 1.0;    // px / frame velocity cap

const EDGE_FADE      = 0.12;   // fraction of canvas dimension faded at each wall
const FADE_IN_FRAMES = 90;     // entry fade ~1.5 s at 60 fps

// Radial cluster centred on the hero name
const CLUSTER_Y      = 0.44;   // vertical focus (fraction of H) — base value
const CLUSTER_STD_X  = 0.16;   // horizontal Gaussian σ (fraction of W)
const CLUSTER_STD_Y  = 0.11;   // vertical   Gaussian σ (fraction of H)
const CLUSTER_RADIUS = 0.36;   // alpha-falloff radius (fraction of min(W, H))
const CLUSTER_FLOOR  = 0.10;   // minimum alpha multiplier beyond falloff radius

// Box-Muller transform — normally distributed sample
function gaussian(mean, std) {
  const u1 = Math.random() || 1e-10;
  const u2 = Math.random();
  return mean + std * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function getCount() {
  return window.innerWidth < 768 ? 35 : 100;
}

// cx / cy are pre-computed by setup() so tick() shares the same focal point.
// stdX / stdY are jittered per load to visually differentiate each visit.
function createParticles(W, H, count, cx, cy) {
  const stdX = W * (CLUSTER_STD_X + (Math.random() - 0.5) * 0.04);
  const stdY = H * (CLUSTER_STD_Y + (Math.random() - 0.5) * 0.03);
  return Array.from({ length: count }, () => {
    const x = Math.min(Math.max(gaussian(cx, stdX), 0), W);
    const y = Math.min(Math.max(gaussian(cy, stdY), 0), H);
    return {
      x, y,
      baseX: x,
      baseY: y,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      r:     Math.random() * 2.0 + 1.5,   // 1.5 – 3.5 px
      color: Math.random() < CYAN_RATIO ? COLORS[0] : COLORS[1],
      alpha: Math.random() * 0.28 + 0.07,
    };
  });
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function HeroParticles({ mouseRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let raf;
    let W, H, dpr, particles;
    let clusterCx, clusterCy;   // randomised each load; shared by spawn + alpha falloff
    let frame  = 0;
    let paused = false;

    // ── Setup / resize ──────────────────────────────────────────────────────
    function setup() {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Jitter the cluster centre slightly on every load / resize so the
      // field looks distinct across visits while staying behind the name.
      clusterCx = W / 2 + (Math.random() - 0.5) * W * 0.07;
      clusterCy = H * CLUSTER_Y + (Math.random() - 0.5) * H * 0.05;
      particles = createParticles(W, H, getCount(), clusterCx, clusterCy);
    }

    // ── Animation loop ──────────────────────────────────────────────────────
    function tick() {
      raf = requestAnimationFrame(tick);
      if (paused) return;

      ctx.clearRect(0, 0, W, H);

      frame++;
      const fadeIn = Math.min(frame / FADE_IN_FRAMES, 1);

      const mx   = mouseRef.current.x;
      const my   = mouseRef.current.y;
      const fzX  = W * EDGE_FADE;
      const fzY  = H * EDGE_FADE;
      const mr2  = MOUSE_R * MOUSE_R;
      const cx   = clusterCx;
      const cy   = clusterCy;
      const maxR = Math.min(W, H) * CLUSTER_RADIUS;

      for (const p of particles) {
        // 1 ─ Mouse repulsion (squared-distance check avoids sqrt when outside radius)
        const dx    = p.x - mx;
        const dy    = p.y - my;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < mr2 && dist2 > 0) {
          const dist  = Math.sqrt(dist2);
          const force = (1 - dist / MOUSE_R) * MOUSE_F;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // 2 ─ Spring return toward base position
        //     Acts as a gentle attractor; overridden by mouse when cursor is near.
        p.vx += (p.baseX - p.x) * SPRING_K;
        p.vy += (p.baseY - p.y) * SPRING_K;

        // 3 ─ Micro-drift — tiny random impulse keeps particles alive at rest
        p.vx += (Math.random() - 0.5) * MICRO_DRIFT;
        p.vy += (Math.random() - 0.5) * MICRO_DRIFT;

        // 4 ─ Dampen velocity
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        // 5 ─ Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPEED) {
          const inv = MAX_SPEED / spd;
          p.vx *= inv;
          p.vy *= inv;
        }

        // 6 ─ Integrate position
        p.x += p.vx;
        p.y += p.vy;

        // 7 ─ Edge fade — alpha softens near all four walls
        const fadeX    = Math.min(p.x / fzX, (W - p.x) / fzX, 1);
        const fadeY    = Math.min(p.y / fzY, (H - p.y) / fzY, 1);
        const edgeFade = Math.min(fadeX, fadeY);

        // 8 ─ Radial cluster fade — full brightness at centre, CLUSTER_FLOOR at radius edge
        const dxc         = p.x - cx;
        const dyc         = p.y - cy;
        const distC       = Math.sqrt(dxc * dxc + dyc * dyc);
        const clusterFade = CLUSTER_FLOOR + (1 - CLUSTER_FLOOR) * Math.max(0, 1 - distC / maxR);

        const finalAlpha = p.alpha * Math.max(0, edgeFade) * fadeIn * clusterFade;
        if (finalAlpha < 0.005) continue;

        // 9 ─ Draw with soft glow
        ctx.save();
        ctx.globalAlpha = finalAlpha;
        ctx.shadowBlur  = 6;
        ctx.shadowColor = p.color;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Pause draw work when hero scrolls off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { paused = !entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    setup();
    tick();

    window.addEventListener('resize', setup);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', setup);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
