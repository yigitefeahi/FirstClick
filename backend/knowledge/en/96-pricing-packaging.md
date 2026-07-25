# Pricing Packaging: Plan Architecture and Selection Clarity

When evaluating pricing packaging, a FirstClick analyst asks: from the pricing page, plan cards, and limit explanations in the user corpus, can users clearly answer “Which plan am I on, what am I paying for, when do I upgrade to the next plan?” This document is the standard framework for pricing packaging evaluation in the FirstClick knowledge base. [kb:96-pricing-packaging]

## Scope

This file covers the following areas: number and naming of plans, feature–limit matrix, seat / usage / feature-based metrics, annual–monthly presentation, “recommended” plan emphasis, hidden fee risk, and consistency between landing promise and pricing page. Out of scope: free trial and freemium mechanics (see [kb:97-free-trial-freemium]), in-app paywall moment (see [kb:98-paywalls]), B2B purchasing process (see [kb:100-sales-led-b2b]). Packaging answers “what is being sold and how is it grouped”; trial answers “how is it tried”, paywall answers “when is it blocked”.

Heuristic: Good packaging allows the target segment to recognize themselves in a card and see the difference with the next plan at a glance. This is not a conversion rate claim; it is a working hypothesis used when reading confusion, sticker shock, and drop-off in the FirstClick timeline.

## Diagnostic Signals

The following signals in the corpus indicate pricing packaging problems:

1. **Plan inflation**: More than four plan cards of equivalent weight; differences are only explained by “more of X” repetitions. Users experience choice paralysis.
2. **Feature soup**: 20+ rows in the matrix, most are “✓ / ✗ / unlimited” triplets; it’s unclear which row actually changes the purchase decision. Clarity drops.
3. **Metric confusion**: The same product presents both seat, “credit”, “project limit”, and “API call” as primary pricing units; it’s unclear which is actually billed.
4. **Hidden overage**: Main price is low, but in the footnote: “overage fees apply” or “contact us for additional users”. For price-sensitive and skeptical personas, this breaks trust.
5. **Contact sales as the only option**: In a product targeting SMBs, all plans are “Contact sales”. Self-serve adoption and firstImpression weaken.
6. **Promise–price drift**: Landing says “unlimited team”; Pro plan has 3 seats. Contradiction with citation should be written.
7. **Naming jargon**: Names like “Growth Engine”, “Scale OS”, “Platform+” do not explain the content; non-technical personas cannot say “which one am I?”
8. **Annual pressure ambiguity**: “2 months free” and “17% discount” shown at the same time, it’s unclear which period is selected; no cancellation language.

Positive signals: classic three-plan skeleton (Free/Starter – Pro – Business), visual “recommended” mark on the middle plan, limits explained numerically and in plain Turkish, clear distinction between seat and usage in a single sentence, annual savings written as both percentage and months, cancellation and refund terms placed close to the price card.

## User Objections

Common objections seen on the packaging page (the analyst translates these into persona language, does not add made-up percentages):

- **“I don’t know which one to choose.”** This arises if plan differences are not explained in terms of business outcomes, but only as feature lists.
- **“Are there any hidden costs?”** Suspicion about seat, overage, setup, or mandatory add-ons. Skeptical persona codes this as high friction.
- **“It’s too much / too little for me.”** The middle plan is bloated as “for everyone”; the lower plan is useless, the upper plan is a corporate maze.
- **“Why annual upfront?”** Cash flow sensitivity; if the monthly option is hidden or shamed, price-sensitive users drop off.
- **“I can’t see the price without talking to sales.”** For buyers expecting self-serve, this is a trust and time cost objection.
- **“What do I lose/gain when I upgrade from the free plan?”** If the upgrade path is unclear, the freemium bridge breaks (see [kb:97-free-trial-freemium]).

When writing the objection on the timeline, quote the actual plan name and limit sentence from the product corpus; don’t just say “price is unclear”.

## Persona Reactions

- **busy-professional**: Wants to shorten decision time. Three cards + “most teams choose Pro” clarity is good; a 15-row matrix is a waste of time. If the ROI sentence (“Do X in Y minutes”) is missing under the plan, the adoption rationale weakens.
- **non-technical**: If “seat”, “MAU”, “throughput” are left unexplained, panic ensues. Wants limits in everyday language: “3 people”, “100 documents per month”, “no dedicated support”.
- **skeptical**: “Unlimited” claim + footnote contradiction breaks trust. If money-back, cancellation, contract duration are not visible, won’t even enter the trial. If the case study price band doesn’t match (startup logo + Enterprise price), suspicion increases.
- **price-sensitive**: Focuses on the visible price at first glance + annual requirement + overage. If education/startup discount is promised on the landing but not on the pricing page, writes promise drift.
- **student / first-timer**: If there’s no free or student plan, says “not for me”. If what the Starter covers isn’t explained with an example scenario, can’t make a choice.

When writing the packaging problem in the persona note, quote the plan card text as is; the general judgment of “bad pricing” is a weak finding for FirstClick.

## Good and Bad Examples

**Bad — feature soup**  
Five plans: Free, Plus, Pro, Business, Enterprise. 28 rows in the matrix; the only difference between Pro and Business is “priority support” and “dedicated success manager”. Busy-professional cannot decide; skeptical feels “artificial step”.

