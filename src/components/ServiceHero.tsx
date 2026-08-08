import { Button } from './Button'
import { SectionLabel } from './SectionLabel'

interface HeroAction {
  label: string
  href: string
  variant?: 'solid' | 'outline'
}

interface ServiceHeroProps {
  eyebrow?: string
  title: string
  description?: string
  actions?: HeroAction[]
}

/** The service intro: text on one half, a warm branded panel on the other
 *  (stacked on mobile). Real photos can replace the panel later. */
export function ServiceHero({ eyebrow, title, description, actions }: ServiceHeroProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm md:flex-row md:items-stretch">
      {/* Text half */}
      <div className="flex flex-col justify-center p-8 sm:p-10 md:w-1/2 md:min-w-0">
        {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
        <h1 className="text-4xl font-black leading-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-xl leading-loose text-body">{description}</p>
        )}

        {actions && actions.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-3">
            {actions.map((action) => (
              <Button key={action.label} href={action.href} variant={action.variant}>
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Branded panel */}
      <div className="relative min-h-[14rem] overflow-hidden bg-gradient-to-br from-secondary/15 via-sage-tint to-brand/5 md:w-1/2">
        <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-14 -left-10 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
      </div>
    </div>
  )
}
