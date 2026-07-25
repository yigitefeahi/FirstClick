# Ethical AI and Transparency: Honestly Explaining Model Behavior

When evaluating the ethical AI/transparency surface, the FirstClick analyst asks: Can users find straightforward answers to questions like “How was this output produced? Can it be wrong? Will my data be used for training? Can I object?” from the AI features, warnings, and data policies in the user corpus? This document is the standard framework for ethical AI & transparency assessment in the FirstClick knowledge base. [kb:110-ethical-ai-transparency]

## Scope

This file covers: AI output labeling, admission of limits and errors, human review/approval gates, distinction between training data and customer data, bias and safety warnings, and honesty in “autonomous agent” claims. Out of scope: general KVKK/security page (see [kb:103-security-privacy]), social proof (see [kb:101-social-proof]), experimentation (see [kb:108-ab-experimentation]). This file does not claim to be a legal or model card standard; it evaluates the transparency of product communication.

Heuristic: Good AI transparency keeps limitations as visible as capabilities and provides users with a way to correct or give feedback. Absolute claims like “never hallucinates” are red flags.

## Diagnostic Signals

1. **Human-like illusion**: Nowhere is it stated that it’s AI; users may think it’s a human.
2. **Exaggerated certainty**: “100% accurate”, “no hallucinations” — absolute language with unclear source.
3. **Silence on data training**: No mention of whether chats/uploaded files are used for model training.
4. **No sources**: Promises of citations/corporate info, but no sources or “I don’t know” in output.
5. **Autonomy theater**: “Your agent solves everything” — no undo, approval, or logs.
6. **No feedback**: No button to correct/report wrong answers.
7. **Silence on sensitive domains**: No warnings for health/legal/finance outputs (if present).
8. **Hidden automation**: AI sends emails to customers or acts without user knowledge.

Positive signals: “AI-generated” label, FAQ on limitations, training opt-out, steps requiring human approval, source citation or uncertainty expression, easy correction, policy link in plain language.

## User Objections

- **“Is this answer correct / who verified it?”**
- **“Is the file I provided training your model?”**
- **“Will my customer receive something written by AI without knowing?”**
- **“Who is responsible if there’s a mistake?”** (Analyst does not make legal judgments; evaluates clarity of product’s responsibility language.)
- **“Why different answers to the same question?”**
- **“Can it produce biased/discriminatory output?”**

## Persona Reactions

- **busy-professional**: Wants speed but also an approval gate for outputs sent to clients; blind autonomy is risky.
- **non-technical**: Prefers “AI draft — please review” over jargon like “LLM”, “temperature”, “RAG”.
- **skeptical**: Exaggerated certainty decreases trust; admitting limits increases trust.
- **price-sensitive**: If “AI magic” inflates price but value is limited, anger; wants transparent limits.
- **student / first-timer**: If used as a learning tool, academic honesty warnings and source citation are important.

## Good and Bad Examples

**Bad — magic marketing**
“Your flawless AI employee.” No limits, logs, or approval.

**Good — draft + approval**
“AI creates a draft. You approve before sending. AI label appears in the output.”

**Bad — silent training**
Default: all chats go to training; opt-out is hidden or absent.

**Good — clear data statement**
“Your business data is not used for model training by default” or the actual policy in the corpus — quote whichever is written; if absent, note as a deficiency.

**Bad — source theater**
Fake footnote links or non-existent document numbers. Analyst does not invent; notes suspicious patterns.

**Good — honesty about uncertainty**
Product supports “I’m not sure about this” / “no source found” responses.

**Bad — hidden agent**
AI acts in external systems on user’s behalf; no notification.

**Good — pre-action summary**
“I will do these 3 steps — do you approve?” + undo option.

## FirstClick Score Impacts

- **trust**: Primary area. Exaggeration and data silence decrease trust; limits + approval strengthen trust rationale.
- **clarity**: If it’s unclear what AI does, clarity↓.
- **adoption**: Scary uncertainty or frequent harmful output decreases adoption; good draft+approval can support adoption (no percentage).
- **onboardingRisk**: Uncontrolled autonomous action in the first session increases risk.
- Timeline: “AI overclaim”, “training data opacity”, “human-in-the-loop gap”.

Heuristic: Model benchmark percentages or “hallucination rate” are fabrications. If not in the corpus, do not write.

## Action Checklist

