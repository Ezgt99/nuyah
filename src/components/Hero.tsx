import { useRef } from 'react';
import { config } from '@/config';
import StarField from '@/components/StarField';
import confetti from 'canvas-confetti';

export default function Hero({ onOpen }: { onOpen: () => void }) {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => {
    // confetti + sparkle burst
    const burst = (origin: { x: number; y: number }) => {
      confetti({
        particleCount: 80,
        spread: 70,
        startVelocity: 35,
        origin,
        colors: ['#E8C77A', '#E8B4C4', '#C9B6E4', '#F5EFE6'],
        scalar: 0.8,
        gravity: 0.9,
        ticks: 220,
      });
    };
    burst({ x: 0.5, y: 0.6 });
    setTimeout(() => burst({ x: 0.3, y: 0.7 }), 120);
    setTimeout(() => burst({ x: 0.7, y: 0.7 }), 240);

    // light spread veil
    const veil = document.createElement('div');
    veil.style.cssText =
      'position:fixed;inset:0;z-index:150;pointer-events:none;background:radial-gradient(circle at 50% 60%,rgba(232,199,122,0.35),transparent 60%);opacity:0;transition:opacity .6s ease';
    document.body.appendChild(veil);
    requestAnimationFrame(() => (veil.style.opacity = '1'));
    setTimeout(() => {
      veil.style.opacity = '0';
      setTimeout(() => veil.remove(), 700);
    }, 500);

    setTimeout(() => {
      onOpen();
      document.getElementById('album')?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink-900 px-6 text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#11111A_0%,#0B0B0F_50%,#050505_100%)]" />
      <div className="absolute inset-0 aurora opacity-80" />
      <StarField density={1} />

      {/* bokeh lights */}
      <div className="pointer-events-none absolute left-[12%] top-[22%] h-40 w-40 rounded-full bg-gold/10 blur-3xl animate-pulseGlow" />
      <div className="pointer-events-none absolute right-[14%] top-[30%] h-52 w-52 rounded-full bg-blush/10 blur-3xl animate-pulseGlow [animation-delay:1.5s]" />
      <div className="pointer-events-none absolute bottom-[18%] left-[40%] h-44 w-44 rounded-full bg-lavender/10 blur-3xl animate-pulseGlow [animation-delay:3s]" />

      <div className="relative z-10 flex flex-col items-center">
        <p className="mb-4 font-body text-xs uppercase tracking-[0.5em] text-gold/80">
          A collection of memories made specially for you
        </p>

        <h1 className="font-display text-5xl font-medium text-warm sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="block text-gradient-gold">Happy Birthday</span>
        </h1>

        <p className="mt-4 font-script text-6xl text-gradient-blush sm:text-7xl md:text-8xl">
          {config.name}
        </p>

        <p className="mt-8 max-w-md font-body text-sm leading-relaxed text-warm/60">
          A collection of memories made specially for you.
        </p>

        <button
          onClick={handleOpen}
          className="group mt-12 inline-flex items-center gap-3 rounded-full glass-gold px-8 py-4 font-body text-sm uppercase tracking-[0.25em] text-gold transition-all hover:scale-105 hover:shadow-glow active:scale-95"
        >
          <span>Open Memory Album</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-y-1"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-body text-[10px] uppercase tracking-[0.3em] text-warm/40">
        scroll to explore
      </div>
    </section>
  );
}
