import { useEffect } from 'react'
import { Section } from '../components/Section'
import { TenetCards } from '../components/TenetCards'
import { about } from '../data/ministries'

/** A labelled row inside the vision/mission spread: the label takes a narrow
 *  fixed column and the text the rest, so both rows share one label edge. The
 *  columns only split from `md` — below that the label stacks above its text,
 *  where a 9rem column would leave the prose nothing to sit in. */
const aboutRow = 'grid gap-4 p-6 sm:p-8 md:grid-cols-[9rem_1fr] md:gap-10 md:p-10'

/** من نحن — the organisation's own statement of itself: vision, mission, the
 *  three pillars the work rests on, and the seven values it is held to. Every
 *  line is the client's own text (see `about` in `data/ministries`). */
export function AboutPage() {
  useEffect(() => {
    document.title = 'من نحن — أمل جديد'
  }, [])

  return (
    <main id="main">
      {/* Full-bleed banner, flush under the header and edge to edge. It carries
          no text: the photo is the statement, and the page's own title follows
          on the page field below it rather than fighting a scrim. */}
      {/* Taller than the photo's own 2.83:1 would give at this width. `object-
          cover` scales it up and trims the sides rather than distorting it —
          the globe and hands sit centre frame, so the crop takes only sky. */}
      <div className="h-72 overflow-hidden border-b border-secondary-line sm:h-[26rem] lg:h-[32rem]">
        <img
          src="/about-hero.jpg"
          alt="يدان تحملان الكرة الأرضية وقد أضاءت عليها حدود مصر، وحمائم بيضاء تحلّق حولها في سماء عند الغروب"
          fetchPriority="high"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* The banner is the whole opening now. The page still needs to say what
          it is to screen readers and to search — the heading is kept, just not
          drawn. */}
      <h1 className="sr-only">من نحن</h1>

      {/* One spread, two labelled rows, rather than two stacked boxes. The
          label sits in its own narrow column with the text beside it, so a
          one-line vision and a two-paragraph mission each fill their row
          instead of leaving a box mostly empty, and the pair reads as one
          statement of purpose with two parts. Chrome matches the أهدافنا and
          قيمنا cards below. */}
      <Section title="رؤيتنا ومهمتنا">
        <div className="overflow-hidden rounded-2xl border border-secondary-line border-t-4 border-t-secondary bg-white shadow-card">
          <div className={aboutRow}>
            <div>
              <h3 className="text-lg font-black text-ink">رؤيتنا</h3>
              <span className="mt-2 block h-1 w-10 rounded-full bg-secondary" />
            </div>
            {/* The vision outranks the mission prose on size, not on weight —
                it is the aspiration the rest of the page answers to. */}
            <p className="text-xl leading-[1.9] text-ink sm:text-2xl sm:leading-[1.8]">
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

      <Section id="pillars" className="scroll-anchor" title="أهدافنا الأساسية">
        <TenetCards items={about.pillars} columns={3} englishTitles={false} />
      </Section>

      <Section id="values" className="scroll-anchor" title="قيمنا الأساسية">
        <TenetCards items={about.values} columns={2} englishTitles={false} />
      </Section>
    </main>
  )
}
