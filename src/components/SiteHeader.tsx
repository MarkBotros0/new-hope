import { useState } from 'react'
import { NavLink } from 'react-router-dom'
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

/** Top bar: brand (logo + org name) and the ministry nav tabs. */
export function SiteHeader() {
  const [logoOk, setLogoOk] = useState(true)

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-page/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          {logoOk ? (
            <img
              src="/logo.png"
              alt="New Hope"
              className="h-10 w-auto object-contain sm:h-11"
              onError={() => setLogoOk(false)}
            />
          ) : (
            <>
              <LogoFallback />
              <span dir="ltr" className="text-lg font-extrabold text-ink">
                New Hope
              </span>
            </>
          )}
        </div>

        <nav className="flex flex-wrap items-center gap-1">
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
      </div>
    </header>
  )
}
