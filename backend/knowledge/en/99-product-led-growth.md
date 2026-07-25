# Product-Led Growth (PLG): The Product as a Sales Channel

When a FirstClick analyst evaluates product-led growth, they ask: can the user discover value and expand their team or workflow through self-serve paths in the corpus, without a sales conversation? This document is the standard framework for PLG evaluation in the FirstClick knowledge base. [kb:99-product-led-growth]

## Scope

This file covers: self-serve activation, viral/collaboration loops (invite, share, co-working), in-product expansion (seat, workspace), usage-based upgrade signals, and hybrid models where sales does not suffocate PLG. Out of scope: pure sales-led B2B (see [kb:100-sales-led-b2b]), paywall moment details (see [kb:98-paywalls]), notification tactics (see [kb:107-notifications]). PLG is the hypothesis that “the product experience drives growth”; not every SaaS must be PLG — the analyst should not mislabel the model.

Heuristic: The essence of a PLG signal is that the initial value is delivered self-serve, and there is a natural “invite someone/another use case” step within the product. This is not a claim of a viral coefficient.

## Diagnostic Signals

1. **Mandatory demo gate**: “Get started” is actually a calendar link; the product cannot be tried.
2. **Invite locked**: Collaboration is promised but inviting is only on paid plans; viral loop is broken.
3. **Empty activation**: There is self-serve signup but no empty state guidance; user doesn’t know what to do.
4. **Early sales barrier**: A feature cannot be unlocked without a mandatory “success manager” call by day 3.
5. **Sharing friction**: No public link/guest access; every collaborator requires a full seat and payment.
6. **Expansion blind spot**: Usage increases but there is no “ready for team” upgrade path in-product; only outbound sales.
7. **Role confusion**: End-user creates value, admin buys — if there’s no path for both in PLG, expansion stalls.
8. **Mobile/self-serve contradiction**: Mobile only says “contact sales”; desktop is self-serve — inconsistent growth surface.

Positive signals: cardless or low-friction start, shortcut to first value, invite/share is free or fairly limited, usage limits are transparently tied to upgrade, optional (not mandatory) demo, language aligns with “try now”.

## User Objections

- **“Why can’t I use it without talking to someone?”** Sales-gated PLG promise.
- **“I can’t see the value without inviting my team.”** Viral feature is locked.
- **“Is this an individual tool or a team tool?”** Positioning is unclear.
- **“Do I have to wait for sales to grow?”** If expansion isn’t self-serve, SMBs object.
- **“Does the link I shared throw the recipient into a paywall?”** Negative viral experience.

## Persona Reactions

- **busy-professional**: Has low tolerance for waiting for a demo. Wants self-serve aha + optional help later.
- **non-technical**: PLG jargon (“PQLs”, “viral loop”) should not appear in the UI; “Invite”, “Share” is enough.
- **skeptical**: “The product sells itself” claim contradicts a mandatory sales call.
- **price-sensitive**: Growth cost per seat should be transparent; surprise mandatory upgrades poison PLG.
- **student / first-timer**: Low-barrier Free + shareable output (link, export) is a growth surface.

## Good and Bad Examples

**Bad — Fake PLG**  
Landing says “get started in minutes”. CTA → form → “we’ll call you”. No product access.

**Good — Self-serve core**  
Signup → sample data or template → first output → “invite a teammate (2 invites Free)”. Demo is optional in the menu.

**Bad — Collaboration trap**  
Invited user is asked for a credit card upon signup. Inviter feels embarrassed; loop dies.

**Good — Fair guest path**  
Guest viewing or limited editing is free; upgrade to regular seat is transparent.

**Bad — Sales-only expansion**  
When usage cap is reached, “your account manager will contact you”. No self-serve billing.

**Good — In-product expansion**  
“80% of your limit used — compare plans or add seat” + self-serve checkout.

## FirstClick Score Impacts

- **adoption**: If there’s no self-serve value path, adoption↓ under PLG claim.
- **onboardingRisk**: Mandatory sales gate + empty state is high risk.
- **clarity**: If individual vs team path is mixed, clarity↓.
- **trust**: Bad paywall experience for invitee lowers trust (via inviter).
- Timeline: Write the “PLG claim vs sales gate” contradiction with citation.

## Action Checklist

1. Quote the growth promise on the landing (self-serve or demo).
2. Count steps from signup to first value; check for mandatory sales.
3. Extract invite/share limits and paid locks.
4. Check if expansion is self-serve.
5. Separate end-user vs buyer paths.
6. Add persona objection.
7. If hybrid model, mark “optional sales” as positive; mandatory sales as negative.
8. Write a one-sentence recommendation.

