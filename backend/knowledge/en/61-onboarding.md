# Onboarding: From First Session to First Understanding

FirstClick measures onboarding not by the number of tours (slides), but by whether the user understands the product category and achieves their first success. Mandatory wizards, unskippable modals, and empty screens without guidance increase onboardingRisk. This file is the onboarding evaluation standard. [kb:61-onboarding]

## Scope

Scope: welcome, role/purpose selection, checklist, product tour, tooltip sequences, sample data, skippability, continue with email (cross-reference with [kb:29-onboarding-emails]), and the time-to-value path. Out of scope: metric definition of activation event ([kb:62-activation]), week-1 retention ([kb:63-retention]), form field technique ([kb:56-form-design]).

Heuristic: Onboarding exists not to educate the user, but to deliver first value. If the cost of education is high, progressive disclosure is preferred (directional rule).

## Diagnostic Signals

1. **Mandatory long tour**: 8+ slides, no skip. busy-professional will abandon.
2. **Empty without guidance**: “Welcome!” + empty screen; first-timer gets lost.
3. **Early integration required**: Cannot proceed without Slack/Jira; aha is delayed.
4. **Same path without role selection**: Sales and finance get the same checklist — irrelevant steps.
5. **Early card/payment**: Card required after “Try for free”; price-sensitive drop-off.
6. **Tooltip overload**: Balloon on every click; not learning, but a barrier.
7. **Sample data unlabeled**: User thinks fake data is real or skeptical finds it untrustworthy.
8. **Repeated onboarding**: Same tour on every login; adoption↓.
9. **Promise contradiction**: “Setup in 2 minutes” + 15 steps → citation.
10. **Broken mobile onboarding**: Desktop wizard overflows on mobile ([kb:57-mobile-ux]).

Positive signals: skip, 3–5 step checklist, clearly labeled sample data, path selection by purpose/role, first CTA tied to empty, optional tour, progress saving, “complete later”.

## Persona Reactions

- **busy-professional**: Skip + fast path. Signal of duration and outcome. Long training video should remain optional.
- **non-technical**: Step-by-step, visual, no jargon. Human support signal (“Need help?”) is useful — not a pushy chat.
- **skeptical**: “Why?” for permissions and data requests. Clear sample data label. Exaggerated “AI will know you” claims backfire.
- **price-sensitive**: No card, clear limits, upgrade later. If there’s a student discount, it should be visible in onboarding (if present in corpus).
- **student / first-timer**: Category explanation (“this product helps with X”), template, measured celebration of success.

## Good and Bad Examples

**Bad**
Sign up → 10-slide tour → mandatory integration → empty dashboard → “Read the docs”.

**Good**
Sign up → “What do you want to do today?” (3 options) → relevant template → checklist (3 steps) → first success toast → optional tour.

**Bad checklist**
12 items, 0% progress, none tied to primary value (“upload profile photo” at the top).

**Good checklist**
3 items: add data / complete a task / (optional) invite. Progress is not lost.

**Bad sample data**
“Acme Corp — $2.4M” unlabeled; user thinks reports are real.

**Good sample data**
Banner: “You are browsing with sample data — switch to your own data” + one-click clear.

## FirstClick Score Effects

- **clarity**: Clarity of path and language. Jargon-heavy tour lowers clarity.
- **adoption**: Reaching first success. Blocked onboarding lowers adoption.
- **onboardingRisk**: Main score dimension of this file. No skip, empty without guidance, early card = risk↑.
- Timeline: Landing OK + setup friction = classic pattern ([kb:09-drop-off-patterns]).
- Activation link: onboarding is the bridge, activation event is completion ([kb:62-activation]).

## Action Checklist

1. List first session steps in order; check if skip is available.
2. Evaluate checklist item count and connection to primary value.
3. Quote the onboarding CTA of the empty state.
4. Check the sample data label.
5. Mark if there is early mandatory integration/payment.
6. Compare landing time promise with number of steps.
7. Check for persona-based path (role/purpose).
8. Suggest: cut steps, add skip, tie task to empty — avoid feature invention.

