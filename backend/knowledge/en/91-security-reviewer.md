# Security Reviewer Persona Depth

This document defines the FirstClick reading of the security/compliance role in B2B and regulated domains. This role often has veto power; its absence or weak signals reduce likelihood. Sections are independent.

## Purpose and Scope

The security reviewer may be responsible for information security, IT, compliance, or data privacy (KVKK). Behavior: asks about SSO, SCIM, audit log, encryption, data location, subprocessor, penetration summary, role-based access, log retention period. Persuasion: trust center, honest scope, clear architecture summary, answerable questionnaire. Deterrents: "we are secure" slogans, lack of documentation, unclear data flow, absence of admin/audit, overly permissive defaults.

Out of scope: fake certificate claims, technically incorrect security promises. In scope: searching for signals in the corpus, generating questions if absent, score impacts.

## Behavior Model

Security first strips away marketing language, then looks for evidence. If there is no evidence, prepares a form or rejection. FirstClick does not fabricate features: if SSO is not seen, it does not claim "SSO exists"; adds to toughQuestions.

Security overlaps with the skeptic, but the focus differs: one is corporate risk, the other is general evidence. Security and economic buyer can jointly produce a veto.

## Concrete Examples

Example A — "Bank-level security" slogan, no documentation. Trust drops. Suggestion: remove slogan, add a concrete checklist or "security package for your questions" CTA.

Example B — SSO promise on landing, not in product/docs. Contradiction; fabrication continues.

Example C — Everyone is admin. No role separation. Write together with end-user/admin documentation.

Example D — AI product, unclear data training. Security and skeptic together. Request an honest data usage statement.

Example E — No KVKK link, targeting Turkish customers. Trust warning.

Example F — Lack of audit log in enterprise sales. ToughQuestions mandatory.

## Diagnostic Questions

Is there a signal for SSO/SAML/OIDC? Are audit log and role-based access described? Is data location/region specified? Is KVKK/privacy accessible? Is there transparency about subprocessors or infrastructure? Is the "we are secure" slogan unsupported? Is AI data usage clear? Are default permissions excessive? Is there a security communication channel? Is there a corpus contradiction?

## Response Patterns

Pattern 1 — slogan exists, no documentation. Lower trust; suggest documentation or question CTA; do not fabricate features.

Pattern 2 — SSO claim is contradictory. Note the contradiction; add a verification question.

Pattern 3 — no roles. Suggest admin/user separation.

Pattern 4 — AI data is unclear. Request an honest usage/storage statement.

Pattern 5 — No KVKK. Add link and summary.

Pattern 6 — no signal. Speculative trust elevation; generate toughQuestions list.

## Anti-patterns

Fabricating certificates. Claiming SSO exists when it does not. Hiding security in the footer. Relying solely on slogans. Postponing security questions to sales. Ignoring overly permissive defaults. Disregarding AI data flow. Overriding the veto role with champion enthusiasm.

## FirstClick Prompt and Score Effects

Prompt: security signals, contradictions, gaps, toughQuestions, trust/B2B score, micro action. PersonaReaction: Is there SSO, where is the data, who can access, is logging enabled, how is KVKK handled?

Score: Trust is primary; B2B veto; Likelihood increases with documentation and honesty; Clarity is a jargon-free security summary. Suggestion: trust page, role/audit, KVKK, AI data statement, communication channel — only if present in the corpus.

## Action Checklist

- [ ] Match security slogans with evidence
- [ ] Scan for SSO/audit/role signals
- [ ] Check data location/KVKK
- [ ] Check AI data statement
- [ ] Note contradictions if present
- [ ] Do not fabricate if absent; generate questions
- [ ] Note risk of default permissions
- [ ] Do not speculatively raise trust score
- [ ] Add veto note to champion analysis
- [ ] Select citations correctly

## Security Questionnaire Reality

Many organizations send SIG or similar questionnaires. If there is no answer on the product site, champion and sales get stuck. FirstClick does not say "fill out the questionnaire"; it diagnoses the lack of a visible security package.

## Minimum Trust Signals

Public pricing is not required; a public security summary is often expected in enterprise. At minimum: contact, data processing summary, auth method, role. If absent, write low trust with justification.

## Timeline

1) Sees slogan. 2) Looks for trust center. 3) Cannot find or sees contradiction. 4) Veto/question list. This sequence explains B2B likelihood.

