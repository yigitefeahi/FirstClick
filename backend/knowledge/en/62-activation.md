# Activation: Aha Moment and Value Event

Activation is the moment when the user experiences the value promised by the product for the first time. FirstClick does not confuse activation with “signed up”; signup ≠ activation. This file is the activation evaluation standard. [kb:62-activation]

## Scope

Scope: definition of the activation event, time-to-value, aha moment design, acceleration with templates/sample data, the effect of invite on activation, paywall positioning before/after activation, and metric language. Out of scope: onboarding UI mechanics ([kb:61-onboarding]), weekly retention ([kb:63-retention]), experiment design ([kb:27-experimentation-ab]), raw analytics instrumentation ([kb:65-product-analytics]).

Heuristic: The activation event should be expressible in the same sentence as the product promise. “First sprint board created,” “first invoice PDF downloaded,” “first candidate messaged.” Vague “engaged user” definitions mislead analysts.

## Diagnostic Signals

1. **Activation undefined**: Product says “start using” but the success event is unclear; analyst cannot extract it from the corpus.
2. **Aha delay**: Value comes in week 2; first session is just setup. onboardingRisk + weak adoption.
3. **Paywall before**: Locked before seeing value. Price-sensitive and skeptical users churn.
4. **Team required**: Single user cannot reach aha; invite is mandatory ([kb:43-invite-loops]).
5. **Empty success**: “Congratulations!” but no result on screen; theater.
6. **Wrong aha**: Completing profile counts as activation, but the promise is “report.”
7. **No template**: First-timer must build from scratch; time-to-value increases.
8. **Integration gate**: Value only after connecting an external system; early requirement.
9. **Promise–event drift**: Landing says “report in 2 minutes” but requires 20 fields + approval.
10. **No aha on mobile**: Activation only possible on desktop.

Positive signals: clear activation event, template, sample output, paywall rises softly after value, single-user path, checklist tied to aha, real artifact at success (chart, PDF, sent invite).

## Persona Reactions

- **busy-professional**: “What did I gain?” wants tangible output. Duration must be short. Micro ROI signal.
- **non-technical**: Magical but understandable result; technical setup should not precede aha.
- **skeptical**: Wants to clearly see that the sample output is not a “fake demo” or, if so, that it is labeled as such. Proven aha.
- **price-sensitive**: Aha must be possible on the free plan; otherwise, it’s bait. Upgrade after limit.
- **student / first-timer**: Template and guided first success. Feeling abandoned leads to churn.

## Good and Bad Examples

**Bad**
Activation = email verification + theme selection. Product promise is “reduce customer support time.”

**Good**
Activation = sending the first support reply template or marking the first ticket as resolved. Checklist is tied to this.

**Bad paywall**
“Upgrade to Pro” before the first chart is created.

**Good paywall**
First chart is created; export or 4th project is paid. Value has been seen.

**Bad invite requirement**
“You can’t continue without a team.” Those who want to try solo will leave.

**Good**
There is a single-user aha; invite is secondary (“progress faster”).

**Bad template**
Empty form + “write whatever you want.”

**Good template**
Select industry/purpose → filled sample → edit → save (activation).

## FirstClick Score Effects

- **clarity**: Does the user understand “what is success?” Unclear aha means clarity↓.
- **adoption**: Activation is the heart of adoption. If the event is missing/late/locked, adoption↓.
- **onboardingRisk**: If the path to activation is blocked, risk↑.
- Connection to retention: talking about retention is premature for non-activated users ([kb:63-retention]).
- In the score rationale, write the activation event in product language; don’t just say “engagement.”

## Action Checklist

1. Take the promise sentence from the corpus; fit the activation event into the same sentence — if it doesn’t fit, note drift.
2. List the number of steps to first success.
3. Check if there is a template/sample data.
4. Mark whether the paywall is before or after the aha.
5. Check if invite is required.
6. Note if the same aha is possible on mobile.
7. Match checklist items to activation; flag irrelevant ones.
8. Recommendation: clarify the event, defer the barrier, add a template — don’t make up metrics.

