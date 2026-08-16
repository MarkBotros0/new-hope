import { useEffect, useMemo, useState } from 'react'

/** TEMPORARY — dev-only picker for the orange the system is built on. Delete
 *  this file and its one call site in `App.tsx` once a swatch is chosen, then
 *  paste the derived values it prints into `index.css`. */

type Rgb = [number, number, number]

const hexToRgb = (hex: string): Rgb =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb

const toHex = ([r, g, b]: Rgb) =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')

function rgbToHsl([r, g, b]: Rgb): [number, number, number] {
  const [rr, gg, bb] = [r / 255, g / 255, b / 255]
  const max = Math.max(rr, gg, bb)
  const min = Math.min(rr, gg, bb)
  const l = (max + min) / 2
  const d = max - min
  if (d === 0) return [0, 0, l]
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  const h =
    max === rr
      ? ((gg - bb) / d + (gg < bb ? 6 : 0)) * 60
      : max === gg
        ? ((bb - rr) / d + 2) * 60
        : ((rr - gg) / d + 4) * 60
  return [h, s, l]
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  const [r, g, b] =
    h < 60
      ? [c, x, 0]
      : h < 120
        ? [x, c, 0]
        : h < 180
          ? [0, c, x]
          : h < 240
            ? [0, x, c]
            : h < 300
              ? [x, 0, c]
              : [c, 0, x]
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255]
}

const luminance = ([r, g, b]: Rgb) => {
  const [rr, gg, bb] = [r, g, b].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rr + 0.7152 * gg + 0.0722 * bb
}

