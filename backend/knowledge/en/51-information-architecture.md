# Information Architecture (IA): The Product’s Mental Map

When a FirstClick analyst evaluates a product’s information architecture, they ask: can the user answer “where am I right now, where can I go, under which concept is what I’m looking for?” using the screens, menus, and labels in the corpus? This document is the standard framework for information architecture (IA) evaluation in the FirstClick knowledge base. [kb:51-information-architecture]

## Scope

This file covers: content grouping (chunking), labeling, hierarchy depths, task-oriented vs. feature-oriented IA, role-based visibility in multi-role products, and consistency between landing/promise and in-app structure. Out of scope: pure visual hierarchy (see [kb:59-visual-hierarchy]), navigation component patterns (see [kb:52-navigation]), search UX (see [kb:53-search-ux]). Information architecture answers “where are we”; navigation is “how do we get there”, search is “how do I recover if I can’t find it”.

Heuristic: Good IA makes it easy for the user to guess the “right door” for 2–3 main tasks in their first session. This is not a measurement claim; it’s a working hypothesis used when reading lost and confusion events in the FirstClick session timeline.

## Diagnostic Signals

The following signals in the corpus indicate information architecture issues:

1. **Label–content mismatch**: The menu says “Projects” but the screen shows a mix of “Workspace / Space / Board”. The analyst logs this as a jargon conflict in the timeline.
2. **Flat hierarchy overload**: 8+ equally weighted items in the top menu. Heuristic: target 5±2 items in primary global nav (a rule often cited in the context of Miller’s working memory; use as a practical IA rule, not as strict psychology evidence).
3. **Buried feature maze**: A critical task (issue invoice, generate first report, invite member) is three levels deep in submenus. onboardingRisk increases.
4. **Role confusion**: Admin, member, and guest all see the same left menu; unauthorized clicks lead to dead ends.
5. **Landing–app drift**: Landing promises “all tasks from a single panel”; in the app, tasks are scattered across Settings / Integrations / Billing / Reports. Promise–UI conflict must be cited with [doc:…] or [web:…].
6. **Category names are product jargon**: Labels like “Orchestration”, “Insights Hub”, “Control Plane” create confusion for non-technical personas.
7. **Same concept in two places**: “Team” appears under both People and Workspace; duplicate paths create ambiguity.
8. **Empty IA skeleton**: Left menu is full but every page is an empty state; structure exists, but no content — user feels “unfinished product”.

Positive signals: task-oriented groups (“Sales”, “Support”, “Finance”), location awareness with breadcrumbs, simplified “Getting Started” view for new users, advanced sections grouped under “More” for later access.

## Persona Reactions

- **busy-professional**: High time cost. If “most frequent task” is not at the top in IA, friction is high. Even with a skip tour, entering wrong doors reduces adoption. What they want: a clear entry for the 1–2 tasks they’ll do today.
- **non-technical**: If label language is English or technical, panic + confusion. If “API Keys” is in main nav, they code the product as “not for me”. Wants visual guidance and Turkish/plain language labels.
- **skeptical**: Sees messy IA as a sign the “product isn’t mature”. The same feature with two names breaks trust; even with social proof, if they get lost inside, they abandon the trial.
- **price-sensitive**: If paid features are hidden in a separate “Premium” maze in IA, or conversely, if every door leads to a paywall, suspicion arises. Wants clear boundaries: what’s free, what’s paid.
- **student / first-timer**: Doesn’t know category meanings. If “Workspace vs Project vs Board” distinction is left unexplained, drop-off occurs. Example IA with templates (sample project tree) speeds up activation.

When writing about IA issues in persona firstImpression or session notes, quote the actual menu label from the product corpus; don’t just say “bad menu” in general.

## Good and Bad Examples

**Bad — feature-oriented maze**  
Left menu: Dashboard, Analytics, Automations, Integrations, Workspace Settings, Personal Settings, Billing, Admin, Developer, Changelog. The first task (e.g., “create customer record”) is not visible. Busy-professional gets lost; non-technical hits a jargon wall.

**Good — task-oriented simplification**  
Left menu: Home, Customers, Quotes, Invoices, Reports, Settings. Advanced automation is under Settings > Workflows. Search + primary “New …” CTA at the top. For first-timers, a 3-step checklist on Home.

**Bad — dual concept**  
Both “Team”, “Organization”, and “Workspace” refer to the same entity. Documentation uses one, UI uses another. Citation discipline: clearly state the [doc:…] vs [web:…] conflict.