**Good — three plans in business outcome language**  
Starter: “Single person / small team — invoicing and quoting”. Pro: “Growing team — approval workflow and reporting”. Business: “Multiple departments — SSO and audit”. Limits are numeric: 1 / 10 / unlimited seats (if unlimited, what is limited is also specified). The middle Pro is “recommended”.

**Bad — hidden metric**  
Card says “₺X / month”. Footer says “overages billed separately” and “per additional connector fee”. Main decision unit is unclear; price-sensitive experiences sticker shock.

**Good — primary + secondary metric**  
“Monthly price per person. Includes: N projects. Overage: extra fee per project — shown in the table.” If there’s a self-serve calculator or example scenario (“5-person team ≈ …”), confusion decreases. This is not a measurement claim; it’s a clarity heuristic.

**Bad — contact-only SMB**  
Product targets SMBs; only CTA on pricing page is “Book a demo”. No price. Transparency penalty in FirstImpression; adoption drops as there’s no self-serve path.

**Good — hybrid transparency**  
Self-serve plans are priced; Enterprise is “custom” but there’s a minimum starting band or “usually starts from X” statement. Sales path is separate, not hidden.

**Bad — name drift**  
Landing says “Professional”, checkout says “Pro Workspace”, invoice says “Plan B”. Skeptical reads this inconsistency as “not mature”.

**Good — single canonical name**  
Web, app, invoice, and email use the same plan name. If there’s an old name, “old name → new name” note is kept short.

## FirstClick Score Effects

- **clarity**: Comprehensibility of plan differences and limit language. Jargon metrics and bloated matrices reduce clarity.
- **adoption**: If the user can’t say “this is my plan”, the rationale for moving to trial/payment weakens; packaging friction can be read as product inadequacy.
- **onboardingRisk**: If the path to first value is locked behind a paid plan and the free tier doesn’t say so, risk increases. Contradiction between pricing page and in-app limit is a high-risk pattern.
- **trust / firstImpression**: Hidden fees, misleading “unlimited”, contact-only pricing — early trust break for skeptical and price-sensitive personas.
- Timeline mapping: Landing is clear, pricing page is a maze → confusion + friction; “packaging opacity” tag is recommended.
- If there’s a promise–price contradiction, [web:…] or [doc:…] citation is mandatory in the score comment; do not make up prices.

Heuristic score note: Packaging alone does not claim to “increase conversion by %X”. The analyst qualitatively ties observed signals (number of plans, limit clarity, hidden fees, name consistency) to the score rationale.

## Action Checklist

1. Extract plan names, prices, and limit sentences from the corpus as is; do not paraphrase.
2. Count the number of plans; if more than four, suggest merging or strengthening “who is it for” language.
3. Write the primary pricing metric in a single sentence (seat / usage / flat); if there’s more than one, clarify which is billed.
4. Check for drift between landing promise and pricing matrix; if present, write a finding with citation.
5. Move overage, setup, mandatory add-on footnotes to the main decision area or make them visible.
6. Set up objection scenarios per persona (price-sensitive → annual pressure; skeptical → unlimited footnote).
7. Verify that the “recommended” plan truly fits the middle segment business outcome; if it’s an artificial upsell, note it.
8. Write the recommendation in a single sentence: action + rationale (“Reduce plans to three business outcomes because…”).

## Turkey and Language Notes

Pricing packaging in TR-focused products may create additional friction: VAT included/excluded ambiguity, USD listed but TRY charged, “+VAT” only in the footnote. The analyst does not make up exchange rates or tax rates; quotes the currency and VAT statement as seen in the corpus. Mixing Turkish–English plan names (Starter / Profesyonel / Enterprise) creates extra load for non-technical users — recommend single language or parenthetical explanation. If “Contact us” is unclear whether it’s sales or support, clarity drops.

## Plan Matrix Reading Protocol

1. Extract card titles as is.
2. For each card, write the primary price and primary limit sentence.
3. Keep only the difference rows that change the decision; label the rest as noise rows.
4. List hidden fee candidates (seat, overage, setup, mandatory add-on).
5. Link persona objection in a single sentence.
This protocol can be applied independently in RAG.

## Attribution Discipline

- Product plan text and prices: only [doc:…] or [web:…] / screenshot citation. If not in corpus, say “did not see price card in corpus”.
- General packaging rule and heuristics: [kb:96-pricing-packaging].
- Trial/freemium bridge: [kb:97-free-trial-freemium]; paywall moment: [kb:98-paywalls]; B2B sales: [kb:100-sales-led-b2b].
- If the same opacity existed in previous analysis: [past:…].
- Do not make up statistics: do not write percentages like “three plans increase conversion”. Instead: “if selection clarity increases, adoption rationale strengthens (heuristic).”

## Analyst Implementation Note

When translating a packaging finding into a persona reaction, use the template: “[Persona] objects to ‘[quoted plan/limit]’; due to [hidden fee|metric confusion|plan inflation], experiences [friction|confusion|sticker shock]. Recommendation: [canonical plan architecture]. Score: clarity↓ / adoption↓ / onboardingRisk↑ rationale packaging.” This template carries domain words (plan, seat, overage, matrix, recommended plan) in every section so it remains meaningful in RAG chunks.
