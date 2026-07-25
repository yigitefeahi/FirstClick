# Mobile UX: One-Handed Use, Interrupted Attention, Small Surface

FirstClick’s mobile evaluation is not limited to the question “Is it responsive?” On mobile, tasks are performed in short sessions, with one hand, and frequent interruptions. Interfaces simply shrunk from desktop reduce adoption and clarity. This file is the mobile UX standard. [kb:57-mobile-ux]

## Scope

Scope: thumb zone, touch target size, bottom navigation, hamburger dependency, forms and keyboard, horizontal scroll traps, safe area, gesture conflicts, offline/weak network cues, and the promise of a “mobile app” versus mobile web quality. Out of scope: general navigation model ([kb:52-navigation]), accessibility WCAG depth ([kb:58-accessibility]), performance lab metrics (cross-read with [kb:64-performance-perception]).

Heuristic: The primary task should be reachable with the thumb, from the lower half of the screen, with one hand. Top-corner-only CTAs create mobile friction.

## Diagnostic Signals

1. **Desktop compression**: Tables and multi-column layouts are “readable” via horizontal scrolling; data gets lost.
2. **Small touch areas**: 24px icons side by side; mis-taps (heuristic: ~44×44 CSS px target).
3. **Bloated sticky top bar**: Logo + search + 4 icons crush content; no value above the fold.
4. **Primary action trapped in hamburger**: Create/Confirm inside menu; outside thumb zone.
5. **Keyboard covers form**: Fixed bottom CTA stays under keyboard; can’t submit.
6. **Hover-dependent UI**: Desktop tooltip info missing on mobile; clarity↓.
7. **Gesture conflict**: Swipe-to-delete + browser back gesture; fear of accidental delete.
8. **Full-screen modal trap**: Close target is small; skeptical “prison” feeling.
9. **Network silence**: Long spinner on weak 4G; no offline message.
10. **Promise**: “Manage from anywhere” but critical flow is broken on mobile → citation-backed contradiction.

Positive signals: bottom bar ≤5, centered creation, large touch targets, sticky visible CTA in forms, correct inputmode, cards stacked vertically, critical data prioritized, readable font size, safe-area padding.

## Persona Reactions

- **busy-professional**: 2-minute task on the go/in between meetings. If approval and quick response don’t work on mobile, the product is considered “desktop-only”; adoption↓.
- **non-technical**: Small controls and hidden menus cause panic. Large button + plain language.
- **skeptical**: Broken payment or permission flow on mobile destroys trust. Contradiction between app store promise and poor PWA quality.
- **price-sensitive**: Constant full-screen upgrade prompts on mobile; selling before showing value.
- **student / first-timer**: Most first experiences may come from mobile. If first empty state + sign-up isn’t optimized for mobile, onboardingRisk↑.

## Good and Bad Examples

**Bad**
6-column table with horizontal scroll on dashboard; primary “New” at top right, 32px. No bottom bar.

**Good**
List cards; each card has a primary action. Bottom bar: Home, Inbox, +, Search, Profile. Creation via “+”.

**Bad form**
Fixed footer “Save” is under the keyboard; user can’t see what’s being saved.

**Good form**
CTA remains visible when keyboard opens or is in the “Next” toolbar. Fields are single-column.

**Bad hover**
Status explanation only in hover tooltip; missing on mobile.

**Good**
Same info is accessible under the row or via info sheet.

## FirstClick Score Impacts

- **clarity**: Readability, visible labels, info without hover. Small font size clarity↓.
- **adoption**: Critical tasks that can’t be completed on mobile → adoption↓.
- **onboardingRisk**: Broken mobile registration/setup is high risk — especially with student/first-timer traffic.
- Friction: mis-taps, gesture conflicts, keyboard covering = high.
- If landing mobile screenshot is better than real flow, note as drift finding.

## Action Checklist

1. Map out the path for the top 3 primary tasks on mobile; check if they’re within the thumb zone.
2. Qualitatively assess touch targets (too small / too close).
3. Note the balance of bottom bar / hamburger.
4. Check form + keyboard + CTA visibility.
5. List info dependent on hover.
6. Mark horizontal scroll and cut-off content.
7. Cross-read weak network/loading mobile behavior with [kb:55].
8. Recommendation: move to bottom bar, enlarge targets, convert table to cards — unless there’s a fake native app claim, don’t write it.

## Attribution Discipline

- Observed mobile UI: [doc:…] / [web:…] (note viewport).
- Mobile rules: [kb:57-mobile-ux].
- A11y conflict: [kb:58-accessibility].
- “Mobile conversion %X” is made up; use thumb zone and task completion heuristics.

## Analyst Implementation Note

Mobile chunk: task, break type (thumb|keyboard|hover|scroll|network), persona, score. Example: “busy-professional approval button in hamburger on mobile → adoption↓ friction medium; recommendation: bottom bar or in-list action.”

