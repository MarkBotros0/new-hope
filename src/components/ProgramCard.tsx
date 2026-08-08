import { Check } from 'lucide-react'
import type { Program } from '../data/ministries'

/** Content of one program (shown inside an active tab panel): title, meta
 *  chips, paragraphs, and an optional detail block. No box. */
export function ProgramCard({ program }: { program: Program }) {
  const { title, titleEn, meta, paragraphs, details } = program

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-2xl font-black text-ink">{title}</h3>
        {titleEn && (
          <span dir="ltr" className="text-sm font-bold text-secondary-dark">
            {titleEn}
          </span>
        )}
      </div>

      {meta && meta.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {meta.map((m) => (
            <span
              key={m.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary-dark"
            >
              <span className="opacity-70">{m.label}</span>
              {m.value}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 max-w-3xl space-y-3">
        {paragraphs.map((para) => (
          <p key={para} className="leading-loose text-body">
            {para}
          </p>
        ))}
      </div>

      {details && (
        <div className="mt-6 border-t border-line pt-5">
          <p className="mb-4 font-bold text-ink">{details.heading}</p>

          {details.items && (
            <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {details.items.map((it) => (
                <li key={it} className="flex items-start gap-2.5 text-body">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary-dark">
                    <Check size={15} />
                  </span>
                  <span className="leading-relaxed">{it}</span>
                </li>
              ))}
            </ul>
          )}

          {details.namedItems && (
            <div className="grid gap-6 sm:grid-cols-2">
              {details.namedItems.map((it) => (
                <div key={it.title}>
                  <p className="font-bold text-ink">{it.title}</p>
                  <p className="mt-1 leading-relaxed text-body">{it.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
