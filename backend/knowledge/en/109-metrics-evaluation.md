# Metrics and Evaluation: What Counts as Success

When evaluating the metric framework, the FirstClick analyst asks: are the indicators used by the product team and analyst tied to real user value, or are they vanity and misleading averages? This document is the standard framework for metrics & evaluation assessment in the FirstClick knowledge base. [kb:109-metrics-evaluation]

## Scope

This file covers: activation definition, retention reading heuristics, funnel steps, vanity metrics, north star selection, segment-based reading, and the discipline of not inflating the FirstClick score with metrics. Out of scope: A/B method details (see [kb:108-ab-experimentation]), notification CTR (see [kb:107-notifications]). The FirstClick output is a qualitative score and timeline; the analyst does not invent custom dashboard numbers for the product.

Heuristic: A good metric is close to the user’s value-generating behavior and is resistant to gaming. “MAU increased” alone is not proof of health.

## Diagnostic Signals

1. **Vanity peak**: Pageviews, number of signups, app downloads — no activation.
2. **Undefined activation**: “Active user” is not clearly defined.
3. **Worshipping a single average**: Average time / average revenue; no distribution or segments.
4. **Hiding funnel holes**: Registration→payment skipped; intermediate steps not reported.
5. **Fake retention**: Push or email click counts as “returned”; no value.
6. **Score pollution**: “Conversion will increase by %X” invented projection in FirstClick report.
7. **Conflicting KPIs**: Sales rewards “number of demos”, product rewards “self-serve activation” — both rewarded at once, user gets stuck.
8. **Time window drift**: 1-day metric is discussed as if it’s 30-day.

Positive signals: written activation event (“first invoice issued”), segmented reading (persona/device), north star tied to value language, separation of vanity and action metrics, heuristic language in FirstClick (“justification strengthened”).

## User Objections (Indirect — to Product Metric Claims)

- **“‘Millions of users’ doesn’t solve my problem.”**
- **“They say we’re active but I didn’t see any value.”**
- **“They measure success by clicks and keep adding features, making my job harder.”**
- **“Notification spam for retention — fake liveliness.”**

## Persona Reactions

- **busy-professional**: Cares about their own business outcome; company boasting about MAU is unconvincing.
- **non-technical**: Metric jargon (DAU/WAU/NSM) should not appear in the UI.
- **skeptical**: Inflated public metrics decrease trust; prefers defined and modest language.
- **price-sensitive**: “Value” should be tied to price; empty growth metrics are not enough.
- **student / first-timer**: Close metrics like learning progress (completed lesson) are meaningful.

## Good and Bad Examples

**Bad — vanity landing**  
“10M downloads” in the hero; product is empty, no activation. Skeptical users may read this as “old shine.”

**Good — value metric language**  
“Create your first report” is the primary success inside the product; marketing tells the same story (without inventing numbers).

**Bad — fake projection in FirstClick**  
“This fix will increase conversion by 25%.” Forbidden; instead, “weakens onboardingRisk justification (heuristic).”

**Good — qualitative score linkage**  
“Activation event is not reached in the first session → adoption↓ / onboardingRisk↑.”

**Bad — retention theater**  
Inflating open counts with daily push; no aha moment.

**Good — retention reading**  
Return + repetition of value event considered together; session count alone is not enough.

## FirstClick Score Effects

- **adoption**: If the activation definition is clear and the observed flow blocks it, write adoption↓ justification.
- **onboardingRisk**: If the path to the first value event is long/blocked, risk↑.
- **clarity**: If what the product calls “success” is not communicated to the user, clarity↓.
- **trust**: Inflated public metrics and undefined claims decrease trust↓.
- The analyst does not invent their own measurement dashboard; evaluates claims in the corpus.

Heuristic score note: FirstClick scores are 0–100 with qualitative justification; do not add “industry benchmark %X” from outside.

## Action Checklist

1. Quote the product’s public or in-app “success” claims.
2. Distinguish between vanity and value.
3. Define the activation event in one sentence (from product language).
4. Write visible funnel disconnects in the timeline.
5. Do not add fake percentages to the FirstClick recommendation.
6. Match the metric to the outcome the persona cares about.
7. Cross-reference the experiment file for vanity win warnings.
8. One sentence: “the event that should be measured = …”

## Deep Diagnostic Scenarios

**Scenario A — Signup vanity.** Hero says “50,000 signups”; in-product first value rate is not discussed. Skeptical perceives inflation.

**Scenario B — Undefined active.** “Active teams” in marketing language; no event definition. Analyst does not invent numbers without asking for definition.

**Scenario C — Funnel makeup.** Only happy steps are shown; paywall drop-off is hidden. Write disconnect in the timeline.

**Scenario D — Fake projection.** Previous analysis said “+30% conversion” — if [past:…] exists, correct the contradiction; do not add new inventions.

**Scenario E — Segment flattening.** Average improvement; mobile or TR users may have worsened — if corpus hints, separate.

**Scenario F — Reward conflict.** Sales rewards demo count, product rewards self-serve; user gets stuck in a mandatory form.

## FirstClick Score–Metric Glossary

- adoption ↔ observed barrier/ease to value-generating behavior.
- onboardingRisk ↔ fragility of the path to the first value event.
- clarity ↔ understandability of success and concepts.
- trust ↔ alignment of claim and evidence (inflated metrics harm trust).
This mapping is not a numerical formula; it is justification language. Do not write “reduce score by 12 points.”

