# Microcopy: Buttons, Tooltips, Assurance Statements

In FirstClick, microcopy is the area where small texts create significant friction. Button labels, empty state sentences, permission explanations, and error lines directly affect clarity, trust, and adoption. This file is the microcopy evaluation standard. [kb:60-microcopy]

## Scope

Scope: CTA labels, helper text, tooltips, empty/error lines, permission and KVKK (data protection) short explanations, confirmation dialogs, success toasts, and product language with jargon. Out of scope: long landing manifestos ([kb:31-copywriting-headlines], [kb:23-messaging-framework]), pricing psychology texts ([kb:04-pricing-psychology]), notification strategy ([kb:35-notifications]).

Heuristic: Good microcopy carries (1) the action, (2) the result, and (3) if necessary, a risk/cost signal. “Send” vs “Send invitation” — directional language rule.

## Diagnostic Signals

1. **Jargon CTA**: “Provision workspace”, “Orchestrate flow”. Leaves non-technical users behind.
2. **Vague CTA**: “Continue”, “OK”, “Submit” — unclear what will happen.
3. **Blaming error**: “You did something wrong”, “Invalid.” Causes panic + trust↓.
4. **Empty assurance**: “You are safe” without evidence; skeptical users want “what do we store / what do we share”.
5. **No permission text**: Purpose not explained before system dialog for camera/mic/contacts permission.
6. **Unclear confirmation**: “Are you sure?” — what is being deleted, is it reversible, not specified.
7. **Success noise**: Confetti + “Awesome!!!” on every click — irritates busy-professional.
8. **Double meaning**: “Free” is actually a trial; “unlimited” is actually limited — price-sensitive anger.
9. **TR/EN mix**: Menu in Turkish, errors in English; first-timer confusion.
10. **Promise language vs UI language**: Landing is simple, in-app is corporate jargon.

Positive signals: verb + object CTA (“Download PDF”), polite and specific error, “why?” helper, reversibility signal, short KVKK purpose sentence, consistent language, understated success.

## Persona Reactions

- **busy-professional**: Short, result-oriented. Micro signals like “Takes 2 min” support adoption (do not make up durations; quote from corpus if available).
- **non-technical**: Jargon = wall. Use examples and plain language. Next step in error line.
- **skeptical**: Unsupported superlatives (“most secure”) backfire. Concrete micro-assurance: “Your card will not be charged until the trial ends” — only if true.
- **price-sensitive**: If fee/limit microcopy is unclear, churn risk. “3 projects on free plan” should be explicit.
- **student / first-timer**: Encouraging but not childish language. Instead of “Awesome, you’re a ninja”, use “Your first project is ready.”

## Good and Bad Examples

**Bad CTA**
“Submit” / “Proceed” / “Execute”.

**Good CTA**
“Create account”, “Send invoice”, “Send team invitation”. Secondary: “Skip for now”.

**Bad error**
“Error.” / “Something went wrong.”

**Good error**
“This email is already in use. Log in or try another email.”

**Bad delete**
“Delete?”

**Good delete**
“‘Acme’ customer will be deleted. Invoices will remain; this action cannot be undone.”

**Bad permission**
System dialog appears suddenly: “FirstClick would like to access contacts.”

**Good permission**
First, screen: “We’ll request access to your contacts to speed up invitations. You can also enter emails manually if you prefer.” Then system dialog.

**Bad success**
Full screen modal + confetti + forced “Share!”

**Good success**
Small toast: “Invitation sent.” Optional next step.

## FirstClick Score Impacts

- **clarity**: Word choice and specificity. Jargon clarity↓.
- **adoption**: Comprehensibility of CTA and micro-assurance that reduces fear.
- **onboardingRisk**: If registration/permission microcopy is weak, risk↑.
- Trust: exaggerated and vague “free” language. Friction: blaming errors.
- Contradiction: landing benefit language vs app jargon → citation required.

## Action Checklist

1. Extract primary CTA texts as is.
2. List jargon; suggest plain language alternatives (do not invent features).
3. Classify error microcopy for actionability.
4. In dangerous confirmation dialogs, check for object + result + reversibility.
5. Check if there is a purpose sentence before permission.
6. Compare “free / unlimited / instant” claims with actual limits.
7. Note language consistency (TR/EN).
8. Suggest: one-sentence rewrite + rationale.

