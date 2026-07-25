# Product Analytics: What Gets Measured Gets Managed — What Gets Measured Wrong Gets Distorted

FirstClick reads product analytics on two planes: (1) the quality of analytics/dashboards shown to the user within the product, (2) the alignment of the team’s chosen success metrics for activation/retention with the product promise. This file is the product analytics evaluation standard. [kb:65-product-analytics]

## Scope

Scope: North star candidate, alignment of activation/retention metrics, vanity metric trap, clarity in event naming, comprehensibility of user-facing reports, the tension between privacy/consent and measurement, and the contradiction between the “data-driven” promise and empty/incorrect charts. Out of scope: FirstClick’s own score formula implementation, SQL recipes, third-party tool setup steps, fabricated benchmarks.

Heuristic: Good metrics change behavior; bad metrics create theater. “DAU increased” alone is not proof of product value (directional rule).

## Diagnostic Signals

1. **Vanity wall**: Page views, total signups; no action. busy-professional says “so what?”
2. **Promise–metric disconnect**: Promise is “faster invoicing”, metric is “number of logins”.
3. **Undefined activation**: There’s signup in the funnel, but no aha moment ([kb:62-activation]).
4. **Junk chart to user**: Meaningless axes, jargon labels, empty graphs ([kb:54-dashboard-design]).
5. **Privacy drift**: “We care about privacy” + excessive tracking consent pressure; skeptical trust↓.
6. **A/B theater**: Every color change is “science”; no sample/ethics ([kb:27-experimentation-ab]).
7. **Single number fetish**: One KPI manages the whole product; side effects (spam, dark patterns) are invisible.
8. **Event name chaos**: `btn_click_1`, `thing_done` — analyst can’t extract meaning from corpus; write “no clear event language”.
9. **Broken mobile/web measurement**: Don’t claim double-counting or blind spots without evidence; if you see conflicting numbers in the UI, quote them.
10. **Paywall metric trap**: Upgrade click is counted as success; pressure is measured, not value.

Positive signals: metrics in the same language as the promise, clear activation event, secondary metrics tied to retention loop, plain language in user reports, KVKK/consent transparency, single hypothesis language in experiments, vanity in the background.

## Persona Reactions

- **busy-professional**: “What should this number make me do?” If reports aren’t action-oriented, it’s a waste of time.
- **non-technical**: Cohort, funnel, NPS jargon wall. “4 unanswered requests” language.
- **skeptical**: Inflated social proof numbers and “400% increase” claims. Rejects if no source ([kb:26-citation-discipline]).
- **price-sensitive**: Punitive usage limits (“you used too much, pay up”) — must be clear and predictable.
- **student / first-timer**: Learning analytics can be intimidating; progress language is better.

## Good and Bad Examples

**Bad north star**
DAU. The product is an invoicing tool; daily logins are inflated with forced notifications.

**Good candidate (example framework, not a universal truth)**
“An active account that sends at least one invoice per week” — aligned with the promise. Varies by product; don’t present as a made-up industry standard.

**Bad user report**
“Engagement score: 72” with no explanation.

**Good user report**
“12 requests closed this week — 3 more than last week” + CTA to go to the list.

**Bad experiment language**
“Blue button increased by 12%” with no context/sample; FirstClick does not count this as evidence.

**Good experiment language**
Hypothesis, primary metric, duration; if not in the corpus, “experiment rationale not seen”.

**Bad privacy**
Mandatory “all cookies” wall; product doesn’t work if rejected (note if observed).

**Good**
Short measurement purpose; rejectable analytics cookie; core product function remains.

## FirstClick Score Effects

- **clarity**: Metric and report language. Jargon clarity↓.
- **adoption**: Wrong metrics lead to wrong product behavior (spam, fake engagement) — in the adoption rationale, separate indirect effects.
- **onboardingRisk**: If “complete profile” metric is optimized instead of first value, risk↑.
- Trust: inflated numbers and privacy pressure.
- Analyst should not confuse the FirstClick score with the product’s vanity metric.

## Action Checklist

