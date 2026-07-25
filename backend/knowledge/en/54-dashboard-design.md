# Dashboard design: summary, action, and overload

In FirstClick, the dashboard is the user's first answer to the post-login question, “What should I do now?” A wall of empty charts, vanity metrics, or summaries without a call to action delay activation. This file is the dashboard design evaluation standard. [kb:54-dashboard-design]

## Scope

Scope: homepage / home / overview layout, KPI cards, feeds, “next task” lists, personalization, role-based defaults, empty dashboard, widget overload, and the alignment between the dashboard promise in the landing screenshot and the real screen. Out of scope: general IA ([kb:51-information-architecture]), general rules for empty/loading/error states ([kb:55-empty-loading-error-states]), product analytics metric selection ([kb:65-product-analytics]) — here, the meaningfulness of metrics shown on the dashboard is addressed from a UX perspective.

Heuristic: A good dashboard is not a “showcase of information” but an “action console.” At least one clear next step should be visible on the first screen.

## Diagnostic signals

1. **Vanity wall**: Big numbers (total clicks, total users) but no answer to “what will I do today?” Busy-professional questions the value.
2. **Empty chart skeleton**: Axes are present, but no data, no CTA — classic high onboardingRisk (related to [kb:13-empty-states-aha]).
3. **Twelve equally weighted widgets**: All the same size; no visual hierarchy ([kb:59-visual-hierarchy]). Decision paralysis.
4. **Role-blind summary**: CEO, operations, and intern see the same KPIs; irrelevant metric confusion.
5. **Only the past**: “Last month” charts; no “pending approvals / today’s tasks.” Lack of action for adoption.
6. **Landing–dashboard drift**: Marketing screenshot is full and colorful; real account is empty or has different IA. Contradiction with citation.
7. **Notification + dashboard double noise**: Same alert appears as banner, widget, and toast; skeptical feels oversold.
8. **Customization required**: User must add 10 widgets before seeing value — setup friction.
9. **Horizontal scroll hell on mobile**: Cards are cut off, charts are unreadable ([kb:57-mobile-ux]).

Positive signals: “Today” / “For you” section, 1 primary CTA, max 3–5 KPIs in the top row, defaults by role or job, sample data or demo mode with clear label, “hide/customize” is optional, recent activity + pending tasks together.

## Persona reactions

- **busy-professional**: Wants “next 3 tasks” in 10 seconds. If a long onboarding overlay covers the dashboard, skip + clear CTA is a must. ROI signal (savings, completed tasks) should be at the top.
- **non-technical**: Chart jargon (cohort, churn, NPS) is intimidating. Plain language: “4 requests awaiting response.” Empty chart + English label = leave.
- **skeptical**: Inflated demo numbers may seem “fake”; sample data must be clearly labeled as “sample.” If there’s no real data, an honest empty + CTA is more trustworthy.
- **price-sensitive**: Locked widgets and constant upgrade prompts on the dashboard; selling before showing value. Limits should be clear, upsell should be soft.
- **student / first-timer**: Doesn’t know what to read. Checklist + “add your first record” turns empty dashboard into activation.

## Good and bad examples

**Bad — analytics museum**
6 line charts, 4 pies, 2 heat maps; none lead to a task when clicked. User is a spectator; product feels like a “reporting tool” but lacks action.

**Good — action console**
Top: “Today: 3 approvals pending” + button “Go to approvals.” Middle: last 5 activities. Bottom: optional trend (weekly completed tasks). KPIs are clickable filters.

**Bad — fake full screenshot**
Landing shows a full dashboard; after signup, “No data yet” and only “Read documentation.” Promise is broken; skeptical trust↓.

**Good — honest first dashboard**
“No customers yet — add your first in 2 minutes” + template + “Tour with sample data” (clearly labeled). Path to aha is visible.

**Bad — customization trap**
First login: empty grid + “Add widget.” User is designing layout without knowing information architecture. onboardingRisk↑.

**Good — smart default**
4 widgets based on role selection; “Edit” is secondary. After 7 days, “Hide 2 panels you haven’t used?” (optional).

## FirstClick score impacts

- **clarity**: Card titles, primary CTA, what’s important. Equal noise lowers clarity.
- **adoption**: Transition from dashboard to value-producing action. Pure monitoring weakens adoption.
- **onboardingRisk**: Empty + unguided dashboard is classic high risk. If sample data is unlabeled, trust is also harmed.
- Time-to-value: the dashboard itself may be the first value (e.g., first insight) or just a bridge; which it is should be verified with the product promise [doc:…].
- Performance: heavy widgets hurt perceived speed ([kb:64-performance-perception]).

## Action checklist

1. Quote the primary CTA on the main entry screen; if absent, note “no action.”
2. Count the number of top-row KPIs; if more than 5 and equally weighted, note overload.
3. Distinguish between empty / sample / real data; check if sample data is labeled.
4. Compare the landing screenshot with the corpus dashboard.
5. Check for role-based differences.
6. Mark whether each widget leads to a task when clicked.
7. Note mobile breakdown: cut-off cards, unreadable charts.
8. Suggest: delete/merge widgets, add a “Today” section, link empty state to a task — without inventing features.

