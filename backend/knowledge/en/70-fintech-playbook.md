# Fintech Sector Playbook

This file gains importance in FirstClick analysis when the sector package **fintech** is selected. Each section can be retrieved as an independent RAG piece; each section contains the sector name, diagnostic questions, and score impact within itself. Do not write fabricated statistics, conversion rates, or definitive regulatory judgments. Heuristics are explicitly marked as heuristic.

## Scope and Business Model Context (fintech)

Fintech products may cover consumer payments, wallets, remittance, credit/BNPL, investment, budgeting, bill collection, expense management, or B2B financial automation. Revenue may be transaction fee, subscription, interest/spread, or bundled; the FirstClick model does not fabricate, it reads the fee language in the corpus. The first impression is a mix of benefit + risk + trust language: exaggerated returns, ambiguous fees, and weak security explanations produce early drop-off for skeptical personas.

In consumer fintech, simplicity and speed stand out; in B2B fintech, authority, reconciliation, integration, and audit trail are prominent. The analyst does not make definitive judgments about payment/e-money regulation; if there is a license or partner claim, checks whether its nature is stated in writing. 'Bank-level security' is a weak trust signal if it is just an unsupported slogan.

In the FirstClick fintech package, fee transparency, KYC sequence, risk language, and first transaction activation are prioritized. The difference from healthtech is that the risk is financial, not medical.

## First Impression Questions (fintech)

Is the financial job understandable in one sentence? Is the return/savings claim exaggerated? When do fees appear? When/why is KYC required? Is security concrete? Is there 'guaranteed profit / no risk'? Busy-professional looks for first transaction duration; price-sensitive looks for hidden commissions; non-technical looks for jargon; skeptical looks for lack of risk warnings. Good hero: '[For role] [financial outcome] — transparent fees'. Weak: 'Revolutionary money OS'.

## Onboarding and Activation (fintech)

Activation: first linked account, first payment/transfer, first bill, first budget entry, first order. KYC may be mandatory; FirstClick does not say 'remove' — it evaluates the rationale, step predictability, and rejection message quality. Good: progress + why necessary + B2B sandbox. Bad: 20 fields + ambiguous review failure. Empty state should carry first funding/transaction CTA. Timeline: Signup, KYC, Funding/Connect, First transaction.

## Price, Trust, and Compliance Warnings (fintech)

Fee, FX difference, exceptions, late fee, and limits should be visible. If 'free' contradicts with exceptions, it creates distrust. If there is no risk warning in investment/credit, it is a red flag. KVKK (data privacy) and account information sharing should be explained with purpose limitation. Partner/license logos should be explained with the nature of the relationship. In B2B, preparer/approver distinction and export are trust+adoption heuristics.

## Persona Reactions (fintech)

Skeptical: guaranteed return, hidden fee. Price-sensitive: small print. Busy-professional: long KYC + ambiguous SLA. Non-technical: error codes. Student: high minimum. First-timer: fear of loss. Economic buyer: total cost and audit. Do not write financial advice; use quotations.

## Drop-off Timeline Patterns (fintech)

Heuristic: exaggerated landing → excessive PII signup → ambiguous KYC rejection → connection error → fee surprise → limit maze. No rates. 'No funding' can be a qualitative early signal.

## Evidence to Search in Corpus (fintech)

Category, fee, KYC, risk warning, security, partner explanation, KVKK, limit, error copy, sandbox, roles, export. Contradiction: instant vs manual; free vs hidden fee.

## FirstClick Score Impacts (fintech)

Clarity: simple financial description. Adoption: first transaction. OnboardingRisk: KYC/rejection. Trust: fee+risk+security. Exaggerated return sharply reduces trust.

## Action Checklist (fintech)

1) Single outcome hero. 2) Early fee. 3) Transparent KYC. 4) Link rejection message to action. 5) Remove guarantee language. 6) Make security concrete. 7) First transaction CTA. 8) B2B role/audit. 9) Simple KVKK. 10) Quoted finding.

## Deep Diagnosis: Risk Language (fintech)

'No risk / guaranteed return' produces distrust + toughQuestions; do not claim illegality. Good language: benefit + condition + risk. In BNPL, if plan and late cost are not clear, price-sensitive+skeptical personas increase.

## Deep Diagnosis: B2B Fintech (fintech)

Integration, approval chain, limit, export are part of activation. 'For CFO' contradicts with single-user UI. If SSO/role is mentioned in enterprise line, look for a counterpart.

## Analyst Writing Template (fintech)

Example: "Hero '[quote]' guarantees return; skeptical distrust; trust↓; remove guarantee, add risk warning."

## Additional Scenario Matrix (fintech)

Scenario A — consumer wallet: fee and KYC sequence in first impression; activation is first transfer; trust is risk language. Scenario B — BNPL/credit: visibility of payment plan and late cost; if exaggerated 'interest-free' claim contradicts with footnote, distrust. Scenario C — B2B collection: role approvals, reconciliation export, integration; promise 'for finance team' should not contradict with single user. Scenario D — investment: risk warning + 'not advice' consistency; guaranteed return is a red flag. In every scenario, FirstClick uses only corpus signals.

## False Positive / Negative (fintech)

False positive: automatically penalizing the existence of KYC — justified and predictable KYC can be a trust signal. False negative: assuming transparency just because there is a fee page — if extra fees appear at checkout, it is a contradiction. False positive: bank logo = license. Analyst does not say 'this product is illegal'; writes about transparency gap.

## Retrieval Notes (70)

This section provides additional context for FirstClick RAG retrieval. When the analyst selects the sector package, they apply in order: business model, then first impression questions, then onboarding/activation, then price-trust-compliance, persona reactions, drop-off timeline, corpus evidence list, score impacts, and action list. Each finding is linked to a product corpus quote; if there is no quote, write 'no signal found'. In score justification, clarityScore, adoptionScore, onboardingRisk, and trust impacts are stated in separate sentences. In timeline events, stage name and friction type (confusion, friction, distrust) are included. In persona reaction, busy-professional, skeptical, price-sensitive, non-technical, student, and first-timer distinctions are made; do not force personas that do not fit the product. Unsubstantiated percentages, 'industry average', and definitive legal judgments are prohibited. Additional check: is there a contradiction between promise and UI, does empty state show next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a contradiction between promise and UI, does empty state show next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a contradiction between promise and UI, does empty state show next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a contradiction between promise and UI, does empty state show next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a contradiction between promise and UI, does empty state show next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a contradiction between promise and UI, does empty state show next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a contradiction between promise and UI, does empty state show next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a contradiction between promise and UI, does empty state show next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a contradiction between promise and UI, does empty state show next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a contradiction between promise and UI, does empty state show next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a contradiction between promise and UI, does empty state show next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a contradiction between promise and UI, does empty state show next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action? Additional check: is there a contradiction between promise and UI, does empty state show next step, is price/limit clear, are privacy link and purpose text consistent, does CTA hierarchy carry a single primary action?

## Additional Expert Note 1

In fintech error messages, ambiguity about the status of funds (was it withdrawn?) produces high anxiety. Clarity about 'in transaction / support' affects adoption and trust.

## Additional Expert Note 2

If multi-device session management is described on the security page, look for a session list in the UI.

## Additional Expert Note 3

In BNPL, late payment scenarios should be explained with a sample calendar; APR jargon alone is not sufficient.
