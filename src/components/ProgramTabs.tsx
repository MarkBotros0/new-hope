import { useState } from 'react'
import { ProgramCard } from './ProgramCard'
import type { Program } from '../data/ministries'

/** Interactive tabbed view of a program group — click a program to reveal it. */
export function ProgramTabs({ programs }: { programs: Program[] }) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {programs.map((program, i) => (
          <button
            key={program.title}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
              i === active
                ? 'bg-brand text-white shadow-sm'
                : 'border border-line bg-white text-body hover:border-brand hover:text-brand'
            }`}
          >
            {program.title}
          </button>
        ))}
      </div>

      <div key={active} className="mt-8 [animation:fadeIn_0.35s_ease]">
        <ProgramCard program={programs[active]} />
      </div>
    </div>
  )
}
