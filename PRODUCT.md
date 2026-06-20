# Product

## Register

product

## Users

Home cooks and everyday meal-planners who want to organise the week around food
they actually enjoy. They arrive to plan a weekly menu, build recipes and
products, generate a shopping list, and — as a welcome side effect — see the
nutritional value (calories, protein, fat, carbs) of what they're planning.
Two overlapping mindsets: the **planner** ("what are we eating this week, and
what do I need to buy?") and the **nutrition-aware** user ("what's the
macro breakdown of this dish?"). The interface serves both without forcing
either to feel like data entry.

## Product Purpose

Mealvy is a food-tracking and meal-planning platform. It lets people create and
manage dishes and products, plan meals across a weekly/monthly schedule, search
and filter their library, and automatically compute nutrition for any dish or
day. It works as an installable PWA with offline support and Google OAuth.
Success looks like a user who opens the app on Sunday, lays out the week's
meals in a few minutes, and walks away with a plan and a shopping list — the
nutrition numbers there when they want them, never in the way.

## Brand Personality

**Warm, homey, appetizing.** Mealvy should feel like a well-loved kitchen, not
a calorie spreadsheet. Food here is a pleasure, not a metric to discipline. The
voice is friendly and confident; the surface is warm and tactile (terracotta,
forest green, golden amber over a cream ground, a serif display face, a faint
paper grain). Editorial warmth of a good cooking magazine, applied to a tool
that has to disappear into the task.

## Anti-references

- **Corporate enterprise software** — grey dense tables, faceless forms,
  Material-by-default with no character. Mealvy has a point of view.
- **Noisy e-commerce marketplace** — cramped identical card grids, shouting
  sale banners, dense rows of look-alike products competing for attention.
- **Generic SaaS / AI tool** — dark theme with purple gradients, neon accents,
  glassmorphism, the "another startup dashboard" look. None of it.
- (Notably welcome, *not* avoided: nutrition tracking itself. The rejection is
  the **clinical** framing of it — cold blue-green calorie dashboards, ring
  charts, "food as data". Macros belong here; the white-coat aesthetic does not.)

## Design Principles

- **Food first, numbers second.** The dish, the plan, the appetite lead.
  Nutrition is present and accurate but never the headline of a screen.
- **Warmth is structural, not decorative.** The cream ground, the serif
  headings, the category colours carry the brand. We don't bolt warmth on with
  a gradient; it's in the palette and type from the start.
- **The tool disappears into the task.** Earned familiarity over novelty.
  Standard affordances, consistent component vocabulary, no invented controls.
  A user fluent in good apps should trust it on sight.
- **Colour means something.** Category and meal-time badges encode real
  information (meat, fish, vegetables; breakfast, lunch, dinner). Accent colour
  is reserved for action and state, never sprinkled for decoration.
- **Calm density.** Show enough to plan a week at a glance without crowding.
  Generous spacing and rhythm over packed grids.

## Accessibility & Inclusion

- Target **WCAG 2.1 Level A** as the committed floor, with AA contrast
  (4.5:1 body, 3:1 large text) as the working standard for the warm palette —
  the cream/terracotta combination must be verified, not assumed.
- Full keyboard navigation with a visible skip-to-content link and visible
  focus rings (never `outline: none` without a replacement).
- `prefers-reduced-motion` is honoured globally (animations collapse to near-
  instant).
- Colour is never the sole information channel: category and meal badges pair
  colour with text labels.
- Dark mode is a first-class theme (system-preference aware via `next-themes`),
  not an afterthought.
