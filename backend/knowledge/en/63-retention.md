# Retention: return, habit, and the second session

FirstClick interprets retention not as “did the user like it?” but through the product loop that justifies coming back. Talking about retention before activation is premature; silence after activation signals a weak habit hook. This file is the retention evaluation standard. [kb:63-retention]

## Scope

Scope: second session justification, habit loop (trigger–action–reward), recall via notification/email, week-1 experience, emptied accounts, churn signals (cancellation flow, downgrade), and the real usage loop versus the “stickiness” promise. Out of scope: activation definition ([kb:62-activation]), notification spam tactics in detail ([kb:35-notifications]), the full psychology of price-driven churn ([kb:04-pricing-psychology], [kb:12-freemium-and-trial]).

Heuristic: Retention is when the user sees “a reason to open again tomorrow.” If there’s no reason, a push notification only produces delayed abandonment (directional rule).

## Diagnostic signals

1. **One-shot value**: The first report is nice; on day two, the product is empty. No habit.
2. **Spam recall**: 5 emails a day with no value; skeptical and busy-professional personas get angry.
3. **Stale dashboard**: Same empty/same numbers on return; “nothing has changed.”
4. **Forced daily login**: Artificial streak penalty; feels manipulative (context-dependent — label clearly).
5. **No collaboration**: Solo user in a team product; no social stickiness.
6. **Difficult/locked data export**: Skeptical doesn’t trust; price-sensitive flees — reverse retention trap, trust↓.
7. **Cancellation maze**: Churn-blocking dark pattern; short-term retention, long-term trust loss.
8. **Feature graveyard**: 40 unused features; returning user gets lost (linked to IA/nav).
9. **Promise drift**: “The daily team hub” but daily work stays in email.
10. **Not on mobile**: Daily quick tasks broken on mobile; busy-professional doesn’t return.

Positive signals: clear repeat reason (incoming work, daily summary, pending approval), gentle and personal recall, new/changed info on return, healthy cancellation, export, “next loop” design after activation.

## Persona reactions

- **busy-professional**: A loop that fits their calendar (morning summary, approval queue). Noisy notifications = uninstall.
- **non-technical**: “Where to continue?” must be clear on return. Changing UI causes panic.
- **skeptical**: Dark pattern cancellation and exaggerated “we missed you” erode trust. Honest value reminders.
- **price-sensitive**: Surprise fee before renewal causes churn. Soft warning as limits approach.
- **student / first-timer**: Usage tied to assignment/semester rhythm; seasonal silence ≠ churn — analyst should note context, avoid fake metric interpretation.

## Good and bad examples

**Bad recall**
“Are you still with us? 50% off!!!” — selling without reminding user value.

**Good recall**
“3 approvals are waiting for you” or “A draft proposal is ready for the client you added yesterday.” If such data isn’t in the corpus, don’t make it up; note “missing personal trigger.”

**Bad streak**
Badges burn if you don’t log in; no value.

**Good loop**
The nature of the work is repetitive (daily ticket, weekly invoice); product fits that rhythm.

**Bad cancellation**
Hidden cancellation, mandatory 5-question guilt survey, must call by phone.

**Good cancellation**
Clear cancellation, short optional reason, export offer, “retain with discount” is non-manipulative and can be declined.

**Bad second session**
Same onboarding modal repeats; checklist reset.

**Good second session**
“Where you left off: draft invoice” + a CTA. Progress is persistent.

## FirstClick score impacts

- **clarity**: Clarity of status language and next task on return.
- **adoption**: Long-term usage; post-activation drop is attributed to adoption justification.
- **onboardingRisk**: Not a direct retention score, but weak onboarding kills retention — write by separating the causality chain.
- Trust: dark patterns and data lock-in. Friction: stale UI, spam.
- For week-1 focused reading, cross-reference [kb:15-week-one-retention].

## Action checklist

