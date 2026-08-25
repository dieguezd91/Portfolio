---
name: Daniel Dieguez Portfolio
description: A dark editorial dossier where game screenshots supply every colour the interface withholds.
colors:
  ink: "#0A0A0B"
  ink-raised: "#131315"
  bone: "#F2F0EC"
  ash: "#A5A29B"
  graphite: "#85827C"
  signal: "#FF5C29"
  signal-hover: "#FF7245"
  signal-active: "#E24A1B"
  rule: "rgba(255, 255, 255, 0.10)"
  rule-strong: "rgba(255, 255, 255, 0.20)"
typography:
  display:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.15rem, 5vw, 3.5rem)"
    lineHeight: 0.92
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 112, 'wght' 700"
  headline:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)"
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 110, 'wght' 600"
  title:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.6rem, 3vw, 2.25rem)"
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 108, 'wght' 650"
  title-md:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.5rem"
    lineHeight: 1.02
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 108, 'wght' 650"
  title-sm:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.25rem"
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 108, 'wght' 650"
  lead:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.1875rem"
    lineHeight: 1.62
    letterSpacing: "-0.004em"
    fontVariation: "'wdth' 100, 'wght' 400"
  body-lg:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    lineHeight: 1.5
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 104, 'wght' 600"
  body:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.9375rem"
    lineHeight: 1.62
    letterSpacing: "-0.004em"
    fontVariation: "'wdth' 100, 'wght' 400"
  caption:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    lineHeight: 1.5
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 104, 'wght' 600"
  caption-sm:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.8125rem"
    lineHeight: 1.5
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 104, 'wght' 600"
  label:
    fontFamily: "'Martian Mono', ui-monospace, Consolas, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  focus: "2px"
  control: "3px"
  frame: "4px"
  round: "99px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  section: "64px"
  section-lg: "96px"
components:
  button-signal:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "13px 22px"
  button-signal-hover:
    backgroundColor: "{colors.signal-hover}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.control}"
    padding: "13px 22px"
  media-frame:
    backgroundColor: "{colors.ink-raised}"
    rounded: "{rounded.frame}"
  spec-row:
    textColor: "{colors.graphite}"
    typography: "{typography.label}"
    padding: "10px 0"
---

# Design System: Daniel Dieguez Portfolio

## Overview

**Creative North Star: "The Release Record"**

This system treats a career as a set of records to be filed, not a showreel to be performed. Every project arrives as an entry: a plate holding the capture, a spec table of hard facts, a confirmed scope of work where one exists, and a link to the live thing. The interface behaves like the ruled stationery those records are filed on — hairlines, aligned columns, tabular figures, generous margins — and it deliberately withholds colour so that the only colour on screen comes from the games themselves.

The register is engineering-professional rather than arcade. There are no glows, no neon edges, no particle fields, no 3D carousels. Depth comes from two ground values and a 10%-white hairline, never from shadow. Where the system does raise its voice it does so with one signal orange, spent almost entirely on two things: the fact that a game is live on a store, and the primary action.

The confirmed anti-reference is the site this replaced: a near-black-with-neon-cyan hero over an interactive particle canvas, with the work hidden inside a perspective coverflow. That page led with atmosphere and buried evidence. This one leads with evidence.

**Key Characteristics:**

- Achromatic interface; all chroma is content
- Hairline rules instead of boxes and shadows
- Real metadata set in a real monospace, never as decoration
- Source art framed to its nature: gameplay fills, key art is matted
- One motion grammar, applied once per section

## Colors

An achromatic dark palette with a single warm signal, chosen so that colourful game captures read as the loudest thing on any screen.

### Primary

- **Signal Orange** (`#FF5C29`): Shipped-and-live status markers, the primary button, the rule that draws under a link on hover, focus outlines, text selection, the caret, and the counter of the monogram. Nothing else.

### Neutral

