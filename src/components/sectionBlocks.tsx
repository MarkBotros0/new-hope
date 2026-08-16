import type { ReactNode } from 'react'
import { StatsCard } from './StatsCard'
import { ServicesCard } from './ServicesCard'
import { AudienceCard } from './AudienceCard'
import { ProgramTabs } from './ProgramTabs'
import { PurposeSection } from './PurposeSection'
import type { MinistrySection } from '../data/ministries'

export interface Block {
  key: string
  id?: string
  title?: string
  lead?: string
  density?: 'tight' | 'normal'
  content?: ReactNode
}

/** Turn one ministry section's fields into an ordered list of page bands.
 *  Shared by the flat (single-ministry) and tabbed (sub-ministry) layouts. */
export function buildBlocks(
  section: MinistrySection,
  opts: { includePurpose?: boolean } = {},
): Block[] {
  const { includePurpose = true } = opts
  const blocks: Block[] = []

  // The vision leads: what the service is for, before any count of what it
  // has done. Vision only — the مهمة panel is not shown on the service pages.
  if (includePurpose && section.vision) {
    blocks.push({
      key: 'purpose',
      title: 'رؤيتنا',
      content: <PurposeSection vision={section.vision} />,
    })
  }

  if (section.stats?.length) {
    blocks.push({ key: 'stats', density: 'tight', content: <StatsCard stats={section.stats} /> })
  }

  if (section.goals) {
    blocks.push({
      key: 'goals',
      title: section.goals.label,
      lead: section.goals.lead,
      content: <ServicesCard items={section.goals.items} />,
    })
  }

  section.programGroups?.forEach((group, gi) => {
    blocks.push({
      key: `pg${gi}`,
      id: gi === 0 ? 'programs' : undefined,
      title: group.heading,
      content: <ProgramTabs programs={group.programs} />,
    })
  })

  if (section.services) {
    blocks.push({
      key: 'services',
      id: 'services',
      title: section.services.label,
      content: <ServicesCard items={section.services.items} />,
    })
  }

  if (section.audience) {
    blocks.push({
      key: 'audience',
      title: section.audience.label,
      lead: section.audience.lead,
      density: 'tight',
      content: <AudienceCard items={section.audience.items} />,
    })
  }

  return blocks
}