## Citation Discipline

- UI texts: [doc:…] / [web:…].
- Microcopy rules: [kb:60-microcopy]; CTA-focused short note [kb:32-cta-microcopy].
- Trust language: [kb:05-trust-and-proof], [kb:28-security-privacy-copy].
- Do not add unsupported security/performance claims.
- Do not fabricate “Microcopy change increased conversion by %X”.

## Deep Application: Tone and Consistency

Microcopy requires a consistent voice. If the same product is friendly in one place (“Let’s get started!”) and a legal robot elsewhere (“Your transaction could not be completed”), users feel like they’re talking to two brands. FirstClick analysts note tone breaks under clarity and trust. Heuristic: write error language in the same voice; corporate coldness in panic moments leaves non-technical users alone.

Assurance microcopy should avoid exaggeration. Absolute claims like “Your data will never be shared” may be false if there are integrations or subprocessors. If there is no policy in the corpus, the analyst does not invent assurance; instead, says “I did not see a short privacy promise in the corpus” and writes what is missing per [kb:28-security-privacy-copy].

Feature name vs user outcome in CTA: “Create workspace” is product language, “Open a space for your team” is outcome language. Choose according to persona. B2B busy-professional wants outcome + duration; first-timer wants a more explanatory label. Combining both in a long sentence bloats the button — recommend short CTA + helper balance.

Empty state and microcopy intersect ([kb:55-empty-loading-error-states]): empty CTA is also under microcopy discipline. “Create” is not enough; “Add your first customer” ties to a task. Loading text “Loading…” vs “Fetching customers” preserves context.

## Analyst Application Note

Microcopy chunk: item type (CTA|error|permission|confirmation|toast), quote, issue (jargon|vague|blaming|exaggeration), persona, one-sentence suggestion, score. Example: “non-technical, CTA ‘Provision’ → clarity↓; suggestion ‘Create workspace’; onboardingRisk medium.”

## Scenario Lab: Microcopy Friction

**A:** CTA “Execute pipeline”. Non-technical leave. clarity↓. Suggestion: “Start workflow” (fit product language).

**B:** Error “Invalid”. Panic. Suggestion: rule + next step.

**C:** “Free” but card required. Price-sensitive. trust↓ citation.

**D:** No purpose before permission. Skeptical rejects. onboardingRisk↑.

**E:** Delete “Are you sure?” no object. Data loss fear. friction.

## Operational Control

CTA verb+object, jargon list, error actionability, confirmation object+result, permission purpose sentence, free/unlimited accuracy, TR/EN consistency, understated success.

## Decision Framework: What Is This Sentence For?

Each microcopy piece should select a function: direct (CTA), explain (helper), repair (error), assure (permission/payment), validate (success). If a single text tries to do all, it becomes long and unreadable. When writing suggestions, FirstClick names the function: “This error line does not repair; does not state the rule.”

Jargon cleanup is not translation. “Workspace” in a TR product can be “Çalışma alanı”; but if the entire corpus says “Workspace”, the analyst does not force sudden rebranding — wants consistency and first-timer explanation. Heuristic for first mention: “Çalışma alanı (where your projects live)”.

Exaggeration words (revolutionary, unlimited, instant, never) are red flags for skeptical users. If corpus says “unlimited” but there is a limit, contradiction with citation is required. If assurance text contradicts policy, trust↓; if no policy, do not invent assurance.

Confirmation dialogs are the most expensive microcopy because they protect hard-to-reverse actions. Four elements heuristic: object name, result, reversibility, alternative (archive). State number of missing elements in findings.

## Combined Reading: Microcopy × Edge Cases and Permissions

Empty/loading/error texts are the stress test of microcopy ([kb:55-empty-loading-error-states]). Friendly on happy path, robotic on error — tone break disrupts persona reaction. Permission microcopy should be read with security/privacy files ([kb:28-security-privacy-copy]); “you are safe” without evidence is rejected by skeptical users.

CTA microcopy is the signpost of the activation path. “Start” — start what? Activation event or empty settings? Vague CTA randomizes adoption. Analyst should quote CTA together with the next screen.

