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

/** The service intro: text on one half, a photo on the other (stacked on
 *  mobile). The image is a placeholder until real photos are supplied. */
export function ServiceHero({ eyebrow, title, description, actions }: ServiceHeroProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-sm md:flex-row md:items-stretch">
      {/* Text half */}
      <div className="flex flex-col justify-center p-6 sm:p-10 md:w-1/2 md:min-w-0">
        {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
        <h1 className="text-3xl font-black leading-tight text-ink sm:text-4xl lg:text-5xl">
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

      {/* Photo — swap the src for a real image later. */}
      <div className="bg-sage-tint md:w-1/2">
        <img
          src="/placeholder-photo.svg"
          alt=""
          aria-hidden="true"
          className="h-44 w-full object-cover sm:h-56 md:h-full md:min-h-[20rem]"
        />
      </div>
    </div>
  )
}
