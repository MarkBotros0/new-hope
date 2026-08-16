import { useEffect } from 'react'
import { ServiceHero } from '../components/ServiceHero'
import { Section } from '../components/Section'
import { PrinciplesCard } from '../components/PrinciplesCard'
import { ServiceLinkCards } from '../components/ServiceLinkCards'
import { Pending } from '../components/Pending'
import { site } from '../data/ministries'

/** من نحن — the organisation at a glance.
 *
 *  Everything here is drawn from the service pages' own content. The client's
 *  documents carry no founding story or organisational profile, so that band
 *  stays an explicit PENDING placeholder rather than invented copy. */
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
          description={site.intro}
          actions={[
            { label: 'مجالات خدمتنا', href: '#areas' },
            { label: 'تواصل معنا', href: '#contact', variant: 'outline' },
          ]}
        />
      </div>

      <Section
        id="areas"
        className="scroll-anchor"
        eyebrow="مجالات الخدمة"
        title="أين نخدم"
        lead="مجالان رئيسيان، وتحت خدمة السودانيين ثلاث خدمات فرعية."
      >
        <ServiceLinkCards />
      </Section>

      <Section tone="tint" title="مبادئنا الأساسية">
        <PrinciplesCard principles={site.principles} />
      </Section>

      <Section title="نبذة عن المؤسسة" density="tight">
        <div className="max-w-3xl rounded-2xl border border-secondary-line bg-white p-6">
          <p className="leading-loose text-body">
            نبذة تعريفية عن نشأة الخدمة وهيكلها التنظيمي وشركائها — بانتظار
            النص من المؤسسة.
          </p>
          <Pending className="mt-3" />
        </div>
      </Section>

      <Section tone="tint" title="للتواصل" density="tight" id="contact" className="scroll-anchor">
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { id: 'about-contact', heading: 'تواصل معنا' },
            { id: 'about-directions', heading: 'كيف تصل إلينا' },
          ].map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-secondary-line bg-white p-6"
            >
              <h3 className="text-lg font-bold text-ink">{item.heading}</h3>
              <Pending className="mt-3" />
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}
