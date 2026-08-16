import { useEffect } from 'react'
import { Eye } from 'lucide-react'
import { ServiceHero } from '../components/ServiceHero'
import { Section } from '../components/Section'
import { TenetCards } from '../components/TenetCards'
import { about, site } from '../data/ministries'

/** من نحن — the organisation's own statement of itself: vision, mission, the
 *  three pillars the work rests on, and the seven values it is held to. Every
 *  line is the client's own text (see `about` in `data/ministries`). */
export function AboutPage() {
  useEffect(() => {
    document.title = 'من نحن — أمل جديد'
  }, [])

  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8">
        <ServiceHero
          eyebrow={site.tagline}
          title="من نحن"
          actions={[
            { label: 'ركائزنا الأساسية', href: '#pillars' },
            { label: 'قيمنا الأساسية', href: '#values', variant: 'outline' },
          ]}
        />
      </div>

      {/* The vision is one sentence and carries the page — it gets its own
          band rather than sharing a row with the mission. */}
      <Section title="رؤيتنا">
        <div className="rounded-2xl border border-secondary-line bg-white p-6 shadow-card sm:p-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-soft text-secondary-dark">
            <Eye size={20} aria-hidden="true" />
          </span>
          <p className="mt-5 max-w-3xl text-xl font-bold leading-loose text-ink sm:text-2xl">
            {about.vision}
          </p>
        </div>
      </Section>

      <Section title="مهمتنا">
        <div className="max-w-3xl space-y-4">
          {about.mission.map((paragraph) => (
            <p key={paragraph} className="leading-loose text-body">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section id="pillars" className="scroll-anchor" title="ركائزنا الأساسية">
        <TenetCards items={about.pillars} columns={3} />
      </Section>

      <Section id="values" className="scroll-anchor" title="قيمنا الأساسية">
        <TenetCards items={about.values} columns={2} />
      </Section>
    </main>
  )
}
