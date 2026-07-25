# Marketplace Sector Playbook

This file gains weight when the **marketplace** sector package is selected in FirstClick analysis. Each section can be retrieved as an independent RAG piece; each section contains the sector name, diagnostic questions, and score impact. Do not write fabricated statistics, conversion rates, or definitive regulatory judgments. Heuristics are explicitly marked as heuristic.

## Scope and Business Model Context (marketplace)

In marketplaces / two-sided platforms, revenue typically comes from transaction commissions, promoted listings, subscriptions, or advertising. The essence of FirstClick marketplace analysis is not a single user journey, but reading the trust and liquidity needs of at least two roles (buyer–seller, host–guest, employer–freelancer, etc.) within the same product corpus. If the pitch says 'we bring everyone together', look for which side signs up first in the corpus, how empty result screens are managed, where fees are disclosed, and what happens in case of disputes.

The difference from one-sided e-commerce is this: the brand is not the only seller; quality and trust depend on distributed actors. Therefore, if promises like rating, verification, escrow, or payment protection are not reflected in the UI, the trust score is suppressed. The chicken-egg (early liquidity) problem heuristically appears in empty states and incentive copy; the analyst does not fabricate 'liquidity %X'. If there is a marketing claim of seed supply or guaranteed demand but no operational counterpart (editorial inventory, match guarantee text), note the promise-UI contradiction.

The business model can be hybrid: both commission and SaaS tools for the seller. In hybrids, the pricing page should clearly indicate which side it addresses. In B2B marketplaces, procurement and invoicing flows are added; in consumer marketplaces, returns and safety are highlighted. When the marketplace sector package is selected in FirstClick, this file prioritizes role differentiation and two-sided trust signals over general ecom and general B2B rules.

## First Impression Questions (marketplace)

The FirstClick analyst asks for marketplace landing/pitch: In one sentence, whose problem does the platform solve—buyer, seller, or both? Does the hero image show the happiness of only one side? Is the primary CTA 'Start Shopping', 'Post an Ad', or a vague 'Join'? Is the geographic scope (city, country) and category scope exaggerated ('everything is here') or limited and honest?

How is trust established in the first 10 seconds: Are there statements like 'secure payment', 'verified user', 'buyer protection', and do they lead to content when clicked? Is the fee model hidden? The skeptical persona fears fake listings and fraud; the price-sensitive buyer is sensitive to surprise service fees, and the seller to commission shock. The busy-professional wants fast search/discovery instead of a long registration. An unclear 'sharing economy' slogan is a weak signal for clarityScore.

Good first impression pattern (heuristic): '[For side] [transaction] — with [trust mechanism]'. Weak pattern: 'The future of commerce communities'. When writing FirstClick firstImpression, quote the hero and CTA; if absent, note 'landing signal is weak'.

## Onboarding and Activation (marketplace)

The definition of activation in a marketplace should be separated by side. Buyer activation is usually the first meaningful search, first saved favorite, first message, or first completed transaction. Seller activation is the first published listing, first completed profile, first response, or first earnings. If a single 'complete your account' bar forces both sides into the same fields, both non-technical sellers and impatient buyers are harmed.

Role selection should be an early step in onboarding. Good pattern: role cards + role-specific 3-item checklist + skippable verification. Bad pattern: requiring tax ID, IBAN, ID, store logo, and 10 category selections before the first listing. In markets requiring KYC, a justification sentence and progress status should be shown; the analyst does not ignore legal requirements but writes ambiguous rejection messages as friction.

Empty marketplace empty state is a critical onboarding component. If the '0 results' screen does not offer suggestions, demand creation, or notification registration, adoption drops. Instead of telling the seller 'no buyers yet', it is better to show demand signals or promotion incentives (if any)—do not fabricate incentives. Use Buyer/Seller labels in FirstClick timeline events.

## Price, Trust, and Compliance Warnings (marketplace)

Commission, service fee, promoted listing package, and return deductions are part of price transparency. If a '0 commission' campaign is full of footnotes, generate a skeptical toughQuestion. If escrow or 'payment released after delivery' promise is not visible in checkout steps, distrust. If the chargeback/dispute window is not in the FAQ, both sides perceive risk.

Verification badges should explain what is verified (email, phone, ID, business). An ambiguous green checkmark may create suspicion instead of trust. KVKK: look for language about the purpose and storage of ID collection; do not claim definitive legal compliance. If there is no prohibited product/service list, note the security gap. A warning message against off-platform payments is part of platform trust.

