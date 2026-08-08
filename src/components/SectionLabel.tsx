import type { ReactNode } from 'react'

/** Section eyebrow (e.g. "الرؤية") as a soft rounded badge — a modern, friendly
 *  chip in the brand's orange tint. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-3 inline-flex w-fit items-center rounded-full bg-secondary/10 px-3 py-1 text-sm font-bold text-secondary-dark">
      {children}
    </span>
  )
}
