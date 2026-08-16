import { Users } from 'lucide-react'
import type { AudienceItem } from '../data/ministries'

/** Target ages / audience as contained rows with an icon. */
export function AudienceCard({ items }: { items: AudienceItem[] }) {
  return (
    <div className={`grid gap-4 sm:gap-5 ${items.length > 1 ? 'md:grid-cols-2' : ''}`}>
      {items.map((item) => (
        <div
          key={item.value}
          className="flex items-start gap-4 rounded-2xl border border-secondary-line bg-white p-5 shadow-card"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-soft text-secondary-dark">
            <Users size={18} aria-hidden="true" />
          </span>
          <div>
            {item.label && <p className="font-bold text-ink">{item.label}</p>}
            <p className={`leading-relaxed text-body ${item.label ? 'mt-1' : 'text-lg'}`}>
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
