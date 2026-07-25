# Budget-Constrained Buyer Persona Depth

This document defines how to interpret users with high price and affordability concerns in FirstClick. The goal is not just to say "make it cheap"; it is to diagnose visible value, transparent plans, trial risk, and hidden costs. Sections are independent.

## Purpose and Scope

The budget-constrained buyer may be a student, early-stage startup, SME, individual professional, or teams where purchase approval is difficult. Common behaviors: plan comparison, total cost of ownership questions, fear of surprise fees, avoidance of annual commitments, preference for "try without card." Persuasion: clear pricing, what’s included, limits, ease of cancellation, free or low-risk initial value. Deterrents: hidden pricing, forced demo, early paywall, unclear seat math, hidden add-on fees.

Out of scope: offering discounts to everyone, fake "X% cheaper" claims, making up competitor pricing. In scope: diagnosis, scoring, micro-actions, distinguishing from skeptics.

## Behavior Model

At first glance, the user looks for a pricing page or plan card. If absent, a "let’s talk" wall is a risk signal. If plans exist, comparison follows: limits, seats, support, annual/monthly. Unclear "custom pricing" is understandable for enterprise; if it contradicts a PLG promise, adoption drops.

Value calculation is arithmetic, not emotional: "Is this cheaper than Excel plus two hours of my work?" FirstClick keeps ROI language understated. Unproven "10x efficiency" claims annoy not only the budget-constrained but also skeptics.

At payment: asking for a card before the activation job is complete causes drop-off. If freemium or trial ends before showing initial value, price perception is punitive.

## Concrete Examples

Example A — No price, demo only. Talks like a PLG product. Likelihood is low. Suggestion: at least show a starter plan range or public pricing.

Example B — Three plans, but differences are jargon-heavy. "Growth = scale synergies." Clarity drops. Write differences in terms of limits and business outcomes.

Example C — All data locked at end of trial. Both budget-constrained and skeptic drop off. Suggest export or read-only access.

Example D — Seat price increases with hidden add-ons. Landing says "starting at X TL," but SSO is paid inside the product. Note the contradiction; trust and price are affected.

Example E — Student or non-profit. If there’s no suitable plan, segment is lost. If there is, prove it; if not, don’t fake it.

Example F — Annual only. Lack of monthly option deters those with cash flow constraints.

## Diagnostic Questions

Is price or plan visible? Are plan differences in business language? Does the trial require a card? Is the paywall before initial value? Are seat and add-on fees transparent? Is cancellation and refund language clear? Is annual commitment mandatory? Does freemium deliver real value? Is the ROI claim proven? Does hidden pricing contradict the PLG promise? Is there Turkey-specific invoice/VAT language? Is there previous price-related drop-off in analysis?

## Response Patterns

Pattern 1 — hidden price. No public pricing. Price and trust under pressure. Add a plan page or range.

Pattern 2 — early paywall. Card required before initial value. Move the paywall later.

Pattern 3 — unclear plan. Differences are jargon-heavy. Write the limit table with business outcomes.

Pattern 4 — lockout. Data locked after trial. Allow export or read-only access.

Pattern 5 — add-on surprise. Landing price and in-product fees contradict. Make transparent.

Pattern 6 — skeptic distinction. Issue is affordability, not proof. Prioritize transparency over discounts.

## Anti-patterns

Discounts for everyone. Fake competitor price comparisons. Mistaking hidden pricing for enterprise seriousness. Making freemium a worthless shell. Hiding seat math. Calling it "cheap" and devaluing quality. Assuming budget-constrained means only students. Unproven ROI. Making cancellation difficult. Linking price score to demographics.

## FirstClick Prompt and Score Effects

Prompt: price visibility, plan clarity, trial risk, paywall timing, add-on transparency, score, micro-action. PersonaReaction: how much, what’s included, is card required, is cancellation easy, are there surprise fees?

Score: Price is primary; Trust is surprise cost; Adoption is trial friction; Clarity is plan language; Likelihood increases with transparency. Suggestion: show the price, simplify differences, move the paywall, write limits, clarify cancellation.

## Action Checklist

- [ ] Check price/plan visibility
- [ ] Translate plan differences into business language
- [ ] Adjust paywall timing based on initial value
- [ ] Scan for seat/add-on transparency
- [ ] Note lockout risk after trial
- [ ] Check cancellation language
- [ ] Note annual commitment
- [ ] Don’t confuse with skeptic
- [ ] Don’t write fake discount/ROI
- [ ] Link price claims with citations

