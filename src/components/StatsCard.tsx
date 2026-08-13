import type { Stat } from '../data/ministries'

/** Highlight figures as stat tiles. Orange numerals over a warm wash, with a
 *  vivid accent rule. Non-interactive. */
export function StatsCard({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-secondary-line bg-gradient-to-b from-secondary-soft/60 to-white p-5 text-center shadow-sm sm:p-6"
        >
          <p className="text-4xl font-black leading-tight text-secondary-dark sm:text-5xl">
            {s.value}
          </p>
          <span className="mx-auto mt-3 block h-1.5 w-10 rounded-full bg-secondary" />
          <p className="mt-3 text-sm font-semibold leading-relaxed text-body">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  )
}
