# Navigation Design: Wayfinding and Location Awareness

In FirstClick, navigation assessment measures whether the user can confidently progress within the product. Information architecture defines the concepts; navigation provides the paths to those concepts, the ability to return, and the awareness of “where am I right now.” This file is the navigation UX standard in the FirstClick knowledge base. [kb:52-navigation]

## Scope

Scope: global nav (top/left), local nav, breadcrumb, tabs, mobile bottom bar, command palette entries, back/forward behavior, active state indicators, and “escape hatches” (home, search, help). Out of scope: IA grouping logic ([kb:51-information-architecture]), search results UX ([kb:53-search-ux]), purely visual weight ([kb:59-visual-hierarchy]).

Heuristic: On every screen, the user should see (1) their current location, (2) the parent level, and (3) the next possible task. If any of these three are missing, look for lost/confusion signals in the FirstClick timeline.

## Diagnostic Signals

1. **Unclear active state**: It’s not clear which nav item is selected via color/contrast/icon. Especially the skeptical persona feels “I’m not in control.”
2. **Multiple primary CTAs + nav conflict**: Top bar has 3 buttons + a crowded left menu; attention is scattered, the clear “next step” for adoption is lost.
3. **No breadcrumb + deep page**: In deep paths like Settings > Billing > Tax > New Rule, the only way back is the browser’s back button. Riskier on mobile.
4. **Incorrect back behavior**: In a modal or wizard, back sends the user to the dashboard, losing form data (see also [kb:56-form-design]).
5. **Hamburger maze on mobile**: The entire desktop menu is crammed into a hamburger, no bottom bar; outside the thumb zone (see [kb:57-mobile-ux]).
6. **New tab trap**: Every report opens in a new tab; user loses product context, confusion over “how many apps did I open?”
7. **Hidden critical path**: “Invite” or “Import” is only in the avatar menu. This means the activation event is hidden.
8. **Dead link / coming soon in nav**: “Coming soon” items in primary nav erode trust.
9. **Icon-only nav**: A row of icons without tooltips; as bad as jargon for non-technical users.

Positive signals: consistent left/top placement, clear emphasis on selected item, location shown via breadcrumb or page title, ≤5 primary tasks in mobile bottom bar, Cmd-K as a power user escape, help/docs always accessible.

## Persona Reactions

- **busy-professional**: If “today’s task” isn’t visible in nav, considers the product slow. Keyboard shortcuts and recents support adoption. If a long tour modal blocks nav, wants a skip option.
- **non-technical**: Icon + jargon label combinations are intimidating. Needs breadcrumb or plain-language page title to answer “Where am I?” If can’t find their way back after a wrong click, will leave.
- **skeptical**: Broken links, “coming soon,” inconsistent back = immature product. Transparency of security/settings in nav (account, billing visibility) can be a trust signal; excessive hiding backfires.
- **price-sensitive**: Repeating the upgrade CTA at every nav level feels pushy; “my plan” should be in only one place.
- **student / first-timer**: Learning path should be visible in nav (“Getting Started,” “Tutorial”). A pure feature list overwhelms first-timers.

Make navigation friction concrete in persona notes: “busy-professional looks for ‘Reports’ in the second level of the left menu; primary task ‘Approvals’ is hidden under the avatar.”

## Good and Bad Examples

**Bad — nav bloat**
Top bar: logo, 9 text links, search, notifications, help, avatar, “Upgrade,” language selector. No item is primary in visual hierarchy. Clarity drops.

**Good — layered nav**
Top: logo, global search, notifications, avatar. Left: 5–7 task groups. In-page: tabs (Summary / Activity / Settings). Breadcrumb: Home > Customers > Acme. Location is always readable.

**Bad — modal trap**
User opens a full-screen modal from settings; ESC doesn’t work, X is small in the corner, back breaks browser history. Skeptical persona feels “I’m trapped.”

**Good — predictable back**
In wizard steps, “Back” goes to the previous step, “Cancel” exits with confirmation; browser back has the same semantics. Draft auto-save signal is shown.

**Bad — mobile copy-paste from desktop**
15 items in hamburger, no bottom bar, no FAB. Primary create action is a three-tap process.

**Good — mobile-first paths**
Bottom bar: Home, Tasks, Create, Inbox, Profile. “Create” is centered. Everything else is under “More.” Heuristic: primary mobile tasks should be reachable with one thumb, not three taps.

## FirstClick Score Impacts

