import { useEffect } from 'react'
import { Section } from '../components/Section'
import { ServicesPuzzle } from '../components/ServicesPuzzle'
import { TenetCards } from '../components/TenetCards'
import { about } from '../data/ministries'

/** A labelled row inside the vision/mission spread: the label takes a narrow
 *  fixed column and the text the rest, so both rows share one label edge. The
 *  columns only split from `md` — below that the label stacks above its text,
 *  where a 9rem column would leave the prose nothing to sit in. */
const aboutRow = 'grid gap-4 p-6 sm:p-8 md:grid-cols-[9rem_1fr] md:gap-10 md:p-10'

/** من نحن — the organisation's own statement of itself: vision, mission, and
 *  the seven values it is held to. Every line is the client's own text (see
 *  `about` in `data/ministries`). */
export function AboutPage() {
  useEffect(() => {
    document.title = 'من نحن — أمل جديد'
  }, [])

  return (
    <main id="main">
      {/* Full-bleed banner, flush under the header: the ministries as the
          pieces of one puzzle. It carries no heading of its own — the picture
          is the statement, and the page's title follows on the page field
          below it. Capped at 90rem so the pieces never grow past a banner's
          height on a wide monitor; the rule underneath still runs edge to
          edge. */}
      <div className="border-b border-secondary-line">
        <div className="mx-auto max-w-[90rem]">
          <ServicesPuzzle />
        </div>
      </div>

      {/* The banner is the whole opening now. The page still needs to say what
          it is to screen readers and to search — the heading is kept, just not
          drawn. */}
      <h1 className="sr-only">من نحن</h1>

      {/* One spread, two labelled rows, rather than two stacked boxes. The
          label sits in its own narrow column with the text beside it, so the
          vision paragraph and the two-paragraph mission each fill their row
          instead of leaving a box mostly empty, and the pair reads as one
          statement of purpose with two parts. Chrome matches the قيمنا cards
          below. */}
      <Section title="رؤيتنا ومهمتنا">
        <div className="overflow-hidden rounded-2xl border border-secondary-line border-t-4 border-t-secondary bg-white shadow-card">
          <div className={aboutRow}>
            <div>
              <h3 className="text-lg font-black text-ink">رؤيتنا</h3>
              <span className="mt-2 block h-1 w-10 rounded-full bg-secondary" />
            </div>
            {/* The vision outranks the mission prose on size, not on weight —
                it is the aspiration the rest of the page answers to. One step
                up rather than two: at a full paragraph, 2xl set four heavy
                lines that shouted over the mission instead of leading it. */}
            <p className="text-lg leading-[1.9] text-ink sm:text-xl sm:leading-[1.8]">
              {about.vision}
            </p>
          </div>

          <div className={`border-t border-secondary-line ${aboutRow}`}>
            <div>
              <h3 className="text-lg font-black text-ink">مهمتنا</h3>
              <span className="mt-2 block h-1 w-10 rounded-full bg-secondary" />
            </div>
            <div className="space-y-4">
              {about.mission.map((paragraph) => (
                <p key={paragraph} className="leading-loose text-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="values" className="scroll-anchor" title="قيمنا الأساسية">
        <TenetCards items={about.values} columns={2} englishTitles={false} />
      </Section>
    </main>
  )
}
