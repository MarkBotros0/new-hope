import type { Principle } from '../data/ministries'

/** Core principles as clean text columns — no boxes, no bullets. */
export function PrinciplesCard({ principles }: { principles: Principle[] }) {
  return (
    <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
      {principles.map((p) => (
        <div key={p.title}>
          <p className="text-lg font-bold text-ink">{p.title}</p>
          <p className="mt-2 leading-loose text-body">{p.body}</p>
        </div>
      ))}
    </div>
  )
}
