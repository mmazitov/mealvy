# React Doctor — verified false positives

Diagnostics confirmed (by reading the code against each rule's own validation
prompt) to be false positives or not-actionable. React Doctor's local-triage
playbook reads this file and drops matching diagnostics on future scans.

Reviewed: 2026-06-27. Re-verify a line before trusting its entry if the code
around it has changed since.

## react-doctor/no-pass-data-to-parent — `src/features/dishes/ui/DishForm.tsx`

The flagged `useEffect` calls `setValue(...)` ×4. `setValue` comes from
react-hook-form (destructured from `useAddDish`/`useEditDish`), **not** a
callback prop passed by a parent. The rule targets a child shipping data
upward through a parent-supplied function; an RHF form setter is the exempt
setState-style case. Component props are only `dish`, `products`, `isEditMode`.

## react-doctor/no-derived-useState — `src/features/menus/ui/menuCard/MenuCard.tsx`

`editName` / `editStartDate` / `editEndDate` are genuine editable form state
with multiple independent setters (onChange + reset on edit/cancel/save). There
is no cleanup-less effect syncing them from props, so they are independent
local state, not derived-and-synced state.

## react-doctor/no-derived-state, no-event-handler, no-cascading-set-state — `src/features/schedule/hooks/useMenuPlanner.ts`

- `no-derived-state`: `menuPlan` is editable local state seeded from async
  server data and then mutated by add/remove handlers — cannot be computed
  during render.
- `no-event-handler`: the effect reacts to an Apollo query subscription
  (`plannerItemsData?.getPlannerItems`) that no event handler can observe.
- `no-cascading-set-state`: the setters touch disparate independent state
  slices; a useReducer rewrite would not be behavior-preserving.

## react-doctor/no-derived-state — `src/pages/AcceptInvitation.tsx`

`status` / `errorMessage` are async result state set from mutation
`onCompleted` / `onError` callbacks — not derivable during render.

## react-doctor/exhaustive-deps — intentional mount-only / already-correct effects

- `src/shared/hooks/useFormPersist.ts`: run-once draft-restore effect with a
  documented `eslint-disable` + WHY comment; adding deps would re-run the
  restore and clobber user edits.
- `src/features/shoppingList/hooks/useShoppingListPage.ts`: intentional
  mount-only URL-sanitizing effect (documented `eslint-disable`); adding deps
  would fight user navigation.
- `src/pages/AcceptInvitation.tsx`: deps are already exhaustive and correct
  (`[invitationId, acceptInvitation]` and a stable-ref `[]`).

## react-doctor/rendering-hydration-no-flicker + no-initialize-state — `src/shared/components/themeToggle/ThemeToggle.tsx`

The `mounted` flag is the documented `next-themes` mount guard. The provider
uses `enableSystem` + `defaultTheme="system"`, so the resolved theme is
unknowable on first client render. Neither suggested fix can compute "first
render done" without reintroducing the theme flash the guard prevents.

## react-doctor/no-multi-comp — `src/shared/components/ui/tabs.tsx`

Canonical shadcn/ui primitives barrel. Declares 3 className-merging components
(not thin passthroughs), narrowly missing the 4+-component shadcn exemption.
Splitting would fragment a standard primitive.

## react-doctor/prefer-tag-over-role — `src/features/auth/ui/EmailVerificationBanner.tsx`

`role="status"` is the standard live-region pattern for a notification banner.
The only native tag with an implicit `status` role is `<output>`, which is
semantically a form-result element — swapping would be a semantic regression.

## react-doctor/async-await-in-loop — `public/sw/queue.js` (`replayQueue`)

Replay is intentionally sequential: queued offline mutations can be causally
ordered (create-then-edit), so they must reach the server in insertion order.
This is the rule's documented "ordered writes" exemption. See the NOTE in code.

## react-doctor/unused-file — `public/sw/*.js`

`caches.js`, `logger.js`, `main.js`, `queue.js`, `strategies.js`, `utils.js`
are service-worker modules loaded via `importScripts(...)` in `public/sw.js`,
not ES imports — React Doctor's module graph can't see them. Deleting any
breaks the PWA.

## deslop/unused-export — `src/shared/api/graphql/planner.gen.ts`

GraphQL codegen output. Never hand-edit (`*.gen.ts`); regenerate via
`yarn generate`. Unused exports here are a codegen artifact, not dead code to
remove by hand.
