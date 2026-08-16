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
  /** `tight` for short one-idea bands, `normal` for rich content. */
  density?: 'tight' | 'normal'
  /** Header alignment — centred by default, matching every band on the site.
   *  `center` also centres the rule under the heading. */
  align?: 'start' | 'center'
  className?: string
  children?: ReactNode
}

/** A full-width page band: eyebrow → <h2> → lead → content, centred in the
 *  page container. Named via aria-labelledby so it is exposed as a region.
 *  Bands carry no background of their own — the page shows through all of
 *  them, and the cards inside are what mark one band off from the next. */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  density = 'normal',
  align = 'center',
  className = '',
  children,
}: SectionProps) {
  const headingId = useId()
  // Adjacent bands stack their padding, so these are half the gap between two
  // sections — keep them modest or the page reads as a set of islands.
  const pad = density === 'tight' ? 'py-6 sm:py-7' : 'py-8 sm:py-10'
  const centred = align === 'center'

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={className}
    >
      <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${pad}`}>
        {(eyebrow || title) && (
          <header className={`mb-6 sm:mb-8 ${centred ? 'text-center' : ''}`}>
            {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
            {title && (
              <>
                <h2 id={headingId} className="text-2xl font-black text-ink sm:text-3xl">
                  {title}
                </h2>
                <span
                  className={`mt-3 block h-1.5 w-14 rounded-full bg-secondary ${
                    centred ? 'mx-auto' : ''
                  }`}
                />
              </>
            )}
            {lead && (
              <p
                className={`mt-3 max-w-3xl leading-loose text-body ${centred ? 'mx-auto' : ''}`}
              >
                {lead}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