## Deep Diagnostic Scenarios

**Scenario A — Hybrid blindness.** Product promises usage signals will go to sales; no process or “in-product upgrade” in corpus. Write the contradiction.

**Scenario B — Negative viral.** Shared link throws recipient into card request or heavy signup. Inviter feels embarrassed.

**Scenario C — Activation dead end.** Self-serve signup → empty dashboard → no path. PLG dies with empty state.

**Scenario D — Seat bomb.** Marketing says “unlimited team”; every viewer is a seat. Sticker shock.

**Scenario E — Mobile asymmetry.** Mobile is just a marketing shell; real work is on desktop. FirstImpression is broken.

**Scenario F — Admin ceiling.** End-user creates value; upgrade is only for org admin + sales. If expansion path is unclear, SMB PLG suffocates.

## PLG vs Sales-led Decision Grid

The analyst does not forcefully declare a product PLG. Grid: (1) Is self-serve first value possible, (2) Is there a natural share/invite, (3) Does expansion complete in-product, (4) Is sales a mandatory gate or optional? 1–3 yes and 4 optional → PLG compatible. 1 no and demo mandatory → sales-led (see [kb:100-sales-led-b2b]); this is not failure, promise alignment matters. Write the grid openly in the score rationale.

## Expansion Reading

In PLG, expansion can be seat, usage package, or new workspace. If the corpus shows a limit warning leading to self-serve checkout, it’s positive. If it’s only “your account manager will contact you”, it’s sales-led expansion — friction in the SMB segment. For price-sensitive users, unit economics transparency (per person / per credit) is essential; do not make up CAC/LTV.

## Common Analyst Mistakes

1. The absolute “If there’s a demo, it’s not PLG”.
2. Thinking the viral loop is only referrals.
3. Claiming PLG is impossible without freemium.
4. Making up k-factor or growth percentages.
5. Mislabeling two-sided marketplace friction as PLG.

## RAG Independent Chunk Note

Chunk questions: is there a self-serve aha; is invite/share fair; is expansion sales-only; is there a promise–gate contradiction? Keep terms self-serve, invite, expansion, demo gate.

## Turkey and Language Notes

In the Turkish SMB segment, “contact sales” culture is common; this alone does not disqualify PLG. The real question: is there a mandatory human gate before value is created in-product? Lack of local payment can suffocate expansion — cross-check with procurement. Invite texts being in Turkish affects the viral loop.

## Activation Event Selection

In PLG, activation is not “signup complete”. Choose the first output tied to the promise: first share, first invoice, first team join. If the event cannot be done for free or in trial, the PLG promise is weak. Do not write metric percentages.

## Collaboration Surface and Buyer Distinction

Add guest access, read-only link, invite limit, and invitee’s first screen to the checklist. End-user activation can come before buyer purchase; if buyer lacks a security/price surface, expansion stalls.

## FirstClick Report Paragraph

When writing the PLG finding in the report, use this paragraph skeleton: “The product promises self-serve growth with [quoted promise]. In the corpus, the [invite/share/checkout] surface is [present/absent/locked]. For [persona], this creates [type of friction] because [reason]. Recommendation: [one sentence]. Score rationale: adoption/onboardingRisk — PLG disconnect; no made-up viral coefficient.” Even if the paragraph comes from a single RAG chunk, it should carry the topic terms.

## Negative Loop Inventory

Invitee is asked for a card; public link gives 404; shared file embarrasses due to watermark; seat surprise locks workspace. Each is a separate finding line. If inventory is empty, writing “I did not see a negative viral signal” is also valid — you don’t have to count absence as positive, just don’t exaggerate.

## Citation Discipline

- Product flows: [doc:…] / [web:…].
- [kb:99-product-led-growth]; sales model: [kb:100-sales-led-b2b]; trial: [kb:97-free-trial-freemium]; if searching for invite context contradiction, cite.
- Do not make up viral “%X growth” statistics.

## Analyst Implementation Note

Template: “[Persona] sees the PLG promise ‘[quote]’ but due to [demo gate|invite lock|expansion sales-only] experiences [friction]. Recommendation: [self-serve aha + fair sharing]. Score: adoption↓ / onboardingRisk↑ rationale is PLG disconnect.” In RAG, use self-serve, invite, expansion, and non-jargon equivalents for PQL.
