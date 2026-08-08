import type { ReactNode } from 'react'
import { SectionLabel } from './SectionLabel'

interface SectionProps {
  id?: string
  eyebrow?: string
  title?: string
  /** Alternating full-width bands give the page rhythm without boxes. */
  tone?: 'white' | 'tint'
  className?: string
  children?: ReactNode
}

/** A full-width page section: optional eyebrow + heading, then content,
 *  centred in the page container. Replaces the old bordered cards. */
export function Section({
  id,
  eyebrow,
  title,
  tone = 'white',
  className = '',
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${tone === 'tint' ? 'bg-sage-tint' : 'bg-page'} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {(eyebrow || title) && (
          <header className="mb-6 sm:mb-8">
            {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
            {title && (
              <h2 className="mt-1 text-2xl font-black text-ink sm:text-3xl">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
