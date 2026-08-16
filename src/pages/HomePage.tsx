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
      {/* No bottom padding: the services band brings its own top padding, and
          two stacked gaps left the carousel stranded. */}
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
        <HeroCarousel photos={highlightPhotos} />
      </div>

      <Section id="services" className="scroll-anchor" title="خدماتنا">
        <ServiceLinkCards />
      </Section>
    </main>
  )
}