- **Pressroom Black** (`#0A0A0B`): The page ground. Warm-neutral rather than blue-black — the blue-black slate is the tell this palette was built to avoid.
- **Mount Grey** (`#131315`): Raised surfaces only — media frames, the hero release panel, the Contact and Footer bands. The single step of tonal elevation in the system.
- **Bone** (`#F2F0EC`): Primary text, headings, and the monogram. Slightly warm off-white; never pure `#FFF`.
- **Ash** (`#A5A29B`): Secondary body copy and spec values. 7.8:1 on Pressroom Black.
- **Graphite** (`#85827C`): Spec keys and section counts. 5.2:1 on Pressroom Black — the floor of the system, never lightened past this for smaller text.
- **Rule** (`rgba(255,255,255,0.10)`) and **Rule Strong** (`rgba(255,255,255,0.20)`): Every divider, frame border, and control outline in the system.

### Named Rules

**The Content-Carries-Colour Rule.** The interface is achromatic. Every hue on screen comes from a game capture or the portrait. If a new component needs colour to work, it needs better structure instead.

**The Two-Grounds Rule.** There are exactly two surface values: Pressroom Black and Mount Grey. A third ground is not a new token, it is a design error.

**The Signal Budget.** Signal Orange covers under 2% of any viewport. It marks live-on-a-store status, the primary action, and interaction feedback. It is never used for decoration, never for section headings, and never as a gradient.

## Typography

**Display Font:** Archivo (variable, `wdth` 75–125 / `wght` 400–800), fallback Helvetica Neue, Arial
**Body Font:** Archivo at normal width
**Label/Mono Font:** Martian Mono, fallback ui-monospace, Consolas

**Character:** One grotesque does the whole page, and its width axis does the work a second family would normally do — headlines run expanded and tight, text runs normal-width and open. Martian Mono appears only where the content is genuinely tabular, which keeps it a data signal rather than a costume for "technical".

### Hierarchy

- **Display** (`wdth` 112 / `wght` 700, `clamp(2.15rem, 5vw, 3.5rem)` in the hero and `clamp(2rem, 4.8vw, 3.5rem)` in Contact, lh 0.92, ls −0.035em): The hero positioning statement and the Contact availability line. Two per page, maximum.
- **Headline** (`wdth` 110 / `wght` 600, `clamp(1.75rem, 3.4vw, 2.75rem)`, lh 1.05): Section headings.
- **Title** (`wdth` 108 / `wght` 650, `clamp(1.6rem, 3vw, 2.25rem)`, lh 1.02): Case-study titles.
- **Title MD** (1.5rem): The hero release panel's title.
- **Title SM** (1.25rem): Sub-headings inside a section — the Skills column heads.
- **Lead** (1.1875rem, lh 1.62): The opening paragraph of About. One per page.
- **Body LG** (`wght` 600, 1.0625rem, ls −0.015em): Entry titles in the More work grid and the education list — a name, not prose.
- **Body** (`wdth` 100 / `wght` 400, 0.9375rem, lh 1.62): All prose. Steps up to 1rem at `sm` and above. Measure capped between 52ch and 64ch; never wider.
- **Caption** (`wght` 600, 0.875rem): Button labels, skill chips, the secondary skills run.
- **Caption SM** (0.8125rem): The masthead Résumé button only.
- **Label** (Martian Mono 400, 0.6875rem, uppercase, ls 0.02em, tabular figures): Spec keys and values, platform and year strings, release status, section counts, the footer colophon. **Not** navigation, and not descriptive UI — the mono face marks data, never chrome.

The ramp is a 1/16rem ladder: 11, 13, 14, 15, 17, 19, 20, 24px, then three clamps. A size outside that set is drift, not a decision.

### Named Rules

**The Mono-Means-Data Rule.** Martian Mono is permitted only for metadata that would sit in a table: platform, year, engine, role, handle, count, technology list. Prose in mono is a costume, not a voice.

