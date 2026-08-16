import { useEffect } from 'react'
import { Section } from '../components/Section'
import { ServiceLinkCards } from '../components/ServiceLinkCards'
import { HeroCarousel } from '../components/HeroCarousel'
import { highlightPhotos } from '../data/ministries'

export function HomePage() {
  useEffect(() => {
    document.title = 'أمل جديد — New Hope'
  }, [])

  return (
    <main id="main">
      {/* Full-bleed on phones, and flush to the header: the gutters and the gap
          above cost a screen-width photo more than the framing is worth. No
          bottom padding either — the services band brings its own, and two
          stacked gaps left the carousel stranded. */}
      <div className="mx-auto max-w-6xl sm:px-6 sm:pt-8">
        <HeroCarousel photos={highlightPhotos} />
      </div>

      <Section id="services" className="scroll-anchor" title="خدماتنا">
        <ServiceLinkCards />
      </Section>
    </main>
  )
}
