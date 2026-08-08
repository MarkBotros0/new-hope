import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'

/** Snap-scrolling carousel of archive photos. Arrows appear only when the
 *  track actually overflows; the track itself is focusable for keyboard users.
 *  Branded placeholder tiles stand in until real photos are supplied. */
export function ArchiveGallery({ count }: { count: number }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [overflows, setOverflows] = useState(false)

  const measure = useCallback(() => {
    const track = trackRef.current
    if (track) setOverflows(track.scrollWidth > track.clientWidth + 1)
  }, [])

  useEffect(() => {
    measure()
    const track = trackRef.current
    if (!track) return
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    return () => observer.disconnect()
  }, [measure])

  function scrollByPage(sign: number) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: sign * track.clientWidth * 0.85, behavior: 'smooth' })
  }

  const arrow =
    'flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white text-body transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2'

  return (
    <div>
      {overflows && (
        <div className="mb-4 flex gap-2">
          <button type="button" onClick={() => scrollByPage(1)} aria-label="السابق" className={arrow}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollByPage(-1)} aria-label="التالي" className={arrow}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
        </div>
      )}

      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label="أرشيف الصور"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex aspect-[4/3] w-[78%] shrink-0 snap-start items-center justify-center rounded-2xl border border-line bg-sage-tint sm:w-[45%] lg:w-[31%]"
          >
            <ImageIcon className="h-9 w-9 text-muted" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  )
}
