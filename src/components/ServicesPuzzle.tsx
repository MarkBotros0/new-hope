import { servicePuzzle } from '../data/ministries'
import { puzzlePieces } from './puzzlePaths'

/** Cell width in viewBox units; each grid picks its own height, so three
 *  desktop rows keep to a banner's proportions and a two-wide phone column
 *  doesn't stack into a tower. */
const CELL_W = 400

interface PuzzleGridProps {
  cols: number
  rows: number
  cellH: number
  /** Prefix for the clip-path ids — both grids are in the DOM at once. */
  id: string
  className?: string
}

/** One arrangement of the pieces. The content list reads right to left, top
 *  row first, so index `i` lands at the mirrored column of its row; a grid
 *  smaller than the list simply takes its first `cols × rows` entries. */
function PuzzleGrid({ cols, rows, cellH, id, className }: PuzzleGridProps) {
  const pieces = puzzlePieces(cols, rows, CELL_W, cellH)
  const contentAt = (col: number, row: number) => servicePuzzle[row * cols + (cols - 1 - col)]

  return (
    <svg
      viewBox={`0 0 ${cols * CELL_W} ${rows * cellH}`}
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
 *  are rendered and swapped by breakpoint: all fifteen pieces five across in
 *  three rows from `sm`, the first eight two across below it so each piece
 *  is still legible on a phone. */
export function ServicesPuzzle() {
  const names = [...new Set(servicePuzzle.map((piece) => piece.label))].join('، ')

  return (
    <div role="img" aria-label={`قطع أحجية تجمع خدمات أمل جديد: ${names}.`}>
      <PuzzleGrid
        cols={5}
        rows={3}
        cellH={230}
        id="puzzle-wide"
        className="hidden h-auto w-full sm:block"
      />
      <PuzzleGrid
        cols={2}
        rows={4}
        cellH={260}
        id="puzzle-narrow"
        className="block h-auto w-full sm:hidden"
      />
    </div>
  )
}
