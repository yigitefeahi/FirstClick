# Procurement: Passing Through the Enterprise Gate

When a FirstClick analyst evaluates the procurement surface, they ask: can the purchasing and IT units find the minimum package needed to advance the process from the corpus’s invoice, contract, security, and vendor onboarding materials? This document is the standard framework for procurement evaluation in the FirstClick knowledge base. [kb:104-procurement]

## Scope

This file covers: invoice/tax information, contract and purchase order (PO) process, documents leading to security questionnaires, vendor portal expectations, payment terms signals, and the “how to buy” page. Out of scope: sales demo narrative (see [kb:100-sales-led-b2b]), security text quality (see [kb:103-security-privacy]), migration (see [kb:105-switching-migration]). Procurement is the “payment and risk gate”; demo is “value discovery.”

Heuristic: A good procurement surface produces a single folder’s worth of answers that a champion can forward to the purchasing department. This is not a cycle-time claim.

## Diagnostic Signals

1. **Credit card only**: No corporate PO/invoice; economic buyer is eliminated.
2. **Tax/company info hidden**: Required fields for invoicing are missing at checkout or only available via sales.
3. **Contract darkness**: MSA/DPA is “on request” and there’s no average turnaround time.
4. **Security questionnaire unanswered**: No SIG/CAIQ-like package or FAQ (don’t require exact names; write as “security questionnaire” generally).
5. **Vendor registration surprise**: Purchasing says “register in the vendor portal”; vendor is unprepared.
6. **Zero price band**: No range for budget approval.
7. **Cancellation/renewal ambiguity**: Auto-renewal and exit terms are not visible.
8. **No multi-entity invoice**: Lacking for holding/subsidiary scenarios in enterprise claims.

Positive signals: “How to buy” page, pay-by-invoice option, downloadable security package, standard contract duration range (without inventing exact legal text), procurement email contact channel, SMB self-serve vs enterprise procurement distinction.

## User Objections

- **“Can we pay by PO?”**
- **“Who fills out the vendor form?”**
- **“Is the DPA / data processing agreement ready?”**
- **“How does renewal and exit work?”**
- **“Approximate amount for budget?”**
- **“Is there an authorized reseller / local invoice?”** (especially for Turkish companies)

## Persona Reactions

- **busy-professional (champion)**: Wants a PDF to forward to procurement; every question leading to a sales call is exhausting.
- **skeptical (procurement/risk)**: Missing documents = delay or rejection; flashy marketing pages don’t convince.
- **price-sensitive**: Card-only + annual upfront may violate corporate policy.
- **non-technical**: Terms like “MSA”, “DPA”, “SOC” should be briefly explained.
- **student**: Generally out of scope; if they accidentally fall into enterprise procurement, note it.

## Good and Bad Examples

**Bad — card wall**  
Even the business plan is only available via international card. No Turkish invoice. Procurement halts.

**Good — dual path**  
Self-serve card; “To purchase by invoice/PO, fill out the form — security package attached.”

**Bad — document ping-pong**  
A separate email for every question; no central package. Process drags on (don’t invent duration percentages).

**Good — procurement kit**  
Single zip/page: company info, security summary, DPA request path, supported payment methods, renewal summary.

**Bad — hidden auto-renewal**  
In contract footnote; cancellation requires 90 days written notice — not visible in product UI.

**Good — transparent renewal**  
Renewal date + cancellation path summary on pricing and account page; details in contract.

## FirstClick Score Impacts

- **trust**: Transparency in documentation and payment affects enterprise trust rationale.
- **clarity**: Uncertainty in the purchasing path reduces clarity↓.
- **adoption**: In enterprise, adoption is “post-purchase”; if the gate is closed, note “procurement blocker” in the score.
- **onboardingRisk**: Self-serve promise + enterprise procurement only is a risk↑.
- Timeline: classify blocker as “payment method / legal / security questionnaire”.

## Action Checklist

1. List payment methods from the corpus.
2. Check for invoice/PO/tax signals.
3. Check access path to security/DPA.
4. Scan for “how to buy” content.
5. Note renewal/cancellation visibility.
6. Separate SMB vs enterprise paths.
7. Write persona/role objections.
8. One-sentence suggestion: procurement kit.

## Deep Diagnostic Scenarios

**Scenario A — No card + Turkish invoice.** Local company policy rejects card; no alternative channel. Blocker.

**Scenario B — DPA delay.** DPA required for security approval; “request from sales” and no SLA. Duration uncertain — don’t invent number of days.

**Scenario C — Vendor portal surprise.** Purchasing requires portal registration; vendor has no template response. Champion is stuck.

**Scenario D — Auto-renewal trap.** No cancellation in UI; long notice period in contract footnote. Skeptical.

**Scenario E — Multi-currency / tax fog.** Price in USD, invoice expected locally — note ambiguity (don’t invent exchange rates).

**Scenario F — Self-serve ceiling.** Usage has grown; no path to invoiced account, only new sales cycle.

## Procurement Kit Contents (Suggestion)

Single package suggestion: company identity info, list of payment methods, link to security summary, DPA request channel, renewal/cancellation summary, supported contract language, contact email. Mark missing pieces in the checklist; don’t invent the full package.

## Bridge Between Champion and Procurement

Champion wants the product; procurement asks about risk. In FirstClick findings, distinguish “product is clear, purchasing surface is blind.” The sales-led file asks about demo quality; this file asks about payment/legal gate. If both are weak, enterprise adoption rationale is doubly broken.