## Attribution Discipline

- Onboarding screens: [doc:…] / [web:…].
- This standard: [kb:61-onboarding]; basic short note [kb:02-onboarding-activation].
- Email continuation: [kb:29-onboarding-emails].
- The phrase “Ideal onboarding ≤5 min” should be labeled as a heuristic, not an absolute law.
- Unmeasured “%X activation increase” is fabricated.

## Deep Practice: Onboarding Anti-patterns

**Library tour anti-pattern**: Slides introducing all product menus in sequence. User has no context yet, so information doesn’t stick. Instead: contextual tip for a single task (short hint at the moment of need).

**Authentication bloat**: Email verification + phone OTP + company domain + admin approval chain blocks first value. Even if security is needed, FirstClick asks which steps can be deferred. If there’s no justification in the corpus for the requirement, say “no justification found in corpus”.

**Success theater**: Confetti + forced social sharing + NPS in the first session. Too early for skeptical and busy-professional. Small confirmation on first success; NPS/invite later ([kb:62-activation], [kb:43-invite-loops]).

**Repeated blocker**: Even if the user closes the checklist, modal appears every session. If there’s no “don’t show again”, it’s friction. Preference persistence is onboarding hygiene.

In multi-product suites, onboarding may highlight the wrong product. If landing promises “invoicing” but the tour explains “CRM pipeline”, there is drift. Analyst writes the promise–path contradiction with [web:…] + UI quote.

## Analyst Practice Note

Onboarding chunk: step type (tour|checklist|empty|mandatory integration), skippability, persona, time-to-value blocker, onboardingRisk level. Example: “busy-professional, 8 slides without skip → onboardingRisk↑ adoption↓; suggestion: skip + 3-step checklist.”

## Scenario Lab: First Session

**A:** 9 slides, no skip. Busy-professional abandons. onboardingRisk↑.

**B:** Welcome + empty dashboard. First-timer. Suggestion: empty CTA + template.

**C:** Mandatory Slack. Aha is delayed ([kb:62-activation]). Suggestion: connect later.

**D:** Early card. Price-sensitive. Suggestion: defer / correct promise.

**E:** Unlabeled sample ARR. Skeptical. trust↓.

## Operational Control
Skip, step count, checklist–value connection, sample label, early payment/integration, role path, mobile tour, time promise drift, repeated modal.

## Decision Framework: Tour or Task?

Onboarding design should lean toward one of two poles: educational tour or task path. FirstClick prioritizes the task path because it connects to the aha moment. Tour is complementary when optional and skippable. Mandatory tour + empty without guidance is the most expensive combination: it takes time, delivers no value.

Checklist quality comes not from item count, but from alignment with activation. If “profile photo” is at the top and “create first record” is at the bottom, the product is wrongly optimized ([kb:65-product-analytics]). Analyst reads the checklist together with the activation file.

Sample data strategy manages three states: none (empty should be guided), present but unlabeled (trust risk), present, labeled, and clearable (generally good). Mixing demo and production data is a support nightmare; document any observed mix.

Continuation of onboarding by email is a separate channel ([kb:29-onboarding-emails]). Spam email before UI tour is finished will lose the busy-professional. If there’s no email copy in the corpus, don’t speculate “probably spam”; if there’s a repeated modal in the UI, write that.

Mobile onboarding: horizontally swiped tour slides are more fragile on mobile. Skip target should be large. Overlap of form + tour balloon is first-timer panic.

## Unified Reading: onboarding × empty × form × activation

Onboarding Risk score is often the sum of three files: form friction, empty without guidance, activation blocker. FirstClick should not flatten these into a single “bad onboarding” sentence. Show them in sequence on the timeline: sign-up form → welcome/tour → empty → first value attempt. Specify at which step drop-off is assumed; unmeasured funnel is fabricated.

Presence of skip is critical for busy-professional, but not enough alone for non-technical — task path is also needed. Maintain this distinction in persona notes. Sample data label saves skeptical trust; first-timer needs template + CTA.

