# A/B and Experimentation: Measuring to Learn, Not to Make Up

When evaluating experimentation signals, the FirstClick analyst asks: is the product team presenting the change as a “winning variant” with honest methodology, or is it an early-stopped/dirty measurement — and is the user being subjected to a manipulative experience? This document is the standard framework for A/B experimentation evaluation in the FirstClick knowledge base. [kb:108-ab-experimentation]

## Scope

This file covers: hypothesis quality, primary metric selection, heuristics for sample size/duration discipline, sequential test contamination, personal experience inconsistency (user sees a different UI each time), and ethical boundaries (dark pattern experiments). Out of scope: which metrics are meaningful for product health (see [kb:109-metrics-evaluation]), notification copy (see [kb:107-notifications]). FirstClick is not a statistics engine; the analyst does not fabricate p-values or write “%X uplift”.

Heuristic: A robust experiment has a single primary metric + a pre-written hypothesis + sufficient duration logic. Unsupported claims like “Button color increased by 12%” are weak signals.

## Diagnostic Signals

1. **Metric soup**: One out of dozens of secondary metrics is picked as “winner” (gives a cherry-picking impression).
2. **Early stopping vibe**: Declaring a definite win in a very short time — the analyst does not make up duration; notes exaggerated certainty language.
3. **Hypothesis-free UI jumping**: Radical changes every week for the user; no learning, only fatigue.
4. **Dirty assignment**: The same user switches variants between sessions; causes confusion.
5. **No north star**: The experiment increases “clicks” but activation drops — trade-off not discussed.
6. **Dark pattern experiment**: Hidden cancellation, misleading checkbox — ethical issue (see also paywall/trust).
7. **Segment blindness**: Mobile disaster, desktop “wins”; global roll-out.
8. **No documentation**: “We tested it” claim, but what was tested is missing from the corpus.

Positive signals: explaining the rationale for the change in user language (changelog), consistent experience, alignment of the primary success metric with activation/retention, open discussion of harmful trade-offs (if possible), avoidance of dark patterns.

## User Objections

- **“Yesterday the menu was here, today it’s gone.”** (stability)
- **“Why is my screen different from my friend’s?”**
- **“Was this cancellation flow deliberately made harder?”**
- **“What you call ‘better’ made my job harder.”**

## Persona Reactions

- **busy-professional**: Wants stability; frequent layout changes cost time.
- **non-technical**: Should not see A/B jargon; inconsistent labels cause confusion.
- **skeptical**: Manipulative variant means trust↓; fancy “optimized” language is not enough.
- **price-sensitive**: If price experiment is not transparent, anger (sudden price/plan difference).
- **student / first-timer**: If the learning path changes every time, drop-off increases.

## Good and Bad Examples

**Bad — vanity win**  
A CTA color test is celebrated because “clicks increased”; post-signup activation is not discussed. Analyst does not fabricate percentages; writes a vanity metric warning.

**Good — hypothesis chain**  
“If we translate the empty state CTA into task language, the first project creation rate will increase” — primary metric is the activation event; secondaries are separate.

**Bad — dark experiment**  
Cancel button is hidden in Variant B; “retention increased” is claimed. Ethical and trust finding.

**Good — ethical boundary**  
Experiments do not disrupt information and freedom of choice; extra caution in risky areas (pricing, privacy).

**Bad — flicker / flicker-trap**  
Page loads as A, then jumps to B; damages trust and usability.

**Good — consistent assignment**  
User stays in the same variant throughout the experiment; single experience at the end.

## FirstClick Score Impacts

- **clarity**: Frequent and unexplained UI changes clarity↓.
- **trust**: Dark pattern experiments trust↓.
- **adoption**: Flows broken by vanity metrics adoption↓.
- **onboardingRisk**: Aggressive multi-experimentation in onboarding risk↑.
- Timeline: “experiment instability”, “dark pattern test”, “metric mismatch”.

Heuristic: Do not write fabricated uplift in the FirstClick report. Say “No test result claim in corpus”.

## Action Checklist

1. Scan for frequent UI inconsistency or “we tested it” claims.
2. Qualitatively ask if the primary metric is aligned with user value.
3. Check for dark pattern variants.
4. Note segment (mobile/desktop) contradictions.
5. Check changelog/rationale transparency.
6. Add persona objection.
7. Cross-reference the metrics file.
8. One-sentence recommendation: hypothesis + ethical boundary + stability.

## Deep Diagnostic Scenarios

**Scenario A — Onboarding slot machine.** Different wizard step on every visit. First-timer cannot learn; onboardingRisk↑.

**Scenario B — Price experiment shock.** Different prices for users on the same plan; no transparency. Price-sensitive/skeptical anger.

**Scenario C — Click win, value loss.** Larger CTA increases clicks; more signups from the wrong segment, activation drops. Metric mismatch ([kb:109-metrics-evaluation]).

**Scenario D — Support blindness.** Variant B increases error rate; experiment is “winner” in production — no changelog in corpus, user confusion.

**Scenario E — Consent experiment.** Variant makes privacy checkbox harder. Ethical + trust finding.

**Scenario F — Flicker.** A/B tool loads late; layout jumps. Clarity and trust are damaged.

## FirstClick’s Role in Experimentation

FirstClick does not calculate statistical significance. Its job: to catch inconsistencies visible to the user, dark patterns, metric–value misalignment, and exaggerated “proven” language. Do not write p-values, power analysis, or uplift percentages in reports. “Method not explained in corpus” is a valid finding.

## Ethical Boundary List

Caution areas: pricing, cancellation, privacy consent, health/financial advice, products for children. Aggressive experimentation or dark variants in these areas mean trust↓ and potential harm — analyst does not fabricate harm percentages, uses risk language.

