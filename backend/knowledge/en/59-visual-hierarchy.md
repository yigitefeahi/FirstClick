# Visual Hierarchy: Attention Economy and Primary Action

FirstClick evaluates visual hierarchy not by asking “does it look nice?” but by whether the user can select the correct element within 3–5 seconds. Typography, whitespace, contrast, and size are the silent engines of clarity and adoption. This file is the visual hierarchy standard. [kb:59-visual-hierarchy]

## Scope

Scope: in-page order of importance, typographic scale, CTA weight, whitespace, emphasis with color, card/shadow noise, competing primaries, landing hero hierarchy, and in-app consistency. Out of scope: information architecture groups ([kb:51-information-architecture]), navigation components ([kb:52-navigation]), brand aesthetic critique (FirstClick does not award design prizes).

Heuristic: Every view should have a single visually dominant primary action. Two equal “primary” buttons cause decision paralysis (directional rule; not an absolute conversion rate claim).

## Diagnostic Signals

1. **Multiple primaries**: Two filled/colored CTAs (“Start” and “Demo”) on the same row, equally weighted. busy-professional hesitates.
2. **Noisy card forest**: Every block is a shadowed card; none stand out. Common in dashboards and pricing.
3. **Headline–body reversal**: Decorative large illustration, small benefit text; value is unread.
4. **Button-like link / link-like button**: Interaction affordance is unclear; non-technical users can’t click.
5. **Color shouting**: Every element in brand color; no emphasis. Or the opposite: critical destructive action in primary color.
6. **Crowded rhythm**: No padding, lines stick together; scanning becomes difficult.
7. **No price/plan hierarchy**: Three plans as equal cards; recommended plan unclear — price-sensitive is confused.
8. **Embedded CTA in form**: Submit button as weak as a text link; completion drops.
9. **Hierarchy collapse on mobile**: Clear order on desktop, everything same font size on mobile ([kb:57-mobile-ux]).
10. **Promise–visual drift**: “Simple interface” claim + dense UI screenshot.

Positive signals: clear H1 → subtext → primary CTA → secondary text link; consistent typographic scale; plenty of breathing room; single highlight color; recommended plan visually marked but honest; destructive actions (delete) are secondary/outline.

## Persona Reactions

- **busy-professional**: If they can’t find the CTA in 10 seconds, they consider the product “messy.” ROI/time promise should be visually on top.
- **non-technical**: If affordance is unclear, “what do I click?” confusion. Wants a large, text-labeled button.
- **skeptical**: Overly salesy visuals (glow, fake badge pile) break trust. Honest hierarchy > marketing noise.
- **price-sensitive**: Hiding the price or inflating the most expensive plan with a fake “recommended” badge feels manipulative.
- **student / first-timer**: If the learning path is visually weak, they get lost in the feature forest. The “getting started” path should be dominant.

## Good and Bad Examples

**Bad hero**
Three equal columns: feature, feature, feature; four buttons below. Brand name is small. No value statement.

**Good hero**
Single outcome promise (large), one sentence for whom, one primary CTA, one secondary “How it works.” Social proof is below the CTA with lower weight.

**Bad app screen**
Every panel has the same border+shadow; “Invite” is a faint link, “Theme color” is a filled button. Priorities are reversed.

**Good app screen**
Page title + short description; primary “Invite”; list content; dangerous “Delete workspace” at the bottom as outline/red text.

**Bad pricing**
Three plans, all “Most popular” badged or none; price font size equal, feature list is a wall.

**Good pricing**
One plan is visually recommended (single badge), differences are brief, CTA on every card but filled on the recommended. Annual/monthly toggle is clear.

## FirstClick Score Impacts

- **clarity**: Scanning order and emphasis. Noise lowers clarity.
- **adoption**: Findability of the primary action. If CTA is lost, adoption drops.
- **onboardingRisk**: No hierarchy on first screen + too many CTAs = high risk.
- If pricing hierarchy is manipulative, trust drops (especially for skeptical/price-sensitive).
- Timeline: Confusion on landing is usually due to hierarchy; cite the quoted headline/CTA.

## Action Checklist

1. Mark the primary action in the first view; count if there are competing equal CTAs.
2. Note the typographic order (headline > subtext > body > meta).
3. Check if color emphasis serves a single purpose.
4. Check if destructive actions are visually primary.
5. Evaluate the honesty of the recommended badge on pricing/plan cards.
6. Note if the same hierarchy is preserved on mobile.
7. If the landing promise is “simple,” connect noise signals with citations.
8. Suggestion: merge CTAs, reduce weight, increase whitespace — don’t invent new illustrations.

## Attribution Discipline

