import { Check } from 'lucide-react'
import { topicIcon } from './topicIcons'

/** A list of services / activities, in the card the الموضوعات topics use:
 *  a chip and a label on one row, two to a row, centred on the page. Each
 *  entry carries an icon for what it actually is — a stethoscope for medical
 *  care, a backpack for the school bags. Entries with nothing specific to
 *  show fall back to a tick. */
export function ServicesCard({ items }: { items: string[] }) {
  return (
    <ul className="mx-auto grid max-w-3xl gap-2.5 sm:grid-cols-2">
      {items.map((item, i) => {
        const Icon = topicIcon(item) ?? Check
        return (
          <li
            key={item}
            className={`flex items-center justify-center gap-2.5 rounded-xl border border-secondary-line bg-white p-3.5 shadow-card ${
              // A last row holding one card centres under the pair above.
              items.length % 2 === 1 && i === items.length - 1
                ? 'sm:col-span-2 sm:w-[calc((100%-0.625rem)/2)] sm:justify-self-center'
                : ''
            }`}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary-soft text-secondary-dark">
              <Icon size={17} aria-hidden="true" />
            </span>
            {/* Start-aligned so an entry that wraps keeps one edge. */}
            <span className="text-start text-sm font-semibold leading-relaxed text-body">
              {item}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