TR/EN mix is an extra clarity cost in the Turkey market context ([kb:36-turkey-market]). Error in English, menu in Turkish = first-timer confusion. Do not speculate on translation quality; write the observed mix.

## Analyst Glossary: Microcopy Rewrite

Fix the suggestion format: Quote → issue tag → one-sentence alternative → score dimension. Example: Quote “Submit” → vague CTA → “Send invoice” → clarity/adoption. Quote “Invalid input” → not reparative → “Email format missing; try ornek@sirket.com” → clarity. Quote “Free” + card required → contradiction → correct the claim or delay card → trust/onboardingRisk. Alternative should not include invented features; should name the same action more clearly. Adding the jargon list to the end of the persona note makes RAG retrieval easier.

## Closing Note (RAG)

This section is also meaningful as an independent chunk: The FirstClick analyst combines the topic with a product corpus quote, does not present the heuristic as a statistic, ties persona reaction to concrete UI text, maintains clarity / adoption / onboardingRisk / trust distinction in the score rationale, and does not suggest invented features. If evidence is missing, says “not seen in corpus”.
In the microcopy chunk, quote + alternative sentence should always be side by side.

## Action Recipes (Microcopy)

**Recipe 1 — Jargon CTA Cleanup:** Quote the primary button text from corpus with [web:…] / [doc:…]. Distinguish if it’s a feature name or user outcome. Suggest outcome language for non-technical; for busy-professional, suggest verb+object+optional duration helper. Do not invent features: do not say “Add AI assistant”.

**Recipe 2 — Error Line Repair:** Split error text into three: what happened (rule), why (short), next step (single CTA). Remove blaming language like “you did something wrong”. For skeptical, clarify “system error / your error” distinction.

**Recipe 3 — Dangerous Confirmation:** In delete/cancel dialogs, check for object name, reversibility, side effect (invoices remain, etc.), and alternative (archive). Number missing elements; each missing element is linked to friction or trust note.

**Recipe 4 — Purpose Before Permission:** Check if there is a purpose sentence + alternative path (manual entry) before system dialog. If not, onboardingRisk↑ and skeptical rejection. Do not expand permission text like a legal promise.

**Recipe 5 — Free Language Audit:** Compare “free / unlimited / instant” words with limit and payment UI. If contradiction, citation required; in price-sensitive score, trust↓.

## Edge Cases

- **Multilingual product:** TR menu + EN error; first-timer clarity↓. Analyst writes observed mix instead of speculating “translation missing”.
- **B2B admin vs member:** If member sees same delete confirmation, authority microcopy may be missing; if no role distinction in corpus, do not invent roles.
- **Accessibility intersection:** Icon-only “X” close — if no label, cross-check with [kb:58-accessibility]; do not invent aria text in microcopy file.
- **Toast rain:** Sequential success toasts are noise for busy-professional; suggestion is about frequency, not adding features.
- **Dark pattern microcopy:** “No, I want to lose my benefits” — dark pattern; not retention but trust finding (separate from [kb:63-retention]).

## Persona-Specific Comment Template

Finding sentence: “[Persona] for [quoted microcopy] → [effect: jargon wall / ambiguity / exaggeration break]; score [clarity|adoption|onboardingRisk|trust]; suggestion [one-sentence rewrite].” Do not copy the same finding to all five personas; choose the one proven.

For busy-professional, long helpers are often skipped — CTA must be specific enough. For non-technical, helper is the real safety net. For skeptical, “most secure / never” absolutes are red flags. For price-sensitive, fee/limit sentence may be more critical than CTA. For student/first-timer, encouraging language should not be childish.

## Analyst Checklist (Extended)

1. Extract primary and secondary CTAs as is; is there verb+object?
2. List jargon; preserve in-product consistent name, add first-timer explanation.
3. Classify error lines by repair function (repairs / blames / empty).
4. In confirmation dialogs, four elements: object, result, reversibility, alternative.
5. Purpose before permission + alternative path.
6. Free/unlimited/instant ↔ real limit comparison.
7. TR/EN consistency and tone break (friendly vs legal robot).
8. Success noise (modal/confetti/forced sharing).
9. Landing promise language vs app micro language drift.
10. Each suggestion: one sentence + rationale + score link; no fabricated conversion rates.
