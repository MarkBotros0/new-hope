import { Check } from 'lucide-react'

/** A checklist of services / activities — no box, sits on the section. */
export function ServicesCard({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-body">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary-dark">
            <Check size={15} />
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}
