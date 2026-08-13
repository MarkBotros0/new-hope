import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { serviceNav } from '../data/ministries'

/** The three services as linked cards, each listing its sub-services so the
 *  full shape of the ministry is visible outside the nav menu too. */
export function ServiceLinkCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {serviceNav.map((service) => (
        <li
          key={service.path}
          className="flex flex-col rounded-2xl border border-secondary-line border-t-4 border-t-secondary bg-gradient-to-b from-secondary-soft/40 to-white p-6 shadow-sm"
        >
          <h3 className="text-lg font-black text-ink">
            <Link
              to={service.path}
              className="rounded transition hover:text-secondary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark focus-visible:ring-offset-2"
            >
              {service.label}
            </Link>
          </h3>

          {service.blurb && (
            <p className="mt-3 leading-loose text-body">{service.blurb}</p>
          )}

          {service.children && (
            <ul className="mt-4 space-y-1.5 border-e-2 border-secondary/40 pe-3">
              {service.children.map((child) => (
                <li key={child.path}>
                  <Link
                    to={child.path}
                    className="rounded text-sm font-semibold text-label transition hover:text-secondary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark"
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <Link
            to={service.path}
            tabIndex={-1}
            aria-hidden="true"
            className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-bold text-secondary-dark transition hover:gap-2.5"
          >
            تعرّف على الخدمة
            <ArrowLeft size={16} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
