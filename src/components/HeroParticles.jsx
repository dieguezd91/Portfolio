import { useEffect, useRef } from 'react';

// ─── Config ──────────────────────────────────────────────────────────────────
const COLORS         = ['#00F5D4', '#FF2D95'];
const MOUSE_R        = 130;       // repulsion radius (px)
const MOUSE_F        = 0.044;     // repulsion force multiplier
const MAX_SPEED      = 0.55;      // px/frame velocity cap
const DRIFT          = 0.22;      // initial velocity spread (±)
const EDGE_FADE      = 0.13;      // fraction of dimension faded at each wall
const FADE_IN_FRAMES = 90;        // ~1.5 s at 60 fps

function getCount() {
  return window.innerWidth < 768 ? 50 : 100;
}

function createParticles(W, H, count) {
  return Array.from({ length: count }, () => ({
    x:     Math.random() * W,
    y:     Math.random() * H,
    vx:    (Math.random() - 0.5) * DRIFT,
    vy:    (Math.random() - 0.5) * DRIFT,
    r:     Math.random() * 1.1 + 0.7,
    color: COLORS[Math.random() < 0.5 ? 0 : 1],
    alpha: Math.random() * 0.28 + 0.07,
  }));
}

// ─── Component ───────────────────────────────────────────────────────────────
// mouseRef — passed from parent (Hero) so the canvas never needs pointer events
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
      // Resetting canvas dimensions wipes the transform — reapply.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(W, H, getCount());
    }

    // ── Animation loop ──────────────────────────────────────────────────────
    function tick() {
      raf = requestAnimationFrame(tick);

      // Skip draw work when hero is scrolled off-screen (IntersectionObserver)
      if (paused) return;

      ctx.clearRect(0, 0, W, H);

      // Fade-in multiplier: 0 → 1 over FADE_IN_FRAMES
      frame++;
      const fadeIn = Math.min(frame / FADE_IN_FRAMES, 1);

      const mx  = mouseRef.current.x;
      const my  = mouseRef.current.y;
      const fzX = W * EDGE_FADE;
      const fzY = H * EDGE_FADE;
      const mr2 = MOUSE_R * MOUSE_R;

      for (const p of particles) {
        // Mouse repulsion — squared distance avoids sqrt until we actually need it
        const dx    = p.x - mx;
        const dy    = p.y - my;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < mr2 && dist2 > 0) {
          const dist  = Math.sqrt(dist2);
          const force = (1 - dist / MOUSE_R) * MOUSE_F;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Velocity damping — gently returns particles to slow drift
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPEED) {
          const inv = MAX_SPEED / spd;
          p.vx *= inv;
          p.vy *= inv;
        }

        // Integrate position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around — seamless edge crossing
        if      (p.x < -4)    p.x = W + 4;
        else if (p.x > W + 4) p.x = -4;
        if      (p.y < -4)    p.y = H + 4;
        else if (p.y > H + 4) p.y = -4;

        // Edge fade — alpha softens near all four walls
        const fadeX      = Math.min(p.x / fzX, (W - p.x) / fzX, 1);
        const fadeY      = Math.min(p.y / fzY, (H - p.y) / fzY, 1);
        const edgeFade   = Math.min(fadeX, fadeY);
        const finalAlpha = p.alpha * Math.max(0, edgeFade) * fadeIn;

        // Skip invisible particles — avoids pointless draw calls
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

    // ── IntersectionObserver — pause RAF work when hero is off-screen ────────
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
  }, []); // mouseRef is a stable ref object — reading .current inside is correct

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
