# Notifications: Attention Tax and the Permission Economy

When evaluating notifications, the FirstClick analyst asks: are push, email, SMS, and in-product alerts timely, relevant, and controllable for the user—or are they permission abuse and noise? This document is the standard framework for notifications assessment in the FirstClick knowledge base. [kb:107-notifications]

## Scope

This file covers: timing of permission requests (permission priming), notification types and priority, channel selection, grouping/muting, marketing vs transactional distinction, and signs of fatigue. Out of scope: lifecycle campaign strategy (see [kb:106-lifecycle-messaging]), notification copy A/B experimentation (see [kb:108-ab-experimentation]). Notification demands “attention now”; lifecycle builds “narrative at this stage”.

Heuristic: A good notification conveys an event that the user would be harmed by missing or would gain clear benefit from. This is not a CTR claim.

## Diagnostic Signals

1. **Early permission bomb**: System push prompt on the first screen; “Allow” before any value is shown.
2. **Transactional masked as marketing**: “Account notification” is actually a discount.
3. **No prioritization**: Every event gets a red badge; important ones get lost.
4. **No control panel**: No type-based opt-out; all or nothing.
5. **Multi-channel at once**: Push + email + in-app with the same content.
6. **Broken deep link**: Notification opens wrong page or triggers login loop.
7. **No quiet hours**: Marketing push at night.
8. **Badge prison**: Unread count inflates, cannot be cleared.

Positive signals: pre-permission explanation (“for order status”), conservative defaults, preference center, grouped summary, transactional mandatory / marketing opt-in distinction, working deep link.

## User Objections

- **“It asks for notifications before I’ve done anything.”**
- **“Was this really important?”**
- **“How do I turn this off?”**
- **“I saw the same thing in both email and push.”**
- **“Why at midnight?”**

## Persona Reactions

- **busy-professional**: Wants high signal/noise ratio; summary email > instant spam.
- **non-technical**: If the permission dialog is intimidating, will hit “Don’t Allow”; then misses critical alerts.
- **skeptical**: Masked marketing lowers trust; permission abuse codes the product as “manipulative”.
- **price-sensitive**: Constant upsell notifications make the product feel like an ad.
- **student / first-timer**: In-app tutorial tip is helpful; don’t ask for system push too early.

## Good and Bad Examples

**Bad — instant OS prompt**  
System dialog right after splash. If denied, can’t be explained again (platform limitation—analyst notes this qualitatively).

**Good — priming**  
First, an in-product card: “Would you like push notifications for shipping updates?” → If yes, then OS prompt.

**Bad — everything is urgent**  
Likes, marketing, billing, security all use the same style.

**Good — layers**  
Security/payment: high priority. Social: summarized. Marketing: opt-in + quiet hours.

**Bad — unclosable upsell badge**  
Permanent red 1; content is “Upgrade to Pro”.

**Good — preference**  
Separate toggles for “Product tips / marketing / team activity”.

## FirstClick Score Impacts

- **trust**: Permission abuse and masked marketing lower trust.
- **clarity**: If notification language and deep link are unclear, clarity drops.
- **adoption**: Early prompt rejection can cause users to miss critical alerts later, indirectly hurting adoption.
- **onboardingRisk**: First session permission bomb + noise increases risk.
- Timeline: “permission timing”, “channel spam”, “preference gap”.

Heuristic: Don’t claim “enabling push increases retention” with a percentage.

## Action Checklist

1. Identify the moment when permission is requested from the corpus.
2. Categorize notification examples by type (transactional/marketing/social).
3. Check if there is a preference center.
4. Verify the deep link target.
5. Note multi-channel duplication.
6. Write a persona objection.
7. Draw the line with lifecycle: is it instant or a campaign?
8. Single sentence recommendation: priming + conservative default.

## Deep Diagnostic Scenarios

**Scenario A — Double prompt.** Web push + mobile push + email permission requested sequentially in the first session. Increases likelihood of rejection (don’t make up percentages; friction pattern).

**Scenario B — Badge lie.** Shows 3 unread; when opened, they’re marketing cards. Trust drops.

**Scenario C — Deep link login loop.** Notification → auth → lost context → user forgets the task.

**Scenario D — Quiet hour violation.** Nighttime marketing; not transactional. Triggers anger in skeptical and busy-professional personas.

**Scenario E — Forced marketing.** Account-required emails and campaigns share the same opt-out—user thinks transactional will also be cut off if they opt out.

**Scenario F — Team noise.** Every comment/assignment triggers instant push; no summary. Fatigue → user disables all notifications.

## The Permission Economy

Permission is a one-time OS dialog capital. If spent before value is shown, the critical transactional channel may be lost. The priming card explains this capital. FirstClick raises onboardingRisk justification for early permission bombs. Don’t explain platform differences (iOS/Android/web) with made-up constraints; write the general principle.

## Priority Layers

1. Security and payments — high.
2. User-expected business outcome (shipping, approval) — high/medium.
3. Collaboration activity — medium, can be summarized.
4. Product tips — low, in-app preference.
5. Marketing — opt-in.
Layers are heuristic; each product’s mapping is based on the corpus.

## Common Analyst Mistakes

1. Recommending disabling all notifications—transactional ones are necessary.
2. Automatically counting lack of push as a weakness.
3. Making up CTR uplift.
4. Burying lifecycle campaign findings under notification findings.
5. Treating OS dialog copy as product UI—keep them separate.