**The No-Eyebrow Rule.** No kicker, label, or eyebrow ever sits above a heading. The identity line in the hero sits *below* the display type as a byline, which is why it is permitted. A section number is only allowed if the sequence carries information the reader needs — it never has here.

**The Byline Rule.** Every display statement is attributed underneath by a hairline and a name-plus-role line, never introduced from above.

## Layout

A 12-column grid inside a `1440px` max-width container, with page gutters of 24px / 32px / 48px at base / `sm` / `lg`. Breakpoints are Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

Recurring column assignments:

- **Hero:** thesis on columns 1–7 (1–6 at `xl`), release panel on 8–12.
- **Section header:** heading on 1–5, lede on 7–12. The asymmetry is the system's signature; a centred section header is off-system.
- **Primary case study:** plate on 1–7, record on 8–12. One per page — the shipped release, the only entry with a verified role and scope of work.
- **Secondary case studies:** a 2-up grid across the full content width, sitting under a hairline below the primary. The two columns are structurally equal and each record spans its whole column; only the plates cap their width. Still Featured Work, deliberately a smaller footprint, because less verified information exists to fill one.
- **More work:** 1 / 2 / 3 / 4 columns at base / `sm` / `lg` / `xl`.

Vertical rhythm runs on 64px (base) to 96px (`lg`) between sections. Every section opens with a full-width hairline directly above its heading. More space sits above a heading than below it, everywhere.

Below `lg` the desktop navigation is replaced entirely by a full-screen panel; nothing is merely reflowed. Anchor scrolling reserves 88px of clearance for the fixed masthead.

## Elevation & Depth

**This system has no shadows.** Not one `box-shadow` ships outside the scrollbar thumb's border trick. Depth is expressed by exactly two devices: a one-step tonal lift from Pressroom Black to Mount Grey, and a 1px hairline at 10% white. A glow, a coloured halo, or a soft drop shadow would read as the previous design's vocabulary and is out of system.

The fixed masthead is the one exception to flatness: past 24px of scroll it gains an 88%-opacity ground plus `backdrop-blur-xl`, which is a functional legibility device rather than decoration.

### Named Rules

**The Flat Rule.** Separation comes from a rule or a ground change. If neither works, the layout is wrong — reach for space, not shadow.

## Shapes

Corners are nearly square: 2px on the focus ring, 3px on controls, 4px on media frames and panels. The intent is stationery and plates, not pills and cards. The one large radius in the system, 99px, is reserved for things that are genuinely round — the status dot and the scrollbar thumb — and is never applied to a control or container.

Borders are always 1px. A thicker border, and any coloured left- or right-edge stripe, is out of system.

Media frames are the system's recurring silhouette: a 1px-ruled rectangle on Mount Grey, holding either a capture that fills it or a capture centred on it as a mounted plate.

## Components

### Buttons

- **Shape:** Near-square, 3px radius, 1px border always present (transparent when unused).
- **Signal (primary):** Signal Orange ground, Pressroom Black text, `13px 22px` padding, Archivo `wdth` 104 / `wght` 600 at 0.875rem. Hover lightens to `#FF7245`, active deepens to `#E24A1B`.
- **Ghost (secondary):** Transparent ground, Bone text, Rule Strong border. Hover raises the border to 42% white and adds a 4.5%-white wash.
- **Motion:** Colour and border transitions only, 180ms on `cubic-bezier(0.16, 1, 0.3, 1)`. Buttons do not lift, scale, or glow.

### Inline link (`.link-rule`)

The system's signature control. A flex row of optional icon, label, and arrow, with a Signal Orange hairline that scales from `scaleX(0)` at the left origin over 320ms on hover or focus, while the label shifts to Signal Orange. Vertical padding of 12px keeps the hit target at 40px without moving the rule.

### Media frames