## Attribution Discipline

- Promise and UI: [doc:…] / [web:…].
- Activation standard: [kb:62-activation]; metric notes [kb:41-activation-metrics].
- Onboarding bridge: [kb:61-onboarding].
- “Activation rate is %X in the industry” is made up.
- Don’t present heuristic time-to-value durations as measurements.

## Deep Practice: Activation Quality

The “gamer” version of activation is dangerous: badge, streak, forced sharing. These may help retention in some products, but FirstClick first asks for alignment with the promise. Student persona may like badges; skeptical may call it “gamification mask.” Write the context.

In multi-sided marketplaces, activation differs by side ([kb:07-marketplace-two-sided]): for buyers, first purchase/contact; for sellers, first listing. Don’t flatten both sides with a single definition. Analyst should specify which side’s flow is seen in the corpus.

In B2B, activation may fall between individual aha and team aha. If the individual sees value but waits for admin approval, write “activation gate: admin” on the timeline. If SSO requirement delays aha ([kb:08-b2b-buying]), clearly separate friction: purchasing friction vs product aha friction.

Next step at the moment of success: excessive upsell (paywall) or excessive request (NPS/invite) spoils the aha. Heuristic: show the artifact first, then a single soft next step.

## Analyst Practice Note

Activation chunk: promise quote, suggested/observed activation event, barrier (paywall|invite|integration|form), persona, adoption/onboardingRisk. Example: “price-sensitive, card wall before aha → adoption↓ onboardingRisk↑; recommendation: show value first.”

## Scenario Lab: Aha Barriers

**A:** Paywall before chart. Price-sensitive. adoption↓.

**B:** Invite required. No single-user aha. onboardingRisk↑.

**C:** Activation = avatar upload. Promise is report. Drift.

**D:** No template; 20 fields. First-timer.

**E:** Congrats modal, no artifact. Theater. skeptical.

## Operational Control

Promise–event alignment, number of steps, template, paywall position, invite requirement, mobile aha, checklist matching, success artifact.

## Decision Framework: Sentence the Activation

If the activation definition cannot be expressed in a single sentence, both the product team and users are unclear. Template: “For [persona], activation occurs when [artifact/result] is produced; because the promise [quote] says so.” If this sentence cannot be formed, there is drift.

Classify barriers: structural (feature missing), sequencing (paywall early), social (invite required), cognitive (no template), technical (error/performance). Each class produces a different recommendation. “Better onboarding” is a weak generic RAG chunk.

Separate aha theater from real aha. Confetti + “great” but no result on screen is theater. PDF downloaded, chart created, message sent = artifact. If there is no artifact, the adoption rationale is weak.

In multi-sided products, don’t write activation without specifying the side. Imposing buyer’s aha on seller gives wrong score. In B2B, separate individual aha from account-level aha: user saw value but admin lock exists, write the gate on the timeline.

Paywall after value is sometimes legitimate (costly AI operation). FirstClick does not automatically say “paywall is bad”; it asks “is it before value is seen?” Separate soft upgrade after value from hard wall before value.

## Unified Reading: activation × paywall × invite × retention

If activation does not come before paywall, price-sensitive adoption drops ([kb:42-paywall], [kb:12-freemium-and-trial]). Invite requirement leaves users alone before two-sided stickiness is created ([kb:43-invite-loops]). Talking about retention is premature for non-activated users ([kb:63-retention]) — write the causality chain in this order.

Connection to metrics file: if the team counts “login” as activation, alignment is broken ([kb:65-product-analytics], [kb:41-activation-metrics]). Analyst derives the correct event from the product promise and looks for its counterpart in the corpus; if not found, says “undefined.”

NPS/invite request at the moment of success can interrupt the aha. Heuristic: show the artifact, offer a single soft next step, postpone measurement theater.

## Analyst Glossary: Activation Sentence Bank

