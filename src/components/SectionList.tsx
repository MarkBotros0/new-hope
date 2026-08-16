import { Section } from './Section'
import type { Block } from './sectionBlocks'

/** Render a complete list of bands. Every band shares the page background —
 *  the cards inside them, not a tinted field, are what separate one from the
 *  next. */
export function SectionList({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => (
        <Section
          key={block.key}
          id={block.id}
          title={block.title}
          lead={block.lead}
          density={block.density}
          className={block.id ? 'scroll-anchor' : undefined}
        >
          {block.content}
        </Section>
      ))}
    </>
  )
}
