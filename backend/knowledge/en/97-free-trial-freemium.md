# Free Trial and Freemium: Value Gate Design

When evaluating trials and freemium, a FirstClick analyst asks: can the user clearly and honestly find answers to “what can I do for free, when do I pay, when will my card be charged?” from the registration, limit, and upgrade texts in the corpus? This document is the standard framework for free trial/freemium evaluation in the FirstClick knowledge base. [kb:97-free-trial-freemium]

## Scope

This file covers: the distinction between time-limited trials and feature/limit-limited free tiers (freemium), card requirement, trial duration and cancellation language, accessibility of the aha moment in the free plan, upgrade triggers, and consistency between promise and free experience. Out of scope: plan architecture details (see [kb:96-pricing-packaging]), paywall UI moments (see [kb:98-paywalls]), product-led growth cycle (see [kb:99-product-led-growth]). Trial is “timed full/broad access”; freemium is “perpetual limited access”; mixing the two in the same sentence creates confusion.

Heuristic: A good trial/freemium allows the user to produce the core value of the product at least once before paying. This is not a conversion rate claim; it is the working hypothesis used in FirstClick when reading activation and onboardingRisk.

## Diagnostic Signals

The following signals in the corpus indicate trial/freemium issues:

1. **Model ambiguity**: The “Try for free” CTA means both a 14-day trial and a permanent Free plan; which one is not specified.
2. **Card surprise**: Landing says “no credit card required”; checkout asks for a card. Promise–UI contradiction; skeptical drop-off.
3. **Value-before-wall**: A critical step on the path to the aha moment is locked in the free tier (export, invite, first report). Adoption drops, onboardingRisk rises.
4. **Duration silence**: Trial day count, end date, and what will happen (downgrade / charge) are not visible.
5. **Automatic charge ambiguity**: “Trial auto-renews after expiry” is in fine print or not present; cancellation path is hidden.
6. **Freemium trap**: Free plan exists but is so limited it’s unusable (1 project + watermark + no support + forced branding). Price-sensitive users call it “fake free.”
7. **Enterprise maze in trial**: Trial account requires SSO, contract, mandatory demo — contradicts self-serve PLG.
8. **Mid-flow limit surprise**: User sees “limit reached” in the middle of a task; no prior counter or warning.

Positive signals: model explained in a single sentence (“14 days Pro; no card” or “Free forever; upgrade to Pro”), trial end shown with countdown in-product, at least one completed value loop in the free plan, findable cancel/upgrade CTAs, limits shown numerically and in advance.

## User Objections

- **“Will you ask for my card now?”** If card requirement is unclear, friction at firstImpression.
- **“What happens when the trial ends?”** Fear of automatic charge; primary objection for skepticals.
- **“Can I get my work done on the free plan?”** If freemium has no value, perceived as an “advertisement product.”
- **“Why 7 days / why 30 days?”** If the duration is unjustified or the promise is disconnected from competitors, trust issues arise (don’t make up percentages; tie duration justification to product complexity).
- **“Is it hard to cancel?”** If the cancellation flow is hidden, users don’t want to enter the trial.
- **“Can I invite my team without upgrading?”** Locking viral/collaboration features behind paywalls breaks PLG (see [kb:99-product-led-growth]).

When writing objections, quote CTA and limit texts from the corpus.

## Persona Reactions

- **busy-professional**: Wants a quick aha in a short trial. Card + long form + mandatory demo chain is a time cost; combined with unskippable onboarding, leads to abandonment.
- **non-technical**: Panics if “freemium,” “soft paywall,” “quota” are used without explanation. Wants an example scenario: “Here’s what you can do on the free plan.”
- **skeptical**: Sees card requirement + auto-renewal + hidden cancellation as manipulation. Transparent “no card, you’ll downgrade to Free on day X” text builds trust.
- **price-sensitive**: Looks for a tier that can truly remain free. If trial feels like a “delay trap,” gravitates to Free; if Free is useless, goes to a competitor.
- **student / first-timer**: Expects educational discount or generous Free tier. Corporate jargon and mandatory business email in trial create drop-off.

## Good and Bad Examples

**Bad — CTA lie**  
Hero: “Start for free — no card required.” Payment form after registration. Breaks skeptical trust; citation required in score comment.

**Good — model in one sentence**  
“All Pro features for 14 days. No card required. After the period, your account drops to Free limits; your data is not deleted.” Cancel/“upgrade early” links visible in settings.

**Bad — value-before-lock**  
Free allows project creation, but not sharing or export; product promise is “share with your team.” Aha moment is not accessible for free.

**Good — free aha**  
Free: one project + one export + two invites. Upgrade comes for “more projects / advanced reports”; first success is not blocked.

**Bad — silent charge**  
Trial ends, card is charged, email is delayed. Trust and potential legal/communication risk; analyst does not invent legal clauses, just notes lack of transparency.

**Good — advance notice**  
In-product banner + email before end: days left, what will happen, how to cancel/upgrade. Counter visible in every session.

**Bad — fake freemium**  
Free: 1 user, 1 document, watermark, “Powered by,” no support, no API. Landing claims “powerful free plan.”

**Good — honest narrow tier**  
Free limits are low but enough to complete a real task for one persona. “Sufficient for individual use; Pro for teams” sentence is clear.

