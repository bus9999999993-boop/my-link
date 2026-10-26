# Nintendo.com circa 2001 Design System Spec

## Overview

Nintendo.com circa 2001 is the web rendered as **console hardware**. Where most sites of the era reached for either grunge texture or corporate gradients, this interface builds itself out of **brushed-periwinkle metal plates** — every region is a discrete beveled panel, edge-lit with a brighter highlight on top and a `{colors.chrome-indigo}` shadow line beneath, as if stamped from the same injection-molded plastic as a Game Boy. The whole page reads as one machine faceplate: a body of `{colors.canvas}` periwinkle chrome carrying inset modules, with the corners of the largest panels physically **chamfered** (cut at 45°) rather than rounded, reinforcing the manufactured-object feeling.

The system runs on a tight three-voice contrast. The structural voice is the cool periwinkle-to-indigo chrome (`{colors.canvas}`, `{colors.periwinkle}`, `{colors.chrome-indigo}`). The authority voice is `{colors.carbon}` carbon-navy — the top navigation bar, the right-rail action buttons, and the footer, all near-black slabs printed with a faint **halftone dot-matrix texture** that evokes a speaker grille. The energy voice is warm and reserved for one job only: telling you where to go. `{colors.nav-gold}` lights the primary menu words, `{colors.amber}` fills the utility chips and badges, and `{colors.signal}` orange marks every "forward" cue — the round arrow buttons, the chevron chips beside each headline, the Submit button. Warmth in this system always means *action*; the cool chrome never carries it.

Atmosphere comes from the **hero fields**, which break the periwinkle calm with full-bleed product photography over textured backdrops — a circuit-board cyan on Systems, a motion-blurred racetrack red on Games, a soft lavender wash on Home — each topped with chunky `{typography.display}` wordmarks rendered in white with a heavy outline and hard drop shadow, the visual signature of game-box cover type. A pixel-eared Mario leans in from the masthead with a "Welcome to Nintendo.com!" speech bubble, anchoring the entire machine to the brand's playful character voice.

**Key Characteristics:**
- Every UI region is a **beveled metal plate** in `{colors.canvas}` periwinkle, edge-lit on top and shadow-lined with `{colors.chrome-indigo}` below — the page is assembled, not laid out.
- **Chamfered (cut-corner) panel geometry** on the largest modules; most chrome is sharp-edged (`{rounded.none}`), with rounding reserved for the logo pill, radio dots, and circle-arrow badges (`{rounded.full}`).
- A **carbon-navy command layer** (`{colors.carbon}`) with halftone-dot texture carries the top nav, right-rail buttons, and footer.
- Warmth is rationed as **directional signal only**: `{colors.nav-gold}` for menu words, `{colors.amber}` for utility chips/badges, `{colors.signal}` for every forward/Submit cue.
- **Photographic hero fields** cycle a page-specific accent tint (`{colors.lavender}` home → `{colors.systems-teal}` systems → `{colors.games-red}` games) under outlined `{typography.display}` box-art wordmarks.
- A dense, **modular grid** — masthead, dual nav bars, hero, then a two-thirds content column of stacked list/feature panels beside a one-third right action rail — packed with minimal whitespace.
- **Character-led**: the Mario mascot speech-bubble masthead and ESRB badge frame the chrome with brand personality and regulatory trust marks.

## Colors

The palette is a **cool metallic chassis with rationed warm signal**. Read it as three layers: the periwinkle chrome that everything is built from, the carbon command slabs, and the warm wayfinding accents that are the only saturated color in the steady-state interface.

