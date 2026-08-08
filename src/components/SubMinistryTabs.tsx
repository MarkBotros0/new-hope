import { useState } from 'react'
import { Section } from './Section'
import { SectionLabel } from './SectionLabel'
import { buildBlocks, type Block } from './sectionBlocks'
import type { MinistrySection } from '../data/ministries'

/** Switch between the sub-ministries of a page (e.g. the two Sudanese
 *  ministries) via a sticky tab bar, so every sub-ministry is discoverable.
 *  The active sub-ministry's description leads with its vision. */
export function SubMinistryTabs({ sections }: { sections: MinistrySection[] }) {
  const [active, setActive] = useState(0)
  const section = sections[active]

  const lead: Block = {
    key: 'lead',
    content: (
      <div>
        <h2 className="text-2xl font-black text-ink sm:text-3xl">{section.heading}</h2>
        {section.intro && section.intro.length > 0 && (
          <div className="mt-4 max-w-3xl space-y-4">
            {section.intro.map((t) => (
              <p key={t} className="text-lg leading-loose text-body">
                {t}
              </p>
            ))}
          </div>
        )}
        {section.vision && (
          <div className="mt-8">
            <SectionLabel>رؤيتنا</SectionLabel>
            <p className="max-w-3xl text-xl font-bold leading-relaxed text-ink sm:text-2xl">
              {section.vision}
            </p>
          </div>
        )}
      </div>
    ),
  }

  const blocks = [lead, ...buildBlocks(section, active, { includeVision: false })]

  return (
    <>
      <div className="sticky top-16 z-10 border-y border-line bg-page/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2.5 px-4 py-3 sm:px-6">
          {sections.map((s, i) => (
            <button
              key={s.heading}
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                i === active
                  ? 'bg-brand text-white shadow-sm'
                  : 'border border-line bg-white text-body hover:border-brand hover:text-brand'
              }`}
            >
              {s.tabLabel ?? s.heading}
            </button>
          ))}
        </div>
      </div>

      <div key={active} className="[animation:fadeIn_0.35s_ease]">
        {blocks.map((b, i) => (
          <Section key={b.key} eyebrow={b.eyebrow} tone={i % 2 === 0 ? 'tint' : 'white'}>
            {b.content}
          </Section>
        ))}
      </div>
    </>
  )
}
