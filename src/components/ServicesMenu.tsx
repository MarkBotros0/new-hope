import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { serviceNav } from '../data/ministries'

/** Desktop الخدمات dropdown.
 *
 *  Built as a disclosure (button + expanded panel of plain links), not an ARIA
 *  menu: these are navigation links, so the browser's own link semantics and
 *  Tab order are the right contract. The panel lists the services themselves
 *  and stops there — the sub-ministries under السودانيين are reachable from
 *  the tabs on that page, and listing them here left the menu lopsided. */
export function ServicesMenu() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const { pathname } = useLocation()

  const active = serviceNav.some((s) => pathname.startsWith(s.path))

  // Close on route change.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close on Escape (returning focus to the trigger) and on outside clicks.
  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <div
      ref={containerRef}
      className="relative"
      // Tabbing past the last link should dismiss the panel.
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark focus-visible:ring-offset-2 ${
          active || open
            ? 'bg-action text-action-ink'
            : 'text-body hover:bg-secondary/30 hover:text-secondary-dark'
        }`}
      >
        الخدمات
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute end-0 top-full z-30 mt-2 w-[min(38rem,calc(100vw-2rem))] rounded-2xl border border-secondary-line bg-white p-2 shadow-menu [animation:fadeIn_0.18s_ease]"
        >
          {/* Two services, two columns — the panel is sized to its contents so
              there is no empty cell sitting beside them. */}
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {serviceNav.map((service) => (
              <li key={service.path}>
                <Link
                  to={service.path}
                  // The blurb is a description, not part of the link's name —
                  // otherwise both spans run together into one unreadable label.
                  aria-label={`خدمة ${service.label}`}
                  aria-describedby={service.blurb ? `${panelId}${service.path}` : undefined}
                  className="group flex h-full gap-3 rounded-xl border border-transparent p-3 transition hover:border-secondary-line hover:bg-secondary-soft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark"
                >
                  {/* The same photo the service leads with on the home page, so
                      the menu entry and the card read as the same thing. */}
                  <span
                    aria-hidden="true"
                    className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-secondary-soft"
                  >
                    <img
                      src={service.photo?.src ?? '/placeholder-photo.svg'}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </span>

                  <span className="min-w-0">
                    {/* The arrow is the one moving part: the gap opens on hover. */}
                    <span className="flex items-center gap-1.5 font-bold leading-snug text-ink transition-all duration-300 group-hover:gap-2.5">
                      خدمة {service.label}
                      <ArrowLeft
                        size={14}
                        aria-hidden="true"
                        className="shrink-0 text-secondary-dark"
                      />
                    </span>
                    {service.blurb && (
                      <span
                        id={`${panelId}${service.path}`}
                        className="mt-1 block text-xs leading-relaxed text-muted"
                      >
                        {service.blurb}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