- **clarity**: Location awareness + label readability. Active state and page title are the navigation dimensions of clarity.
- **adoption**: Time/difficulty to reach value-producing actions via nav. Hidden activation CTAs reduce adoption.
- **onboardingRisk**: Nav confusion + forced tour in the first session = high risk. If there’s no “Skip,” risk increases further.
- Friction classification: wrong door = medium; back that loses data = high; dead link = high trust + friction.
- Promise of “one-click to anywhere” on landing vs. deep nav in practice → citation-worthy contradiction, grounds for clarity and adoption findings.

## Action Checklist

1. List global nav items from the corpus; record their count and labels.
2. Note whether the active/selected state is visually distinguishable.
3. Write out the nav path for the most critical task step by step; count the depth.
4. Check breadcrumb / page title / back behavior.
5. On mobile, assess whether the top 3 primary tasks are within the thumb zone (cross-check with [kb:57-mobile-ux]).
6. Mark “coming soon,” dead, or unauthorized links.
7. Count the frequency of Upgrade / paywall CTAs in nav; if it feels pushy, lower retention/trust notes.
8. Suggest: delete/merge/move items to a lower level; don’t invent new labels, match corpus language.

## Citation Discipline

- Observed menu and button texts: [doc:…] / [web:…].
- Navigation heuristics: [kb:52-navigation].
- If IA root cause is separate: [kb:51-information-architecture] + this file together.
- Same lostness in past session: [past:…].
- Don’t invent fake stats like “%Y of users get lost in hamburger”; use qualitative observation + heuristic.

## Analyst Implementation Note

Navigation findings for RAG should be chunked as follows: issue type (location / depth / mobile / back), quoted UI text, affected persona, score dimension (clarity|adoption|onboardingRisk), one-sentence fix. Example: “non-technical, icon-only left nav, no page title → clarity↓; suggestion: add text label + breadcrumb.”

## Deep Dive: Navigation Patterns and Anti-Patterns

**Mega menu anti-pattern**: A mega menu that works on landing becomes noise if repeated on every app page. If there’s a mega menu in the app, FirstClick asks: is this for discovery or daily work? If for daily work, simplify sub-paths.

**Tab vs route**: In-page tabs are local nav; shouldn’t be confused with global nav. If the user loses their tab selection with browser back, location awareness is broken. Analyst should note back semantics.

**Command palette**: Cmd/Ctrl+K is a power user escape; can save busy-professional adoption. But if only a command palette exists, it’s insufficient for non-technical and first-timers. Evaluate both together: visible nav + search/command.

**Notification badge trap**: If every nav item has a red dot, prioritization dies ([kb:59-visual-hierarchy]). Skeptical persona experiences “alert fatigue.” Badges should only be on items requiring action — heuristic.

**Path to help**: Support, docs, chat should always be in the same place. If help disappears during onboarding, non-technical users are at risk of panic. If there’s no help entry in the corpus, note “no persistent help entry observed.”

**Deep link and sharing**: If “share this approval page” is broken, retention suffers in team products. Quote any broken links seen; don’t invent default deep link architecture.

Distinguishing navigation from IA: wrong group is an IA issue; hidden CTA in the right group is a navigation issue. Separate the root cause in one sentence. “Got lost” isn’t enough for a score rationale — specify if the door is wrong, the path is too long, or back is broken.

RAG chunk keys: active state, breadcrumb, thumb zone, hamburger, back semantics, dead link, command palette, badge fatigue.

## Scenario Lab: Navigation Loss

**Scenario A — Approver (busy-professional):** Three approvals on mobile in the morning. No bottom bar, approvals open from notifications but back drops to a random list, not “Home.” Result: abandonment after the second approval. Score: adoption↓ friction high. Suggestion: fixed “Next approval” in approval detail + predictable back.

**Scenario B — First-timer:** After signup, 12 jargon items in the left menu. “First task” CTA is in the avatar menu. Empty “Welcome.” onboardingRisk↑ clarity↓. Suggestion: simplified menu + move empty CTA to primary path.

**Scenario C — Skeptical admin:** Billing is only at a hidden URL; not in nav. The “What’s the price?” question is unanswered. Trust↓. Suggestion: show account/plan entry in a predictable place (if plan exists in corpus).

**Scenario D — Non-technical:** Icon-only rail, tooltips require hover, not available on mobile. Confusion. Suggestion: text label or accessible name + mobile sheet.

These scenarios are templates; do not invent characters for the product corpus. Select and quote the scenario matching the observed UI.

Navigation regression control: Adding items to primary nav as new features are added is the default anti-pattern. Heuristic: new features should first be within the relevant group, only promoted after proven use. Analyst should not praise “nav bloat” as feature richness.
