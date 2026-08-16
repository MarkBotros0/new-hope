import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { serviceNav } from '../data/ministries'

/** The services as cards, each led by its own photo, so the shape of the work
 *  is visible outside the nav menu too. Only "تعرّف على الخدمة" is clickable —
 *  the card and its title are not links, so there is one obvious target rather
 *  than a whole panel that happens to navigate. */
export function ServiceLinkCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {serviceNav.map((service) => (
        <li
          key={service.path}
          className="group flex flex-col overflow-hidden rounded-2xl border border-secondary-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift focus-within:-translate-y-1 focus-within:shadow-lift"
        >
          {/* Photo panel. The image is decorative: the heading sitting on it
              already names the service. */}
          <div className="relative aspect-[16/10] overflow-hidden bg-secondary-soft">
            <img
              src={service.photo?.src ?? '/placeholder-photo.svg'}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/35 to-brand/5"
            />

            <div className="absolute inset-x-0 bottom-0 p-5">
              {/* The rule stretches on hover — the card's one moving part. */}
              <span className="mb-3 block h-1 w-10 rounded-full bg-secondary transition-all duration-300 group-hover:w-16" />
              {/* The nav labels are shorthand (الشباب…); on a card standing on
                  its own the full "خدمة …" name reads better. */}
              <h3 className="text-xl font-black text-white">خدمة {service.label}</h3>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6">
            {service.blurb && <p className="leading-loose text-body">{service.blurb}</p>}

            {/* The card's only link. Every card would otherwise announce the
                same "تعرّف على الخدمة", so the accessible name carries the
                service it belongs to. */}
            <Link
              to={service.path}
              aria-label={`تعرّف على خدمة ${service.label}`}
              className="mt-auto inline-flex items-center gap-1.5 self-start rounded pt-5 text-sm font-bold text-secondary-dark transition-all duration-300 hover:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark focus-visible:ring-offset-2"
            >
              تعرّف على الخدمة
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}
