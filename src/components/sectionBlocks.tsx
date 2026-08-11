import type { ReactNode } from 'react'
import { StatsCard } from './StatsCard'
import { PrinciplesCard } from './PrinciplesCard'
import { ServicesCard } from './ServicesCard'
import { AudienceCard } from './AudienceCard'
import { ServantsCard } from './ServantsCard'
import { ProgramTabs } from './ProgramTabs'
import { ArchiveGallery } from './ArchiveGallery'
import { PurposeSection } from './PurposeSection'
import { Pending } from './Pending'
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

  if (section.stats?.length) {
    blocks.push({ key: 'stats', density: 'tight', content: <StatsCard stats={section.stats} /> })
  }

  if (includePurpose && (section.vision || section.mission)) {
    blocks.push({
      key: 'purpose',
      title: section.mission ? 'رؤيتنا ومهمتنا' : 'رؤيتنا',
      content: <PurposeSection vision={section.vision} mission={section.mission} />,
    })
  }

  if (section.goals) {
    blocks.push({
      key: 'goals',
      title: section.goals.label,
      lead: section.goals.lead,
      content: <ServicesCard items={section.goals.items} />,
    })
  }

  if (section.principles?.length) {
    blocks.push({
      key: 'principles',
      title: 'مبادئنا الأساسية',
      content: <PrinciplesCard principles={section.principles} />,
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

  const namedServants = (section.servants?.length ?? 0) > 0
  if (namedServants || section.teamNote) {
    blocks.push({
      key: 'team',
      // Without named portraits the band describes the team, not its members.
      title: namedServants ? 'أعضاء الفريق' : 'فريق الخدمة',
      content: <ServantsCard servants={section.servants ?? []} note={section.teamNote} />,
    })
  }

  if (section.archiveSlots || section.archive?.length) {
    blocks.push({
      key: 'archive',
      title: 'من أرشيف الخدمة والفعاليات',
      content: (
        <ArchiveGallery count={section.archiveSlots ?? 0} photos={section.archive} />
      ),
    })
  }

  return blocks
}

/** Contact and directions. The document supplies neither yet, so both are
 *  shown as explicit pending fields rather than invented values. */
export function buildContactBlock(): Block {
  return {
    key: 'contact',
    title: 'للتواصل',
    density: 'tight',
    content: (
      <div className="grid gap-6 sm:grid-cols-2">
        {[
          { id: 'contact', heading: 'تواصل معنا' },
          { id: 'directions', heading: 'كيف تصل إلينا' },
        ].map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="scroll-anchor rounded-2xl border border-line bg-white p-6"
          >
            <h3 className="text-lg font-bold text-ink">{item.heading}</h3>
            <Pending className="mt-3" />
          </div>
        ))}
      </div>
    ),
  }
}
