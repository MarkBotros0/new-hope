import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SiteHeader } from './components/SiteHeader'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { MinistryPage } from './pages/MinistryPage'

/** Send the reader back to the top when the route changes — an SPA otherwise
 *  keeps the previous scroll offset. Hash links are left alone, and so are
 *  moves between the sub-ministries of one page: those swap a tab panel under
 *  a sticky tab bar, where a jump to the top would be disorienting. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const page = pathname.split('/')[1] ?? ''

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0 })
  }, [page, hash])

  return null
}

function App() {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-50 focus:rounded-full focus:bg-secondary-dark focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
      >
        تخطَّ إلى المحتوى
      </a>
      <SiteHeader />
      <ScrollToTop />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* تطوير القادة merged into خدمة الشباب — keep the old link alive. */}
          <Route path="/leaders" element={<Navigate to="/youth" replace />} />
          {/* `:sub` selects a sub-ministry on multi-section pages. */}
          <Route path="/:slug" element={<MinistryPage />} />
          <Route path="/:slug/:sub" element={<MinistryPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
