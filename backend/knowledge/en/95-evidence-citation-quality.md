# Evidence and Citation Quality

This document defines the evidence hierarchy, citation discipline, and how to maintain strong score justification in FirstClick analyst outputs. The reliability of RAG depends on these rules. Sections are independent.

## Purpose and Scope

Citation types: [doc] user file, [web] URL/landing, [past] previous analysis, [kb] FirstClick knowledge base. Rule: do not fabricate product features; if absent, say "not seen in corpus." For general UX rules, use kb. For repetition of past findings, use past. Fill the citations array.

This document is compatible with 26-citation-discipline; it raises the quality threshold in the context of persona and methodology. Fake statistics, fabricated customers, and speculative scores are prohibited.

## Evidence Hierarchy

Primary: direct corpus observation (screen text, form field, pricing card, policy link). Secondary: user-uploaded brief, interview summary, sales note. Tertiary: kb general rule. Weak: analyst assumption. Assumptions cannot be the backbone of score justification; at most, they can be noted as explicit speculation.

High-quality evidence is specific: instead of "no pricing," say "no pricing CTA, only a Request Demo form [web]." Low-quality evidence: "users don't trust" (who, from where?).

## Citation in Persona Claims

Persona reactions may be based on the kb persona document; product claims require doc/web. Example: "The skeptic drops off at hidden pricing [kb:…] and there is no public pricing on this site [web:…]." Both together are strong. You cannot claim "your product has SSO" based only on kb.

Likelihood justification is not written without an evidence chain. "Because skeptic" is not enough; "because the skeptic demands evidence [kb] and there is no case/pricing [web]" is required.

## Concrete Examples

Example A — Analyst writes "SSO is supported," no citation. Wrong. Correction: not seen; add to toughQuestions.

Example B — "Activation increases by 40%" suggestion. Fake statistic. Correction: "shorten the step to first value by reducing mandatory fields."

Example C — Past analysis also flagged the same hidden pricing. Strengthen the pattern with [past]; do not add new fabrications.

Example D — Kb onboarding rule conflicts with doc promise. Write the conflict; cite both.

Example E — User brief says "KVKK complete," but no link on site. Brief [doc], observation [web]; conflict is trust.

Example F — Social proof "1000+ customers" without source. Evidence quality is low; downgrade according to skeptic document.

## Diagnostic Questions

What source does this sentence rely on? Is it a feature or a general rule? Is the citation tag correct? Is there a speculative score? Is there a fake percentage? Are conflicting sources explicitly stated? Is the persona name the entire justification? Is the past pattern connected? Is there a claim where "not seen" is required? Is the suggestion measurable?

## Response Patterns

Pattern 1 — missing citation. There is a claim, but no tag. Remove or add a source.

Pattern 2 — fabricated feature. SSO not seen. "Not seen" + question.

Pattern 3 — fake metric. Delete the percentage; write the mechanism.

Pattern 4 — conflict. Doc vs web. Cite both, clarify.

Pattern 5 — weak social proof. Unsourced number. Lower quality / ask.

Pattern 6 — persona name only. Add evidence chain.

## Anti-patterns

Fabricating features. Fake statistics. Definitive language without citation. Treating kb as product evidence. Ignoring past. Hiding conflicts. Assigning guaranteed percentages to suggestions. Fabricating logo walls. "Everyone knows" justification. Writing an incorrect chunk from RAG without verification.

## FirstClick Prompt and Score Effects

Prompt for every finding: observation, source tag, conflict, score effect, micro action. Score is not speculatively increased. Trust is especially sensitive to evidence quality. Clarity also depends on the readability of the justification: blurry justification is a weak analyst output.

Suggestion rules: specify the type of evidence, make it measurable, ask a question if not possible. The citations array is never left empty; at least kb or web/doc.

## Action Checklist

- [ ] Attach a citation to every product claim
- [ ] Do not claim features not seen
- [ ] Delete fake percentages/statistics
- [ ] Add evidence chain to persona justification
- [ ] Explicitly state conflicting sources
- [ ] Check past pattern
- [ ] Separate kb from product evidence
- [ ] Link suggestion to mechanism
- [ ] Do not speculatively increase Trust
- [ ] Fill the citations array

## Citation Format Discipline

Tags must be consistent and short. File logic such as [kb:85-novice-vs-expert] can be used within the text; follow whatever format the system expects. If the format is unclear, at least specify the type (kb/doc/web/past) and what it is based on.

## Against RAG Hallucination