- Screen texts and CTAs: [doc:…] / [web:…].
- Hierarchy rules: [kb:59-visual-hierarchy]; short previous note can be used together [kb:40-visual-hierarchy].
- Don’t write made-up eye-tracking claims like “F-shaped reading %X.”
- Don’t present heuristics as “proven.”

## Deep Application: FirstClick Session Language

When translating a visual hierarchy finding into a persona reaction, use this template: “[Persona] at first glance sees [quoted primary text] instead of [competing element]; due to [equal CTA / noise / reversed priority] there is [confusion|friction]. Suggestion: single primary [action], secondary [link]. Score: clarity↓ / adoption↓.”

Remember the hero budget in landing analysis: brand/product name, one headline, one supporting sentence, one CTA group. Stuffing the hero with a stats bar, three pricing cards, and a feature grid breaks hierarchy; FirstClick logs this as “first screen overload” in the timeline.

In-app, hierarchy often collapses on dashboard and list pages. Equal cards + equal badges + equal icons = scanning cost. For busy-professional, the cost is time; for non-technical, it’s the fear of “clicking the wrong thing.” For skeptical, excessive badges (“AI powered,” “New,” “Hot”) are marketing noise — especially if badge content is empty.

Keep color semantics consistent: primary action in brand/emphasis color, neutral secondaries, destructive in red/outline. Using the same red for both “Delete” and “Buy” breaks clarity. For price-sensitive personas, a too-bright “Buy” and a faint “Try for free” can be read as manipulation signals.

Whitespace is not a luxury, it’s a tool for hierarchy. A cramped pricing table makes feature comparison unreadable; crowded onboarding checklist steps blend together. When writing suggestions, “more whitespace” alone is weak — specify which two elements need separation.

## Analyst Application Note

Hierarchy chunk: view (landing|dashboard|pricing|form), primary candidate, competing noise, persona, score. For RAG, domain keywords: CTA weight, typographic scale, whitespace, affordance, recommended plan, destructive action.

## Scenario Lab: Attention Collapse

**A — Hero:** Four equal CTAs. First-timer faces decision paralysis. clarity↓ adoption↓. Suggestion: single primary.

**B — Pricing:** Three plans “most popular.” Price-sensitive feels manipulated. trust↓. Suggestion: single honest recommendation.

**C — App:** Delete in primary color, Invite is faint. Reversed priority. Suggestion: make destructive outline.

**D — Dashboard:** Twelve equal shadowed cards. Busy-professional scanning cost. Suggestion: action bar + 3 KPIs.

**E — Mobile:** Desktop H1 is same size as body on mobile. Hierarchy collapse ([kb:57-mobile-ux]).

## Operational Control

Number of primary CTAs, typographic order, use of emphasis color, whitespace, destructive action weight, honesty of pricing badge, mobile consistency, promise–visual drift.

## Decision Framework: Where the Eye Lands First

When an analyst looks at a screen (or a corpus screenshot), they ask: which of brand/promise/CTA is truly dominant? On most weak landings, a decorative illustration dominates; text and CTA disappear. FirstClick recommends keeping brand and outcome within the hero budget; this is not “design taste,” but tied to clarity in the first 10 seconds ([kb:01-first-impression-10s]).

In-app, ask the same: is “Invite” dominant, or “Theme”? If priority is reversed, the adoption rationale comes from visual hierarchy. If color semantics are broken (red for both delete and buy), clarity drops. Multiple “most popular” badges in pricing are a manipulation signal; a single badge + microcopy justification is more honest.

Whitespace should not be reduced to “just leave space.” Specify which two elements are stuck together and which decision this stickiness makes harder: price and feature list, CTA and legal disclaimer, headline and secondary nav, etc.

Hierarchy can also be broken by motion: if every card grows on hover, priority disappears. When reduced-motion is off, decorative animations affect both a11y and the attention economy. The analyst does not praise motion as “modern”; they ask if it helps the primary action.

## Unified Reading: Hierarchy × CTA Microcopy

A visually dominant but textually vague CTA (“Continue”) is a double problem: [kb:59-visual-hierarchy] + [kb:60-microcopy]. Which to fix first: weight or text? Both: make the primary single, label with verb+object. Citing both files together in RAG increases analyst consistency.

Pricing hierarchy intersects with price psychology ([kb:04-pricing-psychology]). Visual manipulation (fake scarcity badge pile) and price structuring should be written separately. FirstClick does not call something “expensive”; it looks for honest comparability and a clear primary plan marker.

Dashboard noise is the shared area of hierarchy + dashboard files. For a forest of equal cards, choose the primary frame: density budget is dashboard, typographic/CTA weight is hierarchy. Double counting does not inflate the score rationale; pick the clear root cause.
