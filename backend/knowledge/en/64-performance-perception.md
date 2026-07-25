# Performance Perception: Speed, Expectation, and Waiting UX

FirstClick evaluates performance not just by lab milliseconds, but by the user's judgment of "is the product fast or slow?" Perception is shaped by skeletons, progress indicators, optimistic UI, and network honesty. This file is the performance perception standard. [kb:64-performance-perception]

## Scope

Scope: first paint perception, interaction delay, spinner vs skeleton, long tasks (export, import), optimistic updates, timeout communication, mobile/weak network, and the contradiction between "lightning-fast" promises and actual waiting. Out of scope: producing Lighthouse scores, backend optimization recipes, security. No made-up technical debt. If there’s no measurement claim, write qualitative observation.

Heuristic: Unexplained waiting feels longer than the same duration with explanation (directional psychology rule; do not invent exact ms thresholds). Tell the user what’s happening.

## Diagnostic Signals

1. **Silent blank**: No response for 2–3+ seconds after a click; user clicks again (double submit risk).
2. **Endless spinner**: Error and loading are not differentiated ([kb:55-empty-loading-error-states]).
3. **Layout jump**: Content arrival causes button to move; leads to misclicks.
4. **Heavy first screen**: Hero video + many widgets; busy-professional says “heavy” — if no measurement, also note “heavy appearance.”
5. **No optimistic UI**: Every save feels like a full-page reload.
6. **No progress on long tasks**: Export “preparing…” is vague.
7. **Promise drift**: “Instant / real-time” but spinners everywhere.
8. **Worse on mobile**: Desktop is acceptable, mobile is abandoned ([kb:57-mobile-ux]).
9. **Animation cost**: Decorative movements seem to delay interaction; no reduced-motion ([kb:58-accessibility]).
10. **Payment/confirmation uncertainty**: Silence during money transactions is a trust crisis.

Positive signals: instant hover/active states, skeletons, button loading state, clear progress, “still working” interim messages, clear error on failure, lightweight first load on critical path, optimistic list addition (reversible).

## Persona Reactions

- **busy-professional**: Slow = expensive. 10 seconds of unexplained waiting leads to leaving. Wants time estimate.
- **non-technical**: Silence = “it broke / I broke it.” Textual status is essential.
- **skeptical**: When “instant” promise is broken, all claims become suspect. Payment delay destroys trust.
- **price-sensitive**: Slow free plan + fast paid = feels like punishment (note if visible; do not invent).
- **student / first-timer**: Heavy first impression increases onboardingRisk; if the path to aha is slow, activation drops.

## Good and Bad Examples

**Bad click**
“Save” → 4 seconds white screen → same form. User clicks three times.

**Good click**
Button disabled + “Saving”; success toast; if error, field reopens.

**Bad list**
Blank → suddenly 50 rows; scroll jumps.

**Good list**
Skeleton rows; stable layout; “50 customers loaded.”

**Bad export**
“Preparing” for 30 seconds; then silent fail.

**Good export**
Progress or “large file, will be sent via email”; clear complete/fail; retry option.

**Bad promise**
Landing: “Real-time collaboration.” App: 1 second delay on every keystroke + “saving…”.

**Good honesty**
“Changes saved” / “Connection weak — will retry.”

## FirstClick Score Impacts

- **clarity**: Status messages and waiting language. Silence clarity↓.
- **adoption**: Slow critical path adoption↓; aha is delayed.
- **onboardingRisk**: Heavy/opaque experience in first session risk↑.
- Trust: uncertainty in payment and data loss. Friction: double submit, jump.
- Don’t invent performance lab scores; write perception and UI states.

## Action Checklist

1. Check if there is feedback on critical clicks (loading/disabled).
2. Note the distinction between skeleton and empty spinner.
3. Check if there is progress/email promise on long tasks.
4. Quote landing speed claims; compare with UI waiting.
5. Evaluate mobile critical path separately.
6. Flag double submit risk.
7. Check for silence in payment/confirmation flow.
8. Recommendation: status text, skeleton, progress — don’t write speculative infrastructure like “change the server.”

## Citation Discipline

