import { useEffect, useRef } from 'react';
import { config } from '@/config';
import { useReveal } from '@/hooks/useReveal';
import StarField from '@/components/StarField';
import confetti from 'canvas-confetti';

export default function Ending({ onReplay }: { onReplay: () => void }) {
  const ref = useReveal<HTMLDivElement>();
  const firedRef = useRef(false);

  // gentle confetti when the ending scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            confetti({
              particleCount: 120,
              spread: 100,
              origin: { y: 0.7 },
              colors: ['#E8C77A', '#E8B4C4', '#C9B6E4', '#F5EFE6'],
              scalar: 0.9,
              ticks: 260,
            });
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  const handleReplay = () => {
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E8C77A', '#E8B4C4'],
    });
    setTimeout(onReplay, 300);
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-ink-900 px-6 py-24 text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#11111A_0%,#0B0B0F_55%,#050505_100%)]" />
      <StarField density={1.2} />

      {/* moon */}
      <div className="pointer-events-none absolute top-12 right-[14%] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(245,239,230,0.85),rgba(245,239,230,0.15)_60%,transparent)] shadow-[0_0_70px_rgba(245,239,230,0.2)]" />

      <div className="relative z-10 flex flex-col items-center">
        <p className="reveal font-body text-xs uppercase tracking-[0.5em] text-gold/70">
          The Last Page
        </p>

        <h2 className="reveal mt-4 font-script text-5xl text-gradient-white sm:text-6xl md:text-7xl">
          Thank You For Every Moment
        </h2>

        {/* final photo — slightly larger, still printed */}
        <div className="reveal from-bottom mt-10">
          <figure
            className="photo-print mx-auto w-[78vw] max-w-[360px] sm:w-[340px]"
            style={{ '--final-rot': '-2deg', transform: 'rotate(-2deg)' } as React.CSSProperties}
          >
            <span className="photo-tape -top-2 left-1/2 -translate-x-1/2 -rotate-3" />
            <div className="relative overflow-hidden bg-ink-700">
              <img
                src={config.endingPhoto}
                alt="A final memory"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.2))]" />
            </div>
            <figcaption className="mt-3 text-center">
              <p className="font-script text-2xl text-ink-900">{config.name}</p>
              <p className="font-body text-[11px] uppercase tracking-[0.2em] text-ink-900/60">
                Nuyah comel
              </p>
            </figcaption>
          </figure>

          <div className="reveal mt-6 w-[86vw] max-w-[520px] rounded-3xl border border-gold/30 bg-ink-800/90 p-5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:w-[520px]">
            <p className="font-display text-sm leading-7 text-warm">
              Selamat ulang tahun ya, Nuya :D
Semoga sehat selalu, panjang umur, dan semoga semua yang kamu harapkan bisa tercapai.
Makasih juga ya udah nemenin hari-hariku selama ini ^_^
Senang bisa kenal sama kamu dan punya banyak cerita bareng.
Semoga di umur yang baru ini kamu makin bahagia, jangan lupa jaga kesehatan, dan tetap jadi Nuya yang selalu ceria. Semoga hari kamu menyenangkan yaa
            </p>
          </div>
        </div>

        <h3 className="reveal mt-12 font-display text-3xl font-medium text-gradient-gold sm:text-4xl">
          Happy Birthday Nuyah
        </h3>
        <p className="reveal mt-3 font-script text-4xl text-gradient-white sm:text-5xl">
          May Your Dreams Come True
        </p>

        {/* glowing heart */}
        <div className="reveal mt-10 flex items-center gap-2 text-blush">
          <span className="animate-pulseGlow text-2xl" aria-hidden="true">
            &#10022;
          </span>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="animate-pulseGlow drop-shadow-[0_0_12px_rgba(232,180,196,0.6)]">
            <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 3 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4 0 6.5 4.5 4.5 8.5C19 16.65 12 21 12 21z" />
          </svg>
          <span className="animate-pulseGlow text-2xl [animation-delay:1s]" aria-hidden="true">
            &#10022;
          </span>
        </div>

        <button
          onClick={handleReplay}
          className="group mt-12 inline-flex items-center gap-3 rounded-full glass-gold px-8 py-4 font-body text-sm uppercase tracking-[0.25em] text-gold transition-all hover:scale-105 hover:shadow-glow active:scale-95"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:-rotate-180 duration-700"
          >
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span>Replay Memory</span>
        </button>
      </div>
    </section>
  );
}
