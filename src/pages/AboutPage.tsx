import { useEffect } from 'react'
import { Section } from '../components/Section'
import { ServicesPuzzle } from '../components/ServicesPuzzle'
import { TenetCards } from '../components/TenetCards'
import { ProgramTabs } from '../components/ProgramTabs'
import { about, type Program } from '../data/ministries'

/** The statement card the rest of the site uses: white, hairline border,
 *  orange top rule. */
const card =
  'rounded-2xl border border-secondary-line border-t-4 border-t-secondary bg-white shadow-card'

/** A labelled row inside the vision/mission spread: the label takes a narrow
 *  fixed column and the text the rest, so both rows share one label edge. The
 *  columns only split from `md` — below that the label stacks above its text,
 *  where a 9rem column would leave the prose nothing to sit in. */
const aboutRow = 'grid gap-4 p-6 sm:p-8 md:grid-cols-[9rem_1fr] md:gap-10 md:p-10'

function RowLabel({ children }: { children: string }) {
  return (
    <div>
      <h3 className="text-lg font-black text-ink">{children}</h3>
      <span className="mt-2 block h-1 w-10 rounded-full bg-secondary" />
    </div>
  )
}

/** The page's sections, in reading order, for the jump bar under the banner. */
const jumpLinks = [
  { id: 'who', label: 'من نحن؟' },
  { id: 'vision', label: 'رؤيتنا ورسالتنا' },
  { id: 'pillars', label: 'ركائز عملنا' },
  { id: 'values', label: 'قيمنا' },
  { id: 'leadership', label: 'القيادة' },
  { id: 'reach', label: 'نطاق العمل' },
  { id: 'services', label: 'خدماتنا وبرامجنا' },
]

/** The services in the shape the service pages' program tabs take: titled
 *  areas become named entries, untitled ones a plain list. */
const servicePrograms: Program[] = about.services.map((service) => {
  const named = service.areas?.every((area) => area.title)
  return {
    title: service.title,
    paragraphs: service.paragraphs,
    closing: service.closing,
    details: service.areas && {
      heading: 'وتشمل مجالات العمل',
      ...(named
        ? { namedItems: service.areas.map((area) => ({ title: area.title ?? '', body: area.body })) }
        : { items: service.areas.map((area) => area.body) }),
    },
  }
})

/** من نحن — the organisation's own statement of itself, section for section
 *  in the order of the client's document (see `about` in `data/ministries`). */
export function AboutPage() {
  useEffect(() => {
    document.title = 'من نحن — أمل جديد'
  }, [])

  return (
    <main id="main">
      {/* Full-bleed banner, flush under the header: the ministries as the
          pieces of one puzzle. Capped at 90rem so the pieces never grow past a
          banner's height on a wide monitor; the rule underneath still runs
          edge to edge. */}
      <div className="border-b border-secondary-line">
        <div className="mx-auto max-w-[90rem]">
          <ServicesPuzzle />
        </div>
      </div>

      <h1 className="sr-only">من نحن</h1>

      {/* A long page: a row of links to each section. It scrolls sideways on
          a phone rather than wrapping into a block that pushes the content
          down. */}
      <nav aria-label="أقسام الصفحة" className="border-b border-secondary-line bg-white">
        <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:justify-center sm:px-6">
          {jumpLinks.map((link) => (
            <li key={link.id} className="shrink-0">
              <a
                href={`#${link.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-secondary-line px-4 text-sm font-bold text-label transition-colors hover:border-secondary hover:bg-secondary-soft hover:text-secondary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-dark"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="who" className="scroll-anchor" title="من نحن؟">
        <div className={`mx-auto max-w-4xl space-y-4 p-6 sm:p-8 md:p-10 ${card}`}>
          {about.intro.map((paragraph, i) => (
            <p
              key={paragraph}
              className={
                i === 0
                  ? 'text-lg leading-[1.9] text-ink sm:text-xl sm:leading-[1.8]'
                  : 'leading-loose text-body'
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {/* One spread, two labelled rows: the vision and the mission read as
          one statement of purpose with two parts. */}
      <Section id="vision" className="scroll-anchor" title="رؤيتنا ورسالتنا">
        <div className={`overflow-hidden ${card}`}>
          <div className={aboutRow}>
            <RowLabel>رؤيتنا</RowLabel>
            <p className="text-lg leading-[1.9] text-ink sm:text-xl sm:leading-[1.8]">
              {about.vision}
            </p>
          </div>
          <div className={`border-t border-secondary-line ${aboutRow}`}>
            <RowLabel>رسالتنا</RowLabel>
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

      <Section id="pillars" className="scroll-anchor" title="ركائز عملنا">
        <TenetCards items={about.pillars} columns={3} englishTitles={false} />
      </Section>

      <Section id="values" className="scroll-anchor" title="قيمنا">
        <TenetCards items={about.values} columns={2} englishTitles={false} />
      </Section>

      {/* Two short statements: side by side on a wide screen, so neither
          leaves a full-width band mostly empty. */}
      <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
        <Section id="leadership" className="scroll-anchor flex flex-col [&>div]:flex [&>div]:w-full [&>div]:flex-1 [&>div]:flex-col" title="القيادة والمسؤولية">
          <div className={`flex-1 space-y-5 p-6 sm:p-8 ${card}`}>
            <p className="leading-loose text-body">{about.leadership.intro}</p>
            <div>
              <p className="font-bold text-label">{about.leadership.leadIn}</p>
              <ul className="mt-3 space-y-3">
                {about.leadership.leaders.map((leader) => (
                  <li
                    key={leader.name}
                    className="rounded-xl border-s-4 border-secondary bg-secondary-soft px-5 py-4"
                  >
                    <p className="text-xl font-black text-ink">{leader.name}</p>
                    <p className="mt-1 text-sm font-bold text-secondary-dark">{leader.role}</p>
                  </li>
                ))}
              </ul>
            </div>
            <p className="leading-loose text-body">{about.leadership.closing}</p>
          </div>
        </Section>

        <Section id="reach" className="scroll-anchor flex flex-col [&>div]:flex [&>div]:w-full [&>div]:flex-1 [&>div]:flex-col" title="نطاق العمل الجغرافي">
          <div className={`flex-1 space-y-5 p-6 sm:p-8 ${card}`}>
            <p className="leading-loose text-body">{about.reach.intro}</p>
            <ul className="flex flex-wrap gap-2.5">
              {about.reach.governorates.map((name) => (
                <li
                  key={name}
                  className="rounded-full bg-secondary-soft px-4 py-1.5 font-bold text-secondary-dark"
                >
                  {name}
                </li>
              ))}
            </ul>
            <p className="leading-loose text-body">{about.reach.closing}</p>
          </div>
        </Section>
      </div>

      <Section id="services" className="scroll-anchor" title="خدماتنا وبرامجنا" lead={about.servicesLead}>
        {/* One service at a time, in the tabs the service pages use for
            their programs, rather than five long cards in a column. */}
        <ProgramTabs programs={servicePrograms} />
      </Section>
    </main>
  )
}
