# IClawMini Design System

> Source of truth for the IClawMini marketing site (iclawmini.com).
> The live implementation lives in `styles.css` ("Design System v2 — Refined Dark").
> This doc consolidates the system so new pages ship consistent without guesswork.

## Design Principles

1. **Refined Dark first.** Dark is the default identity; light mode is a graceful, tested fallback that respects `prefers-color-scheme`. No dark/light divergence in layout — only tokens change.
2. **One accent, used sparingly.** `#2997ff` is the only brand color. It appears on CTAs, links, active states, and gradient titles — never as surface fill.
3. **Type does the hierarchy work.** Scale, weight, and letter-spacing (tightened at display sizes) separate levels — not borders or boxes.
4. **Radii and shadows are layered, not competing.** One consistent radius scale and one shadow scale; depth comes from stacking, not from multiple simultaneous effects.
5. **Motion is a whisper.** `--ease-spring` on interactive micro-moments, `--ease-out` on reveals. Honors `prefers-reduced-motion` globally.

## Color

### Dark mode (default)

| Token | Value | Use |
|---|---|---|
| `--bg-primary` | `#050507` | Page background |
| `--bg-secondary` | `#101013` | Alternating sections |
| `--bg-tertiary` | `#17171b` | Cards / inner panels |
| `--bg-elevated` | `#1d1d22` | Dropdowns, overlays |
| `--text-primary` | `#f5f5f7` | Headings, body copy |
| `--text-secondary` | `#a1a1a8` | Supporting copy, subtitles |
| `--text-tertiary` | `#6e6e76` | Captions, eyebrow, meta |
| `--accent` | `#2997ff` | CTAs, links, active states |
| `--accent-hover` | `#4da6ff` | Accent hover |
| `--accent-dim` | `rgba(41,151,255,0.12)` | Accent tint fills / borders |
| `--accent-glow` | `rgba(41,151,255,0.35)` | Glow / gradient accents |
| `--border` | `rgba(255,255,255,0.08)` | Hairline borders |
| `--border-strong` | `rgba(255,255,255,0.14)` | Inputs, emphasis borders |

### Light mode (`prefers-color-scheme: light`)

Same token names, different values (defined last in `styles.css`):

| Token | Value |
|---|---|
| `--bg-primary` | `#ffffff` |
| `--bg-secondary` | `#f5f5f7` |
| `--bg-tertiary` | `#ececf0` |
| `--text-primary` | `#1d1d1f` |
| `--text-secondary` | `#5a5a60` |
| `--text-tertiary` | `#8e8e96` |
| `--accent` | `#0071e3` |
| `--accent-hover` | `#0077ed` |

### Gradient titles

Hero/page-title headings use a clamped vertical gradient via `background-clip: text`:

- **Hero (dark):** `linear-gradient(160deg, #fff 20%, #8e8e96 90%)`
- **Light:** `linear-gradient(160deg, #000 30%, #48484e 100%)` (hero), `linear-gradient(160deg, #1d1d1f 40%, #6e6e73 100%)` (page titles)

## Typography

Font stack (`--font-display`): `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`. No webfonts; native system rendering, `text-rendering: optimizeLegibility`.

### Type scale (dark mode)

| Level | Size | Weight | Letter-spacing | Used by |
|---|---|---|---|---|
| Display | `88px` | 700 | `-0.04em` | `.hero-title` (desktop) |
| H1 / Page title | `64px` | 700 | `-0.035em` | `.page-header h1` |
| H2 / Section heading | `42px` | 700 | `-0.025em` | `.section-heading`, `.content-section h2` |
| Card title | `22px` | — | `-0.02em` | `.spec-card h3` |
| Card subtitle | `19px` | 600 | `-0.02em` | Section subtitles, card headers |
| Section text | `17px` | 400 | — | `.section-text` (max-width 800px) |
| Body | `14px` | 400 | — | Default card/body copy |
| Eyebrow / label | `12–13px` | 500–600 | `+0.02em`–`0.04em`, uppercase | `.project-label`, nav eyebrow |
| Page header lead | `21px` | — | — | `.page-header p` (`--text-secondary`) |

### Responsive behavior

- `.hero-title` scales `88px` → `44px` at `≤768px`; `.page-header h1` scales `64px` → `36px` at `≤768px`.
- Line-height: `1.6` body default, `1.8` on `.section-text`, `1.65` on card descriptions.

## Spacing & Layout

