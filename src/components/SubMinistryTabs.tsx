import { useId, useState } from 'react'
import { SectionList } from './SectionList'
import { TabStrip } from './TabStrip'
import { panelId, tabId } from './tabIds'
import { buildBlocks, buildContactBlock, type Block } from './sectionBlocks'
import type { MinistrySection } from '../data/ministries'

/** Switch between the sub-ministries of a page (e.g. the two Sudanese
 *  ministries) via a sticky tab bar, so every sub-ministry is discoverable. */
export function SubMinistryTabs({ sections }: { sections: MinistrySection[] }) {
  const [active, setActive] = useState(0)
  const prefix = `sub${useId()}`
  const section = sections[active]

  const lead: Block = {
    key: 'lead',
    title: section.heading,
    content: section.intro?.length ? (
      <div className="max-w-3xl space-y-4">
        {section.intro.map((t) => (
          <p key={t} className="text-lg leading-loose text-body">
            {t}
          </p>
        ))}
      </div>
    ) : null,
  }

  const blocks = [lead, ...buildBlocks(section), buildContactBlock()]

  return (
    // The tab bar joins the header in the sticky stack; anchors offset by both.
    <div style={{ '--tabbar-h': '4.25rem' } as React.CSSProperties}>
      <div className="sticky top-[var(--header-h)] z-10 border-y border-line bg-page/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <TabStrip
            labels={sections.map((s) => s.tabLabel ?? s.heading ?? '')}
            active={active}
            onChange={setActive}
            idPrefix={prefix}
            scrollable
          />
        </div>
      </div>

      <div
        id={panelId(prefix, active)}
        role="tabpanel"
        aria-labelledby={tabId(prefix, active)}
        tabIndex={0}
        className="focus-visible:outline-none [animation:fadeIn_0.35s_ease]"
      >
        <SectionList blocks={blocks} />
      </div>
    </div>
  )
}
