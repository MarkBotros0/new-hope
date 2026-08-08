import { Link } from 'react-router-dom'
import { Mail, MapPin, Share2 } from 'lucide-react'
import { Pending } from './Pending'
import { ministries } from '../data/ministries'

function FooterHeading({ children }: { children: string }) {
  return <h2 className="mb-3 text-sm font-bold text-white">{children}</h2>
}

const linkClass =
  'rounded transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70'

/** Contact rows the client still needs to fill in. */
const pendingContact = [
  { key: 'address', Icon: MapPin, label: 'العنوان' },
  { key: 'email', Icon: Mail, label: 'البريد الإلكتروني' },
  { key: 'social', Icon: Share2, label: 'حسابات التواصل' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 text-center sm:grid-cols-2 sm:gap-8 sm:px-6 sm:text-start">
        {/* Brand */}
        <div>
          <p className="text-xl font-extrabold">أمل جديد</p>
          <p dir="ltr" className="mt-1 text-sm font-bold tracking-wide text-white/70">
            New Hope
          </p>
          <p className="mt-3 leading-loose text-white/80">
            خدمة الشباب وتطوير القادة · خدمة السودانيين بمصر
          </p>
        </div>

        {/* Ministries */}
        <nav aria-label="روابط الخدمات">
          <FooterHeading>خدماتنا</FooterHeading>
          <ul className="space-y-2 text-sm text-white/80">
            {ministries.map((m) => (
              <li key={m.slug}>
                <Link to={`/${m.slug}`} className={linkClass}>
                  {m.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact — awaiting real details */}
        <div className="sm:col-span-2">
          <FooterHeading>تواصل معنا</FooterHeading>
          <ul className="flex flex-col items-center gap-3 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
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

      <div className="border-t border-white/20">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-white/80 sm:px-6">
          © {year} أمل جديد · جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  )
}
