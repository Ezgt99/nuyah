import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { config } from '@/config';
import CountdownPage from '@/components/CountdownPage';
import Hero from '@/components/Hero';
import Scrapbook from '@/components/Scrapbook';
import Timeline from '@/components/Timeline';
import Ending from '@/components/Ending';
import MusicPlayer from '@/components/MusicPlayer';
import CursorGlow from '@/components/CursorGlow';

export default function App() {
  const target = new Date(config.targetDate).getTime();
  const [unlocked, setUnlocked] = useState(() => target <= Date.now());
  const [opened, setOpened] = useState(false);
  const [progress, setProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis smooth scroll — only after the album is opened
  useEffect(() => {
    if (!unlocked || !opened) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [unlocked, opened]);

  // scroll progress bar
  useEffect(() => {
    if (!unlocked || !opened) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [unlocked, opened]);

  // lock scroll while on countdown or before opening the album
  useEffect(() => {
    document.body.classList.toggle('no-scroll', !unlocked || !opened);
  }, [unlocked, opened]);

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-ink-900 text-warm">
      <CursorGlow />

      {!unlocked ? (
        <CountdownPage onComplete={() => setUnlocked(true)} />
      ) : (
        <main>
          {opened && <div className="scroll-progress" style={{ width: `${progress}%` }} />}
          {!opened ? (
            <Hero onOpen={() => setOpened(true)} />
          ) : (
            <>
              <Scrapbook />
              <Timeline />
              <Ending onReplay={handleReplay} />
            </>
          )}
        </main>
      )}

      <MusicPlayer unlocked={unlocked && opened} />
    </div>
  );
}