## North Star Selection Heuristic

Good candidate: close to user business outcome, not easily gamed, can be described in the same sentence as the product promise. Weak candidate: raw traffic, one-off download, open count. Analyst is not obliged to declare the product’s north star; flags misaligned boasting.

## Common Analyst Mistakes

1. Adding industry benchmark percentages.
2. Equating retention only with session count.
3. Putting a fake KPI table in the FirstClick output.
4. Treating vanity as completely forbidden — it can be secondary in context, but not primary.
5. Ignoring persona differences and imposing a single metric.

## RAG Independent Chunk Note

Chunk questions: is the metric vanity or value; is activation defined; is there a fake percentage in FirstClick; was segmentation checked? Preserve terms: activation, vanity, retention, north star, funnel.

## Turkey and Language Notes

If “thousands of companies” is a vague claim without definition, count it as ambiguous. “Turkey’s most …” superlative is not a metric, it is a trust risk. Quote mixed currency growth stories as they are.

## Funnel Naming and Self-Check

Visit → signup → activation event → repeat value → paid. If a step is skipped because it’s not visible, write it; do not invent ratios. Before sending: check for invented percentages, undefined activation, vanity as primary, persona linkage.

## Persona–Metric Linkage

busy-professional → time-to-value. price-sensitive → value on free path + absence of surprise fees. skeptical → verifiable claim. student → first learning outcome. This linkage is not a score formula.

## FirstClick Report Paragraph

“Highlighted metric claim [quote]. Class [vanity/value]. Activation event definition [exists/absent/misaligned]. Fake percentage in FirstClick recommendation [yes/no]. Recommendation: [align event definition]. Score justification is qualitative; no benchmark.”

## Gaming Warnings

Inflating opens with push, forced daily check-in, misleading CTA for clicks. These are signs of unhealthy metrics and intersect with notification/paywall files. If seen, also note the root cause as metric incentive.

## Common Corpus Contradictions

Hero boasts “millions of downloads”; in-app first value path has three blockers and is not measured. “Active user” appears in marketing; event definition is undocumented. Funnel visual ends at signup; paywall drop-off is not shown. Previous internal presentation had “conversion will increase by 25%” projection — FirstClick does not repeat this, filters it as invented. Sales KPI is demo count, product KPI is self-serve activation; mandatory form squeezes the user. Analyst clearly writes vanity/value distinction and activation sentence. Recommendation: single value event definition, visible disconnect in funnel, percentage ban in score justification.

## Persona Objection Dialogues (Sample Language)

skeptical: “‘Millions of users’ — how does that solve my problem?”
busy-professional: “Is your active definition the moment I finish my job?”
price-sensitive: “Do you measure value on the free plan, or just signups?”
student: “Is my progress a completed lesson, or just opening the app?”
Dialogues translate the vanity vs value distinction into persona language. In the FirstClick response, do not comfort with invented KPIs.

## Short Analyst Summary

Metric evaluation separates vanity from value events and makes it mandatory not to add fake percentages to the FirstClick score. The activation definition should be a single sentence from the product language. Invisible paywall disconnect in the funnel weakens the adoption justification. Segment and reward conflict (sales vs self-serve) create user friction. Do not invent benchmarks or projections; write justification qualitatively.

## Vanity–Value Distinction Guide (with Concrete Examples)

The analyst’s most frequent decision is whether a metric is vanity or close to value. Practical test: how resistant is the metric to gaming, and how close is it to the user’s business outcome? Vanity side: total signups, downloads, pageviews, “millions of users,” raw MAU. Value side: first invoice issued, first report shared, team returned for the second time, lesson completed. Gray area: session count — can be inflated with notification spam, so alone is not proof of retention; but gains meaning when read together with repetition of the value event. The analyst never completely bans a metric; uses the frame “can be secondary, should not be primary” and writes in one sentence which event should be measured.

## Success Definition by Persona and Edge Cases

Success metric varies by persona: for **busy-professional**, time-to-value; for **price-sensitive**, value seen on the free path + absence of surprise fees; for **skeptical**, verifiable, defined claim; for **student/first-timer**, first learning outcome. The analyst matches the product’s highlighted metric with the outcome the persona cares about; links misalignment to adoption justification. Edge cases: for **early-stage products**, a modest, defined small metric is healthier than an inflated big number; for **two-sided marketplaces**, one-sided growth (only buyers or only sellers) is misleading, liquidity should be read on both sides; for **low-frequency products** (used a few times a year), daily activity is the wrong frame, repetition per value event is more meaningful. In no case does the analyst add industry benchmark percentages; stays in qualitative justification language.

## Attribution Discipline

- Only cite metric claims if present in the corpus: [web:…] / [doc:…].
- [kb:109-metrics-evaluation]; experimentation: [kb:108-ab-experimentation]; if there is a contradiction with existing activation info, cite.
- Ban on inventing benchmarks and uplift.

## Analyst Application Note

Template: “For [Persona], success is ‘[value event]’; product highlights metric as ‘[vanity/claim]’; due to misalignment [adoption justification weak|trust↓]. Recommendation: [align activation definition]. Score: adoption/onboardingRisk — no invented percentage.” In RAG, keep the terms activation, vanity, retention, north star, funnel.
