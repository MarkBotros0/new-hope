interface PurposeSectionProps {
  vision?: string
}

/** The service's vision, in the same card the من نحن page uses for its
 *  أهدافنا and قيمنا statements: white, hairline border, orange top rule.
 *  The band's own heading (رؤيتنا) names it and carries the accent rule, so
 *  the card holds nothing but the statement. */
export function PurposeSection({ vision }: PurposeSectionProps) {
  if (!vision) return null

  return (
    <div className="rounded-2xl border border-secondary-line border-t-4 border-t-secondary bg-white p-6 shadow-card sm:p-7">
      <p className="text-lg leading-loose text-body">{vision}</p>
    </div>
  )
}