## RAG Independent Chunk Note

Chunk questions: is permission timing correct; are types separated; is there a preference; does deep link work? Keep terms: permission, push, badge, transactional, preference center.

## Turkey and Language Notes

Mobile permission and battery settings may lead to push being disabled—don’t make up rates; check if in-app summary is an alternative. If marketing SMS is sent without consent, trust drops. Excessive abbreviation in Turkish harms clarity. Check if there is a quiet hour setting.

## Audit Protocol and Transactional Definition

Categorize examples by type; ask about channel, priority, deep link, and dismissibility. Transactional: OTP, invoice, security. Marketing: plan sales and campaigns. Gray area (tips) should be off by default or managed by preference.

## Digest Summarization

Daily or weekly digests for collaboration events reduce noise; don’t claim retention guarantee.

## FirstClick Report Paragraph

“Notification/permission moment [quote]. Priming [present/absent]. Type [transactional/marketing/gray]. Preference center [present/absent]. Deep link [working/broken]. Recommendation: [priming + conservative default]. Score: trust/onboardingRisk — notifications.”

## Post-Denial Recovery

If the user denies OS permission, the product must explain the critical transactional path via in-app or email. If there is no recovery, “permission loss = blind product” risk arises. Forcing the recovery UI to re-trigger the OS prompt is a bad pattern; show how to enable it from settings.

## Common Corpus Contradictions

OS push prompt appears on the first screen; no one has seen the product’s value. “Account notification” headline is used for plan sales push—masked marketing. Badge shows 5; when opened, three are upsell cards. Notification lands on homepage, not shipping page; context is lost. Preference center has a single toggle for “all notifications”; transactional and marketing cannot be separated. Campaign push is sent at night; no quiet hour setting. Analyst writes permission timing, type distinction, and deep link on separate lines. Recommendation: priming, conservative default, type-based preference, working deep link.

## Persona Objection Dialogues (Sample Language)

busy-professional: “Did this notification really need to come now?”  
skeptical: “Will you ask for one thing at permission, then show me sales later?”  
non-technical: “If I don’t press Allow, will I miss critical alerts?”  
price-sensitive: “Are badges always for upgrades?”  
student: “Why am I getting notifications at night?”  
Dialogues test the permission economy and type distinction. If the product can’t answer, trust and onboardingRisk justification is strengthened (no percentages).

## Short Analyst Summary

Notification evaluation is based on permission timing, type distinction, preference control, and deep link integrity. Early OS prompt, masked marketing, and inflated badge are classic weak signals. Transactional channel and campaign should not share the same opt-out. If there is no in-app recovery after denial, critical alert risk arises. Don’t make up CTR or retention uplift; recommend priming and conservative defaults.

Raise onboardingRisk justification for products that don’t explain in a sentence why they want notifications before asking for permission. A preference center that closes both transactional and marketing channels with the same switch is a trust breaker; recommend separating them.

If the deep link is broken, the notification’s value drops to zero; always check the target screen and login loop, don’t just look at text quality.

## Evidence/Attribution Discipline (Notifications Specific)

Notification findings are strengthened by concrete evidence of the permission request moment and notification example. The analyst does not say “they probably ask for permission early”; if the first session flow or screen is shown in the corpus [doc:…] / [web:…], they write it; if not, mark as “permission timing not observed”. Deep link target, badge behavior, and preference center toggles are quoted if possible. CTR, open, and retention numbers are only cited if open source in corpus; otherwise, the analyst only names the friction pattern (permission bomb, channel spam, no control). Platform constraints (like iOS single prompt) are written as general principles, not with made-up technical limits.

## Priority Misclassification Diagnosis

The most common root cause is blurring the transactional–marketing boundary and collapsing the priority layer. The analyst first categorizes each notification example by type (transactional/marketing/social/tip), then asks if it’s in the correct layer. If marketing is disguised as transactional (“account notification” is actually a campaign), this is a direct trust finding. If every event gets a red badge, “no prioritization” is signaled; critical security alerts get lost in social noise. Analyst writes the finding in layer language: “payment alert and ‘your friend liked’ have the same visual weight → signal/noise broken.”

## Persona-Based Commentary and Action Recipe

**busy-professional** wants high signal/noise ratio and summary; a team tool that pushes for every comment will drive them to disable all notifications (overcorrection risk). **non-technical** will hit “Don’t Allow” on a scary permission dialog, then miss critical alerts—priming is important for this reason. **skeptical** codes masked marketing as manipulation. Recipe: (1) identify the permission moment and preceding priming; (2) categorize examples by type; (3) check for type-based preference and quiet hours; (4) trace deep link end-to-end; (5) flag multi-channel duplication. Edge cases: **product without push** is not automatically weak, if in-app summary is an alternative it may be sufficient; **B2B collaboration tool** should default to “summary”, not individual push; **urgent/operational product** (alerting systems) can justify aggressive notifications, not judged by the same threshold.

## Attribution Discipline

- Notification copy: [doc:…] / [web:…].
- [kb:107-notifications]; lifecycle: [kb:106-lifecycle-messaging].
- Do not make up CTR/retention statistics.

## Analyst Application Note

Template: “[Persona] encounters ‘[quoted notification/permission]’; due to [early prompt|masked marketing|no control] experiences [trust↓|friction]. Recommendation: [priming + preference]. Score: trust↓ / onboardingRisk↑ justification notifications.” In RAG, keep the words permission, push, badge, transactional, preference center.
