# Switching Cost and Migration: The Friction of Leaving and Joining

When evaluating switching/migration, a FirstClick analyst asks: as the user moves from their current tool to the new product, do the corpus promises around import, mapping, parallel operation, and rollback answer the questions “how much effort, what will I lose, can I go back?” This document is the standard framework for evaluating switching costs & migration in the FirstClick knowledge base. [kb:105-switching-migration]

## Scope

This file covers: data import, template/mapping wizards, migration guides from legacy tools, parallel usage periods, lock-in risks (no export, proprietary format), and support signals during migration. Out of scope: general onboarding wizard (see separate onboarding knowledge), procurement (see [kb:104-procurement]), success stories within case studies (see [kb:102-case-studies]). Switching is “why is it hard to leave/how do I join”; activation is “first value after joining”.

Heuristic: Low switching friction is indicated by an export/import path + honest effort expectations + clear statement of data loss boundaries. Claims like “migrate in one click” without evidence trigger a skeptical reaction.

## Diagnostic Signals

1. **No export**: Inability to export data — lock-in; trust↓ and fear of future churn.
2. **No import / CSV ambiguity**: “Bring your data” is promised, but there’s no tool.
3. **Effort lie**: “Migrate in 5 minutes” — complex mapping is hidden.
4. **Blind field mapping**: Required fields cause incomprehensible errors on failed import.
5. **No parallel period**: Can’t switch to the new tool before the old one is closed; fear of cutover.
6. **Silent rollback**: No way to undo after a failed migration.
7. **Hidden historical data loss**: “Some attachments won’t transfer” is in a footnote.
8. **Consultant required**: Migration only via professional services, despite self-serve promise.

Positive signals: supported source list, sample template, dry-run or preview, percentage progress, error report, export as a first-class feature, migration checklist.

## User Objections

- **“Will my old data be corrupted?”**
- **“How long will it take / who will do it?”**
- **“Will business stop during migration?”**
- **“Can I go back if I don’t like it?”** (export)
- **“Will custom fields / historical records be transferred?”**
- **“Is paid professional service mandatory?”**

## Persona Reactions

- **busy-professional**: Wants effort estimate and a “no business interruption” path; open-ended “custom project for you” is friction.
- **non-technical**: CSV/API jargon is intimidating; needs a wizard + plain language error messages.
- **skeptical**: Lack of export is a deal-breaker. Exaggerated “one click” claims break trust.
- **price-sensitive**: Suspects hidden migration fees / mandatory package.
- **student / first-timer**: Usually starts from scratch; still, sample data import speeds up learning.

## Good and Bad Examples

**Bad — promise drift**  
Landing: “Transfer from Trello in one click.” In product: only generic CSV; no column mapping documentation.

**Good — honest scope**  
“Supported sources: A, B. CSV template here. Attachments separately. Estimated duration: depends on data size — there’s a preview step.”

**Bad — one-way prison**  
Import available, but no export or only via support ticket.

**Good — symmetric portability**  
Standard export (CSV/JSON) is self-serve; import wizard shows errors row by row.

**Bad — silent data loss**  
Import says “successful”; comments and history are missing.

**Good — loss inventory**  
Preview shows “will transfer / won’t transfer” list; user confirms.

## FirstClick Score Impacts

- **trust**: Lock-in and exaggerated ease claims decrease trust.
- **adoption**: If migration fails, adoption never starts; root cause is migration.
- **onboardingRisk**: Mandatory complex import + unclear errors in first session = risk↑.
- **clarity**: If supported sources and boundaries aren’t clear, clarity↓.
- Timeline: “migration friction”, “lock-in”, “import failure UX” tags.

Heuristic: Write “Churn drops by %X when migration improves”.

## Action Checklist

1. Compare import/export promise and UI; cite drift.
2. Quote the supported source list; note if missing.
3. Scan error/preview experience.
4. Note if professional service is mandatory.
5. Link lock-in (no export) finding to trust.
6. Add persona objection.
7. If case study claims migration duration, check the source.
8. One-sentence suggestion: honest scope + preview.

## Deep Diagnostic Scenarios

**Scenario A — CSV hope.** “Import” exists; no template, error is “invalid row”. Non-technical user gives up.

**Scenario B — Partial transfer.** Records transfer, relationships and attachments don’t; success toast is misleading.

**Scenario C — Disruptive cutover.** No parallel operation; forced overnight migration. Busy-professional won’t take the risk.

**Scenario D — Export ransom.** After cancellation, export is paid or via support ticket. Lock-in trust↓.

**Scenario E — Consultant gate.** Landing says self-serve; migration only via package service. No price transparency.

**Scenario F — Old tool name as marketing.** Competitor names in promise; integration is missing or broken. Promise drift.

## Honest Migration Effort Grid

Analyst effort qualitative classes: low (template + preview), medium (mapping + cleaning), high (professional service / re-modeling). State the class without inventing duration hours. If the class shown to the user doesn’t match the real UI, the finding is stronger.

## Lock-in and Ethics

Data portability is trust for both entry and exit. Easy entry + hard exit is a red flag for the skeptical. In FirstClick trust rationale, explicitly state lack of export. Legal right claims are not to be invented; evaluate the product surface.

## Common Analyst Mistakes

