---
name: Mealvy
description: Warm, homey, appetizing meal-planning and nutrition app — a Sunday kitchen, not a calorie spreadsheet.
colors:
  cream-bg: "#faf8f5"
  cocoa-ink: "#352c27"
  fresh-card: "#fdfdfb"
  terracotta: "#bc4215"
  terracotta-ink: "#ffffff"
  forest-green: "#358262"
  forest-ink: "#ffffff"
  golden-amber: "#f4ba34"
  amber-ink: "#352c27"
  warm-sand: "#f1ece4"
  stone-muted: "#72625a"
  chili-red: "#d32222"
  soft-clay-border: "#e6e0d6"
  dark-bg: "#1e1815"
  dark-card: "#26201c"
  dark-ink: "#f4f1eb"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "0.625rem"
  md: "0.75rem"
  lg: "0.875rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.terracotta}"
    textColor: "{colors.terracotta-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    height: "2.5rem"
  button-primary-hover:
    backgroundColor: "#d3531f"
    textColor: "{colors.terracotta-ink}"
  button-secondary:
    backgroundColor: "{colors.forest-green}"
    textColor: "{colors.forest-ink}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    height: "2.5rem"
  button-outline:
    backgroundColor: "{colors.fresh-card}"
    textColor: "{colors.cocoa-ink}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    height: "2.5rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cocoa-ink}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1rem"
    height: "2.5rem"
  badge-category:
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0.125rem 0.625rem"
    height: "1.5rem"
  card:
    backgroundColor: "{colors.fresh-card}"
    textColor: "{colors.cocoa-ink}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  input-default:
    backgroundColor: "{colors.cream-bg}"
    textColor: "{colors.cocoa-ink}"
    rounded: "{rounded.md}"
    padding: "0.5rem 0.75rem"
    height: "2.5rem"
---

# Design System: Mealvy

## 1. Overview

**Creative North Star: "The Sunday Kitchen"**

Mealvy is the kitchen table on a Sunday afternoon, when you lay out the week's
meals over a cup of coffee. It is warm, unhurried, and appetizing — food as a
pleasure to plan, not a metric to discipline. The whole surface sits on a warm
cream ground with a barely-there paper grain, headings are set in the optical
serif **Fraunces**, and the palette is pulled straight from the pantry:
sun-baked terracotta, garden forest green, golden amber. Nutrition lives here
too — calories, protein, fat, carbs — but it never gets the white-coat
treatment. The numbers are present and accurate; the appetite leads.

