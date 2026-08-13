import { useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionList } from './SectionList'
import { TabStrip } from './TabStrip'
import { panelId, tabId } from './tabIds'
import { buildBlocks, buildContactBlock, type Block } from './sectionBlocks'
import { sectionIndex, sectionPath, type Ministry } from '../data/ministries'

interface SubMinistryTabsProps {
  ministry: Ministry
  /** Sub-ministry slug from the URL; unknown values fall back to the first. */
  sub?: string
}

/** Switch between the sub-ministries of a page (e.g. the three Sudanese
 *  ministries) via a sticky tab bar. The active tab lives in the URL, so every
 *  sub-ministry is linkable from the nav and survives a reload or a share. */
export function SubMinistryTabs({ ministry, sub }: SubMinistryTabsProps) {
  const navigate = useNavigate()
  const prefix = `sub${useId()}`
  const { sections } = ministry
  const active = sectionIndex(ministry, sub)
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
      <div className="sticky top-[var(--header-h)] z-10 border-y border-secondary-line bg-secondary-soft/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <TabStrip
            labels={sections.map((s) => s.tabLabel ?? s.heading ?? '')}
            active={active}
            onChange={(index) => navigate(sectionPath(ministry, sections[index]))}
            idPrefix={prefix}
            scrollable
          />
        </div>
      </div>

      <div
        // Keyed so switching sub-ministries replays the entrance animation.
        key={section.slug ?? active}
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