- Observed waiting UX: [doc:…] / [web:…] / session note.
- Perception standard: [kb:64-performance-perception]; short note [kb:45-performance].
- Edge cases: [kb:55-empty-loading-error-states].
- Don’t present hard thresholds like “LCP should be 2.5s” as mandates without measurement; label as industry practice heuristic.
- No made-up ms / % improvements.

## Deep Practice: Managing Perception vs Hiding Slowness

Optimistic UI is a powerful perception tool, but honesty is essential. If the message shows “sent” but then fails, skeptical trust↓. Heuristic: in optimistic updates, show an easy way to undo/correct errors.

Primary path is lightening: onboarding and aha screens are more critical than the marketing blog. Analyst writes which task feels slow rather than “the whole site is slow.”

Expectation setting: “This may take 1–2 minutes” reduces anger if accurate; increases anger if inaccurate. If there’s no duration in the corpus, don’t invent.

In multi-widget dashboards, waterfall loading: if some panels fill while one remains spinner, partial value is good perception ([kb:54-dashboard-design]). Making everyone wait on a single spinner is bad perception.

## Analyst Practice Note

Performance chunk: flow (register|save|export|dashboard), perception issue (silence|jump|endless spinner|promise drift), persona, score. Example: “busy-professional silent 5s on save → friction high adoption↓; recommend button loading + toast.”

## Scenario Lab: Feeling Slow

**A:** Silent save for 5s. Double click. Friction. Recommendation: loading state.

**B:** “Instant” promise + constant spinner. Drift trust↓.

**C:** Export vague 40s. Busy-professional abandons.

**D:** Layout jump. Misclick.

**E:** Payment silence. Skeptical panic.

## Operational Control

Click feedback, skeleton, long task progress, promise drift, mobile, double submit, payment silence, partial loading. No made-up ms.

## Decision Framework: Duration or Uncertainty?

User anger often comes more from uncertainty than raw duration. 8 seconds of “Invoices loading — may take a while for large accounts” can feel better than 4 seconds of silent blank — this is a directional heuristic, not a guaranteed psychological law.

Separate critical paths: authentication, saving, payment, activation artifact creation. Silence on these paths creates trust + friction. Slowness on the changelog page is lower severity. Analyst writes by path, not “site-wide slow.”

Optimistic UI must be honest. Failure after “sent” is a broken promise for skeptical users. Show a way to undo/correct. Double submit is a side effect of perceived delay; button state is both a UX and data integrity issue.

Promise language: “real-time,” “instant,” “lightning” claims require measurement. If there’s no measurement, FirstClick compares the claim to UI waiting and writes drift; does not invent its own Lighthouse score. The same claim is more fragile on mobile.

## Unified Reading: Perception × empty/loading/error × mobile

Skeleton and progress are actually part of edge state UX ([kb:55-empty-loading-error-states]); this file focuses on perception and promise language. The same spinner can signal both “error hidden” and “slow” — separate by persona: non-technical thinks it’s broken, busy-professional notes time loss.

Perception threshold is lower on mobile ([kb:57-mobile-ux]). If dashboard waterfall loading leaves partial value, perception improves ([kb:54-dashboard-design]). Full-screen blocking loading is bad perception.

Payment silence is a trust crisis ([kb:05-trust-and-proof]). Even in the performance file, raise the trust dimension clearly. If infrastructure advice (cache, CDN) is speculative, don’t write; recommend UI state feedback.

## Analyst Glossary: Perception Signals

Signal glossary: silence (no feedback after click), jump (layout shift), endless spinner (error not differentiated), vague long task (no progress), promise drift (instant claim vs waiting), payment silence (trust critical), double submit risk, mobile heaviness. Each signal has a different persona reaction; busy-professional focuses on duration, non-technical on breakage, skeptical on broken promises. Recommendation glossary: loading state, skeleton, progress, interim status text, optimistic UI + undo. No infrastructure speculation.

## Closing Note (RAG)