1. Extract the product’s natural repeat rhythm from the corpus (daily/weekly/event-based).
2. Look for what changes in the second session / what the next task is.
3. Note the tone and frequency cues of recall channels.
4. Evaluate the cancellation/export flow (if visible).
5. Check if there is a “next loop” for activated users.
6. Distinguish if notifications are value-based or sales-based.
7. Compare the “every day / team hub” promise with the actual usage loop.
8. Suggestion: personalize the trigger, cut spam, add a second session CTA — do not invent retention %.

## Attribution discipline

- Product loop and messages: [doc:…] / [web:…].
- Retention standard: [kb:63-retention]; week-1 [kb:15-week-one-retention].
- Notifications: [kb:35-notifications].
- “Benchmark retention %X” is made up; industry rate is made up.
- Link dark pattern claims to observed UI.

## Deep dive: retention vs engagement theater

Badges, leaderboards, and artificial streaks create habits in some consumer apps; in B2B work tools, they’re mostly noise. FirstClick does not automatically count gamification as good. The question: is the reward tied to the user’s work outcome or just to opening the app? If tied to work outcome, the retention justification is stronger.

When reading churn surveys: mandatory long surveys are friction; short optional reasons enable learning without harming trust. “Stay, we’ll give you 40%” isn’t manipulation for every persona, but risky for skeptical — describe how it’s presented.

Data accumulation creates stickiness (history, templates, team graph). But stickiness shouldn’t be ransom: if there’s no export, skeptical calls it “lock-in.” Analyst does not celebrate lock-in as retention success; trust score drops.

Silent periods: term break in education products, budget cycle in B2B. If there’s no seasonality in the corpus, don’t make it up. “User didn’t return = bad product” is a weak reason alone; first address activation quality and trigger absence.

## Analyst implementation note

Retention chunk: loop type, second session CTA, recall quality, dark pattern present/absent, persona, adoption/trust. Example: “skeptical, hidden cancellation + no export → trust↓; busy-professional spam summary → adoption↓.”

## Scenario lab: return

**A:** Same empty on day two. No reason to return. adoption↓.

**B:** Spam “we missed you” + discount. Skeptical trust↓.

**C:** Hidden cancellation. Dark pattern. trust↓.

**D:** No export. Lock-in. skeptical.

**E:** Daily approval broken on mobile. Busy-professional churn risk.

## Operational control
Natural rhythm, second session CTA, recall tone, cancellation/export, post-activation loop, notification value vs sales, gamification’s link to work.

## Decision framework: why open tomorrow?

Retention analysis boils down to one question: what is the in-product reason to open tomorrow? The reason could be a work queue (approvals), timed production (weekly invoice), social graph (team), accumulated asset (history/template), or an external rhythm-based reminder. If the only reason is push, it’s weak.

Second session design is a continuation of onboarding. If the user doesn’t see where they left off, progress loss is friction. Resetting the checklist or forcing a tour repeat is an anti-pattern.

Dark patterns create short retention, long trust loss. Hidden cancellation, forced phone call, fake “your account is being deleted” scare tactics cause trust↓ for skeptical and price-sensitive. FirstClick does not count these as retention success.

Notification quality: “3 tasks waiting” can be valuable; “we missed you 50% off” is sales. If notification text isn’t in the corpus, don’t invent campaigns. If there’s a notification center in the UI, read the tone from there ([kb:35-notifications]).

Tie gamification to work outcome. Login streak is usually noise in B2B; completed work streak may be more meaningful — again, depends on product context. No automatic praise.

## Combined reading: retention × notification × week-1

The week-1 experience is covered in a separate short note ([kb:15-week-one-retention]); this file is for the general loop and trust framework. Notification spam leads to delayed abandonment ([kb:35-notifications]). Analyst does not recommend “more notifications”; recommends “more justified triggers.”

Activation quality sets the ceiling for retention. Weak aha with a strong streak system is empty. Conversely, after a strong aha, a stale second session lowers the ceiling. Write the chain openly.

