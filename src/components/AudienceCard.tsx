import type { AudienceItem } from '../data/ministries'

/** Target ages / audience — clean text, no box. */
export function AudienceCard({ items }: { items: AudienceItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.value}>
          {item.label && <p className="font-bold text-ink">{item.label}</p>}
          <p className="mt-1 text-lg leading-relaxed text-body">{item.value}</p>
        </div>
      ))}
    </div>
  )
}
