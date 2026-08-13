import { useId, useState } from 'react'
import { ProgramCard } from './ProgramCard'
import { TabStrip } from './TabStrip'
import { panelId, tabId } from './tabIds'
import type { Program } from '../data/ministries'

/** Interactive tabbed view of a program group — pick a program to reveal it. */
export function ProgramTabs({ programs }: { programs: Program[] }) {
  const [active, setActive] = useState(0)
  const prefix = `programs${useId()}`

  return (
    <div>
      <TabStrip
        labels={programs.map((p) => p.title)}
        active={active}
        onChange={setActive}
        idPrefix={prefix}
        scrollable
      />

      <div
        id={panelId(prefix, active)}
        role="tabpanel"
        aria-labelledby={tabId(prefix, active)}
        tabIndex={0}
        className="mt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark focus-visible:ring-offset-4 [animation:fadeIn_0.35s_ease]"
      >
        <ProgramCard program={programs[active]} />
      </div>
    </div>
  )
}