**Good — progressive disclosure**  
New account gets “Simple view”: Home, My Tasks, Invite. After 7 days or an activation event, “Reports” and “Integrations” open up, or user can open advanced sections via “Show advanced”. Heuristic: spread complexity over time, hide it in the first session.

**Bad — role-blind IA**  
Accountant and sales rep see the same 12-item menu; accountant enters “Pipeline”, sales enters “Accounting codes”. Unauthorized pages end with empty “403”.

**Good — default by role or job**  
On first login, menu is filtered by “Your role?” or by the role from the invite link. Admin gets an extra “Management” group; not present in member menu.

## FirstClick Score Impacts

- **clarity**: Comprehensibility of labels and predictability of hierarchy. Jargon-heavy IA reduces clarity.
- **adoption**: If the user can’t reach a value-producing task, adoption drops; IA barrier is read as “product is incapable” but the root cause is structural.
- **onboardingRisk**: If the first success path is buried in IA, risk increases. Empty state + wrong door combo is a classic high-risk pattern.
- Timeline mapping: Landing OK, lost in app → friction high + confusion; “IA drift” tag is recommended.
- If there’s a promise–structure conflict, citation with [web:…] or [doc:…] is mandatory in the score comment; do not invent menu items.

Heuristic score note: IA alone does not claim a numeric “%X conversion” impact. The analyst ties observed signals (menu count, label quality, task path depth) qualitatively to the score rationale.

## Action Checklist

1. Extract primary navigation labels from the product corpus as-is; do not paraphrase.
2. List the 3 most critical user tasks; count click depth for each (heuristic: target ≤3 clicks for first value).
3. Compare landing/hero promise with app IA groups; if drift exists, write a finding with citation.
4. For each persona, construct a “wrong door” scenario (e.g., non-technical → Developer menu).
5. Identify duplicate concepts (Project/Board/Space); suggest a single canonical term.
6. Check for role-based menu differences; if absent, note unauthorized dead ends.
7. Suggest progressive disclosure: simple menu for new users, “advanced” for power users.
8. Write the recommendation in a single sentence: action + rationale (“Regroup menu by task names because…”).

## Citation Discipline

- Product menu structure: only [doc:…] or [web:…] / screen capture. If not in corpus, state “I did not see primary nav labels in the corpus”.
- General IA rule and heuristics: [kb:51-information-architecture].
- If the same IA drift existed in a previous analysis: [past:…].
- Don’t invent statistics: don’t write “conversion increased by 30% after IA fix”. Instead: “shorter task path strengthens adoption rationale (heuristic).”
- Cross-reference sibling topics: navigation components [kb:52-navigation], search rescue [kb:53-search-ux], dashboard layout [kb:54-dashboard-design].

## Analyst Implementation Note

When translating an information architecture finding into a persona reaction, use the template: “[Persona] is looking for [task] under ‘[quoted label]’; due to [N] levels / wrong group, [friction|confusion]. Recommendation: [canonical group + label]. Score: clarity↓ / onboardingRisk↑ rationale IA.” This template should carry domain terms (label, hierarchy, task path, progressive disclosure) in every section so it remains meaningful in RAG chunks.

## Deep Implementation: IA Audit Method (FirstClick)

The FirstClick analyst audits information architecture not by “nice menu” aesthetics, but by task completion paths. If the corpus contains screenshots, sitemap, sidebar list, or settings tree, convert these to a canonical label list. If not, state “I did not see a primary information architecture map in the corpus”; do not invent imaginary menus.

Task path table (qualitative): rows are critical tasks, columns are “entry point / intermediate steps / dead end”. Dead end = permission error, coming soon, empty page, wrong category. Each dead end is logged as friction or confusion in the timeline. Heuristic: if there are more than three decision points on the path to first value, IA depth can be cited as onboardingRisk rationale — this is not a lab measurement, but a reading rule.

Cardinality and naming: multiple labels for the same entity (Board/Project/Space) increase both search and support load. When suggesting a canonical term, the analyst aligns with the product’s landing language; do not invent entirely new jargon. If there’s a TR/EN mix, add language inconsistency to the clarity finding.

Multi-product suite: In IA, is cross-product navigation via a “product picker”, or are products mixed in a single menu? If mixed, busy-professional searches for tasks in the wrong product. If there’s no separation between seller/buyer menus in a marketplace, cross-reference with [kb:07-marketplace-two-sided].

Change communication: After IA refactor, the feeling that “everything moved” hurts retention ([kb:63-retention]). If there’s no changelog or “what’s new tour” in the corpus, don’t speculate; write only visible lost signals.

RAG chunk keys: label, hierarchy, task path, progressive disclosure, role filter, landing–app drift, canonical term, dead end.