Cancellation and export are trust tests. Don’t celebrate lock-in as stickiness. Skeptical persona codes the product as a “trap” at this point; trust↓, adoption is harmed in the long run.

## Analyst glossary: second session test

Imaginary second session script: User returns after 48 hours. What do they see? (a) where they left off, (b) new pending task, (c) same empty, (d) forced tour repeat, (e) sales modal. a/b are positive; c/d/e are negative classes. If the corpus isn’t interactive, deduce which class is likely from screenshots and text; don’t claim “after 48 hours X happens” with certainty. If there’s recall text, compare with class e. Dark pattern cancellation is a separate trust finding; not counted as retention success.

## Closing note (RAG)

This section is also meaningful as an independent chunk: The FirstClick analyst combines the topic with product corpus quotes, does not present heuristics as statistics, ties persona reactions to concrete UI text, maintains clarity / adoption / onboardingRisk / trust distinctions in score justification, and does not suggest made-up features. If evidence is missing, says “not seen in corpus.”
In the retention chunk, the second session justification and dark pattern distinction must be clear.

## Action recipes (retention)

**Recipe 1 — Tomorrow’s reason:** Search the corpus for an answer to “What is the in-product reason to open tomorrow?”: work queue, timed production, social graph, accumulated asset. If the only reason is push, note weak retention design.

**Recipe 2 — Second session CTA:** On return, “where you left off” + single CTA. Checklist reset or forced tour repeat is an anti-pattern; don’t confuse with onboardingRisk — separate the causality chain.

**Recipe 3 — Recall quality:** “3 approvals waiting” can be valuable; “we missed you 50%” is sales. If there’s no mail/notification in the corpus, don’t invent campaigns. Read tone from UI notification center ([kb:35-notifications]).

**Recipe 4 — Cancellation and export:** Hidden cancellation, forced phone call, fake deletion scare = dark pattern → trust↓; not counted as retention success. If there’s no export, note skeptical lock-in.

**Recipe 5 — Post-activation loop:** Talking retention for non-activated users is premature ([kb:62-activation]). First aha, then repeat rhythm.

## Edge cases

- **Seasonal silence:** Education/term break; don’t label as churn. If there’s no seasonality in the corpus, don’t make it up.
- **Gamification in B2B:** Login streak is usually noise; reward tied to work outcome may be more meaningful — write according to context.
- **Data accumulation vs ransom:** History creates stickiness; if no export, trust↓.
- **Stale dashboard:** Same empty/numbers on return — “nothing has changed” feeling.
- **Broken daily task on mobile:** If approval queue isn’t on mobile, busy-professional doesn’t return ([kb:57-mobile-ux]).
- **Retention via discount:** “Stay, get a discount” isn’t manipulation for every persona; risky for skeptical — describe the presentation.

## Persona-specific comment template

“For [Persona], repeat reason is [work queue|none|push only]; recall is [valuable|sales|spam]; cancellation/export is [healthy|dark|locked]; score is [adoption|trust|clarity]; suggestion is [personal trigger|cut spam|second session CTA].”

Busy-professional risks uninstall with noisy notifications. Non-technical wants “where to continue?” on return. Skeptical sees trust↓ with dark patterns and exaggerated longing language. Price-sensitive churns with surprise renewal fees. Student: don’t label seasonal silence as churn.

## Analyst checklist (extended)

1. Extract the natural repeat rhythm from the corpus.
2. Is there changed info / next task in the second session?
3. Recall tone and frequency cues.
4. Cancellation and export flow (if visible).
5. Post-activation “next loop” design.
6. Notification: value or sales?
7. Promise “every day / team hub” ↔ actual loop.
8. Is gamification tied to work outcome or just app opening?
9. Link dark pattern claim to UI quote.
10. Benchmark retention % is made up; cross-reference [kb:15-week-one-retention] for week-1.
