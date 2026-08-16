import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'

import type { ArchivePhoto } from '../data/ministries'

interface ArchiveGalleryProps {
  /** How many placeholder tiles to show when no photos exist yet. */
  count: number
  /** Real photos. When present they replace the placeholders entirely —
   *  a grey tile next to a real photo reads as broken, not as "more coming". */
  photos?: ArchivePhoto[]
}

/** Snap-scrolling carousel of archive photos. Arrows appear only when the
 *  track actually overflows; the track itself is focusable for keyboard users.
 *  Branded placeholder tiles stand in until real photos are supplied. */
export function ArchiveGallery({ count, photos }: ArchiveGalleryProps) {
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
    'flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white text-body shadow-control transition hover:border-secondary-dark hover:text-secondary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark focus-visible:ring-offset-2'

  const tile =
    'aspect-[4/3] w-[78%] shrink-0 snap-start rounded-2xl border border-secondary-line bg-secondary-soft sm:w-[45%] lg:w-[31%]'

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
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark focus-visible:ring-offset-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos?.length
          ? photos.map((photo) => (
              <div key={photo.src} className={`${tile} overflow-hidden`}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            ))
          : Array.from({ length: count }).map((_, index) => (
              <div key={index} className={`${tile} flex items-center justify-center`}>
                <ImageIcon className="h-9 w-9 text-secondary-dark/60" aria-hidden="true" />
              </div>
            ))}
      </div>
    </div>
  )
}
