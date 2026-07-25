# Accessibility Personas

This document connects user perspectives with accessibility needs to FirstClick diagnosis. The aim is not to recite legal texts, but to look for signals of keyboard, screen reader, low vision, motor skills, cognitive load, and motion sensitivity within the product corpus. Sections are independent.

## Purpose and Scope

Accessibility personas are not monolithic. Example perspectives: keyboard-only user, screen reader user, struggles with low contrast, limited motor control (small targets are hard), affected by cognitive load (long jargon, time-limited forms), motion/animation sensitivity, deaf/hard of hearing (audio-only video). In FirstClick, these perspectives generate toughQuestions and suggestions; it does not invent fake compliance badges.

Scope: diagnostic questions, anti-patterns, scoring (especially clarity and adoption), alignment with current a11y knowledge. Out of scope: reciting WCAG items by heart, inventing "what percentage is disabled".

## Behavior and Friction

Keyboard-only: menus opening on mouse hover, no focus ring, modal trap. Screen reader: unlabeled button, visual-only error, incorrect heading order. Low vision: low contrast, gray text, thin icons. Motor: small clickable areas, tight timeouts. Cognitive: mandatory multi-step form, complex jargon, disappearing error. Auditory: critical onboarding video without captions.

These frictions are not "edge cases"; beyond legal and ethical risk, they also overlap with mobile and busy users (large targets, clear language).

## Concrete Examples

Example A — Primary CTA is distinguished by color only. Low vision and clarity issue. Add text+icon or pattern.

Example B — Onboarding video requires audio, no captions. Auditory persona and busy user in a silent office are lost.

Example C — Form error message is only a red border. Screen reader and cognitive load. Link error to text.

Example D — Infinite carousel auto-plays, no reduced motion. Suggestion: pause and prefers-reduced-motion.

Example E — "Accessible" claim, menu cannot be opened with keyboard. Contradiction; break or fix the claim.

Example F — Captcha is visual-only. Provide an alternative or different verification.

## Diagnostic Questions

Is focus visible? Can the primary task be completed with keyboard? Are button and field labels textual? Is contrast low? Are errors in text? Can timeouts be extended? Is video captioned? Can animation be stopped? Is the accessibility claim proven? Are mobile targets sufficient? Is there a captcha alternative? Does jargon inflate cognitive load?

## Response Patterns

Pattern 1 — contrast/color. Meaning conveyed by color only. Add text/pattern; clarity.

Pattern 2 — keyboard. No focus/menu on hover. Focus ring and keyboard path.

Pattern 3 — error. Color only. Text error.

Pattern 4 — media. No captions. Caption or text alternative.

Pattern 5 — claim contradiction. A11y promise, basic is broken. Lower or fix the claim.

Pattern 6 — timeout. No extension. Extend/warn first.

## Anti-patterns

Saying "designed for everyone" without testing. Fake WCAG badge. Thinking accessibility is only for visual impairment. Considering the job done with an overlay widget. Making captcha the only way. Making animation mandatory. Unlabeled icon button. Pushing accessibility to the backlog but using it in marketing.

## FirstClick Prompt and Score Effects

Prompt: which a11y perspective, UI evidence, contradiction, score, micro action. PersonaReaction concrete: "I can't open the menu with keyboard", "I can't hear the error", "contrast is unreadable".

Score: Clarity for labels and language; Adoption for task completion; Trust drops if there is a fake claim; OnboardingRisk for media and form barriers. Suggestion: label, focus, contrast, captions, error text, motion control — actionable single steps.

## Action Checklist

- [ ] Check focus and keyboard path
- [ ] Scan contrast and color-meaning
- [ ] Check form error texts
- [ ] Check video captions
- [ ] Check animation control
- [ ] Check captcha alternative
- [ ] Prove or break the a11y claim
- [ ] Evaluate target sizes including mobile
- [ ] Do not write fake compliance
- [ ] Do not contradict current a11y kb

## Intersections

Accessibility intersects with busy (quick clarity), novice (low cognitive load), and mobile (target size). A FirstClick suggestion can win multiple personas at once; stating this in the rationale is valuable.

## Legal Language Note

In the context of Turkey and the EU, accessibility expectations are increasing. The analyst does not give legal advice; an unproven "compliant" claim is flagged as a product risk.

## Timeline

1) Unlabeled field in registration form. 2) Error is color only. 3) Onboarding video without captions. 4) Abandonment. The score links this chain to adoption and clarity.

