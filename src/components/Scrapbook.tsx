import { config } from '@/config';
import { useReveal } from '@/hooks/useReveal';
import PhotoCard from '@/components/PhotoCard';
import StarField from '@/components/StarField';

export default function Scrapbook() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="album"
      ref={ref}
      className="relative w-full overflow-hidden bg-ink-900 px-5 py-24 sm:px-10 sm:py-32"
    >
      <StarField density={1.1} />
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-72 w-72 rounded-full bg-lavender/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-80 w-80 rounded-full bg-blush/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <header className="mb-16 text-center">
          <p className="reveal font-body text-xs uppercase tracking-[0.5em] text-gold/70">
            The Album
          </p>
          <h2 className="reveal mt-3 font-script text-5xl text-gradient-blush sm:text-6xl">
            Roblox Memories
          </h2>
          <p className="reveal mx-auto mt-4 max-w-lg font-body text-sm leading-relaxed text-warm/50">
            Kenangan di roblox bersama Nuyah ＞_＜
          </p>
        </header>

        {/* Scrapbook masonry — columns with natural offsets */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {config.photos.map((photo, i) => (
            <div
              key={i}
              className="mb-10 break-inside-avoid sm:mb-14"
              style={{ marginTop: i % 3 === 0 ? '0' : `${(i % 3) * 18}px` }}
            >
              <PhotoCard photo={photo} index={i} />
            </div>
          ))}
        </div>

        {/* decorative doodles / stickers */}
        <div className="pointer-events-none mt-10 flex justify-center">
          <span className="font-script text-3xl text-gold/40">~ forever yours ~</span>
        </div>
      </div>
    </section>
  );
}
