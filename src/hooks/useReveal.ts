import { useEffect, useRef } from 'react';

/**
 * Adds the `in-view` class to elements with the `reveal` class when they
 * enter the viewport. Uses IntersectionObserver for GPU-friendly reveal.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current ?? document;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.reveal, .timeline-line'));

    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ?? '0';
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add('in-view');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}
