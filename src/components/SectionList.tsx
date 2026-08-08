import { Section } from './Section'
import type { Block } from './sectionBlocks'

/** Render a complete list of bands, alternating tone across the whole list so
 *  two adjacent bands can never share a background. */
export function SectionList({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Section
          key={block.key}
          id={block.id}
          title={block.title}
          lead={block.lead}
          density={block.density}
          tone={i % 2 === 0 ? 'tint' : 'white'}
          className={block.id ? 'scroll-anchor' : undefined}
        >
          {block.content}
        </Section>
      ))}
    </>
  )
}