const contrast = (a: Rgb, b: Rgb) => {
  const [x, y] = [luminance(a), luminance(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

const WHITE: Rgb = [255, 255, 255]

/** Rebuild the whole warm family from one swatch, so the accent bar, rules,
 *  chips, orange type, page tint, ambient wash and shadows all belong to the
 *  chosen orange rather than to the one it replaced. Only the hue and
 *  saturation carry over — each role sets its own lightness, because that is
 *  what decides whether it can be read on. */
function derive(fill: string) {
  const [h, rawS] = rgbToHsl(hexToRgb(fill))
  const s = Math.min(Math.max(rawS, 0.7), 0.95)

  const secondary = hslToRgb(h, s, 0.55) // marks, rules, the accent bar
  const soft = hslToRgb(h, Math.min(s + 0.2, 1), 0.92) // chip surfaces
  const line = hslToRgb(h, Math.min(s, 0.85), 0.82) // hairlines
  const page = hslToRgb(h, Math.min(s, 0.8), 0.972) // the page itself
  const shadow = hslToRgb(h, 0.72, 0.27) // the tint depth is cast in

  // The text weight: the lightest step that still clears AA both on white and
  // on the chip surface, which is where orange type is hardest to read.
  let dark = hslToRgb(h, s, 0.14)
  for (let l = 0.46; l >= 0.14; l -= 0.01) {
    const step = hslToRgb(h, s, l)
    if (contrast(step, WHITE) >= 4.6 && contrast(step, soft) >= 4.6) {
      dark = step
      break
    }
  }

  return { secondary, soft, line, page, shadow, dark }
}

interface Swatch {
  key: string
  fill: string
  /** Hover state. Ink-label swatches lighten and white-label ones deepen —
   *  moving the other way would drop the label under AA. */
  hover: string
  ink: string
  /** Label-on-fill contrast, so no option can be picked that fails AA. */
  ratio: string
}

/** The gap between `deep` and `logo` is real: the mid-oranges around #e0451c
 *  sit too dark for ink and too light for white (both ~4.2:1), so there is
 *  nothing shippable between them. */
const LIGHT_LABEL: Swatch[] = [
  { key: 'rust', fill: '#a8471c', hover: '#8d3915', ink: '#ffffff', ratio: '5.9:1' },
  { key: 'clay', fill: '#b5501f', hover: '#983f17', ink: '#ffffff', ratio: '5.1:1' },
  { key: 'brick', fill: '#c2451a', hover: '#a33a14', ink: '#ffffff', ratio: '5.1:1' },
  { key: 'deep', fill: '#c8461a', hover: '#a93a13', ink: '#ffffff', ratio: '4.8:1' },
]

const DARK_LABEL: Swatch[] = [
  { key: 'logo', fill: '#f05a27', hover: '#ff6b3d', ink: '#1a1a1a', ratio: '5.1:1' },
  { key: 'flame', fill: '#ef6c00', hover: '#ff8124', ink: '#1a1a1a', ratio: '5.7:1' },
  { key: 'light', fill: '#ff6b3d', hover: '#ff8055', ink: '#1a1a1a', ratio: '6.2:1' },
  { key: 'tangerine', fill: '#fd7e14', hover: '#ff9233', ink: '#1a1a1a', ratio: '6.8:1' },
  { key: 'coral', fill: '#ff7a59', hover: '#ff8f72', ink: '#1a1a1a', ratio: '6.8:1' },
  { key: 'peach', fill: '#ff8c42', hover: '#ffa060', ink: '#1a1a1a', ratio: '7.5:1' },
  { key: 'amber', fill: '#f2a03d', hover: '#ffb35c', ink: '#1a1a1a', ratio: '8.2:1' },
  { key: 'apricot', fill: '#ffa46b', hover: '#ffb98a', ink: '#1a1a1a', ratio: '8.9:1' },
]

const SWATCHES = [...LIGHT_LABEL, ...DARK_LABEL]
const STORAGE_KEY = 'dev:action-color'

export function ActionColorPicker() {
  const [active, setActive] = useState(
    () => window.localStorage.getItem(STORAGE_KEY) ?? 'light',
  )
  const current = SWATCHES.find((s) => s.key === active) ?? SWATCHES[0]
  // Memoised so the effect below keys off the swatch, not off a fresh object
  // every render.
  const family = useMemo(() => derive(current.fill), [current.fill])

  // Inline custom properties on <html> outrank the @theme defaults, so the
  // whole system re-tints with no rebuild.
  useEffect(() => {
    const style = document.documentElement.style
    const set = (name: string, value: string) => style.setProperty(name, value)

    set('--color-action', current.fill)
    set('--color-action-hover', current.hover)
    set('--color-action-ink', current.ink)

    set('--color-secondary', toHex(family.secondary))
    set('--color-secondary-dark', toHex(family.dark))
    set('--color-secondary-soft', toHex(family.soft))
    set('--color-secondary-line', toHex(family.line))
    set('--color-page', toHex(family.page))

    // Bare channels — composited at several opacities by the shadow scale and
    // the ambient wash.
    set('--shadow-rgb', family.shadow.map(Math.round).join(' '))
    set('--glow-rgb', family.secondary.map(Math.round).join(' '))
    set('--glow-floor-rgb', family.shadow.map(Math.round).join(' '))

    window.localStorage.setItem(STORAGE_KEY, current.key)
  }, [current, family])

  const row = (label: string, swatches: Swatch[]) => (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-24 shrink-0 text-[10px] font-bold uppercase tracking-widest text-white/40">
        {label}
      </span>
      {swatches.map((swatch) => (
        <button
          key={swatch.key}
          type="button"
          onClick={() => setActive(swatch.key)}
          title={`${swatch.fill} — label ${swatch.ratio}`}
          style={{ backgroundColor: swatch.fill, color: swatch.ink }}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
            swatch.key === active
              ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-900'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          {swatch.key}
        </button>
      ))}
    </div>
  )

  const derived: [string, string][] = [
    ['--color-action', current.fill],
    ['--color-action-hover', current.hover],
    ['--color-action-ink', current.ink],
    ['--color-secondary', toHex(family.secondary)],
    ['--color-secondary-dark', toHex(family.dark)],
    ['--color-secondary-soft', toHex(family.soft)],
    ['--color-secondary-line', toHex(family.line)],
    ['--color-page', toHex(family.page)],
    ['--shadow-rgb', family.shadow.map(Math.round).join(' ')],
  ]

  return (
    <div dir="ltr" className="bg-neutral-900 px-4 py-3 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2">
        {row('white label', LIGHT_LABEL)}
        {row('ink label', DARK_LABEL)}

        <details className="text-[11px] text-white/50">
          <summary className="cursor-pointer">
            dev · <span className="font-bold text-white/90">{current.key}</span> — the
            whole family re-tints. Values to paste into index.css:
          </summary>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono">
            {derived.map(([name, value]) => (
              <li key={name}>
                <span className="text-white/40">{name}:</span>{' '}
                <span className="text-white/90">{value}</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </div>
  )
}
