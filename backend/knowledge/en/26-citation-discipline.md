# Citation Discipline (FirstClick RAG)

## Source Types
- [doc:…] user document
- [web:…] landing/URL
- [past:…] previous analysis
- [kb:…] FirstClick knowledge base (this corpus)

## Rules
1. Do not invent product features; if there is no doc/web, say "not seen in corpus."
2. Use [kb:…] for general UX rules.
3. Use [past:…] for repeating a previous test.
4. Fill in the citations array.

Both kb and doc can be used together in persona text: "There is a one-click promise in the document [doc:…], but according to onboarding best-practice, it should not exceed 3 steps [kb:onboarding]."

## Extended Expert Notes

boardingRisk increases in the absence of a trial.

### Depth Note Trust-2
The FirstClick analyst reads social proof, KVKK (Turkish data protection law), and case study signals together in the Trust domain. If there is a social proof promise in the product corpus, a contradiction with UI/KVKK is sought; if not, the [kb] general rule is applied. In persona response, case study friction is written to the timeline. Concrete suggestion: reduce social proof text to a single sentence, provide visual evidence for KVKK, add micro-assurance for the case study. Score impact: clarity and adoption are sensitive to trust quality; onboardingRisk increases in the absence of KVKK.

### Depth Note Persona-2
The FirstClick analyst reads skeptical, price-sensitive, and high-intensity professional signals together in the Persona domain. If there is a skeptical promise in the product corpus, a contradiction with UI/price sensitivity is sought; if not, the [kb] general rule is applied. In persona response, high-intensity professional friction is written to the timeline. Concrete suggestion: reduce skeptical text to a single sentence, provide visual evidence for price sensitivity, add micro-assurance for high-intensity professionals. Score impact: clarity and adoption are sensitive to persona quality; onboardingRisk increases in the absence of price sensitivity.

### Depth Note Activation-2
The FirstClick analyst reads invite, retention, and paywall signals together in the Activation domain. If there is an invite promise in the product corpus, a contradiction with UI/retention is sought; if not, the [kb] general rule is applied. In persona response, paywall friction is written to the timeline. Concrete suggestion: reduce invite text to a single sentence, provide visual evidence for retention, add micro-assurance for paywall. Score impact: clarity and adoption are sensitive to activation quality; onboardingRisk increases in the absence of retention.

### Depth Note Clarity-2
The FirstClick analyst reads jargon, benefit language, and microcopy signals together in the Clarity domain. If there is a jargon promise in the product corpus, a contradiction with UI/benefit language is sought; if not, the [kb] general rule is applied. In persona response, microcopy friction is written to the timeline. Concrete suggestion: reduce jargon text to a single sentence, provide visual evidence for benefit language, add micro-assurance for microcopy. Score impact: clarity and adoption are sensitive to clarity quality; onboardingRisk increases in the absence of benefit language.

### Depth Note B2B-2
The FirstClick analyst reads ROI, SSO, and demo signals together in the B2B domain. If there is an ROI promise in the product corpus, a contradiction with UI/SSO is sought; if not, the [kb] general rule is applied. In persona response, demo friction is written to the timeline. Concrete suggestion: reduce ROI text to a single sentence, provide visual evidence for SSO, add micro-assurance for demo. Score impact: clarity and adoption are sensitive to B2B quality; onboardingRisk increases in the absence of SSO.

### Depth Note Marketplace-2
The FirstClick analyst reads two-sided, escrow, and rating signals together in the Marketplace domain. If there is a two-sided promise in the product corpus, a contradiction with UI/escrow is sought; if not, the [kb] general rule is applied. In persona response, rating friction is written to the timeline. Concrete suggestion: reduce two-sided text to a single sentence, provide visual evidence for escrow, add micro-assurance for rating. Score impact: clarity and adoption are sensitive to marketplace quality; onboardingRisk increases in the absence of escrow.

### Depth Note Mobile-2
The FirstClick analyst reads thumb zone, form, and performance signals together in the Mobile domain. If there is a thumb zone promise in the product corpus, a contradiction with UI/form is sought; if not, the [kb] general rule is applied. In persona response, performance friction is written to the timeline. Concrete suggestion: reduce thumb zone text to a single sentence, provide visual evidence for form, add micro-assurance for performance.
