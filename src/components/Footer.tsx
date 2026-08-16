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
      {/* Three equal columns — logo, services, contact — so the row reads as
          even spans rather than a mark squeezed against the edge. Stacked on
          phones. */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-center sm:grid-cols-3 sm:gap-8 sm:px-6 sm:text-start">
        {/* A white cut of the mark, so it sits straight on the black field
            with no tile behind it. The cross keeps the logo orange. */}
        {/* The cell stretches to the row height and centres the mark inside it,
            so the link columns keep starting at their headings. */}
        <div className="flex items-center justify-center sm:justify-start">
          <Link
            to="/"
            aria-label="أمل جديد — الصفحة الرئيسية"
            className="inline-flex rounded-2xl p-1 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
          >
            <img
              src="/logo-white.png"
              alt="أمل جديد — New Hope"
              className="h-16 w-auto object-contain sm:h-20"
            />
          </Link>
        </div>

        {/* Top-level services only. الرئيسية، من نحن and the sub-ministries are
            all one click away in the header, so the footer stays a short
            index rather than a second copy of the nav. */}
        <nav aria-label="روابط الخدمات">
          <FooterHeading>خدماتنا</FooterHeading>
          <ul className="text-sm text-white/90">
            {serviceNav.map((service) => (
              <li key={service.path}>
                <Link to={service.path} className={linkClass}>
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact — awaiting real details */}
        <div>
          <FooterHeading>تواصل معنا</FooterHeading>
          <ul className="flex flex-col items-center gap-3 text-sm text-white/90 sm:items-start">
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
