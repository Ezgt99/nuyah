import { useEffect, useRef } from 'react';

/**
 * A canvas-based starfield + floating particle layer.
 * Subtle, GPU-friendly, respects prefers-reduced-motion.
 */
export default function StarField({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let stars: { x: number; y: number; r: number; a: number; tw: number; vy: number }[] = [];
    let dust: { x: number; y: number; r: number; vx: number; vy: number; a: number }[] = [];

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const starCount = Math.floor((w * h) / 9000 * density);
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * 0.6 + 0.2,
        tw: Math.random() * Math.PI * 2,
        vy: Math.random() * 0.06 + 0.01,
      }));

      const dustCount = Math.floor((w * h) / 26000 * density);
      dust = Array.from({ length: dustCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.18 + 0.04),
        a: Math.random() * 0.4 + 0.1,
      }));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // stars
      for (const s of stars) {
        s.tw += 0.02;
        s.y -= s.vy;
        if (s.y < -2) s.y = h + 2;
        const alpha = s.a * (0.5 + 0.5 * Math.sin(s.tw));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,239,230,${alpha})`;
        ctx.fill();
      }

      // floating dust / fireflies
      for (const p of dust) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = Math.random() * w;
        }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, `rgba(232,199,122,${p.a})`);
        grd.addColorStop(1, 'rgba(232,199,122,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    if (!reduce) raf = requestAnimationFrame(tick);
    else {
      // draw a single static frame
      tick();
      cancelAnimationFrame(raf);
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
