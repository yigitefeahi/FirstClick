# Interview Synthesis

This document explains how to turn user interviews and adjacent evidence into actionable findings for FirstClick. The goal is not a quote graveyard or a persona poster; it is to produce recurring friction, jobs, decision criteria, and evidence-backed suggestions. Sections are independent.

## Purpose and Scope

Synthesis turns raw notes into patterns: what is frequently repeated, what is an outlier but critical, what is an analyst assumption. The FirstClick analyst usually does not access raw interview recordings in most sessions; they work with the product corpus, uploaded summaries, and past analyses. If a user interview summary, support transcript, or sales objection list is provided, synthesis discipline is applied. If not, it is not written as if an interview took place.

Scope: coding and tagging, saturation, resolving contradictions, use of quotes, B2B multi-role, merging with support and telemetry, score links. Out of scope: therapy language, universal conclusions from a single participant, fake quantification without sampling, soft generalizations like "users love it".

## Synthesis Steps

One — unitize. Separate each note as observation, quote, or comment. Do not mistake comments for evidence. "It seemed complicated" is a quote; "onboarding is bad" may have drifted into commentary.

Two — tag. Common tags: job, barrier, decision criterion, trust, price, learning curve, integration, time pressure, accessibility, mobile, role (champion, admin, end user, security).

Three — count patterns. Does the same barrier appear in multiple people or multiple sources of evidence? If a support ticket and an interview share the same tag, the pattern is strengthened.

Four — preserve outliers. If a single security person insists on SSO, it may be a veto signal in B2B. Deleting outliers is dangerous; tag and place them in role context.

Five — write a hypothesis. "If X barrier is removed, Y activation will increase" should be testable. A slogan is not a hypothesis.

Six — FirstClick mapping. Finding, timeline friction, score area, suggestion, citation. If there is no mapping, the synthesis remains for the report and is not useful for analyst output.

Saturation: If new interviews do not produce new tags, confidence in the pattern increases. If there is no saturation, language should be "trend" or "signal", not "definitive evidence". Overstated certainty is an anti-pattern in FirstClick.

## Combining Evidence

Interview is not the only source. Support tags, churn reasons, sales CRM notes, NPS free text, in-product feedback widgets, session recordings (with ethical rules) can be combined. When merging, the source type is preserved; they are not all melted into "the user said".

In case of priority conflict: security and compliance veto signals, economic objections, and daily usage friction are commonly prioritized. If the product is PLG, daily friction may come first; in enterprise sales, veto comes first. FirstClick reads the product type from the corpus and justifies the priority.

## Concrete Examples

Example A — three interviews, same barrier. Participants say they do not want a demo without seeing the price, want to try without entering a card, and that the KVKK (privacy) link is missing. Pattern: skeptical attitude, price visibility, privacy. If there is no price on the landing and KVKK is weak, synthesis is linked to trust and price scores. Fake percentages are not written; "recurring objection: price visibility" is written.

Example B — conflicting voices. Sales says "customer wants SSO"; end user says "SSO delays, wants to start with email". Synthesis produces two roles and two paths. Suggestion: start with email, move SSO to admin setup. Forcing a single path hurts both sides; in B2B scoring, role differentiation is rewarded.

Example C — misuse of quotes. Only one person said "too complicated"; "simplicity guarantee" is written for the hero. This is not synthesis, but selective hearing. In FirstClick, do not lower a score based on a single quote; ask for a pattern or UI evidence.

Example D — merging support and interview. Export is mentioned in the interview, CSV is intense in support tags. Strong pattern. If there is no export in onboarding, suggesting "download sample export" for the empty state is concrete and linked to adoption.

Example E — honest weak sampling. There is only one interview and a short note. Analyst does not claim a pattern; evaluates UI friction by [kb] rules and says "insufficient interview evidence". This is better than fabricating personas.

## Diagnostic Questions

Is this finding an observation, a quote, or an analyst comment? How many different sources mention the same barrier? Is there a counterview and does it indicate a veto role? Is the success criterion written in the participant's own language? Are price and trust objections kept separate from feature requests? Are mobile and accessibility notes being dismissed as "we'll look later"? Does the synthesis output contain a testable hypothesis? Does the FirstClick corpus confirm, refute, or remain silent on this finding? Is a sector-specific finding being written as a general rule? Is the quote unexaggerated and contextual? Is sales language mixed with user language? Is there the same pattern as previous analyses?

