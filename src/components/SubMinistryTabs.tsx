import { useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionList } from './SectionList'
import { TabStrip } from './TabStrip'
import { panelId, tabId } from './tabIds'
import { buildBlocks, type Block } from './sectionBlocks'
import { sectionIndex, sectionPath, type Ministry } from '../data/ministries'

interface SubMinistryTabsProps {
  ministry: Ministry
  /** Sub-ministry slug from the URL; unknown values fall back to the first. */
  sub?: string
}

/** Switch between the sub-ministries of a page (e.g. the three Sudanese
 *  ministries) via a sticky tab bar. The active tab lives in the URL, so every
 *  sub-ministry is linkable from the nav and survives a reload or a share. */
export function SubMinistryTabs({ ministry, sub }: SubMinistryTabsProps) {
  const navigate = useNavigate()
  const prefix = `sub${useId()}`
  const { sections } = ministry
  const active = sectionIndex(ministry, sub)
  const section = sections[active]

  const lead: Block = {
    key: 'lead',
    title: section.heading,
    content:
      section.meta?.length || section.intro?.length ? (
        <>
          {/* Facts short enough to be chips ride under the heading, as they do
              on the program cards, rather than taking a band of their own. */}
          {section.meta?.length ? (
            <div className="mb-5 flex flex-wrap justify-center gap-2">
              {section.meta.map((m) => (
                <span
                  key={m.label + m.value}
                  className="inline-flex items-center gap-1.5 rounded-full bg-secondary-soft px-3 py-1 text-xs font-bold text-secondary-dark"
                >
                  {m.label && <span className="font-semibold text-label">{m.label}</span>}
                  {m.value}
                </span>
              ))}
            </div>
          ) : null}

          {/* The same statement card رؤيتنا uses. Wider than the usual 3xl
              prose column so a one-sentence intro holds one line instead of
              dropping a word onto a second. */}
          {section.intro?.length ? (
            <div className="mx-auto max-w-4xl space-y-4 rounded-2xl border border-secondary-line border-t-4 border-t-secondary bg-white p-6 text-center shadow-card sm:p-7">
              {section.intro.map((t) => (
                <p key={t} className="text-lg leading-loose text-body">
                  {t}
                </p>
              ))}
            </div>
          ) : null}
        </>
      ) : null,
  }

  // رؤيتنا opens the page, above the tab strip: it is what the sub-ministry
  // is for, and the reader meets it before choosing between them. Everything
  // else stays inside the tab panel.
  const built = buildBlocks(section)
  const purpose = built.find((b) => b.key === 'purpose')
  const blocks = [lead, ...built.filter((b) => b.key !== 'purpose')]

  return (
    <div>
      {purpose && <SectionList blocks={[purpose]} />}

      {/* The tabs sit on the page like the program tabs under قسم الشباب —
          no sticky band, no border, nothing to read as a separate strip. */}
      <div className="mx-auto max-w-6xl px-4 pt-2 sm:px-6">
        <TabStrip
          // The tab carries the section's own heading, as the program tabs
          // under خدمة الشباب do — the short tabLabel is the nav's name for
          // it, not the page's.
          labels={sections.map((s) => s.heading ?? s.tabLabel ?? '')}
          active={active}
          onChange={(index) => navigate(sectionPath(ministry, sections[index]))}
          idPrefix={prefix}
          scrollable
          centered
        />
      </div>

      <div
        // Keyed so switching sub-ministries replays the entrance animation.
        key={section.slug ?? active}
        id={panelId(prefix, active)}
        role="tabpanel"
        aria-labelledby={tabId(prefix, active)}
        tabIndex={0}
        className="focus-visible:outline-none [animation:fadeIn_0.35s_ease]"
      >
        <SectionList blocks={blocks} />
      </div>
    </div>
  )
}
