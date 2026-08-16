import { useEffect } from 'react'
import { Section } from '../components/Section'
import { PrinciplesCard } from '../components/PrinciplesCard'
import { ServiceLinkCards } from '../components/ServiceLinkCards'
import { HeroCarousel } from '../components/HeroCarousel'
import { Pending } from '../components/Pending'
import { highlightPhotos, site } from '../data/ministries'

export function HomePage() {
  useEffect(() => {
    document.title = 'أمل جديد — New Hope'
  }, [])

  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8">
        <HeroCarousel photos={highlightPhotos} />
      </div>

      <Section
        id="services"
        className="scroll-anchor"
        eyebrow="مجالات الخدمة"
        title="خدماتنا"
        lead="ثلاثة مجالات رئيسية، ولكل خدمة صفحتها بالبرامج والفرق والأرشيف."
      >
        <ServiceLinkCards />
      </Section>

      <Section tone="tint" title="مبادئنا الأساسية">
        <PrinciplesCard principles={site.principles} />
      </Section>

      <Section title="للتواصل" density="tight" id="contact" className="scroll-anchor">
        <div className="rounded-2xl border border-secondary-line bg-white p-6">
          <h3 className="text-lg font-bold text-ink">تواصل معنا</h3>
          <Pending className="mt-3" />
        </div>
      </Section>
    </main>
  )
}
