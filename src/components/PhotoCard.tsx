import { useEffect, useRef, useState } from 'react';
import type { MemoryPhoto } from '@/config';

/**
 * A printed-photo scrapbook card. Reveals on scroll via IntersectionObserver,
 * settles to its final rotation, then gently floats. Includes paper tape.
 */
export default function PhotoCard({
  photo,
  index,
}: {
  photo: MemoryPhoto;
  index: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [typed, setTyped] = useState('');
  const [typing, setTyping] = useState(false);

  const sideClass = photo.side === 'right' ? 'from-right' : 'from-left';

  // Typing animation for the message once revealed
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${(index % 2) * 120}ms`;
            el.classList.add('in-view');
            setTyping(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  useEffect(() => {
    if (!typing) return;
    let i = 0;
    const text = photo.message;
    const id = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [typing, photo.message]);

  // tape position varies per photo
  const tapeTop = index % 2 === 0 ? '-10px left-1/2 -translate-x-1/2 -rotate-3' : '-10px left-4 -rotate-12';

  return (
    <figure
      ref={ref}
      data-delay={(index % 2) * 120}
      className={`reveal ${sideClass} photo-print group relative mx-auto w-[78vw] max-w-[300px] sm:w-[44vw] sm:max-w-[280px] md:w-[30vw] md:max-w-[320px] lg:max-w-[340px]`}
      style={
        {
          '--init-rot': `${photo.rotate * 1.6}deg`,
          '--final-rot': `${photo.rotate}deg`,
          '--rot': `${photo.rotate}deg`,
          transform: `rotate(${photo.rotate}deg)`,
        } as React.CSSProperties
      }
    >
      <span className={`photo-tape ${tapeTop}`} aria-hidden="true" />

      <div className="relative overflow-hidden bg-ink-700">
        <img
          src={photo.image}
          alt={photo.title}
          loading="lazy"
          decoding="async"
          className="aspect-[3/4] w-full object-cover"
        />
        {/* soft vignette on the print */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.18))]" />
      </div>

      <figcaption className="mt-3 px-1 text-center">
        <h3 className="font-display text-lg font-medium text-ink-900">{photo.title}</h3>
        <p className="font-body text-[11px] uppercase tracking-[0.2em] text-ink-900/60">
          {photo.date}
        </p>
        <p className="mx-auto mt-2 max-w-[260px] font-body text-sm italic leading-relaxed text-ink-900/80">
          <span className={typing && typed.length < photo.message.length ? 'type-caret' : ''}>
            {typed}
          </span>
        </p>
      </figcaption>
    </figure>
  );
}