## Budget-Constrained vs. Economic Buyer

The budget-constrained buyer is an individual or small team concerned with affordability. The economic buyer manages a corporate budget; asks about TCO, depreciation, risk, and vendor lock-in. Both ask about price, but the question differs. In FirstClick, if PLG, budget-constrained persona is foregrounded; for enterprise sales, the economic buyer document is prioritized. Mixing them produces wrong suggestions, like offering a "discount coupon" to a corporate buyer.

## Freemium and Trial Design Notes

Freemium should complete a real job; just showing a screenshot offends the budget-constrained. Trial language about duration and limits must be honest. Saying "unlimited" but quietly throttling breaks trust. Suggestion text specifies the type of limit (duration, row, seat, feature).

## Timeline Example

1) Looks for price. 2) Can’t find it or sees jargon. 3) Card required for trial. 4) Drop-off or support question. Score rationale follows this sequence.

## Turkey Context

Uncertainty about VAT inclusion/exclusion, invoice issuance, wire transfer option, and refund period amplifies local budget concerns. If not in corpus, don’t make it up; as toughQuestions or suggestion, write "clarify tax language in pricing."

## Implementation Note

If there is no signal in corpus, do not speculate; generate toughQuestions, keep scores cautious, select the correct citation type.

## Implementation Note

If there is no signal in corpus, do not speculate; generate toughQuestions, keep scores cautious, select the correct citation type.

## Implementation Note

If there is no signal in corpus, do not speculate; generate toughQuestions, keep scores cautious, select the correct citation type.

## Implementation Note

If there is no signal in corpus, do not speculate; generate toughQuestions, keep scores cautious, select the correct citation type.

## Implementation Note

If there is no signal in corpus, do not speculate; generate toughQuestions, keep scores cautious, select the correct citation type.

## Implementation Note

If there is no signal in corpus, do not speculate; generate toughQuestions, keep scores cautious, select the correct citation type.

## Implementation Note

If there is no signal in corpus, do not speculate; generate toughQuestions, keep scores cautious, select the correct citation type.

## Implementation Note

If there is no signal in corpus, do not speculate; generate toughQuestions, keep scores cautious, select the correct citation type.

## Implementation Note

If there is no signal in corpus, do not speculate; generate toughQuestions, keep scores cautious, select the correct citation type.

## Implementation Note

If there is no signal in corpus, do not speculate; generate toughQuestions, keep scores cautious, select the correct citation type.

## Implementation Note

If there is no signal in corpus, do not speculate; generate toughQuestions, keep scores cautious, select the correct citation type.

## Implementation Note

If there is no signal in corpus, do not speculate; generate toughQuestions, keep scores cautious, select the correct citation type.

## Implementation Note

If there is no signal in corpus, do not speculate; generate toughQuestions, keep scores cautious, select the correct citation type.

## Freemium Quality Threshold

If the budget-constrained buyer cannot complete a real job on the free plan, they see the product as "advertising." FirstClick suggestions write freemium not as "cut feature list" but as "let this job be completed for free." For trials, be honest about duration and limits; silent throttling breaks trust.

## Seat Math and Surprises

If there is a per-user price on the landing page but inside the product there is a required minimum seat, mandatory support package, or regional extra fee, note the contradiction. The TCO reading from the economic buyer document applies here too; the difference is that contradictions with the PLG promise are read more harshly.

## Cancellation and Refund Language

The budget-constrained buyer asks "how do I get out" early. If there is no or buried account deletion, cancellation, or refund text, both price and trust are pressured. Suggestion: make cancellation visible in settings and a one-sentence process.

## Supplementary Note

## Freemium Quality Threshold

If the budget-constrained buyer cannot complete a real job on the free plan, they see the product as "advertising." FirstClick suggestions write freemium not as "cut feature list" but as "let this job be completed for free." For trials, be honest about duration and limits; silent throttling breaks trust.

## Supplementary Note

## Seat Math and Surprises

If there is a per-user price on the landing page but inside the product there is a required minimum seat, mandatory support package, or regional extra fee, note the contradiction. The TCO reading from the economic buyer document applies here too; the difference is that contradictions with the PLG promise are read more harshly.
