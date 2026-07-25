# Sales-led B2B: Buying Committee and the Demo Path

When a FirstClick analyst evaluates sales-led B2B, they ask: can the enterprise buyer find preparation for the questions “who decides, what proof is needed, how long does the process take?” in the corpus of demo, ROI, security, and purchasing materials? This document is the standard framework for sales-led B2B evaluation in the FirstClick knowledge base. [kb:100-sales-led-b2b]

## Scope

This file covers: the demo/POC path, buyer roles (champion, economic buyer, security, IT), ROI and business case language, surfaces leading to the security questionnaire, contract and SLA signals, and honest positioning of sales-led vs. PLG hybrid. Out of scope: product-led self-serve growth (see [kb:99-product-led-growth]), deep procurement (see [kb:104-procurement]), security texts (see [kb:103-security-privacy]). Sales-led means “human-driven sales cycle is the primary path”; this is not bad — but if the promise is self-serve while the implementation is sales-only, there is a contradiction.

Heuristic: A good sales-led surface offers at least one proof gate for each committee role (demo, security page, price band, or “how to buy”). This is not a win-rate claim.

## Diagnostic Signals

1. **Single CTA maze**: Only “Get a Demo” — no explanation for whom, how long it takes, or what preparation is needed.
2. **ROI gap**: “Increase efficiency” is a generic claim; no measurable business outcome or sample scenario (don’t add made-up percentages).
3. **Security blind spot**: Enterprise claim exists; no security / privacy / SSO page or “PDF on request” only.
4. **Champion left alone**: Product appeals to the user, but there’s no one-pager justification for the manager to forward.
5. **POC ambiguity**: “Free trial” — what does this mean in enterprise? No sandbox, duration, or success criteria.
6. **Extreme price darkness**: Not even a price band; procurement is eliminated early (see [kb:104-procurement]).
7. **IT hurdle ignored**: No SSO, SCIM, audit log promise on the landing page, but it becomes mandatory in sales — surprise.
8. **Fake self-serve**: “Start now” is actually a form + 3 business days for a response.

Positive signals: role-based pages or FAQ (“For IT”, “For Security”), demo agenda transparency, sample use cases, security center link, optional self-serve trial + clear sales path distinction, case study (see [kb:102-case-studies]).

## User Objections

- **“What will I show my committee?”** Champion objection.
- **“Will the security team approve this?”** Security reviewer.
- **“What’s the budget range?”** Economic buyer.
- **“What are the POC success criteria?”** IT / ops.
- **“How long does integration take?”** Switching (see [kb:105-switching-migration]).
- **“Is this vendor lock-in?”** Skeptical enterprise buyer.

## Persona Reactions

- **busy-professional (champion)**: Wants a short demo, recorded replay, and a one-page internal justification. Long forms cause friction.
- **non-technical**: Sales jargon (“qualified opportunity”) should not appear in the UI; business language is needed.
- **skeptical**: May not even want a demo without a reference customer, security proof, or SLA.
- **price-sensitive (SMB-masked B2B)**: Sales-only + unclear pricing = early drop-off; wants a hybrid self-serve option.
- **student / first-timer**: Not the primary buyer for this model; note if there’s a misleading segment promise.

Enterprise side roles can be described as “security reviewer”, “economic buyer” on the timeline in addition to the FirstClick persona set; do not invent new persona IDs, match with the existing set.

## Good and Bad Examples

**Bad — form black hole**  
“Demo” → 12-field form → no auto-reply → days of silence. Champion loses interest.

**Good — expectation management**  
“30 min product tour. Download our security package in advance if you wish. Slot within 1 business day after the form.”

**Bad — one-dimensional pitch**  
Only a feature list; IT and security questions are “we’ll discuss later.”

**Good — committee kit**  
On the demo page: business scenario, security summary link, integration list, sample contract duration range (don’t make up exact prices).

**Bad — fake self-serve**  
Enterprise product says “try for free”; registration requires “company email + mandatory meeting.”

**Good — honest sales-led**  
“Enterprise setup starts with sales. We’ll plan the sandbox POC together. Self-serve plans for SMBs are here.”

## FirstClick Score Impacts

- **clarity**: If the path by buyer role is unclear, clarity↓.
- **adoption**: If the POC after the demo is undefined, the adoption rationale is weak (in enterprise, “activation” is interpreted differently).
- **onboardingRisk**: Contradiction between self-serve promise + sales gate increases risk↑.
- **trust**: Security/ROI gap weakens the enterprise claim.
- Timeline: Clearly state the difference between “sales-led is appropriate” and “sales-led but promised PLG”.

