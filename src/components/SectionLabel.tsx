import type { ReactNode } from 'react'

/** Section eyebrow (e.g. "الرؤية") as a rounded badge in the vivid logo orange.
 *  Ink-on-orange rather than white-on-orange — the only pairing that clears AA
 *  at this weight (5.5:1). */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-3 inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-sm font-bold text-ink">
      {children}
    </span>
  )
}