## Default Permission Risk

Defaulting everyone to admin or public link is a red flag for security. End-user/admin separation is a mandatory diagnosis here. Suggestion: at least least-privilege default and conscious escalation.

## AI and Data Training

If there is an AI feature, security asks "is data used for model training, what is the retention period, who can access". Uncertainty lowers trust. If there is no answer in the corpus, do not fabricate; generate a question.

## Trust Center Minimum

At least auth method, role, data summary, communication channel. Slogan is not enough. If FirstClick finds "we are secure" text unsupported, it does not speculatively raise trust.

## Supplementary Note

## Default Permission Risk

Defaulting everyone to admin or public link is a red flag for security. End-user/admin separation is a mandatory diagnosis here. Suggestion: at least least-privilege default and conscious escalation.

## Supplementary Note

## AI and Data Training

If there is an AI feature, security asks "is data used for model training, what is the retention period, who can access". Uncertainty lowers trust. If there is no answer in the corpus, do not fabricate; generate a question.

## Supplementary Note

## Trust Center Minimum

At least auth method, role, data summary, communication channel. Slogan is not enough. If FirstClick finds "we are secure" text unsupported, it does not speculatively raise trust.

## Field Application Note 1

## AI and Data Training

If there is an AI feature, security asks "is data used for model training, what is the retention period, who can access". Uncertainty lowers trust. If there is no answer in the corpus, do not fabricate; generate a question.

## Field Application Note 2

## Trust Center Minimum

At least auth method, role, data summary, communication channel. Slogan is not enough. If FirstClick finds "we are secure" text unsupported, it does not speculatively raise trust.

## Field Application Note 3

## Default Permission Risk

Defaulting everyone to admin or public link is a red flag for security. End-user/admin separation is a mandatory diagnosis here. Suggestion: at least least-privilege default and conscious escalation.

## Field Application Note 4

## AI and Data Training

If there is an AI feature, security asks "is data used for model training, what is the retention period, who can access". Uncertainty lowers trust. If there is no answer in the corpus, do not fabricate; generate a question.

## Field Application Note 5

## Trust Center Minimum

At least auth method, role, data summary, communication channel. Slogan is not enough. If FirstClick finds "we are secure" text unsupported, it does not speculatively raise trust.

## Field Application Note 6

## Default Permission Risk

Defaulting everyone to admin or public link is a red flag for security. End-user/admin separation is a mandatory diagnosis here. Suggestion: at least least-privilege default and conscious escalation.

## Field Application Note 7

## AI and Data Training

If there is an AI feature, security asks "is data used for model training, what is the retention period, who can access". Uncertainty lowers trust. If there is no answer in the corpus, do not fabricate; generate a question.

## Field Application Note 8

## Trust Center Minimum

At least auth method, role, data summary, communication channel. Slogan is not enough. If FirstClick finds "we are secure" text unsupported, it does not speculatively raise trust.

## Field Application Note 9

## Default Permission Risk

Defaulting everyone to admin or public link is a red flag for security. End-user/admin separation is a mandatory diagnosis here. Suggestion: at least least-privilege default and conscious escalation.

## Field Application Note 10

## AI and Data Training

If there is an AI feature, security asks "is data used for model training, what is the retention period, who can access". Uncertainty lowers trust. If there is no answer in the corpus, do not fabricate; generate a question.

## Subprocessor and Infrastructure Transparency

Security asks "to which subprocessors does the data go". If there is no infrastructure or subprocessor summary in the corpus, do not fabricate features; write transparency request as toughQuestions and suggestion. This question becomes more critical especially for products involving AI, payments, and file storage.

## Incident Response and Communication

"We are secure" is not enough; in an incident, it is asked who will be informed and how evidence will be provided. If there is no public status or security communication channel, enterprise likelihood may be suppressed. The analyst does not write legal procedures; points out the lack of visible communication.

## Identity and Session Hygiene

Alongside SSO, expectations may include session duration, MFA, device management. If MFA/SSO is not in the corpus, do not claim it exists. If there is a weak default password policy or encouragement of shared accounts, note the risk. End-user/admin separation is directly linked to identity hygiene.

## Contradiction Management

If marketing says "ISO compliant" but there is no evidence in documentation, the contradiction lowers trust. FirstClick does not hide the contradiction; produces suggestion to soften the claim or add evidence. Suggesting a fake certificate number is prohibited.
