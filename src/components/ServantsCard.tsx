import type { Servant } from '../data/ministries'

function ServantCard({ servant }: { servant: Servant }) {
  return (
    <div className="flex w-32 flex-col items-center text-center">
      {/* Photo placeholder — swap the src for a real portrait later. */}
      <img
        src="/placeholder-avatar.svg"
        alt={`صورة ${servant.name}`}
        className="h-20 w-20 rounded-full border border-line bg-sage-tint object-cover"
      />
      <p className="mt-3 font-bold text-ink">{servant.name}</p>
      <p className="text-sm text-label">{servant.role}</p>
    </div>
  )
}

interface ServantsCardProps {
  servants: Servant[]
  /** Extra line, e.g. a team-size count when there are no individual names. */
  note?: string
}

/** Team members — photo-placeholder avatars in a row, plus an optional note. */
export function ServantsCard({ servants, note }: ServantsCardProps) {
  const hasServants = servants.length > 0

  return (
    <div>
      {hasServants && (
        <div className="flex flex-wrap gap-x-8 gap-y-6">
          {servants.map((servant) => (
            <ServantCard key={servant.name} servant={servant} />
          ))}
        </div>
      )}
      {note && (
        <p
          className={`font-semibold text-body ${hasServants ? 'mt-6' : 'text-lg'}`}
        >
          {note}
        </p>
      )}
    </div>
  )
}
