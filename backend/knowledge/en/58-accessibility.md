# Accessibility (a11y): Reading the Cost of Exclusion

FirstClick interprets accessibility not just as a legal compliance check, but as a signal of clarity and trust. Keyboard traps, low contrast, and unlabeled controls create friction across a wide spectrum, from non-technical to skeptical personas. This file is the accessibility evaluation standard. [kb:58-accessibility]

## Scope

Scope: keyboard navigation, focus visibility, contrast, text alternatives, form labels, error announcement, reduced motion/animation, semantic headings, and the contradiction between the “for everyone” promise and actual UI. Out of scope: producing a full WCAG audit report (FirstClick reads qualitative signals; does not claim lab certification), pure mobile thumb zone ([kb:57-mobile-ux]), microcopy language ([kb:60-microcopy]).

Heuristic: Accessibility issues are often not “disability-specific”; they also reduce clarity for stressed, mobile, low-light, and language-barrier users. No claim of exact prevalence — directional reading.

## Diagnostic Signals

1. **No/hidden focus:** Focus ring removed via CSS when tabbing. Keyboard user gets lost.
2. **Keyboard trap:** Modal opens, cannot exit with ESC/Tab; focus is trapped inside.
3. **Icon-only control:** Only icon; no accessible name. Screen reader says “button.”
4. **Placeholder-only field:** No programmatic label; both a11y and form UX break ([kb:56-form-design]).
5. **Low contrast:** Light gray text on light background; busy-professional can’t read outdoors.
6. **Color-only channel:** Error indicated only by red border; no icon/text. Color blindness + clarity issue.
7. **Autoplaying motion:** Parallax/continuous animation; vestibular sensitivity and distraction. No `prefers-reduced-motion`.
8. **Heading skip:** Jumps from h1 to h4; document structure broken.
9. **Time pressure:** Form must be completed in 60 seconds; no extension.
10. **Promise drift:** “Accessible / WCAG AA” claim on landing; no focus even in corpus → contradiction with citation, fake certification.

Positive signals: visible focus, modal focus trap + ESC, text or aria-label on buttons, label–input associations, sufficient contrast for primary text, error message + aria-live, reduced motion option, skip link (“skip to content”).

## Persona Reactions

- **busy-professional:** Low contrast and small targets are coded as “low quality”; friction is a waste of time.
- **non-technical:** Unclear icons and loss of direction on error cause panic. Clear text + focus order help.
- **skeptical:** A11y promise with broken keyboard experience is a trust and honesty issue. If “for everyone” claim is unproven, harsh note.
- **price-sensitive:** Accessibility is rarely linked to price; but inaccessible support/contact channels lead to churn.
- **student / first-timer:** High cognitive load; poor semantic structure also makes help/docs harder.

## Good and Bad Examples

**Bad**
Custom div “card” is clickable; Enter doesn’t work, no role, 2.5:1 gray contrast. Error indicated only by border color.

**Good**
`<button>` or correct role+name; focus ring; error message in field “Email format appears incomplete”; color + icon.

**Bad modal**
Background scrolls, focus is in the background, no close, no ESC.

**Good modal**
Focus inside; Tab loop; ESC and visible Close; returns focus to trigger.

**Bad motion**
Continuous shaking in hero; no way to turn off.

**Good**
Simple transition or static visual with `prefers-reduced-motion`.

## FirstClick Score Impacts

- **clarity:** Contrast, labels, error language, focus order. A11y gaps are the technical side of clarity.
- **adoption:** If critical flow can’t be completed with keyboard or assistive tech, adoption↓ (product enters “unusable” class).
- **onboardingRisk:** Label/focus break in signup form increases risk↑.
- Trust: fake compliance claims reduce trust↓ for skeptical personas.
- Analyst exaggeration: Don’t say “WCAG failed / legal risk certain”; write the observed signal, don’t invent legal outcomes.

## Action Checklist

1. Qualitatively check tab order in critical flows (signup/CTA) — if corpus/video exists.
2. Check if icon-only controls have accessible names.
3. Check form label associations.
4. Note non-color channels for error states.
5. Check modal/dialog escape.
6. If there’s an a11y claim on landing, compare with UI signals.
7. Flag extremely low-contrast texts (if no measurement, “low contrast appearance” is enough; don’t invent ratios).
8. Suggest: semantic element, focus, label, error message — don’t write speculative remediation code.

## Citation Discipline

- Observed UI behavior: [doc:…] / [web:…].
- A11y rules: [kb:58-accessibility]; if previous short note [kb:46-a11y] conflicts, treat this file as the deep standard.
- Do not claim “AA compliant” on behalf of FirstClick unless the product says so.
- Don’t invent statistics/legal penalties.

## Analyst Implementation Note

