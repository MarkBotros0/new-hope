import { useEffect } from 'react'
import { Button } from '../components/Button'
import { Section } from '../components/Section'
import { SectionLabel } from '../components/SectionLabel'
import { PrinciplesCard } from '../components/PrinciplesCard'
import { ServiceLinkCards } from '../components/ServiceLinkCards'
import { ArchiveGallery } from '../components/ArchiveGallery'
import { Pending } from '../components/Pending'
import { highlightPhotos, site } from '../data/ministries'

/** Landing hero — the org's own name and tagline over a warm orange field. */
function HomeHero() {
  return (
    <div className="overflow-hidden rounded-3xl border border-secondary-line bg-gradient-to-b from-secondary-soft to-white shadow-sm">
      <div className="mx-auto max-w-3xl px-6 py-12 text-center sm:px-10 sm:py-16">
        <SectionLabel>{site.tagline}</SectionLabel>
        <h1 className="text-4xl font-black leading-tight text-ink sm:text-5xl lg:text-6xl">
          {site.name}
        </h1>
        <p dir="ltr" className="mt-2 text-sm font-bold tracking-[0.2em] text-secondary-dark">
          {site.nameEn}
        </p>
        <span className="mx-auto mt-6 block h-1.5 w-20 rounded-full bg-secondary" />
        <p className="mt-6 text-lg leading-loose text-body">{site.intro}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="#services">تصفّح خدماتنا</Button>
          <Button to="/about" variant="outline">
            من نحن
          </Button>
        </div>
      </div>
    </div>
  )
}

export function HomePage() {
  useEffect(() => {
    document.title = 'أمل جديد — New Hope'
  }, [])

  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8">
        <HomeHero />
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

      <Section title="من أرشيف الخدمة">
        <ArchiveGallery count={4} photos={highlightPhotos} />
      </Section>

      <Section tone="tint" title="للتواصل" density="tight" id="contact" className="scroll-anchor">
        <div className="rounded-2xl border border-secondary-line bg-white p-6">
          <h3 className="text-lg font-bold text-ink">تواصل معنا</h3>
          <Pending className="mt-3" />
        </div>
      </Section>
    </main>
  )
}
