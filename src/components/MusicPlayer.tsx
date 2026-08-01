import { useEffect, useRef, useState } from 'react';
import { config } from '@/config';

type MusicPlayerProps = {
  unlocked: boolean;
};

export default function MusicPlayer({ unlocked }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!config.musicUrl) return;
    const audio = new Audio(config.musicUrl);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audioRef.current = audio;

    const onReady = () => setReady(true);
    audio.addEventListener('canplaythrough', onReady);
    audio.addEventListener('canplay', onReady);
    return () => {
      audio.removeEventListener('canplaythrough', onReady);
      audio.removeEventListener('canplay', onReady);
      audio.pause();
    };
  }, []);

  const START_OFFSET = 25;

  const seekToStart = (audio: HTMLAudioElement) => {
    if (audio.duration > START_OFFSET && audio.currentTime < START_OFFSET) {
      audio.currentTime = START_OFFSET;
    }
  };

  const rampVolume = (audio: HTMLAudioElement) => {
    const target = config.musicVolume;
    const step = () => {
      if (!audioRef.current) return;
      if (audioRef.current.volume < target) {
        audioRef.current.volume = Math.min(target, audioRef.current.volume + 0.02);
        requestAnimationFrame(step);
      }
    };
    step();
  };

  useEffect(() => {
    if (!unlocked || playing || !ready) return;
    const audio = audioRef.current;
    if (!audio) return;

    seekToStart(audio);
    audio.muted = true;
    audio.play()
      .then(() => {
        audio.muted = false;
        rampVolume(audio);
        setPlaying(true);
      })
      .catch(() => {
        // autoplay was blocked; wait for user interaction
      });
  }, [unlocked, playing, ready]);

  useEffect(() => {
    if (!unlocked || playing || !ready) return;
    const start = () => {
      const audio = audioRef.current;
      if (!audio || playing) return;
      audio.muted = false;
      audio.play()
        .then(() => {
          rampVolume(audio);
          setPlaying(true);
        })
        .catch(() => {
          // still blocked, keep waiting
        });
    };

    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, [unlocked, playing, ready]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      const step = () => {
        if (!audioRef.current) return;
        if (audioRef.current.volume > 0.02) {
          audioRef.current.volume -= 0.03;
          requestAnimationFrame(step);
        } else {
          audioRef.current.pause();
          setPlaying(false);
        }
      };
      step();
    } else {
      audio.play().then(() => {
        const target = config.musicVolume;
        const step = () => {
          if (!audioRef.current) return;
          if (audioRef.current.volume < target) {
            audioRef.current.volume = Math.min(target, audioRef.current.volume + 0.02);
            requestAnimationFrame(step);
          }
        };
        step();
        setPlaying(true);
      }).catch(() => {/* ignore */});
    }
  };

  if (!config.musicUrl) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed bottom-5 right-5 z-[200] flex h-12 w-12 items-center justify-center rounded-full glass-gold text-gold transition-transform hover:scale-110 active:scale-95"
    >
      {playing ? (
        <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
          <span className="eq-bar" style={{ animationDelay: '0ms' }} />
          <span className="eq-bar" style={{ animationDelay: '150ms' }} />
          <span className="eq-bar" style={{ animationDelay: '300ms' }} />
          <span className="eq-bar" style={{ animationDelay: '450ms' }} />
        </span>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )}
      {!ready && (
        <span className="absolute -bottom-4 right-0 text-[8px] uppercase tracking-widest text-gold/50">
          loading
        </span>
      )}
    </button>
  );
}
