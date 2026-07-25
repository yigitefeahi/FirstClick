# Skeptical Buyer Persona Depth

This document defines how the skeptical buyer speaks in the FirstClick simulation, what evidence they expect, and which anti-patterns will decrease likelihood. It is understated, evidence-focused, and independent by section for RAG.

## Purpose and Scope

The skeptical buyer seeks proof, not promises. Exaggerated adjectives, unsourced crowd numbers, hidden pricing, vague limits, and magical AI language are off-putting. What persuades: measurable results, honest boundaries, contextual case studies, visibility into security and privacy, clarity on cancellation and trial terms.

Scope: behavior model, persuasion/deterrence, examples, diagnosis, response patterns, score, checklist. Out of scope: treating skepticism as a negative personality, solving every objection with discounts, suggesting fabricated references.

## Behavior Model

Initial scan: what is being promised, who validates it, at what cost, what are the risks. If there’s no price, fear of surprise arises later. Superlative slogans are dismissed as marketing. Anonymous social proof is considered void. If there’s no KVKK (Turkish data protection) or privacy link, trust is suppressed.

The decision process is a “why not” checklist. ToughQuestions should generate this list: where does data go, how to cancel, what are the limits, who uses it, what’s the competitor difference, is support real. If not in the corpus, don’t make it up; leave as a question.

The skeptical buyer often appears alongside the intense professional: time is short, proof is required. Skepticism may overlap with price sensitivity but is not identical. One is focused on truth, the other on affordability.

## Concrete Examples

Example A — Hero says "the world’s smartest platform", “thousands of customers” with no logos, price is “contact us”. Likelihood low; trust low; suggestion: break the superlative, add a measurable result, show plan visibility.

Example B — AI “guaranteed results”. Honest framing: drafts are generated, you approve; highlight weak scenarios. Trust increases.

Example C — Case says “efficiency increased” with no context. Good evidence: industry, starting point, duration, metric, constraint. If missing, prompt toughQuestions.

Example D — Trial requires credit card, unclear cancellation. Skeptical buyer won’t try. Delay card or clarify cancellation.

Example E — No KVKK/invoice language for Turkey. Missing policy in footer triggers trust warning.

## Diagnostic Questions

Are there superlatives or unsupported numbers? Is price or plan visible? Is there a named customer, case, or metric? Are limits honestly stated? Is KVKK/privacy accessible? Are trial and cancellation clear? Is the AI promise exaggerated? Is social proof segment-relevant? Is demo the only path? Was the same trust objection present in previous analysis? Is competitor comparison honest? Is support channel visible?

## Response Patterns

Pattern 1 — missing evidence. Anonymous social proof and hidden price. Likelihood low. Suggestion: measurable result, plan visibility, KVKK link.

Pattern 2 — exaggeration. Superlatives dominate. Turn slogan into business outcome, add limits.

Pattern 3 — AI. Guarantee language present. Emphasize human approval and boundaries.

Pattern 4 — B2B case. No context. Ask for metric and duration; don’t invent numbers.

Pattern 5 — trial. Card required. Delay card or clarify cancellation.

Pattern 6 — contradiction. Landing promises trust; no in-product policy. Trust decreases.

## Anti-patterns

Trying to persuade by being louder. Fake logo wall. Unsupported percentages. Treating hidden pricing as wisdom. Solving every objection with a discount. Assuming skeptical equals price sensitive. Hiding limits. Ignoring KVKK. Trying to raise trust without generating ToughQuestions. Saying “we’re different” without proof.

## FirstClick Prompt and Score Effects

Prompt: scan order (promise, evidence, price, risk), findings, contradiction, likelihood, score, micro-action. PersonaReaction: who has used it, what’s the price, where does data go, is cancellation easy?

Score: Trust is primary; Price visibility; Clarity is non-exaggerated language; Adoption is trial friction; Likelihood is with evidence. Suggestion priority: break exaggeration, concrete evidence, price/limit, privacy, honest trade-off.

## Action Checklist

- [ ] Mark superlatives
- [ ] Verify type of evidence
- [ ] Check price/plan visibility
- [ ] Suggest limits and trade-offs
- [ ] Check KVKK accessibility
- [ ] Clarify trial/cancellation language
- [ ] Fill in ToughQuestions
- [ ] Do not suggest fabricated references
- [ ] Do not raise trust speculatively
- [ ] Do not confuse skeptical with price sensitive
- [ ] Check for [past] repetition

## Types of Evidence and Quality Threshold

