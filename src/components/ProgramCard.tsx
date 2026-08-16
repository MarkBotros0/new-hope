import { toArabicNumeral } from './numerals'
import { topicIcon } from './topicIcons'
import type { Program } from '../data/ministries'

/** Content of one program (shown inside the active tab panel): title, meta
 *  chips, paragraphs, and an optional detail block. */
export function ProgramCard({ program }: { program: Program }) {
  const { title, titleEn, meta, paragraphs, details } = program

  // A topic list earns an icon per entry; a list of goals has nothing an icon
  // could honestly say, so it takes the numbered card من نحن uses for أهدافنا.
  const items = details?.items
  const numbered = !!items && !items.some((it) => topicIcon(it))

  return (
    <div className="text-center">
      <div>
        <h3 className="text-2xl font-black text-ink">{title}</h3>
        {/* The English name sits under the Arabic one, so the Arabic keeps the
            centre line to itself. */}
        {titleEn && (
          <span dir="ltr" className="mt-1 block text-sm font-bold text-secondary-dark">
            {titleEn}
          </span>
        )}
      </div>

      {meta && meta.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {meta.map((m) => (
            <span
              key={m.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary-soft px-3 py-1 text-xs font-bold text-secondary-dark"
            >
              <span className="font-semibold text-label">{m.label}</span>
              {m.value}
            </span>
          ))}
        </div>
      )}

      {/* The program's own description, in the card the rest of the site uses
          for a statement: white, hairline border, orange top rule. */}
      <div className="mx-auto mt-5 max-w-3xl space-y-3 rounded-2xl border border-secondary-line border-t-4 border-t-secondary bg-white p-6 shadow-card sm:p-7">
        {paragraphs.map((para) => (
          <p key={para} className="leading-loose text-body">
            {para}
          </p>
        ))}
      </div>

      {details && (
        <div className="mt-6 border-t border-line pt-5">
          <h4 className="mb-4 font-bold text-ink">{details.heading}</h4>

          {items && numbered && (
            // Same card as أهدافنا الأساسية on من نحن: numbered chip, orange
            // top rule, statement below it.
            <ul className="mx-auto grid max-w-5xl gap-5 sm:gap-6 md:grid-cols-3">
              {items.map((it, i) => (
                <li
                  key={it}
                  className={`flex flex-col rounded-2xl border border-secondary-line border-t-4 border-t-secondary bg-white p-6 shadow-card sm:p-7 ${
                    items.length % 3 === 1 && i === items.length - 1
                      ? 'md:col-span-3 md:w-[calc((100%-3rem)/3)] md:justify-self-center'
                      : ''
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-full bg-secondary-soft text-base font-black text-secondary-dark"
                  >
                    {toArabicNumeral(i + 1)}
                  </span>
                  <p className="mt-4 text-start leading-loose text-body">{it}</p>
                </li>
              ))}
            </ul>
          )}

          {items && !numbered && (
            <ul className="mx-auto grid max-w-3xl gap-2.5 sm:grid-cols-2">
              {items.map((it, i) => {
                const Icon = topicIcon(it)
                return (
                  <li
                    key={it}
                    className={`flex items-center justify-center gap-2.5 rounded-xl border border-secondary-line bg-white p-3.5 shadow-card ${
                      // A last row holding one card centres under the pair above.
                      items.length % 2 === 1 && i === items.length - 1
                        ? 'sm:col-span-2 sm:w-[calc((100%-0.625rem)/2)] sm:justify-self-center'
                        : ''
                    }`}
                  >
                    {Icon && (
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary-soft text-secondary-dark">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                    )}
                    {/* Start-aligned so a topic that wraps keeps one edge. */}
                    <span className="text-start text-sm font-semibold leading-relaxed text-body">
                      {it}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}

          {details.namedItems && (
            <ul className="mx-auto grid max-w-3xl gap-2.5 sm:grid-cols-2">
              {details.namedItems.map((it) => {
                const Icon = topicIcon(it.title)
                return (
                  <li
                    key={it.title}
                    className="rounded-xl border border-secondary-line bg-white p-5 shadow-card"
                  >
                    <div className="flex items-center justify-center gap-2.5">
                      {Icon && (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary-soft text-secondary-dark">
                          <Icon size={17} aria-hidden="true" />
                        </span>
                      )}
                      <p className="text-start font-bold text-ink">{it.title}</p>
                    </div>
                    <p className="mt-3 leading-relaxed text-body">{it.body}</p>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
