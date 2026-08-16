import type { Stat } from '../data/ministries'

/** Highlight figures as stat tiles: orange numerals on a flat white card,
 *  with a vivid rule as the card's single accent. Non-interactive. */
export function StatsCard({ stats }: { stats: Stat[] }) {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-secondary-line bg-white p-3.5 text-center shadow-card sm:p-4"
        >
          <p className="text-2xl font-black leading-tight text-secondary-dark sm:text-3xl">
            {s.value}
          </p>
          <span className="mx-auto mt-2 block h-1 w-8 rounded-full bg-secondary" />
          <p className="mt-2 text-xs font-semibold leading-relaxed text-body sm:text-sm">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  )
}
