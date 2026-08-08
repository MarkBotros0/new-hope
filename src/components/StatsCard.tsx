import type { Stat } from '../data/ministries'

/** Highlight figures as modern stat tiles: gradient numbers on soft cards with
 *  a gentle hover lift. */
export function StatsCard({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-line bg-white p-5 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-6"
        >
          <p className="bg-gradient-to-br from-secondary to-secondary-dark bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl">
            {s.value}
          </p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-body">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  )
}
