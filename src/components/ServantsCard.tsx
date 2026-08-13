import type { Servant } from '../data/ministries'

function ServantCard({ servant }: { servant: Servant }) {
  return (
    <div className="flex w-32 flex-col items-center text-center">
      {/* Photo placeholder — swap the src for a real portrait later. */}
      <img
        src="/placeholder-avatar.svg"
        alt=""
        aria-hidden="true"
        className="h-20 w-20 rounded-full border-2 border-secondary-line bg-secondary-soft object-cover"
      />
      <p className="mt-3 font-bold text-ink">{servant.name}</p>
      <p className="text-sm text-label">{servant.role}</p>
    </div>
  )
}

interface ServantsCardProps {
  servants: Servant[]
  /** Extra line(s), e.g. a team-size count when there are no individual names,
   *  or a short paragraph on how the team is currently organised. */
  note?: string | string[]
}

export function ServantsCard({ servants, note }: ServantsCardProps) {
  const hasServants = servants.length > 0
  const notes = note === undefined ? [] : Array.isArray(note) ? note : [note]
  // A single line stays a strong stand-alone statement; several are body prose.
  const single = notes.length === 1

  return (
    <div>
      {hasServants && (
        <ul className="flex flex-wrap gap-x-8 gap-y-6">
          {servants.map((servant) => (
            <li key={servant.name}>
              <ServantCard servant={servant} />
            </li>
          ))}
        </ul>
      )}
      {notes.length > 0 && (
        <div
          className={`max-w-3xl space-y-4 ${
            hasServants ? 'mt-7 border-t border-line pt-4' : ''
          }`}
        >
          {notes.map((line) => (
            <p
              key={line}
              className={
                single
                  ? hasServants
                    ? 'text-sm font-semibold text-label'
                    : 'text-lg font-semibold text-body'
                  : 'leading-loose text-body'
              }
            >
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