## Common Analyst Mistakes

1. Penalizing card-only equally across all segments — may be normal for consumer apps.
2. Inventing legal contract clauses.
3. Making up cycle-time percentages.
4. Rewriting security content in this file — cross-reference instead.
5. Penalizing PLG products for “no procurement” — check segment fit.

## RAG Independent Chunk Note

Chunk questions: Is there PO/invoice? Is DPA/security package accessible? Is renewal transparent? Is there a “how to buy” page? Keep terms PO, invoice, DPA, renewal, vendor.

## Turkey and Language Notes

In Turkish procurement, e-invoice, tax ID, and Turkish contract requests are common. If not in corpus, write “not visible”; don’t claim as mandatory. Don’t exaggerate local payment gaps with made-up deduction rates.

## Payment Method Matrix

Rows: card, invoice/PO, wire transfer, in-store. Columns: self-serve, enterprise, documented. Gaps are potential blockers.

## From Self-Serve to Invoiced Account

When an SMB that started with PLG grows, it wants an invoiced account. If there’s no transition path, expansion hits procurement. Rejection/delay signals: no security package, no price band, renewal ambiguity.

## FirstClick Report Paragraph

“Procurement gate: payment [card/invoice/unclear], legal [DPA visibility], security package [present/absent], renewal [transparent/not]. Blocker candidates: [list]. Suggestion: procurement kit. Score: trust/clarity — procurement; don’t invent cycle-time.”

## Champion Package Content Check

Is it forwardable: company info, payment options, security summary, DPA channel, renewal summary? Does a champion have a single attachment to email to procurement? If not, the surface is scattered.

## Common Corpus Contradictions

Business plan requires self-serve card; “corporate invoice” is only on the contact form, which leads to a sales demo. Security whitepaper is behind a form; presented as a procurement package but DPA is missing. Renewal email says “easy cancellation anytime”; contract footnote has long notice period — UI and legal drift (don’t invent clauses, describe the pattern). SMB pricing is transparent but extra seats only via quote; expansion stalls. Analyst classifies blocker as payment, legal, security questionnaire. Suggestion sentence: “On the ‘how to buy’ page, combine invoice/PO, security summary, and DPA channel in a single package.”

## Persona Objection Dialogues (Sample Language)

economic buyer / champion: “Can we pay by PO, who issues the invoice?”
security: “Can I get DPA and questionnaire answers without a form?”
IT: “Is renewal automatic, what’s the notice period for exit?”
price-sensitive SMB: “Is there a way other than card?”
Analyst does not invent duration or legal clauses. The goal of dialogues is to find which answer is missing from the procurement kit. Missing answer = blocker candidate.

## Short Analyst Summary

Procurement evaluation can be reduced to three gates: payment method suitability, legal/DPA accessibility, and security package availability without a form barrier. If any of the three is closed, write blocker in the enterprise adoption rationale. Card may be sufficient for self-serve SMB; invoice path is expected for enterprise promise. Renewal and cancellation transparency ties to trust. Don’t make up numbers; prove gate status with a quote.

## Role-Based Commentary (Who Reads What in Procurement)

The procurement surface is read not by a single persona but by a committee; analyst separates findings by role. **Economic buyer** looks for price band and total cost of ownership; if there’s no band, budget approval doesn’t start. **Legal** wants DPA, data processing location, and termination clause; “on request” answer puts process on hold. **IT/security** asks about SSO, data storage, and access control; these are delegated to the security file but the procurement kit should link to it. **Finance/AP** looks for tax number, e-invoice, and payment terms (net 30/60); card-only breaks AP workflow. **Champion** wants to gather all this in a single file to forward. Analyst notes which role is blocked in a finding by name: “no e-invoice signal for finance,” etc.

## Action Prescription: Procurement Readiness Scan

1. Collect “pricing”, “contact sales”, “security”, “legal”, “billing” surfaces from the corpus.
2. Match each role’s question (price band, DPA, e-invoice, payment terms) to a source; mark unmatched as “gap.”
3. Check for a bridge between self-serve ceiling and enterprise procurement (path to invoiced account).
4. Classify finding by blocker type: payment / legal / security / tax-invoice.
5. Reduce suggestion to a one-sentence procurement kit missing-parts list.

## Edge Cases

- **PLG consumer product**: Card-only is normal; don’t count procurement absence as a blocker, note the segment.
- **Public/regulatory sector**: Tenders and local vendor registration expected; general “how to buy” page may not suffice — flag if there’s a hint in corpus.
- **Reseller path**: If no direct sales, look for channel partner info; absence contradicts enterprise claim.
- **Freemium → invoice jump**: If there’s no direct path from free to enterprise invoice, champion is forced into a new sales cycle; tie this to adoption commentary.

## Citation Discipline

- Payment and contract texts: [doc:…] / [web:…].
- [kb:104-procurement]; sales-led: [kb:100-sales-led-b2b]; security: [kb:103-security-privacy].
- Don’t invent legal duration/penalty clauses.

## Analyst Implementation Note

Template: “[Role] is at the procurement gate; sees/does not see ‘[quote]’; due to [card-only|no DPA|no price band] [blocker]. Suggestion: [procurement kit]. Score: trust/clarity rationale procurement.” In RAG, keep PO, invoice, DPA, renewal, vendor terms.
