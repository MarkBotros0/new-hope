import { servicePuzzle } from '../data/ministries'
import { puzzlePieces } from './puzzlePaths'

/** Cell size in viewBox units. Wide rather than square so the 3 × 2 grid
 *  keeps a banner's proportions (≈ 2.6 : 1). */
const CELL_W = 400
const CELL_H = 230

interface PuzzleGridProps {
  cols: number
  rows: number
  /** Prefix for the clip-path ids — both grids are in the DOM at once. */
  id: string
  className?: string
}

/** One arrangement of the pieces. The content list reads right to left, top
 *  row first, so index `i` lands at the mirrored column of its row. */
function PuzzleGrid({ cols, rows, id, className }: PuzzleGridProps) {
  const pieces = puzzlePieces(cols, rows, CELL_W, CELL_H)
  const contentAt = (col: number, row: number) => servicePuzzle[row * cols + (cols - 1 - col)]

  return (
    <svg
      viewBox={`0 0 ${cols * CELL_W} ${rows * CELL_H}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {pieces.map((piece, i) => (
          <clipPath key={i} id={`${id}-${i}`}>
            <path d={piece.d} />
          </clipPath>
        ))}
      </defs>

      {/* The photos carry no caption — the picture names the work by showing
          it; the ministries are listed in the banner's accessible name. */}
      {pieces.map((piece, i) => {
        const content = contentAt(piece.col, piece.row)
        const { bbox } = piece
        return (
          <g key={i} clipPath={`url(#${id}-${i})`}>
            {content.src ? (
              <image
                href={content.src}
                x={bbox.x}
                y={bbox.y}
                width={bbox.w}
                height={bbox.h}
                preserveAspectRatio="xMidYMid slice"
              />
            ) : (
              <>
                {/* The logo piece: brand orange, the white mark centred in
                    the cell clear of where a side knob could bite in. */}
                <rect x={bbox.x} y={bbox.y} width={bbox.w} height={bbox.h} className="fill-secondary" />
                <image
                  href="/logo-white.png"
                  x={piece.x + piece.w * 0.25}
                  y={piece.y + piece.h * 0.2}
                  width={piece.w * 0.5}
                  height={piece.h * 0.6}
                  preserveAspectRatio="xMidYMid meet"
                />
              </>
            )}
          </g>
        )
      })}

      {/* The cut itself, drawn last so it sits over every piece: a page-
          coloured gap along each seam and round the border. */}
      {pieces.map((piece, i) => (
        <path
          key={i}
          d={piece.d}
          fill="none"
          strokeWidth="5"
          strokeLinejoin="round"
          className="stroke-page"
        />
      ))}
    </svg>
  )
}

/** The من نحن banner: the ministries as the pieces of one puzzle, with the
 *  logo as the piece they fit around. Decorative — one accessible name for
 *  the whole picture, no links. Two arrangements are rendered and swapped by
 *  breakpoint: three across from `sm`, two across below it so each piece is
 *  still legible on a phone. */
export function ServicesPuzzle() {
  const names = servicePuzzle
    .filter((piece) => piece.src)
    .map((piece) => piece.label)
    .join('، ')

  return (
    <div role="img" aria-label={`قطع أحجية تجمع خدمات أمل جديد: ${names}.`}>
      <PuzzleGrid cols={3} rows={2} id="puzzle-wide" className="hidden h-auto w-full sm:block" />
      <PuzzleGrid cols={2} rows={3} id="puzzle-narrow" className="block h-auto w-full sm:hidden" />
    </div>
  )
}
