import { useEffect, useRef } from 'react';

// ─── Config ──────────────────────────────────────────────────────────────────
const COLORS         = ['#00F5D4', '#FF2D95'];
const MOUSE_R        = 130;    // repulsion radius (px)
const MOUSE_F        = 0.044;  // repulsion force multiplier
const MAX_SPEED      = 0.55;   // px/frame velocity cap
const DRIFT          = 0.22;   // initial velocity spread (±)
const EDGE_FADE      = 0.12;   // fraction of dimension faded at each wall
const FADE_IN_FRAMES = 90;     // ~1.5 s at 60 fps

// Radial cluster — particles concentrate behind the name
const CLUSTER_Y      = 0.44;   // vertical focus (fraction of H); slightly above center
const CLUSTER_STD_X  = 0.28;   // horizontal Gaussian spread (fraction of W)
const CLUSTER_STD_Y  = 0.18;   // vertical Gaussian spread (fraction of H)
const CLUSTER_RADIUS = 0.52;   // alpha falloff radius (fraction of min(W,H))
const CLUSTER_FLOOR  = 0.10;   // minimum alpha multiplier for far particles

// Box-Muller Gaussian — returns a normally distributed random number
function gaussian(mean, std) {
  const u1 = Math.random() || 1e-10;
  const u2 = Math.random();
  return mean + std * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function getCount() {
  return window.innerWidth < 768 ? 50 : 100;
}

function createParticles(W, H, count) {
  const cx = W / 2;
  const cy = H * CLUSTER_Y;
  return Array.from({ length: count }, () => ({
    // Spawn clustered around the name's position using Gaussian distribution
    x:     Math.min(Math.max(gaussian(cx, W * CLUSTER_STD_X), 0), W),
    y:     Math.min(Math.max(gaussian(cy, H * CLUSTER_STD_Y), 0), H),
    vx:    (Math.random() - 0.5) * DRIFT,
    vy:    (Math.random() - 0.5) * DRIFT,
    r:     Math.random() * 1.1 + 0.7,
    color: COLORS[Math.random() < 0.5 ? 0 : 1],
    alpha: Math.random() * 0.28 + 0.07,
  }));
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
      particles = createParticles(W, H, getCount());
    }

    // ── Animation loop ──────────────────────────────────────────────────────
    function tick() {
      raf = requestAnimationFrame(tick);
      if (paused) return;

      ctx.clearRect(0, 0, W, H);

      frame++;
      const fadeIn = Math.min(frame / FADE_IN_FRAMES, 1);

      const mx    = mouseRef.current.x;
      const my    = mouseRef.current.y;
      const fzX   = W * EDGE_FADE;
      const fzY   = H * EDGE_FADE;
      const mr2   = MOUSE_R * MOUSE_R;

      // Cluster focus center — same point used during spawn
      const cx    = W / 2;
      const cy    = H * CLUSTER_Y;
      const maxR  = Math.min(W, H) * CLUSTER_RADIUS;

      for (const p of particles) {
        // Mouse repulsion
        const dx    = p.x - mx;
        const dy    = p.y - my;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < mr2 && dist2 > 0) {
          const dist  = Math.sqrt(dist2);
          const force = (1 - dist / MOUSE_R) * MOUSE_F;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Velocity damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPEED) {
          const inv = MAX_SPEED / spd;
          p.vx *= inv;
          p.vy *= inv;
        }

        // Integrate
        p.x += p.vx;
        p.y += p.vy;

        // Wrap-around
        if      (p.x < -4)    p.x = W + 4;
        else if (p.x > W + 4) p.x = -4;
        if      (p.y < -4)    p.y = H + 4;
        else if (p.y > H + 4) p.y = -4;

        // Edge fade
        const fadeX = Math.min(p.x / fzX, (W - p.x) / fzX, 1);
        const fadeY = Math.min(p.y / fzY, (H - p.y) / fzY, 1);
        const edgeFade = Math.min(fadeX, fadeY);

        // Radial cluster fade — particles near the name's center are fully bright;
        // particles far away fade toward CLUSTER_FLOOR, never fully invisible.
        const dxc = p.x - cx;
        const dyc = p.y - cy;
        const distC = Math.sqrt(dxc * dxc + dyc * dyc);
        const clusterFade = CLUSTER_FLOOR + (1 - CLUSTER_FLOOR) * Math.max(0, 1 - distC / maxR);

        const finalAlpha = p.alpha * Math.max(0, edgeFade) * fadeIn * clusterFade;
        if (finalAlpha < 0.005) continue;

        // Draw dot with soft glow
        ctx.save();
        ctx.globalAlpha = finalAlpha;
        ctx.shadowBlur  = 7;
        ctx.shadowColor = p.color;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // IntersectionObserver — pause RAF draw when hero is off-screen
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
