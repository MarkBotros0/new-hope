import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { ServicesMenu } from './ServicesMenu'
import { serviceNav } from '../data/ministries'

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

/** Top-level pages that are a plain link (الخدمات is a menu — see ServicesMenu). */
const pages = [
  { path: '/', label: 'الرئيسية' },
  { path: '/about', label: 'من نحن' },
]

function navPill(isActive: boolean) {
  return `rounded-full px-4 py-1.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark focus-visible:ring-offset-2 ${
    isActive
      ? 'bg-secondary-dark text-white'
      : 'text-body hover:bg-secondary/30 hover:text-secondary-dark'
  }`
}

/** Top bar: brand (logo + org name) and the primary nav — الرئيسية، من نحن،
 *  and الخدمات as a dropdown of the services and their sub-services. On phones
 *  everything collapses into a panel where الخدمات becomes an accordion. */
export function SiteHeader() {
  const [logoOk, setLogoOk] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
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

  // Open the services accordion by default when the reader is inside a service.
  const inService = serviceNav.some((s) => pathname.startsWith(s.path))
  useEffect(() => {
    setServicesOpen(inService)
  }, [inService])

  return (
    <header className="sticky top-0 z-20 border-b border-secondary-line bg-white/90 shadow-header backdrop-blur">
      {/* Orange accent bar — its height is counted in --header-h (index.css). */}
      <div className="h-1 bg-secondary" aria-hidden="true" />

      {/* Fixed height so --header-h stays accurate. */}
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark focus-visible:ring-offset-2"
          aria-label="أمل جديد — الصفحة الرئيسية"
        >
          {logoOk ? (
            <img
              src="/logo-removebg-preview.png"
              alt="أمل جديد — New Hope"
              className="h-12 w-auto object-contain sm:h-14"
              onError={() => setLogoOk(false)}
            />
          ) : (
            <>
              <LogoFallback />
              <span className="text-lg font-extrabold text-ink">أمل جديد</span>
            </>
          )}
        </Link>

        {/* Desktop / tablet nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="التنقل الرئيسي">
          {pages.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              end={page.path === '/'}
              className={({ isActive }) => navPill(isActive)}
            >
              {page.label}
            </NavLink>
          ))}
          <ServicesMenu />
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink transition hover:bg-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark md:hidden"
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
          aria-label="التنقل الرئيسي"
          className="mx-auto flex max-h-[70svh] max-w-6xl flex-col gap-1 overflow-y-auto border-t border-secondary-line px-4 pb-3 pt-2 sm:px-6 md:hidden"
        >
          {pages.map((page) => (
            <NavLink
              key={page.path}
              to={page.path}
              end={page.path === '/'}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  isActive
                    ? 'bg-secondary-dark text-white'
                    : 'text-body hover:bg-secondary/30 hover:text-secondary-dark'
                }`
              }
            >
              {page.label}
            </NavLink>
          ))}

          {/* الخدمات — accordion, so the nested sub-ministries stay reachable. */}
          <button
            type="button"
            aria-expanded={servicesOpen}
            aria-controls="mobile-services"
            onClick={() => setServicesOpen((v) => !v)}
            className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition ${
              inService
                ? 'bg-secondary-soft text-secondary-dark'
                : 'text-body hover:bg-secondary/30 hover:text-secondary-dark'
            }`}
          >
            الخدمات
            <ChevronDown
              size={16}
              aria-hidden="true"
              className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {servicesOpen && (
            <ul
              id="mobile-services"
              className="mb-1 ms-2 space-y-0.5 border-e-2 border-secondary/40 pe-2"
            >
              {serviceNav.map((service) => (
                <li key={service.path}>
                  <NavLink
                    to={service.path}
                    end
                    className={({ isActive }) =>
                      `block rounded-lg px-4 py-2 text-sm font-bold transition ${
                        isActive
                          ? 'text-secondary-dark'
                          : 'text-body hover:text-secondary-dark'
                      }`
                    }
                  >
                    {service.label}
                  </NavLink>

                  {service.children && (
                    <ul className="ms-3 space-y-0.5 border-e-2 border-secondary/25 pe-2">
                      {service.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              `block rounded-lg px-4 py-2 text-sm font-semibold transition ${
                                isActive
                                  ? 'text-secondary-dark'
                                  : 'text-label hover:text-secondary-dark'
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </nav>
      )}
    </header>
  )
}
