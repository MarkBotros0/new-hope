import { Compass, Eye } from 'lucide-react'

interface Panel {
  label: string
  text: string
  Icon: typeof Eye
}

interface PurposeSectionProps {
  vision?: string
  mission?: string
}

/** Vision and mission as contained statement panels with an icon and a real
 *  <h3> each. The icon chip is this card's one orange accent. */
export function PurposeSection({ vision, mission }: PurposeSectionProps) {
  const panels: Panel[] = []
  if (vision) panels.push({ label: 'الرؤية', text: vision, Icon: Eye })
  if (mission) panels.push({ label: 'المهمة', text: mission, Icon: Compass })

  return (
    <div className={`grid gap-5 sm:gap-6 ${panels.length > 1 ? 'md:grid-cols-2' : ''}`}>
      {panels.map(({ label, text, Icon }) => (
        <div
          key={label}
          className="rounded-2xl border border-secondary-line bg-white p-6 shadow-card sm:p-7"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-soft text-secondary-dark">
              <Icon size={20} aria-hidden="true" />
            </span>
            <h3 className="text-lg font-black text-ink">{label}</h3>
          </div>
          <p className="mt-4 text-lg leading-loose text-body">{text}</p>
        </div>
      ))}
    </div>
  )
}
