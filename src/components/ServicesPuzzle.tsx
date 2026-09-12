import { servicePuzzle } from '../data/ministries'
import { puzzlePieces } from './puzzlePaths'

/** Cell size in viewBox units. Wide rather than square so the 4 × 2 grid
 *  keeps a banner's proportions (≈ 3 : 1). */
const CELL_W = 400
const CELL_H = 260

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
        const { bbox } = piece
        return (
          <g key={i} clipPath={`url(#${id}-${i})`}>
            <image
              href={contentAt(piece.col, piece.row).src}
              x={bbox.x}
              y={bbox.y}
              width={bbox.w}
              height={bbox.h}
              preserveAspectRatio="xMidYMid slice"
            />
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

/** The من نحن banner: the ministries as the pieces of one puzzle. Decorative
 *  — one accessible name for the whole picture, no links. Two arrangements
 *  are rendered and swapped by breakpoint: four across from `sm`, two across
 *  below it so each piece is still legible on a phone. */
export function ServicesPuzzle() {
  const names = [...new Set(servicePuzzle.map((piece) => piece.label))].join('، ')

  return (
    <div role="img" aria-label={`قطع أحجية تجمع خدمات أمل جديد: ${names}.`}>
      <PuzzleGrid cols={4} rows={2} id="puzzle-wide" className="hidden h-auto w-full sm:block" />
      <PuzzleGrid cols={2} rows={4} id="puzzle-narrow" className="block h-auto w-full sm:hidden" />
    </div>
  )
}
