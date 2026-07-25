# E-commerce and D2C Sector Playbook

This file gains importance when the **e-commerce / D2C** sector package is selected in FirstClick analysis. Each section can be retrieved as an independent RAG piece; each section contains the sector name, diagnostic questions, and score impact. Do not write made-up statistics, conversion rates, or regulatory verdicts. Heuristics are clearly marked as heuristics.

## Scope and Business Model Context (e-commerce / D2C)

In e-commerce and direct-to-consumer (D2C) models, revenue comes from product sales, renewals, or subscription boxes. The critical path is discovery → product detail (PDP) → cart → checkout → delivery expectation. The difference from a marketplace is that the seller is usually a single brand; trust is built on brand narrative, return policy, shipping transparency, and support channels. In FirstClick e-commerce/D2C analysis, if the pitch is 'easy shopping' or 'producer to consumer', the corpus is checked for price visibility, shipping/returns, number of checkout steps, and mobile PDP consistency.

Conversion rate, cart abandonment percentage, or AOV are not fabricated. Evaluation is based on promise-UI consistency, friction points, and persona reactions. In subscription D2C, cancel/skip paths are part of the business model; if absent, price-sensitive distrust arises. If there is a B2B gift/corporate invoice side path, it is noted as hidden friction.

This playbook complements general landing rules with ecom-specific PDP and checkout signals. Brand story is important, but if what is being sold is not clear at first glance, clarityScore weakens.

## First Impression Questions (e-commerce / D2C)

What is being sold and to whom — is the hero clear? Are price and discount conditions transparent? Are product images realistic? When does shipping time/cost appear? Can return/exchange be read before checkout? Are trust badges functional or exaggerated? Is scarcity ('only 1 left', countdown) tied to real stock?

Price-sensitive personas react to shipping surprises; skeptical personas to fake reviews; busy-professionals to mandatory long sign-ups; non-technical personas to size/measurement uncertainty. If 'best price guarantee' is unproven, toughQuestions are generated. Good hero heuristic: '[Product category] — [core benefit] · [shipping/return micro assurance]'. Weak: only a lifestyle slogan.

## Onboarding and Activation (e-commerce / D2C)

In ecom, activation is usually the first successful purchase or a meaningful preference record (size, style quiz). Mandatory membership before checkout can weaken adoption (heuristic). Guest checkout is a strong pattern. In quiz-based D2C, a long quiz delays the aha moment; skip or 'show results' should be offered.

Post-purchase is counted as onboarding: shipping tracking, order email, return path, repurchase. If the 'my orders' page is empty and without suggestions, opportunity is lost. FirstClick timeline: Landing → PDP → Cart → Checkout → Post-purchase. Do not write rates.

## Price, Trust, and Compliance Warnings (e-commerce / D2C)

Price including VAT, shipping threshold, cash on delivery/return conditions are critical trust elements in Turkey; if missing in the corpus, it is a missing signal. If there is a distance sales/cancellation text, look for contradictions with the product policy — no legal verdict is given. Active 'add to cart' when out of stock produces distrust. Manipulative countdown is a red flag for skeptical personas.

Payment logos alone are not proof of security; the return process and support channel carry more weight. In subscriptions, ease of cancellation is decisive for price-sensitive personas. If the promise of installment/information form is missing at checkout, it is a contradiction.

## Persona Reactions (e-commerce / D2C)

Price-sensitive: hidden shipping, small font. Skeptical: photoshopped before/after, only 5-star reviews. Busy-professional: mandatory account, slow payment. Non-technical: size uncertainty. Student: high minimum cart. First-timer: fear of returns. In persona quotes, use product title, shipping line, return FAQ; do not write made-up customer reviews.

## Drop-off Timeline Patterns (e-commerce / D2C)

Heuristic: Unclear category on landing; price/shipping uncertainty on PDP; surprise fees in cart; mandatory membership/form error at checkout; unclear error at payment; lack of post-purchase tracking. Note mobile OTP/keyboard friction separately. Do not fabricate 'high cart abandonment' numbers.

## Evidence to Seek in Corpus (e-commerce / D2C)

Hero/collection, PDP price-variant, shipping/returns, cart summary, checkout fields, guest checkout, payment methods, stock, reviews/Q&A, subscription cancellation, support, mobile CTA. Contradictions: 'free shipping' vs hidden threshold; '30-day return' vs conflicting exception list.

## FirstClick Score Impacts (e-commerce / D2C)