## Response Templates

Template one — pattern report. "Recurring barrier: mandatory integration. Job: see the first report with sample data. Suggestion: make integration optional. Adoption and onboardingRisk are affected."

Template two — evidence distinction. "Sales note says SSO; there is no SSO on the landing. I am not claiming a feature; adding to toughQuestions. Trust is not speculatively increased."

Template three — role distinction. "End user wants speed, admin wants control. There are two success metrics. If UI is only 'start immediately', admin concern is written to timeline."

Template four — weak sample. "There is only one interview; I am not claiming a pattern. I am evaluating UI friction by knowledge base rules."

Template five — combined evidence. "Interview and support both show the same CSV barrier; there is no export in the empty state. Suggestion: sample CSV and clear export path."

## Anti-patterns

Assuming the most colorful quote is the whole truth. Turning the number of participants into exaggerated percentages. Coding comments as observations. Blending conflicting roles into an average user. Ending synthesis with a persona name and leaving it actionless. Writing as if there was an interview when there was not in FirstClick. Making every request a roadmap item. Writing a feature wanted by sales as a user job. Hiding negative findings and synthesizing only praise. Using universal language without saturation.

## FirstClick Prompt and Score Effects

Prompt: source type, recurring barrier, job, corpus match, score, micro-action, citation. PersonaReaction preserves verbs in participant language: "don't wait for approval", "let me see the price", "let me look without entering a card". These verbs turn into CTA and microcopy suggestions.

Score: Trust moves with transparency objections, Clarity moves when jargon complaints are confirmed in the UI, Adoption moves with recurring setup barriers, Price with price access, Likelihood with synthesis and product path alignment. Citations: if there is an interview or uploaded summary, doc; general rule, kb; recurring past, past; live site, web.

Suggestion priority: one, trust and price transparency; two, first job block; three, secondary requests. Each suggestion is linked to a synthesis tag. Measurability: prefer "reduce required fields from three to fewer" over "simplify".

## Action Checklist

Distinguish observation, quote, and comment. Fix the tag dictionary. List recurring patterns. Preserve outlier but critical veto signals. Write a testable hypothesis. Validate with corpus or say unknown. Do not write fake percentages. Resolve role-based contradictions as two paths. Link suggestion to pattern. Mark citation types correctly. Soften certainty language if there is no saturation. Compare with previous analysis.

## Synthesis Output Template (Pasteable to FirstClick)

Synthesis is summarized on a single page with these blocks. Block one: context and sources (number of interviews, support, sales notes; date range). Block two: recurring patterns (up to five; each with tag, evidence, severity). Block three: outlier veto signals. Block four: job sentences (role-based). Block five: open questions and missing evidence. Block six: recommended FirstClick focuses (score areas and micro-actions).

Without this template, synthesis gets lost in chat notes. If the analyst uploads raw user notes, they first compress them into the template; then write the diagnosis. If template fields are empty, nothing is fabricated to fill them; "unknown" is written.

## Quality Rubric

High-quality synthesis: separates observation from comment, verifies patterns from multiple sources, preserves role contradictions, produces testable hypotheses, maps to FirstClick areas, does not use exaggerated percentages. Low-quality synthesis: picks the most dramatic quote, makes everything a single persona, produces a feature list, fills score justification with soft language.

If the FirstClick prompt sees low-quality synthesis, the analyst corrects it: "Source is weak; reverting to UI evidence". High-quality synthesis is strengthened with citations and suggestion priority is ordered according to the pattern.

## Tag Dictionary Suggestion

job_functional, job_emotional, trigger, barrier_time, barrier_permission, barrier_skill, barrier_trust, barrier_price, criterion_decision, criterion_veto, role_champion, role_economic, role_security, role_end_user, channel_mobile, a11y_need, integration_dependency, proof_needed. If tags are not used consistently, even if RAG brings them back, analyst output will be scattered. New tags can be created freely but synonym inflation should be avoided.

## Field Note: Language in the Turkish Context

In interview and support notes, participants often use terms like 'invoice', 'KVKK', 'refund', 'bank transfer/EFT', 'customer representative'. When synthesizing, these local signals should be translated into general tags like 'privacy' or 'billing' without losing the original verb. If the same language is preserved in FirstClick suggestion microcopy, trust increases. If synthesis with English jargon conflicts with the Turkish product corpus, a clarity warning should be written.
