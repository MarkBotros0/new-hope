import type { ReactNode } from 'react'

/** Section eyebrow (e.g. "الرؤية") as a soft badge. Deliberately quieter than
 *  the <h2> it introduces — a vivid fill here outweighed its own heading. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-3 inline-flex w-fit items-center rounded-full bg-secondary-soft px-3 py-1 text-sm font-bold text-secondary-dark">
      {children}
    </span>
  )
}
