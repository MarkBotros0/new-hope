import { ServiceHero } from './ServiceHero'
import { SectionList } from './SectionList'
import { SubMinistryTabs } from './SubMinistryTabs'
import { buildBlocks } from './sectionBlocks'
import type { Ministry } from '../data/ministries'

export function MinistryLayout({
  ministry,
  sub,
}: {
  ministry: Ministry
  /** Active sub-ministry slug from the URL (multi-section pages only). */
  sub?: string
}) {
  const multi = ministry.sections.length > 1
  const flatBlocks = multi ? [] : buildBlocks(ministry.sections[0])

  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8">
        <ServiceHero
          eyebrow={ministry.eyebrow}
          title={ministry.title}
          description={ministry.description}
          photo={ministry.heroPhoto}
        />
      </div>

      {multi ? (
        <SubMinistryTabs ministry={ministry} sub={sub} />
      ) : (
        <SectionList blocks={flatBlocks} />
      )}
    </main>
  )
}