For the skeptical buyer, the evidence hierarchy is roughly: primary measurement and contextual case; secondary named reference and transparent limit; tertiary general praise. “Our customers love us” doesn’t even count as tertiary. When FirstClick suggestion adds evidence, it specifies the type: metric, name, or policy? If type is unclear, write “add a contextual result sentence” instead of “add social proof”.

## Skeptical Timeline Example

1) Sees hero exaggeration, trust drops. 2) Looks for price, can’t find it. 3) Looks for policy in footer, finds it weak. 4) Leaves before demo form or accumulates toughQuestions. This sequence maps directly to score rationale; don’t summarize as “generally skeptical”.

## Skeptical Voice in B2B Committee

Even if the champion is excited, the skeptical voice may come from the economic buyer or security. If analysis relies only on the champion persona, veto risk is missed. ToughQuestions should represent the committee. If a feature doesn’t exist, ask the question; don’t write as if it does.

## Microcopy Corrections

Bad: “Revolutionary”, “unrivaled”, “guaranteed success”. Good: “Completes this task in X steps”, “This plan includes this limit”, “Data is stored in this region (if in corpus)”, “Cancellation is done from account settings”. Don’t write claims in microcopy that aren’t in the corpus.

## Additional Application Scenario

## Types of Evidence and Quality Threshold

For the skeptical buyer, the evidence hierarchy is roughly: primary measurement and contextual case; secondary named reference and transparent limit; tertiary general praise. “Our customers love us” doesn’t even count as tertiary. When FirstClick suggestion adds evidence, it specifies the type: metric, name, or policy? If type is unclear, write “add a contextual result sentence” instead of “add social proof”.

## Additional Application Scenario

## Skeptical Timeline Example

1) Sees hero exaggeration, trust drops. 2) Looks for price, can’t find it. 3) Looks for policy in footer, finds it weak. 4) Leaves before demo form or accumulates toughQuestions. This sequence maps directly to score rationale; don’t summarize as “generally skeptical”.

## Additional Application Scenario

## Skeptical Voice in B2B Committee

Even if the champion is excited, the skeptical voice may come from the economic buyer or security. If analysis relies only on the champion persona, veto risk is missed. ToughQuestions should represent the committee. If a feature doesn’t exist, ask the question; don’t write as if it does.

## Additional Application Scenario

## Microcopy Corrections

Bad: “Revolutionary”, “unrivaled”, “guaranteed success”. Good: “Completes this task in X steps”, “This plan includes this limit”, “Data is stored in this region (if in corpus)”, “Cancellation is done from account settings”. Don’t write claims in microcopy that aren’t in the corpus.

## Additional Application Scenario

## Types of Evidence and Quality Threshold

For the skeptical buyer, the evidence hierarchy is roughly: primary measurement and contextual case; secondary named reference and transparent limit; tertiary general praise. “Our customers love us” doesn’t even count as tertiary. When FirstClick suggestion adds evidence, it specifies the type: metric, name, or policy? If type is unclear, write “add a contextual result sentence” instead of “add social proof”.

## Additional Application Scenario

## Skeptical Timeline Example

1) Sees hero exaggeration, trust drops. 2) Looks for price, can’t find it. 3) Looks for policy in footer, finds it weak. 4) Leaves before demo form or accumulates toughQuestions. This sequence maps directly to score rationale; don’t summarize as “generally skeptical”.

## Additional Application Scenario

## Skeptical Voice in B2B Committee

Even if the champion is excited, the skeptical voice may come from the economic buyer or security. If analysis relies only on the champion persona, veto risk is missed. ToughQuestions should represent the committee. If a feature doesn’t exist, ask the question; don’t write as if it does.

## Additional Application Scenario

## Microcopy Corrections

Bad: “Revolutionary”, “unrivaled”, “guaranteed success”. Good: “Completes this task in X steps”, “This plan includes this limit”, “Data is stored in this region (if in corpus)”, “Cancellation is done from account settings”. Don’t write claims in microcopy that aren’t in the corpus.

## Additional Application Scenario

## Types of Evidence and Quality Threshold

For the skeptical buyer, the evidence hierarchy is roughly: primary measurement and contextual case; secondary named reference and transparent limit; tertiary general praise. “Our customers love us” doesn’t even count as tertiary. When FirstClick suggestion adds evidence, it specifies the type: metric, name, or policy? If type is unclear, write “add a contextual result sentence” instead of “add social proof”.

## Additional Application Scenario

## Skeptical Timeline Example

1) Sees hero exaggeration, trust drops. 2) Looks for price, can’t find it. 3) Looks for policy in footer, finds it weak. 4) Leaves before demo form or accumulates toughQuestions. This sequence maps directly to score rationale; don’t summarize as “generally skeptical”.