## Deep Implementation: Mobile Task Budget

Mobile sessions are short and interrupted. FirstClick does not celebrate “all desktop features on mobile”; it asks “are the top 3 critical tasks completable on mobile?”

**Task budget (heuristic):** Complete a task from a notification, quick creation, check status. Report design, complex automation, heavy tables can generally be left to desktop — but if the landing says “manage from anywhere,” critical approval/creation must not be broken on mobile.

**Touch and error:** Adjacent icons lead to accidental deletes/archives. Undo toast can be critical for mobile retention. If swipe-to-delete lacks confirmation or undo, friction is high + trust risk.

**PWA vs native promise:** If there’s an app store promise but only a broken mobile web, that’s drift. If there’s no native, recommend softening “app” language; don’t add fake store links.

**Interrupted attention:** Modal tours are more disruptive on mobile ([kb:61-onboarding]). Skip should be a large target. Tour balloons shouldn’t cover the form when keyboard is open.

**Network:** Coffee shop Wi‑Fi scenario. If there’s no offline/weak network message, non-technical users say “it’s broken” ([kb:64-performance-perception]).

**Safe area and sticky:** Bottom bar + home indicator conflict eats up the CTA. If there’s cut-off in corpus/screenshot, note it.

Persona matrix: busy-professional approval; student registration; skeptical payment security; non-technical large targets; price-sensitive full-screen upgrade pressure.

RAG chunk keys: thumb zone, bottom bar, hover dependency, horizontal scroll, keyboard covering, gesture, safe area, task budget.

## Scenario Lab: Mobile Drop-off

**A — Approval path:** Notification → detail → approval button small in top corner. Busy-professional accidentally goes back. Friction. Recommendation: bottom primary CTA.

**B — Registration:** Student faces 12 fields + wrong keyboard on mobile. onboardingRisk↑. Recommendation: reduce fields + inputmode.

**C — Hover ignorance:** Status only in desktop tooltip. Non-technical doesn’t get it on mobile. clarity↓.

**D — Upgrade wall:** Full-screen paywall on every launch. Price-sensitive. trust↓ adoption↓.

**E — Table:** Horizontal scroll + no fixed first column. Report “exists” but unreadable. Promise drift.

Perceived performance is more fragile on mobile ([kb:64-performance-perception]). The same API may be acceptable on desktop but cause drop-off on mobile — note separately.

## Operational Control

Thumb zone, target size, bottom bar, hover dependency, horizontal scroll, keyboard+CTA, gesture conflict, safe area, network message, promise alignment.

## Decision Framework: Is Mobile “Sufficient”?

FirstClick does not seek perfect parity on mobile; it seeks sufficiency for the critical path. Sufficiency checklist: (1) login/registration can be completed, (2) primary value action can be performed, (3) pending work can be seen and processed, (4) account/plan/security settings are accessible, (5) recovery is possible in case of error. If any of the five is broken, write a mobile adoption rationale.

Desktop parity obsession is harmful. Lack of a complex automation editor on mobile may not be an issue; but if “approve” and “create” are missing, it’s definitely a problem — especially if the landing promises mobile management. The analyst does not automatically count missing features as bugs; they measure the promise–usage contradiction.

One-handed use is the default heuristic. Left-top menu + right-top CTA + content below is costly for right-thumb use. Bottom bar or in-content primary action reduces this cost. This is not an anthropometric claim; it’s a common mobile UX rule.

Interrupted attention: users may close the keyboard, switch to WhatsApp, and return. Draft loss is high friction on mobile. “Draft saved” micro-signal also helps retention. If there’s no draft in corpus, don’t claim a fake save mechanism; say “I didn’t see draft assurance.”

App store screenshots versus real mobile web is a strong drift source for skeptical users. Quote visuals with [web:…]; if there’s no store account, don’t speculate on ratings/downloads.

## Unified Reading: Mobile × Other kb Files

A mobile finding is rarely alone. Nav hamburger maze connects with [kb:52-navigation], form keyboard covering with [kb:56-form-design], small empty CTA target with [kb:55-empty-loading-error-states], slow 4G silence with [kb:64-performance-perception]. In the FirstClick report, choose “mobile” as the primary frame and keep cross-references brief to keep RAG chunks clean.

Especially if activation is impossible on mobile ([kb:62-activation]), score impact is gathered in adoption and onboardingRisk; don’t soften with “a bit hard on mobile.” Conversely, if only a secondary report screen is weak on mobile, severity may stay low — unless the promise is mobile management.

The touch target heuristic (~44px) is not a strict anthropometric law; it’s enough to qualitatively note “mis-tap risk” for clusters of small adjacent icons. If there’s no measured px value in corpus, don’t make one up.

Final check: Can the user complete their primary task one-handed, standing, with half attention? The answer to this question is the summary of the FirstClick mobile verdict.