Insurance or 'buyer protection' statements are weak evidence without coverage details. In the FirstClick trust score, escrow/verification/dispute signals are distinguished from ecom return signals for marketplaces.

## Persona Reactions (marketplace)

Busy-professional buyer: wants clear 'buy/reserve' instead of mandatory long chat; otherwise friction. Price-sensitive buyer: distrusts service fee appearing at checkout. Skeptical: uniform 5-star reviews resembling purchased comments. Non-technical seller: panel full of invoice and tax jargon. Student: high minimum withdrawal amount. First-timer: fear of being scammed—needs support channel and protection text. Economic buyer (B2B marketplace): looks for contract, invoice, role authority.

Always use side + corpus quote in persona reactions. Instead of a generic sentence like 'Users don't trust', write 'Hero says "secure payment" but there is no protection step at checkout'.

## Drop-off Timeline Patterns (marketplace)

Heuristic drop-off points (no rates): Landing—unclear side promise. Role selection—wrong form after selection. Seller onboarding—unfinished listing. Search—empty results with no suggestions. Messaging—perceived lack of response (no SLA in UI). Checkout—fee surprise or escrow ambiguity. Rating—forced only positive. Week-1: seller listing is live but no demand, empty state may be a churn signal.

In FirstClick timeline, separate stages as Landing / Role select / Listing / Search / Checkout / Dispute. Do not add numbers like 'high drop-off'.

## Evidence to Look for in the Corpus (marketplace)

Look for: role CTAs, fee/commission page, escrow or payment protection steps, verification/KYC copy, rating rules, search empty state, incentive campaign text, dispute FAQ, prohibited category policy, messaging, insurance coverage, seller panel checklist. Contradiction examples: 'instant match' vs empty category; 'buyer protected' vs only 'resolve with seller'; 'free listing' vs mandatory paid promotion wall.

If there is no evidence, say 'not found in corpus'; do not fill with typical sector assumptions.

## FirstClick Score Impacts (marketplace)

ClarityScore: what is for which side. AdoptionScore: speed of first value and empty result management by role. OnboardingRisk: heavy seller setup and ambiguous KYC. Trust: fee transparency, escrow, verification clarity, rating integrity. If UI is optimized for one side but claims 'two-sided', both clarity and trust are affected. Score justification must be quoted.

## Action Checklist (marketplace)

1) Clarify the primary side in the hero, provide a secondary path for the other side. 2) Set up role selection onboarding. 3) Define buyer and seller activation events separately. 4) Make the commission/fee table visible. 5) Show escrow or payment protection steps in the UI. 6) Add alternatives or demand creation in empty search. 7) Write the meaning of badges. 8) Put the dispute process in the FAQ. 9) Simplify KVKK/verification justification. 10) Lock FirstClick findings with side + quote.

## Deep Diagnosis: Liquidity Perception (marketplace)

Liquidity is not fabricated as a numerical metric in FirstClick; perception is read from the UI. Many category cards but empty lists when clicked, the same 3 listings under 'popular' label, no pins on the map—these indicate weak liquidity perception. Good heuristic: full feeling with a narrow category, waiting list, 'request' CTA. If a seller acquisition campaign is promised on landing but not reflected in the product, it's a contradiction. The analyst does not say 'competitors are fuller'; looks for internal corpus consistency.

## Deep Diagnosis: Trust and Dispute (marketplace)

Disputes are inevitable; lack of process is a trust gap. Look for duration, evidence upload, return condition in the corpus. Forced 5 stars or impression of deleted negative reviews is a red flag for the skeptical—do not claim without evidence, check for manipulation incentive in the rating UI. Good example: objective questions after transaction. Weak: only option is 'wasn't your experience great?'.

## Analyst Writing Template (marketplace)

Format: Observation(quote) → Side → Persona → Timeline → Score → Suggestion. Example: "Seller checklist '[quote]' asks for ID+tax+IBAN; busy seller friction; Onboarding/Seller; onboardingRisk↑; split mandatory fields after first listing." Do not fabricate user comments.

## Additional Expert Note 1

Off-platform payments in marketplaces bypass platform protection. If there is no warning message, it's a trust gap. The analyst does not fabricate fraud rates.

## Additional Expert Note 2

If there is a seller response time badge but the calculation method is unclear, generate a skeptical question. Avoid badge inflation.

## Additional Expert Note 3

In a multi-category horizontal marketplace, a narrow vertical entry can improve liquidity perception (heuristic); check if the category strategy is consistent in the corpus.
