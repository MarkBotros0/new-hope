import { ServiceHero } from './ServiceHero'
import { SectionList } from './SectionList'
import { SubMinistryTabs } from './SubMinistryTabs'
import { buildBlocks, buildContactBlock } from './sectionBlocks'
import type { Ministry } from '../data/ministries'

/** Where the hero's primary call to action should jump — always real content,
 *  never the pending contact block. */
function primaryTarget(ministry: Ministry): string {
  const first = ministry.sections[0]
  if (first.programGroups?.length) return '#programs'
  if (first.services) return '#services'
  return '#contact'
}

export function MinistryLayout({ ministry }: { ministry: Ministry }) {
  const multi = ministry.sections.length > 1
  const flatBlocks = multi
    ? []
    : [...buildBlocks(ministry.sections[0]), buildContactBlock()]

  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8">
        <ServiceHero
          eyebrow={ministry.eyebrow}
          title={ministry.title}
          description={ministry.description}
          actions={[
            { label: 'تعرّف على الخدمة', href: primaryTarget(ministry) },
            { label: 'تواصل معنا', href: '#contact', variant: 'outline' },
          ]}
        />
      </div>

      {multi ? (
        <SubMinistryTabs sections={ministry.sections} />
      ) : (
        <SectionList blocks={flatBlocks} />
      )}
    </main>
  )
}
