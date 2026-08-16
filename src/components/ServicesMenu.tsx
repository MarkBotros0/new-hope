import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { serviceNav } from '../data/ministries'

/** Desktop الخدمات dropdown.
 *
 *  Built as a disclosure (button + expanded panel of plain links), not an ARIA
 *  menu: these are navigation links, so the browser's own link semantics and
 *  Tab order are the right contract. Sub-ministries are laid out inside the
 *  panel rather than behind a hover flyout, so every service — including the
 *  three nested under السودانيين — is visible in one glance. */
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
          className="absolute end-0 top-full z-30 mt-2 w-[min(44rem,calc(100vw-2rem))] rounded-2xl border border-secondary-line bg-white p-3 shadow-menu [animation:fadeIn_0.18s_ease]"
        >
          <ul className="grid gap-2 sm:grid-cols-3">
            {serviceNav.map((service) => (
              <li key={service.path}>
                <Link
                  to={service.path}
                  // The blurb is a description, not part of the link's name —
                  // otherwise both spans run together into one unreadable label.
                  aria-label={service.label}
                  aria-describedby={service.blurb ? `${panelId}${service.path}` : undefined}
                  className="block rounded-xl border border-transparent p-3 transition hover:border-secondary-line hover:bg-secondary-soft/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark"
                >
                  <span className="block font-bold text-ink">{service.label}</span>
                  {service.blurb && (
                    <span
                      id={`${panelId}${service.path}`}
                      className="mt-1 block text-xs leading-relaxed text-muted"
                    >
                      {service.blurb}
                    </span>
                  )}
                </Link>

                {service.children && (
                  // Nested sub-ministries, kept visible rather than behind a
                  // second hover step. The orange rule marks the nesting.
                  <ul className="mt-1 space-y-0.5 border-e-2 border-secondary/40 pe-3 ms-3">
                    {service.children.map((child) => (
                      <li key={child.path}>
                        <Link
                          to={child.path}
                          className="block rounded-lg px-2 py-1.5 text-sm font-semibold text-body transition hover:bg-secondary/30 hover:text-secondary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
