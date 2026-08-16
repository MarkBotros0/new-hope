import { useEffect } from 'react'
import { Section } from '../components/Section'
import { TenetCards } from '../components/TenetCards'
import { about } from '../data/ministries'

/** The card chrome the أهدافنا and قيمنا cards use (see `TenetCards`), so the
 *  vision and mission bands sit in the same family instead of introducing a
 *  second card style on one page. */
const aboutCard =
  'rounded-2xl border border-secondary-line border-t-4 border-t-secondary bg-white p-6 shadow-card sm:p-7'

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

      {/* Both cards wear the same chrome as the أهدافنا and قيمنا cards below —
          white, orange top rule, same radius and padding — so the page reads as
          one set of cards rather than three card styles. Only the type inside
          differs, because a one-line statement and three paragraphs of prose
          are not the same kind of content. */}
      <Section title="رؤيتنا">
        <div className={aboutCard + ' text-center'}>
          <p className="text-lg leading-[1.9] text-ink sm:text-xl">
            {about.vision}
          </p>
        </div>
      </Section>

      <Section title="مهمتنا">
        <div className={aboutCard}>
          <div className="mx-auto max-w-4xl space-y-4">
            {about.mission.map((paragraph) => (
              <p key={paragraph} className="leading-loose text-body">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section id="pillars" className="scroll-anchor" title="أهدافنا الأساسية">
        <TenetCards items={about.pillars} columns={3} />
      </Section>

      <Section id="values" className="scroll-anchor" title="قيمنا الأساسية">
        <TenetCards items={about.values} columns={2} englishTitles={false} />
      </Section>
    </main>
  )
}
