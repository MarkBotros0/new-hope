import { ServiceHero } from './ServiceHero'
import { SectionList } from './SectionList'
import { SubMinistryTabs } from './SubMinistryTabs'
import { buildBlocks, buildContactBlock } from './sectionBlocks'
import { sectionIndex, type Ministry, type MinistrySection } from '../data/ministries'

/** Where the hero's primary call to action should jump — always real content
 *  in the section on show, never the pending contact block. */
function primaryTarget(section: MinistrySection): string {
  if (section.programGroups?.length) return '#programs'
  if (section.services) return '#services'
  return '#contact'
}

export function MinistryLayout({
  ministry,
  sub,
}: {
  ministry: Ministry
  /** Active sub-ministry slug from the URL (multi-section pages only). */
  sub?: string
}) {
  const multi = ministry.sections.length > 1
  const shown = ministry.sections[sectionIndex(ministry, sub)]
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
          photo={ministry.heroPhoto}
          actions={[
            { label: 'تعرّف على الخدمة', href: primaryTarget(shown) },
            { label: 'تواصل معنا', href: '#contact', variant: 'outline' },
          ]}
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