1. Quote the AI feature promise and UI labels.
2. Scan for certainty / “flawless” language.
3. Find the training data / opt-out statement; if absent, note as a deficiency.
4. Check for approval gate and undo.
5. Assess if a sensitive domain warning is needed (if applicable).
6. Check for feedback/reporting path.
7. Write persona objection; cross-reference security file.
8. One-sentence suggestion: label + limit + human approval.

## Deep Diagnostic Scenarios

**Scenario A — Invisible author.** Customer email is sent via AI; no signature or label. Trust and reputation risk.

**Scenario B — Flawless claim.** Landing says “never hallucinates”; no way to correct in-product. Overclaim.

**Scenario C — No training opt-out.** Uploaded contracts may go to training by default — policy is silent. Privacy cross-reference ([kb:103-security-privacy]).

**Scenario D — Autonomous tool call.** AI deletes files/updates records; no approval summary. onboardingRisk↑.

**Scenario E — Source decor.** Footnotes look fake. Analyst does not invent sources; writes suspicious pattern.

**Scenario F — Sensitive domain.** Definite advice language for health/legal questions without warning. Missing limits.

## Human-in-the-loop Grid

1. Generate draft — low risk, label may suffice.
2. Suggest to user — medium, request feedback.
3. Send externally / change system — high, explicit approval.
4. Irreversible action — very high, extra approval + log.
If there’s no approval at levels 3–4, it’s a strong finding. The grid is not a model architecture claim; it’s about UX transparency.

## Transparency Sentence Set (Suggestion Skeleton)

Headings that can be suggested without inventing policy for the corpus: Where we use AI; margin of error; use of data in training; actions requiring approval; how to complain/correct. Mark missing headings in the checklist.

## Common Analyst Mistakes

1. Inventing model brand/benchmark.
2. Empty praise or condemnation as “ethical AI”.
3. Treating every AI feature as high risk — draft tools are different.
4. Making legal responsibility judgments.
5. Copying KVKK findings from the security file and pasting into AI — link, don’t repeat.

## RAG Independent Chunk Note

Chunk questions: Is there an AI label; is there overclaim; is training data transparency present; is there approval for high risk? Preserve terms: model, transparency, training data, approval gate, human-in-the-loop.

## Turkey and Language Notes

Mixed naming (“yapay zekâ / AI / assistant”) creates clarity issues — suggest a canonical term. If there’s no AI processing in the disclosure, cross-reference with privacy; do not make legal judgments. In educational products, source and plagiarism warnings are critical for first-timers.

## Labeling and Harm Reduction

In-product AI draft labeling; recipient transparency in external communication is a separate issue. Control candidates: uncertainty expression, source, forbidden topic rejection, human review. Note missing items as control deficiencies.

## Marketing–Product Consistency

If landing says “autonomous agent” but product is “draft assistant”, note value drift. The reverse also creates surprise autonomy. Do not fabricate technical capability claims.

## FirstClick Report Paragraph

“AI promise [quote]. Label [present/absent]. Overclaim [present/absent]. Training data statement [present/absent]. Approval for high risk action [present/absent]. Suggestion: [label + limit + human-in-the-loop]. Score: trust/clarity/onboardingRisk — ethical AI.”

## User Correction Loop

For wrong output: edit, regenerate, report, show source. If there’s not at least one way, the product is offering “one-way magic.” Existence of the loop is not a model quality claim; it’s a transparency and control signal.

## Common Corpus Contradictions

Landing says “flawless AI employee”; product generates drafts with no warning — overclaim. “Your data is not used for model training” is in the blog; not present at settings or sign-up. Agent claims “works autonomously”; no approval summary for writing to external systems. Output shows source numbers but links are fake — analyst does not invent sources, writes suspicious pattern. Definite advice language for health questions; no limit warning. Suggestion: AI label, FAQ on limits, in-product visibility of training data statement, human-in-the-loop for high risk.

## Attribution Discipline

- AI policy and UI: [doc:…] / [web:…].
- [kb:110-ethical-ai-transparency]; security/privacy: [kb:103-security-privacy].
- Prohibition on fabricating benchmarks, accuracy percentages, legal compliance judgments.

## Analyst Implementation Note

Template: “[Persona] sees ‘[quote]’ in the AI feature; due to [overclaim|training ambiguity|no approval] [trust↓|risk]. Suggestion: [AI label + FAQ on limits + human-in-the-loop]. Score: trust↓ / clarity↓ / onboardingRisk↑ rationale ethical AI.” In RAG, keep terms: model, hallucination warning language, training data, approval gate, transparency.