A knowledge base chunk may bring up the wrong topic. The analyst does not blindly copy the chunk; it is cross-checked with the current product corpus. If inconsistent, it remains a general kb rule, not a product feature.

## Score Justification Template

"Observation: … Source: … Persona impact: … Score area: … Direction: … Micro action: …" This template raises quality and makes it auditable.

## Link with Skeptic and Security

If evidence quality is low, the likelihood for skeptic and security reviewer decreases. This document standardizes how to write the justification for that decrease.

## Prohibited Expression Examples

"Absolutely 98% confidence," "as an industry standard everyone uses SSO (no source)," "most customers are satisfied (not measured)." Instead: observation, limit, question.

## Quality Rubric (Analyst Self-Check)

High: every claim is sourced, conflicts are explicit, suggestion is mechanical, no statistics. Medium: general kb is correct but product link is weak. Low: fabricated feature, empty citation, persona name = justification. Low-quality output is not produced; it is corrected.

## Implementation Depth 1

## Citation Format Discipline

Tags must be consistent and short. File logic such as [kb:85-novice-vs-expert] can be used within the text; follow whatever format the system expects. If the format is unclear, at least specify the type (kb/doc/web/past) and what it is based on.

## Implementation Depth 2

## Against RAG Hallucination

A knowledge base chunk may bring up the wrong topic. The analyst does not blindly copy the chunk; it is cross-checked with the current product corpus. If inconsistent, it remains a general kb rule, not a product feature.

## Implementation Depth 3

## Score Justification Template

"Observation: … Source: … Persona impact: … Score area: … Direction: … Micro action: …" This template raises quality and makes it auditable.

## Implementation Depth 4

## Link with Skeptic and Security

If evidence quality is low, the likelihood for skeptic and security reviewer decreases. This document standardizes how to write the justification for that decrease.

## Implementation Depth 5

## Prohibited Expression Examples

"Absolutely 98% confidence," "as an industry standard everyone uses SSO (no source)," "most customers are satisfied (not measured)." Instead: observation, limit, question.

## Implementation Depth 6

## Quality Rubric (Analyst Self-Check)

High: every claim is sourced, conflicts are explicit, suggestion is mechanical, no statistics. Medium: general kb is correct but product link is weak. Low: fabricated feature, empty citation, persona name = justification. Low-quality output is not produced; it is corrected.

## Implementation Depth 7

## Citation Format Discipline

Tags must be consistent and short. File logic such as [kb:85-novice-vs-expert] can be used within the text; follow whatever format the system expects. If the format is unclear, at least specify the type (kb/doc/web/past) and what it is based on.

## Implementation Depth 8

## Against RAG Hallucination

A knowledge base chunk may bring up the wrong topic. The analyst does not blindly copy the chunk; it is cross-checked with the current product corpus. If inconsistent, it remains a general kb rule, not a product feature.

## Implementation Depth 9

## Score Justification Template

"Observation: … Source: … Persona impact: … Score area: … Direction: … Micro action: …" This template raises quality and makes it auditable.

## Implementation Depth 10

## Link with Skeptic and Security

If evidence quality is low, the likelihood for skeptic and security reviewer decreases. This document standardizes how to write the justification for that decrease.

## Implementation Depth 11

## Prohibited Expression Examples

"Absolutely 98% confidence," "as an industry standard everyone uses SSO (no source)," "most customers are satisfied (not measured)." Instead: observation, limit, question.

## Implementation Depth 12

## Quality Rubric (Analyst Self-Check)

High: every claim is sourced, conflicts are explicit, suggestion is mechanical, no statistics. Medium: general kb is correct but product link is weak. Low: fabricated feature, empty citation, persona name = justification. Low-quality output is not produced; it is corrected.

## Implementation Depth 13

## Citation Format Discipline

Tags must be consistent and short. File logic such as [kb:85-novice-vs-expert] can be used within the text; follow whatever format the system expects. If the format is unclear, at least specify the type (kb/doc/web/past) and what it is based on.

## Implementation Depth 14

## Against RAG Hallucination

A knowledge base chunk may bring up the wrong topic. The analyst does not blindly copy the chunk; it is cross-checked with the current product corpus. If inconsistent, it remains a general kb rule, not a product feature.

## Implementation Depth 15

## Score Justification Template

"Observation: … Source: … Persona impact: … Score area: … Direction: … Micro action: …" This template raises quality and makes it auditable.

## Implementation Depth 16

## Link with Skeptic and Security

If evidence quality is low, the likelihood for skeptic and security reviewer decreases. This document standardizes how to write the justification for that decrease.