- **Corner:** 4px. **Border:** 1px Rule. **Ground:** Mount Grey.
- **Fill mode** (default): the capture fills its frame with `object-fit: cover`. Frame aspect is chosen per slot — 16:9 for the primary case study, 4:3 for a secondary one, 16:10 in the More work grid. Modest interpolation is accepted so a small source still has presence; the frame width is capped instead of leaving the art stranded.
- **Key-art mode** (`.media-keyart`, set by `mediaKind: 'keyArt'` in the data): the frame takes the artwork's own aspect and carries `clamp(1rem, 2vw, 1.75rem)` of padding, so the art reads as a mounted piece rather than a gameplay capture stranded in an empty rectangle. Roughly a quarter of that frame is deliberate mat. Width comes from the caller, never from the mode: side-by-side plates share one width cap so a capture and a piece of key art read as equal rank while keeping different heights.
- **Quiet variant** (`.media-quiet`, More work grid only): rests at `saturate(0.82)` — near full colour, so the artwork carries the grid — and lifts to `saturate(1.05)` with a 1.03 scale over 480–640ms on hover or focus-within.

### Spec table

A `<dl>` opened and closed by hairlines, one hairline per row, keys in Graphite label type and values in Ash label type with tabular figures. In the case study the key column is a fixed `6.5rem`; in narrower panels key and value sit at opposite ends of a flex row. This component carries most of the page's factual weight and appears in the hero, every case study, and About.

### Navigation

- **Desktop:** A fixed 76px masthead. Monogram plus name on the left at 0.9375rem, six section links centred at 0.875rem, brand icons and a ghost Résumé button on the right. **All navigation is set in Archivo, never the mono face** — section labels are chrome, not metadata. Inactive links are Ash; the active link is Bone and grows a Signal Orange hairline beneath it via `scaleX`, driven by an IntersectionObserver with a `-30% / -60%` root margin.
- **Mobile:** A labelled `Menu` / `Close` toggle opens a full-screen Pressroom Black panel. Section links are set in Title type at 1.75rem on hairline-separated rows with a down arrow, staggered in at 35ms intervals. The panel locks body scroll, closes on Escape, focuses itself on open, and returns focus to the toggle on close.

### Scope-of-work list

A two-column grid per item: a 12px Signal Orange hairline aligned to the first line's optical centre, then the text in Bone. This is the only place the signal colour touches body-scale content. It renders **only** for projects whose responsibilities are confirmed (`verified: true` in the data); an unverified project shows its spec table and nothing more.

## Do's and Don'ts

### Do:

- **Do** let the game captures be the only source of colour, and keep the interface achromatic around them.
- **Do** record real image dimensions in the data and set `width`/`height` plus an explicit `aspect-ratio` on every image, so nothing shifts on load.
- **Do** frame source art to what it is: gameplay captures fill their frame, key art is matted on a narrower plate. Where a source is small, cap the frame rather than leaving the art stranded in empty ground — presentation outranks strict pixel preservation, within reason.
- **Do** open every section with a full-width hairline and set the heading on columns 1–5 with the lede on 7–12.
- **Do** keep body measure between 52ch and 64ch.
- **Do** reserve Martian Mono for content that would sit in a table.
- **Do** theme the browser's own surfaces — selection, caret, scrollbar, focus ring — from the palette.
- **Do** give a new section one `Reveal` entrance and nothing more.

### Don't:

- **Don't** add a shadow, glow, or coloured halo. This system has none.
- **Don't** put a kicker, eyebrow, or section number above a heading.
- **Don't** introduce a third ground value or a second accent colour.
- **Don't** set prose in the mono face, or use it to make something look technical.
- **Don't** use gradient text, or a gradient anywhere as decoration.
- **Don't** exceed a 1px border, or add a coloured edge stripe to a row or panel.
- **Don't** animate on scroll more than once per section, and never re-trigger a reveal.
- **Don't** render an unverified project contribution anywhere in the UI, or promote one into a heading, hero line, or claim — see PRODUCT.md § Positioning.
- **Don't** rank a project by the resolution of its screenshot. Weak source art is solved by contained framing, never by demotion.