## Citation discipline

- Dashboard content and texts: [doc:…] / [web:…].
- Dashboard UX rules: [kb:54-dashboard-design].
- Empty state depth: [kb:55-empty-loading-error-states].
- Product meaning of metric selection: [kb:65-product-analytics] (do not mix UX vs analytics distinction).
- Do not write “Proper dashboard increases conversion by %X”; use the action console heuristic.

## Analyst implementation note

In the dashboard chunk, maintain this distinction: information vs action. Example persona sentence: “skeptical sees unlabeled sample KPIs → trust↓; suggestion: ‘Sample data’ badge + real empty CTA. Score: onboardingRisk↑, clarity medium.”

## Deep implementation: reading the dashboard by persona and role

A dashboard is not a single screen; there are different “right” consoles for different personas. FirstClick does not impose a single ideal layout; it asks who the default in the corpus is for.

**Operations console**: Pending tasks, SLA, approval queue. Busy-professional lives here. Charts are secondary.

**Analytics console**: Trend, comparison, drill-down. Meaningful, but may not drive activation alone in the first session. Don’t leave first-timers in a chart museum.

**Learning console**: Checklist, template, “do now.” The type that reduces onboardingRisk. Bridge to activation ([kb:62-activation]).

If there is no role selection, the analyst notes “default dashboard is role-blind.” If there is role selection but the result is the same, it’s theater — show with a quote.

**Clickability check**: KPI card should go to a filtered list when clicked. If not, it’s vanity. If the “+12%” badge doesn’t explain what it’s calculated from, skeptical will ask; if there’s no explanation, clarity↓.

**Sample data policy**: Demo mode should be clearly labeled, cleared with one click, and not mixed with real data. Mixing is a trust crisis. If the landing screenshot is full of sample data and the real empty is unguided, drift + onboardingRisk.

**Density budget (heuristic)**: Top layer: 1 action area + max 3–5 summary metrics + 1 feed. Anything more goes to “customize later.” This number is not a law; overload is a reading rule.

**Notification collision**: If dashboard banner + toast + bell + email all repeat the same alert, retention and trust are harmed ([kb:63-retention], [kb:35-notifications]).

RAG chunk keys: action console, vanity KPI, role default, sample data label, clickable metric, landing drift, mobile breakdown, density budget.

## Scenario lab: first 15 seconds on the dashboard

**Scenario A — Landing drift:** [web:…] promises full charts; after signup, empty + “docs.” Skeptical trust↓ onboardingRisk↑. Suggestion: honest empty + template; align screenshot with real state.

**Scenario B — Vanity wall:** 8 KPIs, 0 CTA. Busy-professional sees a “report museum.” adoption↓. Suggestion: “Today” action band.

**Scenario C — Unlabeled demo:** Fake ARR. Non-technical thinks it’s real; skeptical thinks “fake.” Trust↓. Suggestion: sample badge + clear.

**Scenario D — Mobile:** Cards cut in half, chart unreadable. If student traffic comes from mobile, onboardingRisk↑ ([kb:57-mobile-ux]).

Dashboard customization: for power users, “edit” can be offered as secondary. Forcing grid setup on day one turns onboarding into a design tool — anti-pattern. Heuristic: smart default first, customization later.

## Operational control: dashboard QA list (analyst)

1. Primary CTA quote. 2. Number of top-row metrics. 3. Sample/real/empty distinction. 4. Landing screenshot drift. 5. Role difference. 6. Card clickability. 7. Mobile cut-off. 8. Notification collision. 9. Is customization required. 10. “15-second judgment” per persona.

Sometimes the dashboard is the activation itself (first insight). In that case, empty dashboard is a direct aha blocker ([kb:62-activation]). Sometimes it’s just a bridge; then CTA quality is enough. Decide which by the product promise sentence — don’t impose a made-up “industry best practice dashboard.”

## Decision framework: evaluating the dashboard with yes/no

Before writing a dashboard finding, the FirstClick analyst asks three yes/no questions. First: Does this screen tell the user their next action? If not, there’s a vanity or museum risk. Second: Is the data state honest (real / labeled sample / guided empty)? If not, trust or onboardingRisk rises. Third: Is it in the same language as the landing showcase? If not, citation drift is needed.

Even if all three are “yes,” persona fragility may remain. Busy-professional wants action; non-technical wants plain language; skeptical wants sample data label; price-sensitive dislikes locked widget pressure; first-timer wants a checklist. The same dashboard can yield different score rationales for five personas — a single general “dashboard is bad” sentence is weak in RAG.

Widget inflation often comes from the feature team’s “visibility” demand. FirstClick does not confuse visibility with importance order. For each widget, the heuristic is: “Who would be upset if this card was deleted?” If the answer is “no one,” it’s an overload candidate. If the answer is “operations team would miss the approval queue,” it’s part of the action console.

In reporting products, the dashboard may be the activation itself. Then, the time-to-value of the first insight is critical; empty chart skeleton is a direct aha blocker. In workflow products, the dashboard is a bridge; if there’s no CTA on the bridge, the user can’t cross the river. The analyst infers the product type from the corpus promise, and does not impose a default “every SaaS dashboard should be like this.”