Good diagnostic examples (adapted by product type, copy-paste is not real): “First invoice PDF downloaded.” “First support reply sent.” “First project board created and a card added.” “First candidate message sent.” Bad diagnostic examples: “User engaged.” “Setup completed.” “Logged in.” “Profile completed.” When the analyst sees a bad diagnosis, they write its contradiction with the promise. When describing the barrier, use the template “user could not reach activation because [paywall|invite|no template|error|form].”

## Closing Note (RAG)

This section is also meaningful as an independent chunk: The FirstClick analyst combines the topic with a product corpus quote, does not present heuristics as statistics, ties persona reaction to concrete UI copy, maintains clarity / adoption / onboardingRisk / trust distinctions in the score rationale, and does not suggest made-up features. If evidence is missing, says “not seen in corpus.”
In the activation chunk, the promise sentence and event definition should stand side by side.

## Closing Note (RAG)

This section is also meaningful as an independent chunk: The FirstClick analyst does not confuse activation with signup; aligns the promise sentence with the event definition, names the barrier (paywall, invite, lack of template, error), ties persona reaction to artifact presence, and does not present heuristic durations as measurements. If there is no aha in the corpus, says “activation event could not be defined”; does not write made-up metrics.

Persona reminder: busy-professional wants duration and output; non-technical wants status copy; skeptical wants promise-honesty; price-sensitive reacts to lock/early sale; first-timer looks for the next clear step. Ground the finding in one of these reactions.

## Action Recipes (Activation)

**Recipe 1 — Sentence the Event:** Template: “For [persona], activation occurs when [artifact] is produced; because the promise [quote] says so.” If the sentence cannot be formed, drift finding is mandatory. Reject “engaged user” language.

**Recipe 2 — Classify the Barrier:** Structural (feature missing), sequencing (paywall early), social (invite required), cognitive (no template), technical (error/slow). Write recommendations by class; “better onboarding” is a weak generic chunk.

**Recipe 3 — Paywall Position:** If there is a lock before the value artifact is seen, adoption↓ for price-sensitive + skeptical. Separate soft upgrade after value from early hard wall. Costly operation paywall is not automatically bad — the question is “is it before value is seen?”

**Recipe 4 — Template Acceleration:** If first-timer must build from scratch, time-to-value increases. Recommend industry/purpose → filled sample → edit → save path; don’t make up new industry packs.

**Recipe 5 — Success Moment Discipline:** Show the artifact, then a single soft next step. Simultaneous paywall + NPS + forced invite = spoils the aha theater.

## Edge Cases

- **Marketplace two sides:** Buyer and seller activation are different ([kb:07-marketplace-two-sided]); don’t score without specifying the side.
- **B2B individual vs account:** User saw aha, waiting for admin/SSO — write “activation gate: admin” on the timeline.
- **Wrong aha:** Completing profile/theme/avatar is not activation if the promise is “report.”
- **No aha on mobile:** If activation is only possible on desktop, busy-professional mobile usage drops during the week.
- **Empty congratulations:** Confetti, but no PDF/chart/message — theater; skeptical trust risk.
- **Invite requirement:** No single-user path means onboardingRisk↑ ([kb:43-invite-loops]).

## Persona-Specific Comment Template

“Promise [quote]; observed/suggested event […]; barrier [class]; effect for [persona] [adoption/onboardingRisk]; recommendation [defer|template|single-user path|show artifact].”

Busy-professional wants tangible output and short duration. Non-technical wants understandable result before setup. Skeptical wants clear distinction between sample and real, and proven aha. Price-sensitive wants aha on free plan; otherwise, it’s bait. Student/first-timer wants template and guided first success.

## Analyst Checklist (Extended)

1. Quote the promise sentence; fit the activation event into the same sentence.
2. List the number of steps to first success.
3. Is there a template/sample output?
4. Is the paywall before or after aha?
5. Is invite required; is there a single-user aha?
6. Is the same aha possible on mobile?
7. Do checklist items match activation?
8. Is there a real artifact at the moment of success?
9. If multi-sided product, specify the side.
10. In B2B, separate admin/SSO gate from product aha.
11. Recommendation: clarify the event, defer the barrier, template — don’t make up “industry activation rate is %X.”
12. Don’t present heuristic durations as measured TTV.
