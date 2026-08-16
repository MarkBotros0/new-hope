import type { Tenet } from '../data/ministries'

/** The rest of the site writes its numbers in Arabic-Indic digits; the card
 *  numerals follow suit rather than mixing the two systems on one page. */
const arabicDigits = '٠١٢٣٤٥٦٧٨٩'
const toArabicNumeral = (n: number) =>
  String(n).replace(/\d/g, (d) => arabicDigits[Number(d)])

interface TenetCardsProps {
  items: Tenet[]
  /** Cards per row on a wide screen. Three columns hold each card to a
   *  comfortable line length for the longer statements, so they only split
   *  from `md`; two columns are roomy enough to split at `sm`. */
  columns?: 2 | 3
}

/** A numbered set of named statements — the pillars the work rests on, the
 *  values it is held to. An ordered list, because the client numbers them. */
export function TenetCards({ items, columns = 2 }: TenetCardsProps) {
  const grid = columns === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2'

  return (
    <ol className={`grid gap-5 sm:gap-6 ${grid}`}>
      {items.map((item, i) => (
        <li
          key={item.title}
          className="flex flex-col rounded-2xl border border-secondary-line border-t-4 border-t-secondary bg-white p-6 shadow-card sm:p-7"
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-soft text-base font-black text-secondary-dark"
            >
              {toArabicNumeral(i + 1)}
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-black leading-snug text-ink">{item.title}</h3>
              <p className="mt-0.5 text-sm font-semibold text-muted">
                <bdi>{item.titleEn}</bdi>
              </p>
            </div>
          </div>
          <p className="mt-4 leading-loose text-body">{item.body}</p>
        </li>
      ))}
    </ol>
  )
}
