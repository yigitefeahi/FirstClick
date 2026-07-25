# Form Design: Friction, Validation, and Completion

In FirstClick, forms are critical gateways for registration, onboarding, checkout, invitations, and settings. Mandatory field bloat, late validation, and ambiguous error language cause drop-off. This file is the form UX evaluation standard. [kb:56-form-design]

## Scope

Scope: number and order of fields, label/placeholder distinction, required vs optional, inline validation, submission states, multi-step forms, mobile keyboard types, autofill, privacy fields (password, KVKK), and the contradiction between the “one-click” promise and actual form load. Out of scope: general empty/error pages ([kb:55-empty-loading-error-states]), payment psychology ([kb:04-pricing-psychology]), pure accessibility rules (cross-ref with [kb:58-accessibility]).

Heuristic: Each additional required field decreases the likelihood of completion (directional observation; do not give exact %). In forms leading to first value, only ask for what is needed at that moment.

## Diagnostic Signals

1. **Required field bloat**: Registration asks for title, company size, phone, how did you hear… all required. price-sensitive and student personas drop off.
2. **Placeholder = label**: When the placeholder disappears, context is lost; non-technical users forget which field is which.
3. **Post-submit validation**: Fill out a long form, then a red explosion at the end; friction high.
4. **Ambiguous error**: “Invalid input” — which rule? Password policy is hidden.
5. **Double submit**: Button is not disabled; fear of double registration/payment.
6. **Password trap**: Rules shown at the end, no visibility toggle, paste is blocked (heuristic: blocking paste is generally harmful).
7. **Embedded KVKK/consent**: Long legal text in a required checkbox is unreadable; skeptical users distrust, non-technical users skip.
8. **Wrong mobile keyboard**: Text keyboard for email, full QWERTY for phone; missing inputmode.
9. **No progress in multi-step**: No step indicator in wizard; busy-professional cannot estimate duration.
10. **Promise contradiction**: “Register in 30 seconds” + 12 fields → finding with citation.

Positive signals: clear label, optional marked, inline and gentle validation, password rules shown beforehand, loading/disabled submit, progress (Step 2/3), shortening with social/OAuth, “why do we ask?” microcopy ([kb:60-microcopy]).

## Persona Reactions

- **busy-professional**: Minimum fields, OAuth, complete later. Mandatory demo questions cause churn. Wants skippable profile steps.
- **non-technical**: Panics at error language. Needs example format (“example@company.com”), help text, phone mask.
- **skeptical**: Unnecessary data requests (“why birthday?”) break trust. KVKK link and purpose explanation are essential.
- **price-sensitive**: Asking for card info before trial is critical friction. Postpone address/billing fields.
- **student / first-timer**: Mandatory school/company is incompatible; if there’s no “individual” option, drop-off occurs.

## Good and Bad Examples

**Bad registration**
Name, surname, email, phone, company, title, number of employees, country, how did you hear, two passwords, three marketing checkboxes — all on one page. CTA: “Start for free” (ironic).

**Good registration**
Email + password (or Google). Then optional “workspace name.” No card. Heuristic: shorten time-to-value.

**Bad validation**
After clicking submit: “Form error.” Fields not highlighted.

**Good validation**
Email checked on blur; password field shows real-time rule checklist (uppercase, length). On submit, focus moves to the first invalid field.

**Bad wizard**
5 steps, going back erases data, no progress, mandatory integration at step 4.

**Good wizard**
3 steps, progress indicator, data preserved on back, integration “Later.” Draft registration signal.

**Bad mobile**
Small touch targets, broken autofill, no autocomplete; user types everything each time.

**Good mobile**
Appropriate inputmode/type, 44px touch target heuristic, visible password, sticky primary button.

## FirstClick Score Impacts

- **clarity**: Label, help, error language. Jargon-heavy field names decrease clarity.
- **adoption**: If there’s no value before form completion, form = activation gate. Long form decreases adoption.
- **onboardingRisk**: Registration/setup forms directly impact risk score. Mandatory card for trial increases risk.
- Trust: excessive data + unclear purpose. Friction: late validation, data loss.
- If landing “one-click / 30 sec” contradicts field count, citation is mandatory in the score rationale.

## Action Checklist

1. List the fields in the critical form; count the required ones.
2. Check label vs placeholder usage.
3. Note validation timing (inline / submit).
4. Quote error messages; check if they are actionable.
5. Check submit button loading/disabled state.
6. If wizard, write step count, progress, back behavior.
7. Check if card/payment request aligns with trial promise.
8. Suggest: field postponement, OAuth, micro “why?” copy — avoid adding fake fields.

## Attribution Discipline

- Form fields and microcopy: [doc:…] / [web:…].
- Form rules: [kb:56-form-design].
- General error page vs field error: [kb:55-empty-loading-error-states].
- Do not write made-up stats like “each field causes %X drop-off”; use directional heuristics.
- If there’s no KVKK claim in product copy, don’t make it up; say “didn’t see purpose explanation in corpus.”

