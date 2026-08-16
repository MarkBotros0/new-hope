import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { ArchivePhoto } from '../data/ministries'

interface HeroCarouselProps {
  photos: ArchivePhoto[]
  /** Milliseconds each slide is held before the next one fades in. */
  interval?: number
}

/** Full-width hero slideshow. Slides cross-fade on a timer; the timer stops
 *  while a reader hovers, focuses inside, or when the tab is hidden, and never
 *  starts at all under `prefers-reduced-motion`. Arrows and dots drive it
 *  manually in either case. */
export function HeroCarousel({ photos, interval = 3000 }: HeroCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = usePrefersReducedMotion()
  const count = photos.length

  const go = useCallback(
    (next: number) => {
      if (count > 0) setIndex(((next % count) + count) % count)
    },
    [count],
  )

  // Auto-advance. `index` is a dependency so a manual jump restarts the clock
  // rather than cutting the new slide short.
  useEffect(() => {
    if (reduceMotion || paused || count < 2) return
    const id = window.setTimeout(() => go(index + 1), interval)
    return () => window.clearTimeout(id)
  }, [count, go, index, interval, paused, reduceMotion])

  // Don't burn transitions on a backgrounded tab.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  if (count === 0) return null

  const control =
    'flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur transition hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40'

  return (
    <section
      aria-roledescription="carousel"
      aria-label="من أرشيف الخدمة"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="relative isolate h-[26rem] overflow-hidden rounded-3xl border border-secondary-line bg-brand shadow-sm sm:h-[30rem] lg:h-[34rem]"
    >
      {photos.map((photo, i) => (
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          aria-hidden={i === index ? undefined : true}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* A short wash at the foot of the frame — just enough for the controls
          to stay legible over a light photo; the image itself stays clear. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 to-transparent"
      />

      {/* Controls — chevrons point the RTL way: right is "previous". */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-3 sm:bottom-6">
          <button
            type="button"
            className={control}
            aria-label="الصورة السابقة"
            onClick={() => go(index - 1)}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                aria-label={`الصورة ${i + 1} من ${count}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 ${
                  i === index ? 'w-7 bg-secondary' : 'w-2.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            className={control}
            aria-label="الصورة التالية"
            onClick={() => go(index + 1)}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  )
}

/** Tracks the OS "reduce motion" setting so the slideshow can stay still. */
function usePrefersReducedMotion() {
  const query = useRef<MediaQueryList | null>(null)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    query.current = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(query.current.matches)
    const onChange = (event: MediaQueryListEvent) => setReduce(event.matches)
    query.current.addEventListener('change', onChange)
    return () => query.current?.removeEventListener('change', onChange)
  }, [])

  return reduce
}
