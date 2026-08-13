import { useId, type ReactNode } from 'react'
import { SectionLabel } from './SectionLabel'

interface SectionProps {
  id?: string
  /** Small chip above the heading (category). Optional. */
  eyebrow?: string
  /** Section heading — renders a real <h2> and names the landmark. */
  title?: string
  /** Supporting line under the heading. */
  lead?: string
  tone?: 'white' | 'tint'
  /** `tight` for short one-idea bands, `normal` for rich content. */
  density?: 'tight' | 'normal'
  className?: string
  children?: ReactNode
}

/** A full-width page band: eyebrow → <h2> → lead → content, centred in the
 *  page container. Named via aria-labelledby so it is exposed as a region. */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  tone = 'white',
  density = 'normal',
  className = '',
  children,
}: SectionProps) {
  const headingId = useId()
  const pad = density === 'tight' ? 'py-9 sm:py-11' : 'py-12 sm:py-16'

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`${tone === 'tint' ? 'bg-tint' : 'bg-page'} ${className}`}
    >
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${pad}`}>
        {(eyebrow || title) && (
          <header className="mb-6 sm:mb-8">
            {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
            {title && (
              <>
                <h2 id={headingId} className="text-2xl font-black text-ink sm:text-3xl">
                  {title}
                </h2>
                <span className="mt-3 block h-1.5 w-14 rounded-full bg-secondary" />
              </>
            )}
            {lead && <p className="mt-3 max-w-3xl leading-loose text-body">{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