## Action Checklist

1. Quote the primary CTA and the expected response.
2. Scan for security, SSO, SLA signals.
3. Check if there is ROI / business case material (don’t add made-up metrics).
4. Check if there is a POC definition.
5. Separate self-serve and sales paths; cite contradictions.
6. Note champion vs. buyer needs in the persona note.
7. Cross-reference procurement and migration sibling files.
8. One-sentence recommendation: committee kit or honest positioning.

## Deep Diagnostic Scenarios

**Scenario A — No champion file.** User likes it; there’s no one-pager to forward to the manager. Cycle lengthens.

**Scenario B — Security comes last minute.** POC is done; questionnaire arrives for the first time. Duration and trust risk.

**Scenario C — One-dimensional demo.** IT and business unit are in the same tour; language is only a feature list.

**Scenario D — Fake urgency.** Quarter-end pressure with weak content. Skeptical buyer backs off.

**Scenario E — Forcing SMB into enterprise funnel.** Heavy form + mandatory meeting for a small team.

**Scenario F — Reference trap.** Promise of “we’ll provide a reference customer”; NDA and delay uncertainty in the process — note the promise, don’t make up a timeline.

## Committee Role Map

- Champion: speed and internal justification summary.
- Economic buyer: price band, contract duration, scenario (no made-up ROI).
- Security/privacy: trust page, DPA path — [kb:103-security-privacy], [kb:104-procurement].
- IT/ops: SSO, integration, migration — [kb:105-switching-migration].
Describe as roles on the timeline; do not invent new persona IDs.

## POC Success Framework

A good sales-led surface discusses for POC: duration range, sample success criteria, data requirements, who will participate, exit criteria. If not present in the corpus, write “POC undefined” as a finding — this does not mean the product is unsellable; the buyer experiences uncertainty. FirstClick can link the adoption rationale in enterprise as “uncertainty in transition to value after POC”.

## Common Analyst Mistakes

1. Automatically scoring sales-led as low.
2. Always considering completely hidden pricing as a mistake — the real issue is the lack of a band or purchase path.
3. Zeroing trust just because there’s no case study.
4. Making up win-rate or average cycle percentages.
5. Forcing PLG jargon onto the enterprise page.

## RAG Independent Chunk Note

Chunk questions: is the demo expectation clear; are there proof gates for the committee; does the self-serve promise contradict; is the POC defined? Retain terms demo, POC, champion, SSO, committee.

## Turkey and Language Notes

In Turkish enterprise buying, invoice, signature, and data location questions are common. The analyst does not make up the process; checks if there are TR invoice, KVKK, and support channels in the corpus. “Demo” sometimes means a tour, sometimes a discovery meeting — if there’s no duration or agenda, note the uncertainty. An English-only enterprise page increases communication cost.

## Internal Justification Skeleton

Problem statement, affected parties, pilot scope, required roles, risks, desired decision. If there are no numbers, leave it qualitative; do not make up efficiency percentages.

## Post-Demo and Proposal Transition

If the next step after the demo is unclear, the enterprise adoption rationale weakens. After the proposal, lack of a Q&A channel and signature uncertainty is a bad handoff to procurement.

## FirstClick Report Paragraph

“The product is sales-led on the surface [quote CTA]. For the committee, [security/ROI/POC] gates [which are missing]. Champion persona/role [objection]. Recommendation: [committee kit or honest positioning]. Score: clarity/trust — B2B sales surface; do not make up win-rate.” In enterprise, do not judge adoption as “no activation” like a consumer; note POC undefinedness.

## Discovery Questions (for the analyst)

Is the demo duration stated? Can the security package be downloaded without a form? Is there a price band or purchase path? Does the self-serve term contradict? Is the reference case aligned with the segment? These questions overlap with the checklist; use findings, not questions, in the report.

## Citation Discipline

- Sales page texts: [doc:…] / [web:…].
- [kb:100-sales-led-b2b]; PLG: [kb:99-product-led-growth]; procurement: [kb:104-procurement]; security: [kb:103-security-privacy]; case study: [kb:102-case-studies].
- “Our enterprise conversion rate is X%” is made up.

## Analyst Implementation Note

Template: “[Role/Persona] is on the sales-led path with ‘[quote CTA]’; due to [security gap|no ROI|form black hole] there is [friction|trust↓]. Recommendation: [committee kit / honest POC]. Score: clarity↓ / trust↓ rationale is B2B sales surface.” In RAG, carry the terms demo, POC, champion, economic buyer, SSO.