## Test Proxies (No Unproven Percentages)

Even without a full instrumental audit, visual and textual signals can be read from the corpus: lack of alt text, "click here", low-contrast gray, auto-playing video. These are sufficient for diagnosis.

## Microcopy

Good: "Password at least 8 characters — currently 5", "Press Enter to open menu". Bad: only red asterisk, icon only. Suggestion requires microcopy to be visible and programmatically labeled.

## Relationship with FirstClick and Existing 46-a11y

This document deepens the persona perspective; the technical checklist is completed with 46-a11y. In case of conflict, concrete UI observation takes precedence; general slogan is secondary.

## Implementation Depth 1

## Intersections

Accessibility intersects with busy (quick clarity), novice (low cognitive load), and mobile (target size). A FirstClick suggestion can win multiple personas at once; stating this in the rationale is valuable.

## Implementation Depth 2

## Legal Language Note

In the context of Turkey and the EU, accessibility expectations are increasing. The analyst does not give legal advice; an unproven "compliant" claim is flagged as a product risk.

## Implementation Depth 3

## Timeline

1) Unlabeled field in registration form. 2) Error is color only. 3) Onboarding video without captions. 4) Abandonment. The score links this chain to adoption and clarity.

## Implementation Depth 4

## Test Proxies (No Unproven Percentages)

Even without a full instrumental audit, visual and textual signals can be read from the corpus: lack of alt text, "click here", low-contrast gray, auto-playing video. These are sufficient for diagnosis.

## Implementation Depth 5

## Microcopy

Good: "Password at least 8 characters — currently 5", "Press Enter to open menu". Bad: only red asterisk, icon only. Suggestion requires microcopy to be visible and programmatically labeled.

## Implementation Depth 6

## Relationship with FirstClick and Existing 46-a11y

This document deepens the persona perspective; the technical checklist is completed with 46-a11y. In case of conflict, concrete UI observation takes precedence; general slogan is secondary.

## Implementation Depth 7

## Intersections

Accessibility intersects with busy (quick clarity), novice (low cognitive load), and mobile (target size). A FirstClick suggestion can win multiple personas at once; stating this in the rationale is valuable.

## Implementation Depth 8

## Legal Language Note

In the context of Turkey and the EU, accessibility expectations are increasing. The analyst does not give legal advice; an unproven "compliant" claim is flagged as a product risk.

## Implementation Depth 9

## Timeline

1) Unlabeled field in registration form. 2) Error is color only. 3) Onboarding video without captions. 4) Abandonment. The score links this chain to adoption and clarity.

## Implementation Depth 10

## Test Proxies (No Unproven Percentages)

Even without a full instrumental audit, visual and textual signals can be read from the corpus: lack of alt text, "click here", low-contrast gray, auto-playing video. These are sufficient for diagnosis.

## Implementation Depth 11

## Microcopy

Good: "Password at least 8 characters — currently 5", "Press Enter to open menu". Bad: only red asterisk, icon only. Suggestion requires microcopy to be visible and programmatically labeled.

## Implementation Depth 12

## Relationship with FirstClick and Existing 46-a11y

This document deepens the persona perspective; the technical checklist is completed with 46-a11y. In case of conflict, concrete UI observation takes precedence; general slogan is secondary.

## Implementation Depth 13

## Intersections

Accessibility intersects with busy (quick clarity), novice (low cognitive load), and mobile (target size). A FirstClick suggestion can win multiple personas at once; stating this in the rationale is valuable.

## Implementation Depth 14

## Legal Language Note

In the context of Turkey and the EU, accessibility expectations are increasing. The analyst does not give legal advice; an unproven "compliant" claim is flagged as a product risk.

## Implementation Depth 15

## Timeline

1) Unlabeled field in registration form. 2) Error is color only. 3) Onboarding video without captions. 4) Abandonment. The score links this chain to adoption and clarity.

## Implementation Depth 16

## Test Proxies (No Unproven Percentages)

Even without a full instrumental audit, visual and textual signals can be read from the corpus: lack of alt text, "click here", low-contrast gray, auto-playing video. These are sufficient for diagnosis.

## Implementation Depth 17

## Microcopy

Good: "Password at least 8 characters — currently 5", "Press Enter to open menu". Bad: only red asterisk, icon only. Suggestion requires microcopy to be visible and programmatically labeled.
