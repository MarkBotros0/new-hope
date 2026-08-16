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
  /** Show the English name under the Arabic one. Both callers currently pass
   *  false — the client wants the Arabic to stand alone — but `titleEn` is
   *  still carried in the data, so this stays a switch rather than a deletion. */
  englishTitles?: boolean
}

/** A numbered set of named statements — the pillars the work rests on, the
 *  values it is held to. An ordered list, because the client numbers them. */
export function TenetCards({
  items,
  columns = 2,
  englishTitles = true,
}: TenetCardsProps) {
  const grid = columns === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2'

  // A last row left holding one card sits against the start edge with an empty
  // cell beside it. Let that card span the row and take a single column's width
  // back (the row minus its gaps, divided by the column count), so it centres
  // under the pairs above instead of hanging off one side.
  const lastIsAlone = items.length % columns === 1
  const centreOrphan =
    columns === 3
      ? 'md:col-span-3 md:w-[calc((100%-3rem)/3)] md:justify-self-center'
      : 'sm:col-span-2 sm:w-[calc((100%-1.5rem)/2)] sm:justify-self-center'

  return (
    <ol className={`grid gap-5 sm:gap-6 ${grid}`}>
      {items.map((item, i) => (
        <li
          key={item.title}
          className={`flex flex-col rounded-2xl border border-secondary-line border-t-4 border-t-secondary bg-white p-6 shadow-card sm:p-7 ${
            lastIsAlone && i === items.length - 1 ? centreOrphan : ''
          }`}
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
              {englishTitles && (
                <p className="mt-0.5 text-sm font-semibold text-muted">
                  <bdi>{item.titleEn}</bdi>
                </p>
              )}
            </div>
          </div>
          <p className="mt-4 leading-loose text-body">{item.body}</p>
        </li>
      ))}
    </ol>
  )
}
