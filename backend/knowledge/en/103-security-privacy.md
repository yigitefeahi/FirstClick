# Security and Privacy Communication: Proving Without Fearmongering

When a FirstClick analyst evaluates the security/privacy surface, they ask: can the user find clear, non-exaggerated answers to “where is my data, who can access it, how do I delete it?” in the security page, KVKK/disclosure texts, and in-product permissions in the corpus? This document is the standard framework for evaluating security & privacy copy in the FirstClick knowledge base. [kb:103-security-privacy]

## Scope

This file covers: security center / trust page, certificate and compliance claims (only if present in the corpus), KVKK disclosure and explicit consent flows, data deletion/export, subprocessor transparency, SSO/MFA signals, and fear-based vs. evidence-based language. Out of scope: procurement survey process (see [kb:104-procurement]), ethical AI model transparency (see [kb:110-ethical-ai-transparency]), general B2B sales (see [kb:100-sales-led-b2b]). This file is not legal advice; the analyst does not invent legal articles, but evaluates clarity in product copy.

Heuristic: Good security communication links the claim to an evidence gate (document, certificate name, process explanation) and presents user rights in clear language. Empty superlatives like “bank-level security” are weak signals.

## Diagnostic Signals

1. **Empty superlative**: “Most secure”, “military-grade”—no evidence.
2. **Dead KVKK link or English-only jargon wall**: Unintelligible in Turkey-focused product.
3. **Consent darkness**: Marketing box pre-checked; hard to refuse.
4. **Unclear data location**: “In the cloud”—no region/subprocessor info.
5. **Certificate name dropped**: “ISO compliant”—no document/number/scope; note as suspicious claim (do not fabricate accuracy).
6. **No deletion path**: Account/data deletion not found in settings.
7. **Silent on AI data use**: No statement on whether customer data is used for model training (see [kb:110-ethical-ai-transparency]).
8. **Security page 404 or “coming soon”**: Contradicts enterprise promise.

Positive signals: summary of data flow in plain language, visible link to disclosure text, selectable consent, security FAQ, contact for DPA, honest indication of MFA/SSO by plan, general explanation of breach notification process (without inventing SLA).

## User Objections

- **“Where is my data stored?”**
- **“Is it shared with third parties?”**
- **“What happens if I delete my account?”**
- **“Are you KVKK compliant?”** (Analyst does not give a yes/no legal judgment; evaluates adequacy of the text.)
- **“Can your employees access my data?”**
- **“Are my AI chats used for training?”**

## Persona Reactions

- **busy-professional**: Wants a short trust summary + “security center for details”; won’t read a 40-page policy wall.
- **non-technical**: Prefers a “what we do/do not do with your data” list over legal Turkish.
- **skeptical**: Wants evidence; superlative + pre-checked consent = trust↓.
- **price-sensitive**: If security is only in Enterprise, suspects “is my data unsafe on cheaper plans?”—plan differences should be stated honestly.
- **student / first-timer**: Long contracts are intimidating; clear and short disclosure + easy deletion is important.

## Good and Bad Examples

**Bad — superlative wall**  
“Your data is 100% safe. Military encryption. No risk at all.” No evidence, scope, or boundaries.

**Good — evidence-gated summary**  
“Data is stored encrypted. Subprocessor list is here. EU/TR region options (as stated in corpus). KVKK disclosure: link. Account deletion: Settings > …”

**Bad — consent trap**  
Pre-checked “all communications and partners” box at signup. Opt-out is hidden.

**Good — separate consents**  
Disclosure required for service is separate; marketing is separate and off by default.

**Bad — security = sales form**  
Only way to access trust page is “fill out form for security whitepaper”; SMBs are filtered out.

**Good — layered access**  
Public summary for all + detailed PDF on request + enterprise DPA via sales.

## FirstClick Score Effects

- **trust**: Primary impact area. Empty claim or dark consent trust↓.
- **clarity**: Policy jargon clarity↓; plain summary clarity↑ rationale.
- **onboardingRisk**: Aggressive permissions at signup + unclear data use risk↑.
- **adoption**: Indirect; in B2B, security gaps halt POC.
- Timeline: “privacy friction”, “unverified security claim” tags.

Heuristic: Do not write “conversion increases because of KVKK compliance” as a percentage. Do not fabricate legal compliance claims.

## Action Checklist

1. Extract trust/security/KVKK links from the corpus.
2. List superlatives; check if there is an evidence gate.
3. Note the default state of consent boxes.
4. Search for deletion/export path; if missing, note as deficiency.
5. Search for AI data usage statement (if missing, cross-reference [kb:110]).
6. Evaluate honesty of security differences by plan.
7. Write persona objection.
8. One-sentence recommendation: plain summary + evidence link.

## Deep Diagnostic Scenarios

