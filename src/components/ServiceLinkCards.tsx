import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { serviceNav } from '../data/ministries'

/** The three services as linked cards, each led by its own photo and listing
 *  its sub-services, so the full shape of the ministry is visible outside the
 *  nav menu too. The photo panel is the card's primary link — the title's
 *  ::after stretches across it — while the sub-service rows below stay
 *  separately clickable. */
export function ServiceLinkCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {serviceNav.map((service) => (
        <li
          key={service.path}
          className="group flex flex-col overflow-hidden rounded-2xl border border-secondary-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg"
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
              <h3 className="text-xl font-black text-white">
                <Link
                  to={service.path}
                  className="rounded after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
                >
                  {service.label}
                </Link>
              </h3>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6">
            {service.blurb && <p className="leading-loose text-body">{service.blurb}</p>}

            {/* Echoes the panel link's destination, so it stays out of the
                accessibility tree rather than reading as a duplicate link.
                Sub-services live on the service page itself. */}
            <span
              aria-hidden="true"
              className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-sm font-bold text-secondary-dark transition-all duration-300 group-hover:gap-2.5"
            >
              تعرّف على الخدمة
              <ArrowLeft size={16} />
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