1. Suggesting “one-click migration” — you’d be inventing scope.
2. Expecting zero friction in every B2B.
3. Confusing empty state onboarding with migration.
4. Inventing success rate percentages.
5. Taking case study duration as a general rule.

## RAG Independent Chunk Note

Chunk questions: is import/export symmetric; is there preview/loss inventory; is effort honest; is mandatory service present? Keep terms import, export, lock-in, mapping, dry-run.

## Turkey and Language Notes

TR SME data is often scattered in Excel and email. “One click” promise with competitor name may not match the segment. Turkish characters and date formats often break on import errors; English-only error messages cause drop-off.

## Cutover Skeleton and Error Quality

Inventory, dry-run, parallel period, overlap, validation, export backup. Error messages should state which row/field and how to fix; “Error 500” wall links to clarity and onboardingRisk.

## Support Path

If migration help only connects to sales, it contradicts the self-serve promise. Documentation, sample file, and human help plan differences should be transparent.

## FirstClick Report Paragraph

“Migration surface: import [yes/no], export [yes/no], preview [yes/no], effort language [honest/exaggerated]. Lock-in risk [high/low]. [Persona] objection. Suggestion: [dry-run + loss inventory]. Score: trust/onboardingRisk — migration.”

## First Session Migration Trap

Some products require mandatory import before showing value. Combined with empty state, this creates double risk. Alternative: show aha with sample data, then import. This order strengthens PLG and onboardingRisk rationale (no percentage).

## Common Corpus Contradictions

There’s a “transfer from Trello in one click” promise; but no binding menu or it’s “coming soon”. Import shows “successful” toast; related records and attachments are missing — silent loss. Export is only on paid plan; after cancellation, data feels like ransom. Migration guide is an English PDF; wizard doesn’t give Turkish errors, only code. Mandatory professional service price is hidden; contradicts self-serve onboarding. For every contradiction, analyst wants both promise quote + UI quote. Suggestion: supported source list, dry-run, loss inventory, self-serve export.

## Persona Objection Dialogues (Sample Language)

busy-professional: “Can we migrate without business interruption, is there a parallel period?”
skeptical: “If I don’t like it, can I export my data fully?”
non-technical: “If there’s a CSV error, is it easy to understand?”
price-sensitive: “Is there a hidden consultant fee for migration?”
If there’s no answer, write effort or lock-in ambiguity. If “one click” promise doesn’t answer these dialogues, it’s an exaggeration finding.

## Short Analyst Summary

Migration review wants symmetry: if there’s an import promise, export should also be first-class. Exaggerated ease language, silent data loss, and mandatory consultant fees are the three classic weak signals. Dry-run and loss inventory are positive signals. Mandatory import in the first session delays aha and increases onboardingRisk. Don’t invent duration or success rate; quote the supported source list.

When writing a migration finding, quote the supported source name, export format, and any mandatory service sentence from the corpus verbatim; if missing, state clearly that it’s absent.

## Evidence/Citation Discipline (Migration-Specific)

Migration claims are especially prone to drift because the marketing surface (“transfer in one click”) and product UI (generic CSV) live in different places. The analyst must cross-link every migration finding to two sources: where the promise appears [web:…] and where the actual tool is seen [doc:…] or in-product screen. If one source is missing, the finding is “unverifiable promise” — not a definite “lie”. If competitor tool names (Trello, Asana) are in the promise, look for evidence of that integration in the corpus; if the link is broken or page is empty, write “promise drift” with citation. Quantitative claims like duration, success rate, and “X times faster” are only quoted if there’s explicit corpus evidence; otherwise, the analyst translates to qualitative effort class (low/medium/high).

## Persona-Based Interpretation Differences

The same migration gap weighs differently by persona. For **skeptical**, lack of export alone is a deal-breaker and sharply breaks trust. For **busy-professional**, the main issue is “will business stop” — if there’s no parallel operation, even low effort is high risk. For **non-technical**, the language of error messages is decisive; “invalid row 42” is technically correct but a practical reason to quit. **price-sensitive** suspects hidden professional service fees. The analyst re-weights the same finding through different persona filters, not applying a single universal penalty.

## Action Recipe and Edge Cases

Recipe: (1) quote import and export promises separately; (2) look for supported source list and template; (3) check preview/dry-run and “will transfer/won’t transfer” inventory; (4) qualitatively assess error experience; (5) note mandatory consulting gate; (6) distinguish if export is first-class or hidden behind support ticket. Edge cases: **greenfield user** (no data to transfer) doesn’t care about migration, look at empty-state onboarding; **regulated data** (health/finance) brings retention and deletion rules into play; **very large account** faces higher cutover risk if there’s no bulk API/staged migration.

## Citation Discipline

- Migration texts: [doc:…] / [web:…].
- [kb:105-switching-migration]; procurement: [kb:104-procurement]; case: [kb:102-case-studies].
- Do not invent duration/success rate.

## Analyst Application Note

Template: “[Persona] sees ‘[quote]’ during migration; due to [no export|effort lie|silent loss] [trust↓|friction]. Suggestion: [preview + honest scope]. Score: trust↓ / onboardingRisk↑ rationale migration.” In RAG, keep the words import, export, lock-in, dry-run, mapping.