**Scenario A — Badge graveyard.** Many compliance badges on the page; clicking leads to marketing blog or 404. Unverified badge.

**Scenario B — Disclosure labyrinth.** KVKK link leads to a 30-page English legal text; no summary. Non-technical users give up.

**Scenario C — Silent support access.** “Can your support team see the data” is never mentioned; more critical in AI tools ([kb:110-ethical-ai-transparency]).

**Scenario D — Region ambiguity.** For TR users: “your data is safe in the cloud”; no location/subprocessor info.

**Scenario E — Deletion theater.** “Delete account” exists; data retention footnote says “except for legal obligations, 90 days”—duration is made up, pattern: if what happens after deletion is unclear, note it.

**Scenario F — Enterprise-only security.** MFA/SSO only on top plan; no mention of difference in lower plans, without implying “insecure”. Price-sensitive suspicion.

## Skeleton for Plain Language Summary

A five-question summary that can be suggested to products (content filled from corpus): Who do we collect data for? Where do we store it? Who can access it? Who are the third parties? How do I delete/export it? This skeleton is not a legal document; it is a surface for firstImpression and clarity.

## Fear Language vs. Evidence Language

Fear: “Don’t get hacked—upgrade to Pro security now.”  
Evidence: “MFA is here, security center is here, our breach process is outlined here.” In FirstClick trust rationale, evidence language is marked positive, fear+upsell mix is negative. Absolute “no risk” claims are also weak.

## Common Analyst Mistakes

1. Giving a legal judgment of “KVKK compliant”.
2. Fabricating certificate numbers.
3. Mistaking policy length for quality.
4. Condemning the product for lack of security—write “surface is weak”, state absence clearly.
5. Not separating AI data policy from security page.

## RAG-Independent Chunk Note

Chunk questions: is it superlative or evidence; is consent selectable; is there deletion/export; is data location/subprocessor transparent? Keep terms KVKK, consent, trust page, deletion, subprocessor.

## Turkey and Language Notes

Presence of KVKK disclosure does not automatically mean compliance; findability, language, and consent UX are evaluated. If “KVKK compliant” badge is without evidence, treat as superlative. If it says data is processed abroad, quote the sentence; do not produce legal conclusions.

## In-Product Privacy Moments and Trust Skeleton

Short microcopy at signup, upload, integration, and AI paste moments carries trust. Minimal trust page: data summary, security communication, document request path. DPA and SSO reality in Enterprise.

## Subprocessor Transparency

If there is no list, it’s a gap; if it ends with “and others”, transparency is weak. AI subproviders are also in scope.

## FirstClick Report Paragraph

“Security/privacy surface: [trust page/KVKK/consent/deletion]. Evidence gate [present/absent]. [Persona] objection [data location/consent/deletion]. Recommendation: [plain summary + opt-in]. Score: trust/clarity — security-privacy; no legal compliance judgment.”

## Signup Moment Audit

Pre-checked marketing box, combining all mandatory terms into a single checkbox, invisibility of disclosure link. Each is a separate friction. In AI products, if model training statement is not on the same screen as signup, note as cross deficiency.

## Common Corpus Contradictions

“Bank-level security” in hero, trust page is 404. KVKK link exists, but marketing box is pre-checked at signup—policy and UX contradiction. SSO “on all plans”, but only on Enterprise in pricing matrix. AI product says “your data is not trained”, but no separate checkbox or setting; silence remains on a secondary surface. Account deletion is in menu, but post-deletion data retention period is only in English policy. Analyst does not draw legal conclusions; ties surface contradiction to trust and clarity rationale. Recommendation: plain summary, evidence link, fix consent defaults.

## Persona Objection Dialogues (Sample Language)

skeptical: “Which country is my data in, who are the subprocessors, where is your evidence?”
busy-professional: “A one-page summary is enough for me, not a 40-page policy.”
non-technical: “What happens if I delete my account, tell me in one sentence.”
price-sensitive: “Is my data less secure on the cheap plan?”
student: “If I upload my homework, can someone else see it?”
If not present in corpus, write “response surface missing”; do not invent legal guarantees. These dialogues translate the diagnostic checklist into persona language.

## Attribution Discipline

- Policy and UI texts: [doc:…] / [web:…].
- [kb:103-security-privacy]; procurement: [kb:104-procurement]; ethical AI: [kb:110-ethical-ai-transparency].
- Do not fabricate certificate numbers/legal articles; say “not in corpus”.

## Analyst Implementation Note

Template: “[Persona] sees ‘[quoted security/KVKK]’; due to [superlative|consent trap|no deletion] [trust↓|friction]. Recommendation: [plain data summary + opt-in]. Score: trust↓ / clarity↓ rationale security-privacy.” In RAG, keep words KVKK, consent, subprocessor, deletion, trust page.
