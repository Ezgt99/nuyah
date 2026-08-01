import { useEffect, useState } from 'react';
import { config } from '@/config';
import StarField from '@/components/StarField';

type Remaining = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function getRemaining(target: number): Remaining {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, done: false };
}

export default function CountdownPage({ onComplete }: { onComplete: () => void }) {
  const target = new Date(config.targetDate).getTime();
  const [r, setR] = useState<Remaining>(() => getRemaining(target));
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      const next = getRemaining(target);
      setR(next);
      if (next.done) {
        clearInterval(id);
        setFading(true);
        setTimeout(onComplete, 1600);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [target, onComplete]);

  const units: { label: string; value: number }[] = [
    { label: 'Days', value: r.days },
    { label: 'Hours', value: r.hours },
    { label: 'Minutes', value: r.minutes },
    { label: 'Seconds', value: r.seconds },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink-900">
      {/* night sky gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,#11111A_0%,#0B0B0F_45%,#050505_100%)]" />
      <div className="absolute inset-0 aurora opacity-70" />
      <StarField density={1.1} />

      {/* moon glow */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(245,239,230,0.18),rgba(232,199,122,0.06)_40%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute top-16 right-[12%] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(245,239,230,0.9),rgba(245,239,230,0.2)_60%,transparent)] shadow-[0_0_80px_rgba(245,239,230,0.25)]" />

      {/* light beam */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/10 to-transparent" />

      <div
        className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center transition-opacity duration-1000 ${
          fading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="mb-3 font-body text-xs uppercase tracking-[0.5em] text-gold/80">
          Something Special Is Coming
        </p>
        <h1 className="mb-2 font-script text-5xl text-gradient-blush sm:text-6xl md:text-7xl">
          Waiting For The Perfect Moment
        </h1>

        <div className="mt-12 flex flex-wrap items-end justify-center gap-3 sm:gap-6">
          {units.map((u) => (
            <div
              key={u.label}
              className="glass-gold flex h-24 w-20 flex-col items-center justify-center rounded-2xl sm:h-28 sm:w-24"
            >
              <span className="font-display text-3xl font-semibold text-warm tabular-nums sm:text-4xl">
                {String(u.value).padStart(2, '0')}
              </span>
              <span className="mt-1 font-body text-[10px] uppercase tracking-[0.25em] text-gold/70">
                {u.label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-md font-body text-sm leading-relaxed text-warm/50">
          Until the album opens. Come back when the stars align.
        </p>
      </div>

      {/* cinematic fade veil on completion */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 bg-ink-900 transition-opacity duration-1000 ${
          fading ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </section>
  );
}