1. Take the landing/product promise in one sentence; ask which event proves it.
2. Separate vanity vs action metrics in dashboards/reports.
3. Check if the activation event is present in analytics language.
4. Note empty/jargon status of user-facing charts.
5. Check if social proof numbers are sourced ([kb:11-social-proof-playbook]).
6. Read cookie/consent microcopy for trust.
7. Flag if upgrade click is presented as “success”.
8. Recommendation: align metric–promise, use plain language, push vanity to the background — no SQL/tool imposition.

## Citation Discipline

- Product metric claims and numbers: [doc:…] / [web:…] — otherwise, it’s fabricated.
- Analytics standard: [kb:65-product-analytics]; metrics [kb:25-metrics-that-matter]; citation [kb:26-citation-discipline].
- “Good SaaS activation is %X” benchmark is fabricated.
- Don’t write heuristic suggestions as measured results.
- Past analysis metrics: [past:…].

## Deep Application: How Does a FirstClick Analyst Talk Metrics?

Saying “install GA4” in a FirstClick output is weak. Better: “Your promise is X; there’s no event in the corpus proving X; checklist seems optimized for Y — this misleads adoption.” Focus on alignment, not tools.

Analytics shown to the user and internal analytics are different. If the user sees “engagement 72”, that’s a UX clarity issue. Internal metric selection is a product strategy comment; if there’s no corpus evidence, limit speculation: “visible reports are vanity-heavy”.

Proxy metrics: number of invites can be an activation proxy, but forced invite pressure reduces quality. Analyst asks if the proxy is open to gaming.

Privacy and measurement: In the TR context, if there’s KVKK language ([kb:36-turkey-market], [kb:28-security-privacy-copy]), look for contradictions with measurement consents. Don’t fabricate legal outcomes; write the text contradiction.

## Analyst Application Note

Analytics chunk: plane (user-facing report | success metric alignment), promise quote, observed metric/chart, issue (vanity|disconnect|jargon|privacy), persona, score. Example: “skeptical, ‘400% increase’ unsourced [web:…] → trust↓; busy-professional vanity dashboard → clarity↓ adoption medium.”

## Scenario Lab: Wrong Metric

**A:** DAU inflated by notifications. Busy-professional anger; no real value.

**B:** “400% increase” unsourced. Skeptical trust↓.

**C:** Engagement 72. Non-technical confusion.

**D:** Upgrade click as KPI. Price-sensitive pressure optimized.

**E:** Promise is invoice speed; metric is login. No alignment.

## Operational Control

Promise–metric alignment, vanity distinction, activation event language, user report clarity, social proof source, cookie/consent, upgrade-as-success trap. No fabricated benchmarks.

## Decision Framework: Does the Metric Prove the Promise?

A metric is only aligned if it observes the verb in the promise sentence. Promise is “faster response”, metric is “weekly closed tickets / median response time” — close to alignment. Same promise, metric is “DAU” — distant proxy. Proxies are sometimes needed; FirstClick doesn’t want proxies sold as the real thing.

Jargon in user-facing analytics is a clarity issue. Wrong north star in internal analytics is a strategy issue. Don’t mix both in the same finding sentence. Showing an unsourced percentage to skeptical reduces trust; link this to the social proof file ([kb:11-social-proof-playbook], [kb:26-citation-discipline]).

Gamified metrics (engagement score) left unexplained confuse non-technical users. If the explanation is “how many times you clicked”, busy-professional questions the value. If the metric doesn’t call to action, it’s dashboard vanity ([kb:54-dashboard-design]).

Privacy: tension between measurement and respect. If a mandatory analytics cookie wall makes the product unusable, trust + adoption suffer. Don’t fabricate legal penalties; write the text and flow contradiction. In the TR context, if there’s KVKK language, compare it with the consent microcopy.

Don’t recommend optimizing the FirstClick score as a product KPI. Analyst output is a qualitative, justified score + citation; “increase DAU” is too generic. Instead: “Define the aha event and align the checklist to it.”

## Unified Reading: Analytics × Activation × Social Proof × Citation

Product analytics is the meta layer of FirstClick output: what the team optimizes, what the user sees, the source of claims. If activation is undefined, analytics is theater ([kb:62-activation]). Unsourced % increases contradict the social proof file ([kb:11-social-proof-playbook]). No metric sentence without citation discipline ([kb:26-citation-discipline]).