## Analyst Implementation Note

Form finding chunk: form purpose (registration|checkout|invite), number of required fields, validation type, persona friction, score. Example: “price-sensitive, card + 9 required fields in trial → onboardingRisk↑ adoption↓; suggestion: postpone card, reduce fields to 3 (heuristic).”

## Deep Implementation: Form Cost and Progressive Data Collection

FirstClick penalizes forms by “number of fields” but the real issue is requirement, timing, and fear. 10 optional fields may be less harmful than 4 required ones — heuristic; no exact formula.

**Progressive profile**: Email at registration; “company size” after aha; tax number at billing. Any B2B field asked early can delay activation ([kb:62-activation]). If there’s no staging in corpus, list “fields collected early.”

**Smart defaults**: Country, currency, language predictions reduce friction; wrong defaults anger skeptical users. Must be changeable. If default language/currency is inconsistent in the TR market ([kb:36-turkey-market]), lower clarity note.

**Password and account security**: Show rules beforehand. “Paste block” is generally harmful (heuristic). SSO option can increase adoption in B2B, but mandatory Google-only excludes some users — note if seen as mandatory.

**Inline vs summary error**: In long forms, summary error band + field-level together work well. Summary band alone loses non-technical users. Focus management: moving to the first invalid field is a positive signal if seen in corpus.

**Legal checkboxes**: “I have read the agreement” alone does not create trust; skeptical users want a link. If marketing consent is mandatory, price-sensitive and KVKK-sensitive trust↓. Purpose explanation links to microcopy file ([kb:60-microcopy]).

**Multi-step registration**: Progress indicator improves time perception ([kb:64-performance-perception]). Erasing data on back is high friction. Asking for payment at step 2 may contradict trial promise.

**Accessible form**: Label, error message, sufficient touch area ([kb:57-mobile-ux], [kb:58-accessibility]). Placeholder-only anti-pattern is both a form and a11y finding — can be written twice but root cause is one.

RAG chunk keys: required field, inline validation, wizard progress, OAuth, card postponement, KVKK checkbox, autocomplete, double submit.

## Scenario Lab: Form Drop-off

**Scenario A — Price-sensitive trial:** “Start for free” → card + address + tax. onboardingRisk↑ adoption↓. Suggestion: postpone card; fix promise or shorten flow.

**Scenario B — Busy-professional:** 9 required fields, no OAuth, no progress. Friction. Suggestion: start with email, profile later.

**Scenario C — Non-technical:** After submit, “Invalid.” Which field is unclear. Panic. Suggestion: inline + specific message.

**Scenario D — Skeptical:** Birthday required, no purpose. Trust↓. Suggestion: remove or add “why?” helper.

**Scenario E — Mobile:** Save button under keyboard. Student cannot complete. Suggestion: visible CTA / inputmode.

In multi-step forms, each step should approach asking a single decision (heuristic). 8 fields per step makes the wizard just a split-up single-page form — low benefit, poor time perception.

## Operational Control: Form QA List (Analyst)

1. Number of required fields. 2. Label/placeholder. 3. Validation timing. 4. Error specificity. 5. Submit loading. 6. Wizard progress/back. 7. Card timing. 8. KVKK purpose. 9. Mobile keyboard. 10. Promise duration/field contradiction.

If forms are the activation gate, cutting fields is not cutting features; it’s timing value. When the analyst suggests “fewer fields,” they justify in one sentence why each field can be postponed — not a random deletion list.

## Decision Framework: Which Field to Ask Now?

Every form field is a hidden product decision: “Can we not deliver value without this info?” FirstClick writes this question next to the field list. If the answer is “we can’t,” the field is a justified requirement. If the answer is “marketing wants it,” early requirement is an onboardingRisk candidate. If the answer is “maybe for segmentation one day,” postpone.

In B2B forms, title and company size are often asked. These may be useful for sales, but rarely required for activation. Analyst does not ignore sales needs; questions timing. Asking at the “customize workspace after aha” step is a different friction.

Error language is the emotional warmth of the form. “Wrong” as a single word freezes non-technical users. “Password must be at least 8 characters — currently 6” shows both rule and status. Blocking password manager paste is heuristically harmful; if there’s no security rationale in corpus, write “paste block is friction.”

In multi-step forms, each step’s title should promise an outcome: “Create your account,” “Name your workspace,” “Invite your team if you want (can do later).” “Step 3” as a title does not convey clarity. Progress bar improves time perception, but wrong step count (hidden steps) breaks trust for skeptical users.

In mobile forms, wrong `type` and `inputmode` is a physical cost. Text keyboard for email, full QWERTY for numeric field. If HTML is visible in corpus, note it; if not, behavioral clue (if there’s no user complaint, don’t speculate “definitely broken”).
