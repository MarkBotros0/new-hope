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

// Orange carries the actions. `secondary-dark` clears AA against white text
// (5.9:1); the vivid logo orange would not, so it stays on non-text marks.
const variants = {
  solid: 'bg-secondary-dark text-white shadow-control hover:bg-secondary-deep',
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
