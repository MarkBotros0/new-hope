import { Button } from './Button'
import { SectionLabel } from './SectionLabel'
import type { ArchivePhoto } from '../data/ministries'

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
  /** Real photo for the image half; omit to show the placeholder tile. */
  photo?: ArchivePhoto
}

/** The service intro: text on one half, a photo on the other (stacked on
 *  mobile). Pages without a photo yet fall back to a placeholder tile. */
export function ServiceHero({
  eyebrow,
  title,
  description,
  actions,
  photo,
}: ServiceHeroProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-secondary-line bg-white shadow-card md:flex-row md:items-stretch">
      {/* Text half — warm wash fading into the page. Gradients are reserved
          for the heroes; every card surface below them is flat. */}
      <div className="flex flex-col justify-center bg-gradient-to-b from-secondary-soft to-white p-6 sm:p-10 md:w-1/2 md:min-w-0">
        {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
        <h1 className="text-3xl font-black leading-tight text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <span className="mt-4 block h-1.5 w-16 rounded-full bg-secondary" />
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

      {/* Photo half — a real photo carries its own alt text; the placeholder
          is decorative and stays hidden from assistive tech. */}
      <div className="bg-secondary-soft md:w-1/2">
        <img
          src={photo?.src ?? '/placeholder-photo.svg'}
          alt={photo?.alt ?? ''}
          aria-hidden={photo ? undefined : true}
          className="h-44 w-full object-cover sm:h-56 md:h-full md:min-h-[20rem]"
        />
      </div>
    </div>
  )
}