A11y chunk: signal type (focus|contrast|label|keyboard trap|motion), quote/promise, persona, score. Example: “skeptical, landing ‘WCAG AA’ [web:…] but modal ESC missing → trust↓ clarity↓; suggest focus trap and escape; soften compliance claim until proven.”

## Deep Implementation: Translating a11y to FirstClick Language

FirstClick does not issue “WCAG 2.2 AA fail” certificates like an audit firm. Instead, it translates observed exclusion signals into persona and score language.

**Keyboard path:** Signup → primary CTA → close modal. If this path can’t be completed with tab, write adoption and onboardingRisk rationale. If no video/corpus, don’t exaggerate; visible `outline: none` and icon-only controls count as qualitative signals.

**Meaningful names:** If the “edit” icon has no name, both screen reader and visual users (without tooltip) are harmed. Combined with lack of hover on mobile ([kb:57-mobile-ux]).

**Contrast:** If no measurement tool was run, “low contrast appearance” is enough; don’t invent a 4.5:1 claim. Marketing gray text also reduces landing clarity ([kb:59-visual-hierarchy]).

**Motion:** Continuous animation is both an a11y and performance perception issue. If reduced-motion is missing, cross-reference both files.

**Timeout:** If OTP and form countdown can’t be extended, non-technical and slow-reading users drop off. Write the observed time pressure.

**Honest promise:** “Accessible product” claim without proof signals trust↓ for skeptical personas. Analyst does not invent legal risk percentages.

Scenario: Skeptical sees AA claim on landing, modal ESC missing in app → contradiction with citation. Non-technical sees error only as red border → confusion. Busy-professional faces low contrast outdoors → friction.

RAG chunk keys: focus, keyboard trap, accessible name, contrast, non-color channel, reduced-motion, skip link, promise drift.

## Scenario Lab: Exclusion

**A:** Modal focus in background; no ESC. Keyboard user trapped. adoption↓.

**B:** Error only red border. Color blindness + non-technical. clarity↓.

**C:** Landing AA claim; outline removed in app. Skeptical trust↓ with citation.

**D:** Autoplay video with sound; hard to close. Busy-professional + vestibular risk.

**E:** OTP 30 sec; no extension. First-timer drops off. onboardingRisk↑.

## Operational Control

Tab path, focus visibility, accessible name, label, contrast appearance, non-color error, reduced-motion, time pressure, promise–UI drift. Don’t invent legal outcomes or exact WCAG scores.

## Decision Framework: Exclusion or Discomfort?

FirstClick does not weigh every contrast complaint equally. Keyboard trap in a critical flow can block adoption. Light gray secondary text reduces clarity but may not stop the flow. Analyst distinguishes severity: barrier (task cannot be completed), friction (hard but possible), discomfort (aesthetic/reading fatigue).

Barrier class examples: focus trap, clickable but non-activatable div, wrong field filled due to missing form label, drop-off due to unextendable timeout. Friction: weak focus ring, small targets, missing hover info on mobile. Discomfort: heavy parallax, excessive animation (can be a barrier for vestibular users — escalate by context).

Accessibility overlaps with mobile and form. The same root cause can link to multiple kb files; choose the primary frame in the score rationale. For example, placeholder-only input: primary [kb:56-form-design], cross [kb:58-accessibility].

Evidence discipline: Don’t write “screen reader tested” on behalf of FirstClick unless the product says so. Write visible DOM/label/focus signals. Don’t invent AA/AAA numeric claims if not measured. Comparing compliance badge on landing with UI signal is correct and requires citation.

## Unified Reading: a11y × Clarity and Trust

Accessibility often appears in FirstClick as the technical sublayer of clarity. Unlabeled control, low contrast, color-only error — all turn into “I don’t understand / I can’t see / what’s clickable?” confusion. For skeptical personas, fake compliance claims are trust breakers; write this under trust.

For dual findings in form and a11y: don’t repeat the same placeholder-only field in two long paragraphs. In one, write the root cause; in the other, cross-reference. Modal focus trap is both a navigation semantic issue and an a11y barrier; if the primary class is “barrier,” choose a11y.

Motion and performance perception overlap. Continuous animation may seem “premium” but lack of reduced-motion is exclusionary. Analyst does not enter aesthetic debate; checks for control and escape.

Remember: FirstClick is not legal counsel. Don’t write “lawsuit risk %X.” Observed exclusion + promise contradiction is a strong enough finding.

## Analyst Glossary: a11y Finding Patterns

Short patterns should remain searchable in RAG. “Focus trap — modal — no ESC — adoption barrier.” “Color-only error — clarity↓ — add text/icon channel.” “Icon-only — no accessible name — confusion.” “Outline removed — keyboard path unclear.” “AA claim — no signal — trust drift.” Combine these patterns with product quotes; pattern alone is not evidence. Heuristic severity order: critical flow barrier > form label break > contrast discomfort. State severity clearly in every finding.
