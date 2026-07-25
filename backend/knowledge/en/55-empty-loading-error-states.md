# Empty, Loading, and Error States: Trust and Continuity

Drop-off in FirstClick sessions often does not occur on the “happy path,” but rather in empty, loading, and error edge cases. These three together answer the user’s questions: “Is the system working? Did I do something wrong? What should I do?” This file is the UX standard for edge cases. [kb:55-empty-loading-error-states]

## Scope

Scope: first-use empty state, empty list after filtering, skeleton/spinner/progress, timeout, network error, 4xx/5xx user-facing errors, permission errors, partial loading (one widget fails), and recovery CTAs. Out of scope: form field validation ([kb:56-form-design]), special patterns for zero search results (cross-ref with [kb:53-search-ux]), the full “aha moment” strategy ([kb:02-onboarding-activation]) — here, only the component quality of empty states is addressed.

Heuristic: Every edge case should state (1) what happened, (2) why it might have happened, and (3) the next action. If any of these three are missing, friction or confusion increases.

## Diagnostic Signals

### Empty
1. Only “No data yet” / “No data” — no task.
2. Illustration present, no CTA; decorative empty.
3. Welcome + empty dashboard; high onboardingRisk.
4. Filter empty uses same text as first empty; user thinks “data was deleted.”

### Loading
5. Indeterminate spinner, no time estimate; 3+ seconds of silence damages performance perception ([kb:64-performance-perception]).
6. Layout jump: no skeleton, content shifts when loaded; risk of misclick.
7. Infinite loading: error and loading are not separated; user is forced to wait.

### Error
8. Technical stack trace or raw code (“Error 500”, “ECONNRESET”) exposed to end user.
9. “Something went wrong” + only option is to refresh the page; loss of context.
10. General error on form submission; no indication of which field/why.
11. Permission error uses accusatory language (“You do not have permission”) — no solution path (ask admin, upgrade plan).

Positive signals: empty states explain what/why/CTA/example; skeleton reserves space; progress for determinate operations; error messages use human language + correlation/request code (for support) + retry / go back / support; partial error only affects the relevant panel.

## Persona Reactions

- **busy-professional**: If loading is long, will abandon; wants a single clear CTA in empty states. In error, if “how long will it take / who do I contact” is missing, will see it as a waste of time.
- **non-technical**: Technical error = personal guilt or panic. “You did something wrong” language is destructive. Step-by-step recovery + visual guide needed.
- **skeptical**: Vague error feels like “hidden malfunction.” Honest status + link to known issues page maintains trust. Fake empty (data exists but failed to load) is the worst scenario.
- **price-sensitive**: Redirecting to upgrade after error feels manipulative; rescue first, then upsell.
- **student / first-timer**: Thinks empty state means “broken product.” Template/example + “why is it empty?” explanation is essential.

## Good and Bad Examples

**Bad empty**
Faded icon in the center: “Nothing here yet.” Nothing underneath. First-timer leaves.

**Good empty**
Title: “No invoices yet.” Body: “Once you issue your first invoice, it will be listed here.” CTA: “Create invoice.” Secondary: “View sample invoice.” Heuristic: only one primary CTA.

**Bad loading**
Full-screen spinner, 8 seconds, then blank page. User refreshes; risk of duplicate records.

**Good loading**
List rows as skeletons; top says “Loading invoices.” After 5 seconds, if still not loaded: “Refresh” + “Contact support if the issue persists.” For long tasks (export), determinate progress.

**Bad error**
Red box: `TypeError: Cannot read property 'map' of undefined`. Non-technical panics; skeptical calls it “amateur.”

**Good error**
“Invoices could not be loaded right now. Please try again later.” Buttons: Retry | Return to homepage. Small text: “Support code: 8F2A.” In forms: next to field, “Email appears invalid” — not a general banner.

**Bad partial fail**
If one API fails, the entire dashboard is a white screen.

**Good partial fail**
One of three widgets shows an error panel; others continue to work. User continues to get partial value.

## FirstClick Score Effects

- **clarity**: How understandable the status language is. Technical jargon clarity↓.
- **adoption**: Empty→CTA path connected to aha increases adoption↑; abandonment during loading/error decreases adoption↓.
- **onboardingRisk**: Empty without guidance + welcome = high risk. Risk of data loss after error also means high friction.
- Trust: honest error > fake success. Trust dimension is clearly affected for skeptical persona.
- Timeline: Empty friction during setup; error in critical operation = high; repeated loading timeout = performance + friction.

