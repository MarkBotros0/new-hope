import { useRef } from 'react'
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'

/** Horizontal, snap-scrolling carousel of archive photos with arrow controls.
 *  Branded placeholder tiles stand in until real photos are supplied. */
export function ArchiveGallery({ count }: { count: number }) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollByPage(sign: number) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: sign * track.clientWidth * 0.85, behavior: 'smooth' })
  }

  const arrow =
    'flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-body transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand'

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <button type="button" onClick={() => scrollByPage(1)} aria-label="السابق" className={arrow}>
          <ChevronRight size={18} />
        </button>
        <button type="button" onClick={() => scrollByPage(-1)} aria-label="التالي" className={arrow}>
          <ChevronLeft size={18} />
        </button>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex aspect-[4/3] w-[78%] shrink-0 snap-start items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-sage-tint to-secondary/10 sm:w-[45%] lg:w-[31%]"
          >
            <ImageIcon className="h-9 w-9 text-secondary/30" />
          </div>
        ))}
      </div>
    </div>
  )
}
