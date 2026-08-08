import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { ministries } from '../data/ministries'

/** Fallback brand mark: an orange cross on black, echoing the New Hope logo. */
function LogoFallback() {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand">
      <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden="true">
        <rect x="10" y="3" width="4" height="18" rx="1.5" className="fill-secondary" />
        <rect x="5" y="8" width="14" height="4" rx="1.5" className="fill-secondary" />
      </svg>
    </span>
  )
}

/** Top bar: brand (logo + org name) and the ministry nav tabs.
 *  On phones the tabs collapse into a hamburger dropdown. */
export function SiteHeader() {
  const [logoOk, setLogoOk] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-page/85 backdrop-blur">
      {/* Fixed height so --header-h in index.css stays accurate. */}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <div className="flex items-center gap-3">
          {logoOk ? (
            <img
              src="/logo.png"
              alt="أمل جديد — New Hope"
              className="h-10 w-auto object-contain sm:h-11"
              onError={() => setLogoOk(false)}
            />
          ) : (
            <>
              <LogoFallback />
              <span className="text-lg font-extrabold text-ink">أمل جديد</span>
            </>
          )}
        </div>

        {/* Desktop / tablet nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {ministries.map((m) => (
            <NavLink
              key={m.slug}
              to={`/${m.slug}`}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-bold transition ${
                  isActive
                    ? 'bg-brand text-white'
                    : 'text-body hover:bg-sage-tint hover:text-ink'
                }`
              }
            >
              {m.navLabel}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink transition hover:bg-sage-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
          aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile nav panel */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-line px-4 pb-3 pt-2 sm:px-6 md:hidden"
        >
          {ministries.map((m) => (
            <NavLink
              key={m.slug}
              to={`/${m.slug}`}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  isActive
                    ? 'bg-brand text-white'
                    : 'text-body hover:bg-sage-tint hover:text-ink'
                }`
              }
            >
              {m.navLabel}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