### Brand & Accent
- **Nintendo Red** (`{colors.primary}` — #e60012): The racetrack logo wordmark and the brand's anchor hue. Used sparingly as pure brand identity and doubled as the validation/alert color. Never a surface fill outside the logo plate.
- **Signal Orange** (`{colors.signal}` — #f68d1f): The "go forward" color. Fills every round arrow button, every chevron chip beside a headline, the Submit button, and the "Play It On" platform badges. If something advances you, it is orange.
- **Amber** (`{colors.amber}` — #ecab37): Utility energy. Fills the Code Bank / Game Finder / Go chips, the info-box header tabs, the sweepstakes stars, and the ESRB Privacy-Certified badge. Distinguished from Signal Orange by being more golden and reserved for *tools and marks* rather than *forward motion*.
- **Nav Gold** (`{colors.nav-gold}` — #e48600): The deeper orange-gold reserved exclusively for the primary navigation words (Games, Systems, News, Nsider, Downloads) glowing on the carbon bar.

### Surface
- **Periwinkle Metallic** (`{colors.canvas}` — #7a8aba): The primary interface body — the brushed-metal chrome that every module is inset into.
- **Light Periwinkle** (`{colors.periwinkle}` — #8ba1d4): Raised mid panels (poll panel, system tiles) — one step brighter than canvas for elevation.
- **Pale Sky** (`{colors.sky}` / `{colors.canvas-soft}` — #9fbee7): The secondary-nav strip and light inset panel fills.
- **Pale Lavender** (`{colors.lavender}` — #acace7): The home hero field and side promo cards.
- **Pale Ice** (`{colors.ice}` — #c0d5e6): The News hero panel field.
- **Chrome Indigo** (`{colors.chrome-indigo}` — #3d4f97): The beveled border / shadow line under every plate, and the leading angled edge of nav tabs.
- **Muted Indigo** (`{colors.muted-indigo}` — #60619c): Inactive tabs and recessed chrome.
- **Platinum Gray** (`{colors.platinum}` — #dedede): The list-row and inset content surface — news headlines and archive rows sit on this cool platinum.
- **White** (`{colors.surface}` — #ffffff): Content cards, form fields, the logo pill, and list-row highlight.

### Text
- **Carbon Navy** (`{colors.ink}` — #21242e): Primary text on light chrome, and the fill of the dark command layer (nav bar, rail buttons, footer).
- **Chrome Indigo** (`{colors.ink-soft}` — #3d4f97): Secondary text and small-caps chrome labels.
- **White** (`{colors.on-primary}` — #ffffff): Text on carbon, red, and orange chrome.

### Semantic
- **Error / Alert** (`{colors.error}` — #e60012): Validation and destructive states reuse the brand red.
- **Systems Teal** (`{colors.systems-teal}` — #206479): Page-accent tint — the Systems hero's circuit-board cyan field.
- **Games Red** (`{colors.games-red}` — #a7282b): Page-accent tint — the Games hero's motion-blurred racetrack field.

## Typography

### Font Family
The era's web-safe reality is **Arial / Helvetica** throughout — there are no webfonts. The system gets its character not from typeface choice but from *treatment*: tight uppercase tracking on every chrome label, and a heavy outlined-and-shadowed display style for hero wordmarks that mimics console box-art logotype. Body copy is plain small Arial; links are the same family at bold weight in `{colors.ink-soft}`.

The micro-labels (vertical left-rail tabs, footer fine print) render with the soft pixelation characteristic of small bitmap-rendered Arial of the period — for a faithful reproduction, pair Arial with a pixel face such as **Silkscreen** or **VT323** at the 10–11px label sizes.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display}` | 44px | 900 | 1 | 0 | Hero box-art wordmarks (white, heavy outline + hard drop shadow) |
| `{typography.hero-tagline}` | 15px | 700 | 1.3 | 0 | Hero supporting line ("Gorgeous graphics, great sound…") |
| `{typography.nav-link}` | 13px | 700 | 1 | 0.5px | Primary nav menu words, uppercase |
| `{typography.ui-label}` | 11px | 700 | 1.1 | 0.5px | Section header labels, panel titles, button text — uppercase |
| `{typography.link}` | 12px | 700 | 1.4 | 0 | News headline links, "Read More" |
| `{typography.body}` | 12px | 400 | 1.4 | 0 | Descriptions, poll text, info-box copy |
| `{typography.micro}` | 10px | 400 | 1.3 | 0 | Footer copyright, calendar cells, fine print |

### Principles
- **Uppercase + tracking is the chrome voice.** Every structural label — nav words, panel headers ("Official News", "Featured Sites", "Player's Poll"), button text — is uppercase Arial Bold with a half-pixel of tracking. It reads like silkscreened legends on a controller.
- **Display type is outlined, never flat.** Hero wordmarks always carry a thick contrasting outline and a hard offset shadow so they pop off the photographic field — the box-art convention.
- **Body stays small and quiet.** At 12px, descriptive copy never competes with the chrome; the hierarchy is carried entirely by the labels and the photography.

### Note on Font Substitutes
Arial is freely available system-wide and needs no substitute. To recreate the period bitmap rendering of micro-labels, layer a pixel font (**Silkscreen**, **VT323**, or **Press Start 2P** for the chunkiest legends) at 10–11px and disable anti-aliasing. The display wordmarks are bespoke logotypes; the closest open substitute is **Archivo Black** (italicized) or **Arial Black** with a CSS text-stroke outline and `text-shadow` offset.

## Layout

### Spacing System
- **Base unit**: 8px (`{spacing.sm}`) — the gutter rhythm between list rows and grid cells.
- **Tokens**: `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.lg}` 16px · `{spacing.xl}` 24px · `{spacing.xxl}` 32px · `{spacing.section}` 48px
- Panels carry **12px interior padding** (`{spacing.md}`); larger content modules use **16px** (`{spacing.lg}`). Inter-module gaps run 16–24px. The layout is deliberately dense — whitespace is a structural seam between plates, not a luxury.

### Grid & Container
- **Fixed-width canvas** ~780–830px wide (a desktop-era fixed table layout, centered). No fluid scaling — the interface is sized to a single target window like an application.
- **Masthead row**: Mario mascot + speech bubble (left) and search module (right) float above the chrome.
- **Dual nav bars**: a carbon primary bar (logo + 5 section words + Code Bank / Game Finder utility chips) stacked over a periwinkle secondary strip (Parents, Customer Service, Corporate, Global, Privacy, Store, Contact).
- **Body**: a full-width hero panel, then a **two-column split** — a ~two-thirds content column of stacked panels (Official News list, Featured Sites 2×2 grid, etc.) beside a ~one-third **right action rail** (Login / Subscribe / Newsletter / Help buttons, an info box, a side promo card).
- **Left rail**: a thin vertical strip of rotated tabs (Top Ten, Top Rentals, Player's Choice, ESRB Ratings) clipped to the chrome edge.

### Whitespace Philosophy
Empty space is **engineered seam**, not breathing room. Modules butt against each other separated by thin `{colors.chrome-indigo}` bevel lines and a few pixels of canvas, so the eye reads grouped plates. The density is intentional: it makes the page feel like a packed control panel where everything is one click away.

### Responsive Strategy

#### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Desktop (only) | ~780–830px fixed | The native, sole target — a fixed-width application-style layout |
| Narrow window | < 780px | Horizontal scroll (no reflow); the table layout does not collapse |

This is a **pre-responsive, fixed-canvas** design. It was authored for a single desktop window size and does not reflow. A faithful *modern* re-implementation would preserve the fixed chrome metaphor on desktop and, below ~720px, stack the right action rail beneath the content column and collapse the dual nav bars into a single carbon bar with a disclosure toggle.

#### Touch Targets
Not a consideration in the original (mouse-only era); buttons and chips are 18–28px tall. A modern port must enlarge the `{components.button-primary}`, `{components.button-icon-arrow}`, and `{components.radio-option}` hit areas to a 44×44px minimum.

#### Collapsing Strategy
On a modern narrow viewport: dual nav bars → single carbon bar + menu disclosure; two-column body → single stacked column with the right rail moving below content; the left rotated-tab strip → a horizontal scroll chip row or removed; fixed hero → fluid full-bleed hero retaining the outlined wordmark.

#### Image Behavior
Hero photography fills beveled rectangles at roughly 4:1 (banner) and 16:9 proportions, full-bleed within the panel. Featured-site and game tiles are fixed-pixel thumbnails (~95×60px) in a tight grid. No lazy loading (era predates it). Product renders sit on textured backdrops rather than transparent cutouts.

## Elevation & Depth

Depth in this system is **physical bevel simulation**, not soft shadow. There is no blurred drop-shadow vocabulary; instead every plate is given the illusion of being a raised piece of molded plastic.

| Level | Treatment | Use |
|---|---|---|
| 0 — Inset | Recessed into canvas; darker `{colors.chrome-indigo}` top edge, lighter bottom edge | List rows, form fields, the canvas body itself |
| 1 — Plate | Flush panel; lighter top highlight, `{colors.chrome-indigo}` shadow line beneath | Content panels, system tiles, info box |
| 2 — Raised chip | Beveled button with bright top edge + hard bottom shadow | Utility chips, Go/Submit buttons, nav tabs |
| 3 — Command slab | `{colors.carbon}` near-black with halftone texture, sits "above" the chrome | Top nav bar, right-rail buttons, footer |

### Decorative Depth
Depth is also carried by **texture and photography**: the halftone dot-matrix on carbon slabs reads as a recessed speaker grille; hero fields use motion-blur, circuit-board patterns, and product renders with their own cast shadows to create literal pictorial depth; chamfered corners on the outer chrome suggest a machined faceplate edge. The left-rail rotated tabs appear to tuck *behind* the main chrome, a small but effective layered cue.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | The default — nav bar, footer, most chrome plates (sharp / chamfered, not rounded) |
| `{rounded.xs}` | 2px | Utility buttons, form fields, badges |
| `{rounded.sm}` | 4px | Small panels, featured tiles, list rows |
| `{rounded.md}` | 6px | Content panels, hero panel |
| `{rounded.lg}` | 10px | Outer section panels, mascot bubble |
| `{rounded.full}` | 9999px | Logo racetrack pill, radio dots, circle-arrow badges |

The signature is **sharpness with rationed roundness**. The chrome is hard-edged and frequently *chamfered* (corners cut at 45° rather than curved) — this is the manufactured-faceplate look. Roundness appears only where it signals a physical control: the fully-pill logo, the round radio buttons, and the round Signal-Orange arrow badges. A modern reproduction should resist the urge to soften every corner; the tension between sharp plates and the few pill elements is the whole character.

### Photography Geometry
Hero photography fills beveled rectangles at roughly 4:1 (banner) and 16:9 proportions, full-bleed within the panel. Featured-site and game thumbnails are near-4:3 fixed tiles (~95×60px) framed by a 1–2px `{colors.chrome-indigo}` edge with `{rounded.sm}` corners. The mascot is a transparent cutout overlapping the masthead, breaking the rectangular grid for personality.

## Components

### Navigation
- **`nav-bar`**: Carbon slab (`#21242e`) with halftone-dot texture, Nintendo racetrack logo pill (`#e60012`), 5 Nav Gold section words (`#e48600`), and Amber utility chips (`#ecab37`).
- **`subnav-strip`**: Pale sky strip (`#9fbee7`) directly beneath nav bar, carrying utility links in Carbon Navy.
- **`left-rail-tab`**: Vertical tabs in Carbon Navy with rotated text clipped to chrome edge.

### Brand & Masthead
- **`logo-pill`**: Racetrack oval in `#e60012` red on white pill.
- **`mascot-bubble`**: Mario mascot speech bubble with "Welcome to Nintendo.com!".

### Buttons
- **`button-primary`**: Amber (`#ecab37`) utility / Go chip with beveled highlight.
- **`button-submit`**: Signal Orange (`#f68d1f`) commit button with white text.
- **`button-secondary`**: Carbon Navy (`#21242e`) slab with leading icon.
- **`button-icon-arrow`**: 22px Signal Orange disc with white chevron.
- **`button-arrow-chip`**: 18px Signal Orange chip with white forward chevron on list rows.

### Cards & Panels
- **`hero-panel`**: Beveled plate with full-bleed product texture backdrop, outlined drop-shadowed display wordmark, and Signal Orange action disc.
- **`section-label-bar`**: Periwinkle canvas header strip with glyph and uppercase label (`≡ OFFICIAL NEWS`, `≡ FEATURED SITES`, etc.).
- **`news-row`**: Platinum gray (`#dedede`) inset row with category icon, headline link, and Signal Orange chevron chip.
- **`poll-panel`**: Light periwinkle (`#8ba1d4`) raised plate with radio options and Signal Orange Submit button.
- **`info-box`**: White card with Amber header tab ("What Is — ...").
- **`footer-bar`**: Carbon slab with ESRB Privacy-Certified badge and copyright text.