## Action Checklist

1. Quote empty state texts from the corpus; check if there is a CTA.
2. Check the text difference between filter empty and first empty.
3. Note skeleton/progress/timeout behavior for loading.
4. Classify error messages: technical / general / action-oriented.
5. Assess the risk of double submit for retry — if unsure, don’t make it up; note “not seen in corpus.”
6. Check if there is a solution path in permission errors.
7. Compare the “seamless experience” promise on landing with actual error UX.
8. Recommendation: apply the what/why/next step trio to any state missing them.

## Attribution Discipline

- Observed empty/loading/error texts: [doc:…] / [web:…].
- Edge case rules: [kb:55-empty-loading-error-states].
- If form validation errors are separate: [kb:56-form-design].
- Performance perception: [kb:64-performance-perception].
- “Skeleton increases conversion” is made up; use layout jump and indeterminacy heuristics.
- Do not write error codes not seen in the product.

## Analyst Implementation Note

Write each edge case finding as an independent chunk: state type (empty|loading|error), quote, missing trio element (what/why/action), persona panic/abandonment risk, score (clarity|adoption|onboardingRisk|trust). Example: “non-technical, ‘Error 500’ on invoice record → confusion+panic; recommendation: human language + retry; onboardingRisk↑.”

## Deep Implementation: Edge Case Matrix

FirstClick reads edge cases in a matrix: state type × user self-blame × recovery quality.

| State         | Does user blame self? | Good recovery                |
|---------------|----------------------|------------------------------|
| empty first   | often (“is it broken?”) | task CTA + reason           |
| empty filter  | sometimes            | clear filters                |
| loading short | rarely               | skeleton                     |
| loading long  | increases            | progress + escape            |
| error network | low                  | retry                        |
| error validation | yes               | field + rule                 |
| error permission | mixed             | who to ask / which plan      |

This table is a template; no claim of percentages. Analyst selects the matrix cell for each finding.

**Empty state types**: First use, deleted content, unauthorized empty, zero search results, post-success empty (everything done). Using the same illustration for all reduces clarity↓. In filter empty, a “create” CTA is misleading — “no results, broaden filter” is needed.

**Loading types**: Indeterminate spinner for short tasks; determinate progress or async “notify when done” for long tasks. If there is optimistic UI, show fail path ([kb:64-performance-perception]).

**Error types**: User-correctable (password), temporary (network), permanent (permission), unknown (5xx). Language changes accordingly. No blame in unknown; support code may help — don’t make up codes if not present.

**Accessibility**: If error is only a red border, a11y is broken ([kb:58-accessibility]). If aria-live announcement is not visible in corpus, don’t speculate “screen reader OK”; note the visible text channel.

**Double submission**: If “retry” after error is not idempotent, risk of duplicate invoice/payment. If not guaranteed in corpus, write softly “double action risk should be assessed”; don’t claim definite bug.

RAG chunk keys: what-why-action, skeleton, progress, support code, partial fail, filter empty, accusatory language, timeout.

## Scenario Lab: Abandonment in Edge Cases

**Scenario A:** First-timer sees empty “No data,” thinks product is broken. Single illustration, no CTA. onboardingRisk↑. Recommendation: what/why/CTA.

**Scenario B:** Busy-professional sees 20s spinner on export, then white screen. Refreshes; fears duplicate file. friction high. Recommendation: progress + email delivery or clear fail.

**Scenario C:** Non-technical sees stack trace in form. Panic. clarity↓. Recommendation: human language + field error.

**Scenario D:** Skeptical sees “something went wrong” + only upgrade CTA. Manipulation. trust↓. Recommendation: rescue first.

**Scenario E:** Filter empty = first empty text. User thinks data was deleted. Confusion. Recommendation: “no results for filter / clear filter.”

Edge case texts are also subject to microcopy discipline ([kb:60-microcopy]). “Oopsie!” childish tone breaks trust in B2B busy-professional; overly cold legal language leaves non-technical users isolated. Tone should be consistent with product voice.

## Operational Control: Edge Case QA List (Analyst)

1. Empty text + CTA. 2. Filter empty difference. 3. Skeleton present. 4. Progress for long tasks. 5. Error language class. 6. Retry. 7. Permission solution path. 8. Partial fail. 9. Technical leakage. 10. “Seamless” promise drift.

Edge cases are the intersection of microcopy, performance perception, and onboarding. Don’t reduce findings to a single dimension; select a primary dimension (clarity vs onboardingRisk vs trust) and cross-reference the others.
