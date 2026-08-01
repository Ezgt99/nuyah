import { config } from '@/config';
import { useReveal } from '@/hooks/useReveal';
import StarField from '@/components/StarField';

export default function Timeline() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="timeline"
      ref={ref}
      className="relative w-full overflow-hidden bg-ink-800 px-5 py-24 sm:px-10 sm:py-32"
    >
      <StarField density={1} />
      <div className="pointer-events-none absolute inset-0 aurora opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <header className="mb-16 text-center">
          <p className="reveal font-body text-xs uppercase tracking-[0.5em] text-gold/70">
            The Journey
          </p>
          <h2 className="reveal mt-3 font-script text-5xl text-gradient-gold sm:text-6xl">
            A Road Of Memories
          </h2>
        </header>

        <div className="relative">
          {/* central glowing line */}
          <div className="timeline-line reveal absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0 sm:left-1/2 sm:-translate-x-1/2" />

          <ol className="space-y-12 sm:space-y-16">
            {config.timeline.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <li
                  key={i}
                  className={`reveal ${left ? 'from-left' : 'from-right'} relative pl-12 sm:grid sm:grid-cols-2 sm:gap-8 sm:pl-0 ${
                    left ? '' : 'sm:[direction:rtl]'
                  }`}
                >
                  {/* node */}
                  <span className="absolute left-4 top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-gold shadow-glow sm:left-1/2" />

                  <div
                    className={`sm:[direction:ltr] ${left ? 'sm:pr-10 sm:text-right' : 'sm:col-start-2 sm:pl-10'}`}
                  >
                    <div
                      className={`inline-block ${left ? 'sm:justify-end' : ''}`}
                    >
                      <div
                        className={`photo-print mx-auto w-[150px] sm:w-[170px]`}
                        style={{ '--final-rot': `${left ? -3 : 3}deg`, transform: `rotate(${left ? -3 : 3}deg)` } as React.CSSProperties}
                      >
                        <span className="photo-tape -top-2 left-1/2 -translate-x-1/2 -rotate-6" />
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="aspect-square w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`mt-4 sm:mt-0 sm:[direction:ltr] sm:flex sm:flex-col sm:justify-center ${
                      left ? 'sm:col-start-2 sm:pl-10' : 'sm:col-start-1 sm:row-start-1 sm:pr-10 sm:text-right'
                    }`}
                  >
                    <p className="font-body text-[11px] uppercase tracking-[0.3em] text-gold/70">
                      {item.date}
                    </p>
                    <h3 className="mt-1 font-display text-2xl font-medium text-warm">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-warm/60">
                      {item.story}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
