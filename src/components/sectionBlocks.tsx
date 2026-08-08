import type { ReactNode } from 'react'
import { StatsCard } from './StatsCard'
import { PrinciplesCard } from './PrinciplesCard'
import { ServicesCard } from './ServicesCard'
import { AudienceCard } from './AudienceCard'
import { ServantsCard } from './ServantsCard'
import { ProgramTabs } from './ProgramTabs'
import { ArchiveGallery } from './ArchiveGallery'
import type { MinistrySection } from '../data/ministries'

export interface Block {
  key: string
  eyebrow?: string
  content?: ReactNode
}

/** Turn one ministry section's fields into an ordered list of page-section
 *  blocks. Shared by the flat (single-ministry) and tabbed (sub-ministry)
 *  layouts. The intro/title are handled by the caller. */
export function buildBlocks(
  section: MinistrySection,
  idx: number,
  opts: { includeVision?: boolean } = {},
): Block[] {
  const { includeVision = true } = opts
  const p = `s${idx}`
  const blocks: Block[] = []

  if (section.stats?.length) {
    blocks.push({ key: `${p}-stats`, content: <StatsCard stats={section.stats} /> })
  }

  if (includeVision && section.vision) {
    blocks.push({
      key: `${p}-vision`,
      eyebrow: 'رؤيتنا',
      content: (
        <p className="max-w-4xl text-2xl font-bold leading-relaxed text-ink sm:text-3xl">
          {section.vision}
        </p>
      ),
    })
  }

  if (section.mission) {
    blocks.push({
      key: `${p}-mission`,
      eyebrow: 'المهمة',
      content: (
        <p className="max-w-4xl text-xl font-bold leading-relaxed text-ink sm:text-2xl">
          {section.mission}
        </p>
      ),
    })
  }

  if (section.principles?.length) {
    blocks.push({
      key: `${p}-principles`,
      eyebrow: 'مبادئنا الأساسية',
      content: <PrinciplesCard principles={section.principles} />,
    })
  }

  section.programGroups?.forEach((group, gi) => {
    blocks.push({
      key: `${p}-pg${gi}`,
      eyebrow: group.heading,
      content: <ProgramTabs programs={group.programs} />,
    })
  })

  if (section.services) {
    blocks.push({
      key: `${p}-services`,
      eyebrow: section.services.label,
      content: <ServicesCard items={section.services.items} />,
    })
  }

  if (section.audience) {
    blocks.push({
      key: `${p}-audience`,
      eyebrow: section.audience.label,
      content: <AudienceCard items={section.audience.items} />,
    })
  }

  const hasTeam = (section.servants?.length ?? 0) > 0 || Boolean(section.teamNote)
  if (hasTeam) {
    blocks.push({
      key: `${p}-team`,
      eyebrow: 'أعضاء الفريق',
      content: (
        <ServantsCard servants={section.servants ?? []} note={section.teamNote} />
      ),
    })
  }

  if (section.archiveSlots) {
    blocks.push({
      key: `${p}-archive`,
      eyebrow: 'من أرشيف الخدمة والفعاليات',
      content: <ArchiveGallery count={section.archiveSlots} />,
    })
  }

  return blocks
}