Vanity dashboard is both an analytics and dashboard finding; pick the primary framework. If the “data-driven culture” promise is contradicted by empty charts + jargon, cite as drift.

The analyst’s job: not to impose tools, but to establish promise–event–checklist alignment. When this alignment is set, FirstClick score rationales become clear; when not, adoption comments remain speculative.

## Analyst Glossary: Metric Alignment Check

Control questions: What is the verb in the promise? Which event proves this verb? Is the checklist tied to this event? Does the number shown to the user represent this event? Is there a source for the social proof percentage? Is upgrade click considered success? Does the cookie wall break core functionality? Every “no” is a separate finding candidate. FirstClick doesn’t gloss over with “lacking metric culture”; it writes which alignment break it sees. No benchmark or tool imposition; citation and heuristic tags are present.

## Closing Note (RAG)

This section is also meaningful as a standalone chunk: The FirstClick analyst ties the topic to a product corpus quote, doesn’t present heuristics as statistics, links persona reaction to concrete UI text, maintains clarity / adoption / onboardingRisk / trust distinctions in the score rationale, and doesn’t suggest fabricated features. If evidence is missing, says “not seen in corpus”.
In the analytics chunk, promise–metric alignment and sourced number discipline must be maintained.

## Action Recipes (Product Analytics)

**Recipe 1 — Promise–Metric Alignment:** Ask for the event that observes the verb in the promise sentence. “Faster invoicing” → sent invoice / time proxy is close to alignment; DAU is a distant proxy. Don’t sell the proxy as the real value.

**Recipe 2 — Vanity Filtering:** Separate page views, total signups, login counts from action metrics. If busy-professional says “so what?”, write clarity↓ rationale.

**Recipe 3 — User-Facing Report:** If “engagement 72” is unexplained jargon, non-technical users get lost. Suggest plain language + next CTA (“12 requests closed → go to list”); don’t invent new chart types.

**Recipe 4 — Upgrade-as-Success Trap:** If upgrade click is a KPI, pressure may be optimized instead of value event; separate from value event. Especially note for price-sensitive.

**Recipe 5 — Privacy–Measurement Tension:** “We care about privacy” + mandatory analytics cookie / product breakage contradiction. Don’t fabricate legal penalties; write the text and flow contradiction ([kb:28-security-privacy-copy], [kb:36-turkey-market]).

## Edge Cases

- **A/B theater:** “Blue button 12%” is not evidence if no sample/ethics ([kb:27-experimentation-ab]).
- **Single KPI fetish:** One number can hide spam or dark pattern side effects.
- **Event name chaos:** `btn_click_1` — write “no clear event language”; don’t invent schema.
- **Double-counting claim:** Don’t write mobile/web blind spot speculation without evidence; quote conflicting UI numbers.
- **Social proof inflation:** Unsourced “400% increase” skeptical trust↓ ([kb:11-social-proof-playbook], [kb:26-citation-discipline]).
- **FirstClick score ≠ product KPI:** Don’t turn analyst output into DAU optimization.

## Persona-Specific Comment Template

“Plane [user report|success metric alignment]; promise [quote]; observed [metric/chart]; issue [vanity|disconnect|jargon|privacy|upgrade trap]; [persona]; score; suggestion [align|plain language|pull back vanity] — no SQL/tool imposition.”

Busy-professional wants action-oriented numbers. Non-technical gets lost in cohort/funnel jargon walls. Skeptical rejects unsourced percentages. Price-sensitive wants predictability in usage penalty limits. Student prefers progress language over intimidating “score”.

## Analyst Checklist (Extended)

1. Take the promise in one sentence; which event proves it?
2. Separate vanity vs action metrics.
3. Is the activation event present in analytics language ([kb:62-activation])?
4. Empty/jargon in user charts.
5. Are social proof numbers sourced?
6. Cookie/consent microcopy for trust.
7. Is upgrade click presented as “success”?
8. Does experiment language carry hypothesis/primary metric?
9. Is proxy metric open to gaming (forced invite, etc.)?
10. If there’s TR KVKK language, compare with consent text — don’t fabricate legal outcomes.
11. “SaaS activation %X” benchmark is fabricated.
12. Recommendation: alignment + plain language; no GA4 setup step imposition.