This is a **product** surface: the design serves the task. For all its warmth,
Mealvy behaves like a tool a category-fluent user trusts on sight — standard
affordances, one consistent component vocabulary, no invented controls. Warmth
is structural (it's in the palette and the type from the first pixel), never
bolted on with a decorative gradient. Colour carries information: category and
meal-time badges encode meat/fish/vegetables and breakfast/lunch/dinner, and
the terracotta accent is reserved for action and current state.

It explicitly rejects four things: the **clinical fitness tracker** (cold
blue-green calorie dashboards and ring charts — macros belong here, the
aesthetic does not), **corporate enterprise software** (grey dense tables,
faceless Material-by-default), the **noisy e-commerce marketplace** (cramped
identical card grids, shouting banners), and the **generic SaaS / AI tool**
(dark purple-gradient theme, neon, glassmorphism).

**Key Characteristics:**
- Warm cream ground + faint fractal-noise paper grain (opacity 0.035) on every page.
- Fraunces serif for all headings (h1–h4); DM Sans for everything else.
- Pantry palette: terracotta primary, forest-green secondary, amber accent.
- Soft, generous radii (14px) and three-tier soft warm shadows.
- Colour-coded category and meal-time badges as a real information layer.
- First-class dark mode (warm, never cold) via `next-themes`.

## 2. Colors

A warm, edible palette: every hue is borrowed from food and the kitchen, set
over cream rather than white. Saturation is confident on the action colours and
restrained everywhere else.

### Primary
- **Sun-Baked Terracotta** (`hsl(16 80% 41%)`): The single brand action colour.
  Primary buttons, the active navigation pill, focus rings, links, the
  meal-time "snack" badge. Reserved for action and current state — never used
  as a decorative fill. Deepened from the original brighter terracotta so white
  text clears WCAG AA (5.35:1 at rest, 4.57:1 on the `/90` hover composite).

### Secondary
- **Garden Forest Green** (`hsl(155 42% 36%)`): The complementary action /
  affirmative colour. Secondary buttons, the "vegetables" and "lunch" badges,
  positive accents. The herb to terracotta's clay.

### Tertiary
- **Golden Amber** (`hsl(42 90% 58%)`): The highlight. Warm emphasis, the
  "breakfast" badge, hero gradient warmth. Always carries **dark ink** text
  (amber + white is unreadable at 1.75:1 — forbidden).

### Neutral
- **Warm Cream** (`hsl(38 35% 97%)`): The body background. The signature
  ground; never a true white, never a cool grey.
- **Fresh Card** (`hsl(36 40% 99%)`): Card, popover and panel surface — a touch
  brighter than the body so cards lift off the cream without a hard edge.
- **Cocoa Ink** (`hsl(20 15% 18%)`): Primary text. Warm near-black, not pure
  black. 12.9:1 on cream.
- **Stone** (`hsl(20 12% 40%)`): Muted/secondary text and placeholders. Deepened
  to clear WCAG AA (5.5:1 on cream, 5.7:1 on card) — see the Legible Muted Rule.
- **Warm Sand** (`hsl(36 30% 92%)`): Muted fills, hover backgrounds, ghost-button
  hover, disabled surfaces.
- **Soft Clay** (`hsl(36 25% 87%)`): Borders, inputs, dividers. Hairline only.
- **Chili Red** (`hsl(0 72% 48%)`): Destructive actions and errors only. White
  text clears AA (5.24:1).

### Category & Meal-Time Badges
A dedicated semantic palette beyond the core roles — each food category and
meal slot has its own paired background + foreground token (`--badge-meat`,
`--badge-fish`, `--badge-vegetables`, `--badge-breakfast`, `--badge-dinner`…).
These are an **information layer**, not decoration: the colour and the text
label always travel together so colour is never the sole signal.

### Named Rules
**The One Accent Rule.** Terracotta is the only colour that means "act or
current". It appears on a small fraction of any screen. If two things are
terracotta and only one is the primary action, one is wrong.

**The Legible Muted Rule.** Stone muted text is tuned to clear WCAG AA on both
the cream body (5.5:1) and the brighter card surface (5.7:1). Do not lighten it
"for elegance" — that's how it slips back under 4.5:1. Body copy and anything a
user must read still goes in Cocoa Ink; Stone is for genuinely secondary
metadata only.

**The Warm-Dark Rule.** Dark mode is warm, never cold. Backgrounds are warm
charcoal (`hsl(22 18% 10%)`), text is warm off-white. A cool blue-grey dark
theme is off-brand.

## 3. Typography

**Display Font:** Fraunces (with Georgia, serif fallback) — optical-sizing on.
**Body Font:** DM Sans (with system-ui, sans-serif fallback) — with stylistic
sets `cv02 cv03 cv04 cv11` enabled on `body`.

**Character:** A true contrast pairing — a high-personality optical serif for
headings against a clean, friendly geometric-humanist sans for everything else.
Fraunces brings the editorial, hand-set warmth of a cooking magazine; DM Sans
keeps the working UI calm and legible. The contrast axis (serif display + sans
body) is deliberate; this is never two similar sans-serifs fighting.

### Hierarchy
- **Headline** (Fraunces, 600, ~1.875rem, 1.15): Page-level titles.
- **Display / Title** (Fraunces, 600, 1.5rem `text-2xl`, tracking-tight): Card
  titles and section headings — the most common large type in the app.
- **Body** (DM Sans, 400, 1rem, 1.6): Default reading text. Cap prose at 65–75ch.
- **Label** (DM Sans, 500, 0.875rem `text-sm`): Buttons, nav items, form labels,
  compact UI text.
- **Caption / Badge** (DM Sans, 600, 0.75rem `text-xs`): Badges, fine print,
  metadata.

### Named Rules
**The Serif-Heads-Only Rule.** Fraunces is for headings (h1–h4) and the
`.font-display` utility. It never sets body copy, button labels, input text, or
data. Display serif in a UI label is the tell of a misused pairing.

**The Fixed-Scale Rule.** This is product UI — type sizes are a fixed rem scale,
not fluid `clamp()`. A heading that shrinks inside a sidebar looks worse, not
designed.

## 4. Elevation

A **hybrid** system: warm, soft, low-contrast shadows for genuine lift, plus
tonal layering (cream body → brighter card surface) so containers read even
before a shadow lands. Shadows are tinted with the ink hue
(`hsl(20 15% 18% / …)`) rather than neutral black, so they stay warm. In dark
mode they switch to true black at higher opacity for depth.

### Shadow Vocabulary
- **shadow-sm** (`0 2px 8px hsl(20 15% 18% / 0.06)`): Resting cards, buttons,
  the active nav pill. The default lift.
- **shadow-md** (`0 4px 16px hsl(20 15% 18% / 0.10)`): Hover state for cards and
  primary buttons; raised panels.
- **shadow-lg** (`0 8px 32px hsl(20 15% 18% / 0.14)`): Dialogs, popovers,
  floating surfaces.

### Named Rules
**The Warm-Shadow Rule.** Shadows are tinted with the foreground ink hue, never
pure neutral grey/black in light mode. A cold grey shadow on cream looks dirty.

**The Lift-On-Intent Rule.** Cards rest at `shadow-sm` and rise to `shadow-md`
on hover — depth responds to interaction, it isn't a permanent heavy drop
shadow. If it looks like a 2014 Material card, the shadow is too dark.

## 5. Components

Buttons, cards, inputs and badges all share one rounded, soft, warm vocabulary.
Every interactive element ships its full state set: default, hover, focus
(visible 2px terracotta ring with offset), active, disabled.

### Buttons
- **Shape:** Gently rounded (`rounded-md`, 12px). Pill-shaped only for the nav
  and badges.
- **Primary:** Terracotta fill, white text, `shadow-sm` rising to `shadow-md` on
  hover; background darkens (`bg-primary/90`). Padding `0.5rem 1rem`, height
  2.5rem (`lg` size: height 3rem, `0 2rem`).
- **Secondary:** Forest-green fill, white text, same shadow behaviour.
- **Outline:** Soft-clay border on the brighter card surface; hover fills with
  warm sand.
- **Ghost:** Transparent; hover fills with warm sand. No border at rest.
- **Hover / Focus:** All transitions `transition-all duration-300`. Focus shows
  a 2px terracotta ring (`ring-ring`) with a 2px offset. Disabled drops to 50%
  opacity, pointer-events off.

### Chips / Badges
- **Style:** Fully pill-shaped (`rounded-full`), `text-xs` semibold, 1.5rem tall,
  transparent border, `0.125rem 0.625rem` padding.
- **Category variant:** Carries its own semantic background+foreground pair from
  the badge palette (meat, fish, vegetables, fruits, dairy, grains, drinks,
  canned, addons, other) and the meal-time set (breakfast, lunch, dinner, snack,
  dessert). The label text always accompanies the colour.

### Cards / Containers
- **Corner Style:** Soft (`rounded-lg`, 14px).
- **Background:** Fresh-card surface (`hsl(36 40% 99%)`), one tonal step above
  the cream body; an optional `--gradient-card` adds a faint vertical warmth.
- **Shadow Strategy:** `shadow-sm` at rest → `shadow-md` on hover (see Elevation).
- **Border:** Hairline soft-clay (1px) — full border, never a coloured side-stripe.
- **Internal Padding:** Generous `1.5rem` (`p-6`); header/content/footer share it.

### Inputs / Fields
- **Style:** Cream background, 1px soft-clay border, `rounded-md`. Height 2.5rem,
  `text-base` on mobile shrinking to `text-sm` at `md`.
- **Hover:** Border shifts toward the terracotta ring colour.
- **Focus:** Border becomes terracotta + a 2px terracotta ring with offset.
- **Affordances:** Password fields get an inline show/hide toggle; optional
  trailing icon slot. Disabled drops to 50% opacity with `not-allowed` cursor.

### Navigation
- **Desktop:** Horizontal pill nav (`lg:` and up). Active item = terracotta fill +
  white text + `shadow-sm` + icon scaled to 110%. Inactive = stone text, hover
  fills warm sand and lifts the icon −0.5px. Pill shape (`rounded-full`),
  `text-sm` medium, `transition-all duration-300`.
- **Mobile:** A fixed bottom bar (`NavigationBottomBar`) replaces the desktop
  pills — structural responsive behaviour, not shrunken desktop nav.

### Signature: Paper Grain & View Transitions
A fixed full-viewport fractal-noise SVG overlay at `opacity: 0.035`
(`z-index: --z-grain`, pointer-events none) gives every screen a faint paper
tooth — the single most identity-defining detail. Route changes use the native
`@view-transition { navigation: auto }`. Both collapse under
`prefers-reduced-motion`.

## 6. Do's and Don'ts

### Do:
- **Do** keep the warm cream ground (`hsl(38 35% 97%)`) as the body on every
  screen. Cards sit one tonal step brighter on it.
- **Do** set every heading (h1–h4) in Fraunces and everything else in DM Sans.
- **Do** reserve terracotta for action and current state — the One Accent Rule.
- **Do** pair amber backgrounds with dark ink text, never white (white-on-amber
  is 1.75:1).
- **Do** put body copy a user must read in Cocoa Ink, not Stone muted — the
  Legible Muted Rule.
- **Do** tint shadows with the warm ink hue and let cards lift from `shadow-sm`
  to `shadow-md` on hover.
- **Do** pair every category/meal colour with its text label so colour is never
  the only signal.
- **Do** give every interactive element its full state set with a visible 2px
  terracotta focus ring.

### Don't:
- **Don't** build a **clinical fitness-tracker** look — cold blue-green calorie
  dashboards, ring charts, "food as data". Macros are welcome; the white-coat
  aesthetic is forbidden.
- **Don't** drift toward **generic SaaS / AI tool** styling: dark purple
  gradients, neon accents, glassmorphism. None of it.
- **Don't** ship the **noisy e-commerce marketplace** pattern: cramped identical
  card grids, sale banners, dense look-alike rows.
- **Don't** fall into **corporate enterprise** greyness — faceless Material-by-
  default tables and forms with no warmth.
- **Don't** use gradient text (`background-clip: text`) or coloured side-stripe
  borders (`border-left` > 1px as an accent). Use full borders or background
  tints.
- **Don't** set body text, button labels, input text, or data in Fraunces.
- **Don't** use fluid `clamp()` heading scales — this is product UI; the rem
  scale is fixed.
- **Don't** make terracotta a decorative fill. If it isn't an action or the
  current state, it isn't terracotta.