Time promise heuristic: If the “2 minutes” claim contradicts the number of steps and requirements, citation is mandatory. If you don’t have your own stopwatch, write “observed step density challenges the promise”.

## Analyst Glossary: Combinations Raising onboardingRisk

Common high-risk packages: (1) tour without skip + empty without guidance, (2) early card + long form, (3) mandatory integration + undefined aha, (4) unlabeled sample data + fake KPI, (5) broken mobile sign-up + desktop-only checklist. If you see a package, list each item; don’t just say “generally bad onboarding”. Low-risk packages: skip + 3-step checklist + labeled template + empty CTA + optional tour. Heuristic: each component in a risk package requires a separate citation or UI quote.

## Closing Note (RAG)

This section is also meaningful as an independent chunk: The FirstClick analyst combines the topic with a product corpus quote, does not present heuristic as statistics, ties persona reaction to concrete UI text, maintains clarity / adoption / onboardingRisk / trust distinction in score justification, and does not propose made-up features. For missing evidence, say “not seen in corpus”.
In the onboarding chunk, look for the trio of skip, checklist, and empty CTA.

## Action Recipes (onboarding)

**Recipe 1 — Skip injection:** When detecting a mandatory tour, suggest “skip + complete later”. Don’t insist on deleting tour content; skippability is the main lever to reduce onboardingRisk. For busy-professional, skip should be as visible as the primary CTA.

**Recipe 2 — Checklist pruning:** Tie items to the activation event ([kb:62-activation]). If profile photo is at the top and first value task is at the bottom, suggest reversing the order. Reduce 12 items to 3 value items; move the rest to a “later” box.

**Recipe 3 — Tie task to empty:** In the Welcome + empty screen anti-pattern, tie the empty CTA to first success (“Add first record” / select template). Empty without guidance is first-timer churn.

**Recipe 4 — Defer early gate:** Move mandatory Slack/Jira/card to after the aha moment. If there’s no security justification in the corpus, say “no justification seen”; don’t invent security.

**Recipe 5 — Sample data label:** Banner + one-click clear. Unlabeled ARR/demo lowers skeptical trust and creates support confusion.

## Edge Cases

- **SSO / admin approval:** If first value is behind an admin gate, separate onboardingRisk from B2B buying friction ([kb:08-b2b-buying]).
- **Suite wrong product:** If landing promises invoicing but tour explains CRM, there is promise–path drift; write both quotes.
- **Repeated modal:** If there’s no “don’t show again”, modal on every session is friction; adoption↓.
- **Mobile tour:** Horizontal slide + small skip; cross with [kb:57-mobile-ux]. Form + tooltip overlap is panic.
- **Email continuation:** Spam drip before UI is finished; if no mail in corpus, don’t speculate spam ([kb:29-onboarding-emails]).
- **Single path without role selection:** Sales and finance get the same checklist — mark irrelevant steps, don’t invent new role UI.

## Persona-specific Comment Template

“[Persona] experiences time-to-value delay in the first session due to [blocker type: mandatory tour|empty|card|integration|jargon]; onboardingRisk is [low/medium/high]; adoption impact is […]; suggestion [skip|checklist pruning|template|deferral].”

Busy-professional wants skip and time signal. Non-technical wants step-by-step and jargon-free language. Skeptical wants “why?” for permissions and sample label. Price-sensitive wants card deferral and clear limits. Student/first-timer wants category sentence + template. Don’t assign the same blocker to all personas.

## Analyst Checklist (Extended)

1. List first session steps in order; which are mandatory?
2. Is there skip / “complete later” / preference persistence?
3. Checklist count and activation alignment.
4. Empty CTA quote; is it task-linked?
5. Sample data label and clearing.
6. Early payment or integration gate.
7. Path selection by role/purpose.
8. Landing time promise ↔ step count drift.
9. Broken tour/form on mobile.
10. Repeated onboarding modal.
11. Suggest: cut steps, add skip, tie to empty — don’t invent feature catalog.
12. Label “≤5 min ideal” as heuristic, not law; fabricated % activation increase.
