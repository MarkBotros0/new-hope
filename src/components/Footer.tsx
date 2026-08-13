import { Link } from 'react-router-dom'
import { Mail, MapPin, Share2 } from 'lucide-react'
import { Pending } from './Pending'
import { serviceNav } from '../data/ministries'

function FooterHeading({ children }: { children: string }) {
  // Vivid logo orange clears AA on the near-black field (5.1:1).
  return <h2 className="mb-3 text-sm font-bold text-secondary">{children}</h2>
}

const linkClass =
  'inline-block py-2 rounded transition hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary'

/** Contact rows the client still needs to fill in. */
const pendingContact = [
  { key: 'address', Icon: MapPin, label: 'العنوان' },
  { key: 'email', Icon: Mail, label: 'البريد الإلكتروني' },
  { key: 'social', Icon: Share2, label: 'حسابات التواصل' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-4 border-secondary bg-brand text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-center sm:grid-cols-2 sm:gap-8 sm:px-6 sm:text-start">
        {/* Brand */}
        <div>
          <p className="text-xl font-extrabold">أمل جديد</p>
          <p dir="ltr" className="mt-1 text-sm font-bold tracking-wide text-white/85">
            New Hope
          </p>
          <p className="mt-3 leading-loose text-white/90">
            خدمة الشباب وتطوير القادة · خدمة السودانيين بمصر
          </p>
        </div>

        {/* Site map — mirrors the header nav, sub-ministries included. */}
        <nav aria-label="روابط الموقع">
          <FooterHeading>خدماتنا</FooterHeading>
          <ul className="text-sm text-white/90">
            <li>
              <Link to="/" className={linkClass}>
                الرئيسية
              </Link>
            </li>
            <li>
              <Link to="/about" className={linkClass}>
                من نحن
              </Link>
            </li>
            {serviceNav.map((service) => (
              <li key={service.path}>
                <Link to={service.path} className={linkClass}>
                  {service.label}
                </Link>
                {service.children && (
                  <ul className="border-e border-secondary/40 pe-3 ms-2 text-white/85">
                    {service.children.map((child) => (
                      <li key={child.path}>
                        <Link to={child.path} className={linkClass}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact — awaiting real details */}
        <div className="sm:col-span-2">
          <FooterHeading>تواصل معنا</FooterHeading>
          <ul className="flex flex-col items-center gap-3 text-sm text-white/90 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            {pendingContact.map(({ key, Icon, label }) => (
              <li key={key} className="flex items-center gap-2">
                <Icon size={16} className="shrink-0 text-secondary" aria-hidden="true" />
                <span>{label}</span>
                <Pending tone="dark" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-secondary/35">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-white/90 sm:px-6">
          © {year} أمل جديد · جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  )
}