ClarityScore: clarity of what is sold and price. AdoptionScore: checkout friction and guest path. OnboardingRisk: mandatory membership and long quiz. Trust: honesty in returns, shipping, scarcity. Promise-UI contradiction produces distrust+friction.

## Action Checklist (e-commerce / D2C)

1) Category+benefit in hero. 2) Show price+shipping info early on PDP. 3) Enable guest checkout. 4) Make return policy short and visible. 5) Remove fake scarcity or tie it to stock. 6) Reduce checkout fields. 7) Write actionable payment errors. 8) Add post-purchase tracking/support. 9) Mobile thumb CTA check. 10) Lock findings with PDP/checkout quotes.

## Deep Diagnosis: PDP Decision Support (e-commerce / D2C)

PDP is the real landing in ecom. Title, price, variant, image, shipping line, return summary, and social proof are read together. Missing size chart causes non-technical confusion. If 'special price' is unconditional, skeptical distrust arises. Only generic 5-star reviews are weak evidence; do not fabricate percentages. If video/AR promise is not in UI, it is a contradiction. If brand story overshadows product benefit, clarity is affected.

## Deep Diagnosis: Cart and Checkout (e-commerce / D2C)

The earlier the total cost is visible, the less friction for price-sensitive personas (heuristic). Mandatory newsletter, mandatory account, and unclear address errors reduce adoption. If cash on delivery/bank transfer is promised but not available at checkout, it is a contradiction. 3D Secure error microcopy should be sought. Cart and Checkout are separate timeline events.

## Analyst Writing Template (e-commerce / D2C)

Format: Observation(quote) → Persona → Timeline → Score → Recommendation. Example: "PDP '[quote]' hides shipping cost; price-sensitive distrust; trust↓; move shipping line under price." For mandatory membership at checkout, adoption↓ and onboardingRisk↑.

## Deep Diagnosis: Brand Promise vs. Conversion Path Tension (e-commerce / D2C)

D2C brands may have strong storytelling; in the FirstClick clarity test, the brand story should not obscure what the product is. Heuristic: If you remove the brand name from nav and hero, can a stranger still say what is being sold? If not, clarityScore is suppressed. Leaving filter empty states on collection pages without suggestions is a busy-professional drop-off. Claims like 'sustainable / handmade / clinical formula' without proof (certificate name, explanation) generate skeptical toughQuestions — do not fabricate fake certificates; if absent, write 'evidence missing'.

In subscription D2C, visibility of skip, pause, cancel paths in the my account page is critical for price-sensitive adoption and trust. If 'cancel anytime' promise is only in chat, it is a contradiction. Corporate gift / invoice requests can be hidden friction in B2B-ish D2C. In FirstClick e-commerce/D2C score rationale, prioritize PDP price+shipping, mandatory membership at checkout, and return transparency; do not fabricate AOV or conversion percentages.

## False Positives and False Negatives (e-commerce / D2C)

False positive: treating every 'last day' label as a dark pattern — if the real campaign end date is transparent and consistent, it is not manipulation. False negative: only reviewing desktop checkout; mobile sticky CTA and keyboard friction may be the real friction. False positive: automatically treating trust badges as strong evidence — return and support process carry more weight. The analyst should lock every finding with a corpus quote; sector clichés ('everyone expects free shipping in ecom') alone cannot justify a score.

## Retrieval Notes (68)

This section provides additional context for FirstClick RAG retrieval. When the analyst selects the sector package, they should sequentially apply business model, then first impression questions, then onboarding/activation, followed by price-trust-compliance, persona reactions, drop-off timeline, corpus evidence list, score impacts, and action checklist. Every finding is linked to a product corpus quote; if no quote, write 'no signal found'. In score rationale, clarityScore, adoptionScore, onboardingRisk, and trust impacts are stated in separate sentences. Timeline events include stage name and friction type (confusion, friction, distrust). In persona reactions, distinguish busy-professional, skeptical, price-sensitive, non-technical, student, and first-timer; do not force personas that do not fit the product. Percentages without evidence, 'sector average', and definitive legal verdicts are prohibited. Additional check: is there a promise-UI contradiction, does the empty state show the next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a promise-UI contradiction, does the empty state show the next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a promise-UI contradiction, does the empty state show the next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a promise-UI contradiction, does the empty state show the next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action?

## Additional Expert Note 1

In D2C subscription boxes, the 'surprise' experience must be balanced with content transparency. Critical information such as allergens/size cannot be hidden under the pretext of surprise.

## Additional Expert Note 2

If the international shipping promise comes with customs uncertainty, a warning at checkout is a heuristic. The analyst does not interpret customs regulations.