## FirstClick Score Effects

- **clarity**: If it’s not clear whether it’s a trial or freemium, if there’s a card requirement, or what happens at the end — clarity drops.
- **adoption**: If there’s no aha on the free path, adoption drops; user experiences the wall, not the product.
- **onboardingRisk**: Paywall or card surprise before value increases risk. Mid-flow limit surprise is a classic high-risk pattern.
- **trust / firstImpression**: Card/cancel/auto-charge transparency; promise–checkout contradiction is an early trust break.
- Timeline: “start free” → payment form = friction high + trust hit; “trial opacity” tag is recommended.

Heuristic: Don’t write “14 days fits everyone” as a statistic. Duration is qualitatively evaluated based on the product’s aha time.

## Action Checklist

1. Label the model: trial, freemium, reverse trial, or hybrid — according to corpus language.
2. Compare card requirement on landing, registration, and checkout; if there’s drift, write a citation.
3. List the steps to the aha moment on the free path; check for any locked critical step.
4. Find end/renewal/cancellation language; if missing, write a deficiency finding.
5. Extract limits numerically; cross-check “unlimited” claims with footnotes.
6. Write a persona objection (skeptical → auto-charge; price-sensitive → fake Free).
7. Note if invite/sharing is available in the free plan from a PLG perspective.
8. Write the recommendation as a single sentence: action + rationale.

## Deep Diagnostic Scenarios

**Scenario A — Reverse trial ambiguity.** User starts with Pro features; after the period, drops to Free. Corpus says “Start with Pro” but doesn’t list which features will be lost at the downgrade moment. Busy-professional experiences surprise loss; write “feature cliff” on the timeline. Recommendation: three-item list of features to be lost before the end.

**Scenario B — Freemium + trial hybrid.** Both permanent Free and 14-day Pro trial exist; CTA calls both “free.” Non-technical doesn’t know which they clicked. Clarity↓. Recommendation: two separate CTA labels — “Continue with Free” / “Try Pro for 14 days.”

**Scenario C — Business email requirement.** Trial appears self-serve but only allows corporate domains. Students and freelancers are excluded; contradicts PLG promise (see [kb:99-product-led-growth]). State segment restriction clearly or separate the consumer path.

**Scenario D — No limit counter.** Free plan has credits/quotas; user gets no warning before hitting the limit, work is left unfinished. Soft paywall turns to anger (see [kb:98-paywalls]). Heuristic: visible counter as limit approaches.

**Scenario E — Renewal with data threat.** “If you don’t pay, your projects will be deleted” language at trial end. If there’s no export or downgrade to Free option, trust↓. Honest alternative: Free limit + export.

These scenarios are not statistical claims; they are recurring friction patterns in FirstClick session timelines.

## Roadmap to Free Value

The analyst reads the free path in this order: (1) registration friction, (2) empty state / sample data, (3) one completed output, (4) sharing or saving, (5) limit or upgrade conversation. If there’s a hard block before step 3, onboardingRisk rises. If step 5 comes before value, cross-reference in the paywall file. The roadmap varies by product type; in a marketplace, it might be “first successful match,” in B2B “first report,” in a content tool “first export” — don’t invent metrics, take the event from product language.

## Common Analyst Mistakes

1. Using trial and freemium interchangeably — muddies score rationale.
2. Saying “card requirement is always bad” — transparency is the real issue; B2B may have fraud justification.
3. Thinking every feature should be open in the free plan — honest narrow tiers are legitimate; locking the aha is the problem.
4. Making up conversion percentages — forbidden.
5. Calling a trial “trustworthy” without checking the cancellation path.
6. Taking “free” on the landing as sole evidence — must cross-check with checkout.

## RAG Independent Chunk Note

Any section taken from this file should independently answer: is the model trial or freemium; is card and end transparent; is there an aha on the free path? Chunks must retain the words free, trial, limit, cancel, card.

## Turkey and Language Notes

In Turkey-focused SaaS, “14 days free” is a common promise language; duration is not written as statistically optimal. Card requirement combined with local card friction can make firstImpression heavy — don’t make up rates. “Free” and “free trial” are often confused in Turkish; separate in CTA. If educational or student discount is on the landing but not at checkout, write drift.

## Limit Communication Protocol

1. Write the limit unit in plain language.
2. Show remaining quota in-product.
3. Show a warning as the limit approaches (threshold is heuristic; not a success rate).
4. At the end, show a loss inventory and escape route.
Protocol is shared for both freemium and trial end.

## Citation Discipline

- CTA, limit, card texts: [doc:…] / [web:…]. If not present: “I did not see trial conditions in the corpus.”
- General rules: [kb:97-free-trial-freemium].
- Packaging: [kb:96-pricing-packaging]; paywall UI: [kb:98-paywalls]; PLG: [kb:99-product-led-growth].
- No making up statistics: do not invent conversion rates; use heuristic language.

## Analyst Implementation Note

Template: “[Persona] sees ‘[quoted CTA/limit]’; due to [card surprise|value-before-lock|end ambiguity] [friction|trust↓]. Recommendation: [transparent model sentence + free aha]. Score: clarity↓ / adoption↓ / onboardingRisk↑ rationale trial/freemium.” For RAG, every section must contain the words trial, freemium, card, limit, cancel.