- **Container:** `max-width: 1200px`, centered; horizontal gutter `24px` (`16px` at ≤768px via `.container`).
- **Section rhythm:** `.content-section` uses `padding: 90px 0`; `.section-subtitle` margins `64px` below.
- **Section text max-width:** `800px` for readability.
- **Cards:** `padding: 48px 40px` (project cards), `.spec-card` internal padding per its rule.
- **Grids:** card grids collapse `1fr 1fr` → single column at `≤1024px`/`≤768px`. Two-col / one-col modifier classes exist (`.two-col`, `.one-col`).

## Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `8px` | Small chips, inputs |
| `--radius-md` | `14px` | Default cards, buttons |
| `--radius-lg` | `20px` | Larger cards |
| `--radius-xl` | `28px` | Hero cards, floating elements |

## Shadow

| Token | Value |
|---|---|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.25)` |
| `--shadow-md` | `0 8px 24px rgba(0,0,0,0.35)` |
| `--shadow-lg` | `0 24px 64px rgba(0,0,0,0.45)` |

Light mode uses the same structure with much softer alpha (`0.06`/`0.08`/`0.12`).

## Motion

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Reveal / scroll animations |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Interactive micro-interactions (hover lift, dropdowns) |
| `--duration-fast` | `0.2s` | Hover, focus states |
| `--duration-med` | `0.4s` | Transitions, reveals |

- Scroll reveals add `.fade-in` to targeted cards (see Components → Reveal-on-scroll), staggered `80ms` per element via IntersectionObserver.
- **`@media (prefers-reduced-motion: reduce)`** disables all transitions/animations and forces `scroll-behavior: auto`.

## Components

### Navigation
- Sticky, translucent: dark `rgba(5,5,7,0.72)` blur → `rgba(5,5,7,0.9)` when `.scrolled`; light `rgba(255,255,255,0.75)` → `0.92`.
- Desktop dropdowns (`.dropdown`); mobile uses full-screen `.nav-overlay`.

### Buttons
- `.btn` (default / ghost variants), `.btn-primary` = accent-filled, `.btn-accent`. Rounded, `--duration-fast` transitions, spring hover.

### Cards
- `.feature-card`, `.spec-card`, `.project-card`, `.comparison-card` — all `--bg-tertiary` surface, `--border` hairline, `--radius-lg` default. Accent variant `.project-card-accent` uses `--accent-dim` border + gradient.

### Reveal-on-scroll
- `main.js` IntersectionObserver targets `.feature-card`, `.spec-card`, `.architecture-layer`, `.contact-card`; entering the viewport adds `.fade-in` (staggered `80ms` per element). Under `prefers-reduced-motion` all elements get `.fade-in` immediately (no observer).
- Reveal transition lives at `styles.css:1066` (fade + translateY via `--ease-out`).

### Status grid (Vibe Ring)
- `.status-grid` with `--bg-secondary` cells, `--border` hairline, `.status-label` / `.status-value` type pair. Active state glows with `--accent-glow`.

### Page header
- `.page-header` = gradient title (`.page-header h1`, 64px) + lead paragraph (`.page-header p`, 21px, `--text-secondary`). Padding `160px 0 80px`, mobile `110px 0 56px`.

## Accessibility

- Skip link present on every page (`.skip-link`, focus-visible).
- Full keyboard nav for dropdowns/mobile overlay; `:focus-visible` outlines with `--accent`.
- `prefers-reduced-motion` and `prefers-color-scheme` respected globally.
- `::selection` uses accent for contrast.
- Min contrast: `--text-tertiary` is reserved for captions/meta, never body copy.

## Implementation Conventions

- **Always use tokens.** Never hardcode a color, radius, shadow, or duration in page CSS or inline styles.
- Inline `style=""` is forbidden on pages (exception: the `lobster-expansion.html` canvas game, which is self-contained WebGL art).
- Pages reference one shared `styles.css`; per-page overrides only inside a scoped `[data-page]`/page-specific block — never by forking the file.
- EN pages are paired with `.zh.html` copies — both must stay in sync when adding sections.
- New sections reuse existing classes (`.content-section`, `.section-heading`, `.section-subtitle`, `.spec-grid`, `.project-card`) before writing new CSS.

## Verification

- `npx html-validate` passes on all pages (added 2025-07).
- Lighthouse + axe on EN & ZH pages pass accessibility audits (v2 refresh).
- Run a visual pass on dark + light (System preference) and at 320 / 768 / 1024 / 1440px.