## Common Analyst Mistakes

1. Assuming every UI difference is A/B — could be localization or role-based UI.
2. Penalizing the product just for having experiments — what matters is bad methodology and harmful variants.
3. Giving generic “test it” advice without writing a hypothesis.
4. Declaring a winner with fabricated benchmarks.
5. Ignoring the need for stability.

## RAG Independent Chunk Note

Chunk questions: is the hypothesis and primary metric aligned with value; is there a dark pattern; is the experience stable; is there exaggerated certainty language? Preserve the terms hypothesis, primary metric, variant, dark pattern, stability.

## Turkey and Language Notes

TR–EN switching may be i18n inconsistency, not an experiment. In price experiments, VAT and currency can cause contamination — do not fabricate uplift. If there is no claim of geographic testing in the corpus, do not write it.

## Hypothesis Template and Collision

“If [change] is made, [persona]’s [value event] will improve because [rationale]. Risk: [trade-off].” Multiple simultaneous experiments produce collision/instability.

## Changelog Transparency

“Updated for a better experience” is an empty rationale; what changed should be stated in one sentence. Skeptical personas may read empty rationales as manipulation.

## FirstClick Report Paragraph

“Experiment/inconsistency observed [UI difference or claim]. Primary metric value [aligned/vanity]. Ethical risk [none/dark pattern]. Stability [weak/sufficient]. Recommendation: [hypothesis template + ethical boundary]. Score: clarity/trust — experimentation; no p-value.”

## User-Visible Inconsistency Log

In the timeline: two different ways to do the same task, missing menu item, changing price card. Even if there’s no date for each line, write session order. This log is not statistics; it is evidence of confusion.

## Common Corpus Contradictions

Changelog says “better onboarding”; user sees a different step order on every login — no stability. Blog claims “we tested, it won”; primary metric is click, activation not discussed. Cancellation flow is hidden in one variant; praised as retention increase — dark pattern. In price card A/B, VAT included/excluded gets mixed; users see different totals. Broken variant on mobile is live as global “winner”. Analyst does not write uplift or p-value; handles inconsistency, vanity win, and ethical risk qualitatively. Recommendation: hypothesis template, value metric, ethical boundary, consistent assignment.

## Persona Objection Dialogues (Sample Language)

busy-professional: “The menu was here yesterday, why did it change today?”
skeptical: “Did you make cancellation harder on purpose?”
price-sensitive: “My friend sees a different price, is this fair?”
non-technical: “Why is my screen always jumping around?”
student: “The tour is different every time, I can’t learn.”
These dialogues capture stability, ethical, and price experiment risks. Analyst does not answer with statistics; writes surface findings.

## Short Analyst Summary

FirstClick does not audit methodology in experimentation, but checks for inconsistencies and ethical risks visible to the user. Vanity click wins, dark cancellation variants, and session-to-session flicker are key findings. Hypothesis must be tied to the primary value event. p-value, power analysis, and uplift percentage are forbidden. Stability and changelog transparency are trust justifications for skeptical personas.

## Persona-Based Commentary

Experimentation signals carry different weight by persona. For **busy-professional**, the main cost is stability; frequent layout changes are lost time even if the experiment “wins”. **non-technical** should never see A/B jargon; inconsistent labels and week-to-week changing steps break learning. **skeptical** reads dark pattern variants and fancy “optimized” language as manipulation; will not be convinced without methodological transparency. For **price-sensitive**, price experiments are the most sensitive — users seeing different prices on the same plan get angry. For **student/first-timer**, a learning path that changes on every visit directly causes drop-off. The analyst re-weights the same experiment finding through these filters.

## Scoring Impact: Sample Reading

FirstClick does not write uplift; instead, it ties the experiment’s user-facing surface to a qualitative score. Example: “Three simultaneous variants in onboarding + flicker” → clarity↓ (inconsistent first experience) and onboardingRisk↑ (fragile path to first value). Example: “Variant that hides the cancel button is claimed to have won retention” → trust↓ (dark pattern) and ethical finding. Analyst writes the score with rationale, not numbers: “experiment method not explained in corpus; ‘proven’ language is exaggerated → trust rationale weakens.” Timeline tags must be concrete: experiment-instability, dark-pattern-test, metric-mismatch, flicker.

## Action Recipe and Edge Cases

Recipe: (1) collect frequent UI inconsistency or “we tested it” claims with quotes; (2) qualitatively question alignment of primary metric with user value; (3) look for dark variants in sensitive areas like pricing/cancellation/privacy; (4) note segment contradiction (mobile bad, desktop good); (5) check if changelog rationale is empty; (6) use the hypothesis template (change → value event → rationale → risk) in the recommendation. Edge cases: **localization/role-based UI** is not an experiment, do not penalize as A/B; **gradual roll-out** (slow release) naturally causes different users to see different versions, this alone is not instability; **feature flag with kill-switch** is actually a maturity signal, it’s not the presence of the experiment but bad methodology and harmful variants that are penalized.

## Attribution Discipline

- Product claims: [web:…] / [doc:…].
- [kb:108-ab-experimentation]; metrics: [kb:109-metrics-evaluation].
- Strict ban on fabricating p-value, sample size, uplift percentage.

## Analyst Implementation Note

Template: “[Persona] experiment/inconsistency ‘[observation]’; [vanity metric|dark pattern|no stability] causes [confusion|trust↓]. Recommendation: [primary metric = activation + ethical boundary]. Score: clarity/trust rationale experimentation.” In RAG, keep the words hypothesis, primary metric, variant, dark pattern, stability.
