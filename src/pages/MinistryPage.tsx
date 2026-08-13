import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMinistry, sectionIndex } from '../data/ministries'
import { MinistryLayout } from '../components/MinistryLayout'

export function MinistryPage() {
  const { slug, sub } = useParams()
  const ministry = getMinistry(slug)

  // Give each route a distinct document title (tabs, history, bookmarks).
  // On a multi-section page the sub-ministry on show names the page.
  useEffect(() => {
    if (!ministry) {
      document.title = 'أمل جديد — New Hope'
      return
    }
    const section = ministry.sections[sectionIndex(ministry, sub)]
    const name =
      ministry.sections.length > 1 ? (section.heading ?? ministry.title) : ministry.title
    document.title = `${name} — أمل جديد`
  }, [ministry, sub])

  if (!ministry) {
    return (
      <main id="main" className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-black text-ink">الصفحة غير موجودة</h1>
        <p className="mt-3 text-body">لم نتمكّن من العثور على هذه الصفحة.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-secondary-dark px-6 py-2.5 text-sm font-bold text-white transition hover:bg-secondary-deep"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </main>
    )
  }

  return <MinistryLayout ministry={ministry} sub={sub} />
}