This section is also meaningful as a standalone chunk: The FirstClick analyst combines the topic with product corpus citation, does not present heuristics as statistics, ties persona reaction to concrete UI text, maintains clarity / adoption / onboardingRisk / trust distinction in scoring rationale, and does not propose made-up features. If evidence is lacking, says “not seen in corpus.”
 In the performance chunk, signals like silence / progress / promise drift should be named.

## Closing Note (RAG)

This section is also meaningful as a standalone chunk: The FirstClick analyst reads performance perception without inventing Lighthouse scores; names silence, lack of skeleton, lack of progress, and promise drift; considers payment silence a trust crisis; recommends UI state feedback, does not write speculative infrastructure recipes. Does not present heuristics as proven laws.

Persona reminder: busy-professional wants duration and output; non-technical wants status text; skeptical wants promise-honesty; price-sensitive reacts to lock/early sale; first-timer looks for the next clear step. Ground findings in one of these reactions.

If there’s no measurement, don’t invent milliseconds; write the observed lack of feedback.
 Silence on critical path is counted as high friction.

## Action Recipes (Performance Perception)

**Recipe 1 — Critical click feedback:** On save/send/pay buttons, use disabled + status text + success/error path. 2–3+ seconds of silence is double submit risk; note as both friction and data integrity.

**Recipe 2 — Skeleton vs spinner:** Reserve layout with skeleton in list/dashboard. Separate endless spinner from error state ([kb:55-empty-loading-error-states]). Use contextual text (“Loading customers”) instead of just “Loading.”

**Recipe 3 — Long task communication:** For export/import, provide clear progress or “will email when done” promise + complete/fail + retry. Vague “preparing…” causes busy-professional to abandon.

**Recipe 4 — Promise–waiting drift:** Quote landing “instant / real-time / lightning” claims; compare with constant spinner in UI. Don’t invent Lighthouse score; write drift citation.

**Recipe 5 — Path-based severity:** Silence on identity, saving, payment, activation artifact is high severity. Changelog slowness is low severity. Write by path, not “site-wide slow.”

## Edge Cases

- **Optimistic UI fail:** Error after “sent” — for skeptical, a broken promise; must show undo/correct path.
- **Partial dashboard loading:** If some panels fill while one waits, partial value is good perception ([kb:54-dashboard-design]); making everyone wait on one spinner is bad.
- **Layout jump:** CTA shift on content arrival causes misclick.
- **Reduced-motion:** If decorative animation delays interaction, cross-reference [kb:58-accessibility].
- **Mobile/weak network:** Desktop is acceptable, mobile is abandoned ([kb:57-mobile-ux]); if no ms measurement, also note “heavy / opaque feel.”
- **Payment silence:** Uncertainty in money transactions is a trust crisis; write separately from other slowness.
- **Free plan slowness:** If visible, note punishment feeling for price-sensitive; no made-up A/B claim.

## Persona-Specific Comment Template

“[Flow: save|export|payment|dashboard]; perception issue [silence|jump|endless spinner|promise drift]; [persona] effect [leave|panic|trust↓|onboardingRisk↑]; recommendation [button state|skeleton|progress|honest duration text]; no invented measurement.”

Busy-professional counts unexplained waiting as expensive time. Non-technical thinks silence means “I broke it.” Skeptical questions all claims when “instant” promise is broken. Price-sensitive feels punished by slow free / fast paid split. Student/first-timer sees onboardingRisk↑ with heavy first session.

## Deep Edge: Expectation Setting

“If this may take 1–2 minutes” reduces anger if accurate; increases if inaccurate. If there’s no duration in the corpus, don’t invent. Uncertainty is often more costly than raw duration — directional heuristic; don’t present as a psychological law.

## Analyst Checklist (Extended)

1. Is there loading/disabled on critical clicks?
2. Skeleton vs empty spinner.
3. Progress / email promise / fail path on long tasks.
4. Landing speed claim ↔ UI waiting.
5. Is mobile critical path separate?
6. Double submit risk.
7. Payment/confirmation silence.
8. Layout jump and animation cost.
9. Error correction path in optimistic UI.
10. Partial loading vs single spinner.
11. Recommendation: status text, skeleton, progress — no “change the server” speculation.
12. Don’t invent LCP/ms/% improvements; don’t present thresholds as mandates without measurement.
