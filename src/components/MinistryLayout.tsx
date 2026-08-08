import { ServiceHero } from './ServiceHero'
import { Section } from './Section'
import { SubMinistryTabs } from './SubMinistryTabs'
import { buildBlocks } from './sectionBlocks'
import { PENDING, type Ministry } from '../data/ministries'

export function MinistryLayout({ ministry }: { ministry: Ministry }) {
  const multi = ministry.sections.length > 1
  const flatBlocks = multi ? [] : buildBlocks(ministry.sections[0], 0)

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8">
        <ServiceHero
          eyebrow={ministry.eyebrow}
          title={ministry.title}
          description={ministry.description}
          actions={[
            { label: 'تواصل معنا', href: '#contact' },
            { label: 'كيف تصل إلينا', href: '#directions', variant: 'outline' },
          ]}
        />
      </div>

      {multi ? (
        <SubMinistryTabs sections={ministry.sections} />
      ) : (
        flatBlocks.map((block, i) => (
          <Section
            key={block.key}
            eyebrow={block.eyebrow}
            tone={i % 2 === 0 ? 'tint' : 'white'}
          >
            {block.content}
          </Section>
        ))
      )}

      {/* Contact & directions — not yet provided by the client. */}
      <Section eyebrow="للتواصل" tone="white" className="border-t border-line">
        <div className="grid gap-8 text-center sm:grid-cols-2 sm:text-start">
          <div id="contact">
            <h3 className="text-lg font-bold text-ink">تواصل معنا</h3>
            <p className="mt-2 font-bold tracking-wide text-body/60">{PENDING}</p>
          </div>
          <div id="directions">
            <h3 className="text-lg font-bold text-ink">كيف تصل إلينا</h3>
            <p className="mt-2 font-bold tracking-wide text-body/60">{PENDING}</p>
          </div>
        </div>
      </Section>
    </main>
  )
}
