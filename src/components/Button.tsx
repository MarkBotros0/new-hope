import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  variant?: 'solid' | 'outline'
  /** In-page anchor or external URL. */
  href?: string
  /** Internal route — navigates client-side. Takes precedence over `href`. */
  to?: string
  onClick?: () => void
  className?: string
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark focus-visible:ring-offset-2'

// The fill and its label are both tokens, so a solid action always carries a
// label that clears AA against whatever orange the system is set to.
const variants = {
  solid: 'bg-action text-action-ink shadow-control hover:bg-action-hover',
  outline:
    'border border-secondary-dark bg-white text-secondary-dark hover:bg-secondary-soft',
}

export function Button({
  variant = 'solid',
  href,
  to,
  onClick,
  className = '',
  children,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
