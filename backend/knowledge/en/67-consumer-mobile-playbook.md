# Consumer Mobile App Sector Playbook

This file gains importance in FirstClick analysis when the sector package **consumer mobile** is selected. Sections repeat sector context within themselves for independent retrieval.

## Scope and Business Model Context

In consumer mobile products, revenue typically comes from advertising, subscriptions (IAP), freemium, or transaction commissions. Distribution occurs via App Store / Play Store listing, deep links, and push notifications. The first impression is a combination of the store screen + first launch (splash, permission, onboarding). Difference from B2B SaaS: there is no buying committee; decisions are individual and fast; attention span is short. Heuristic: if permission requests come before value, drop-off increases; if the paywall appears before value is seen, distrust arises. In FirstClick consumer mobile analysis, if the pitch says "simple and fast," look in the corpus for first session step count, permission timing, and offline/performance promise. Do not fabricate statistics; if store rating is not in the corpus, do not claim it.

## First Impression Questions (Consumer Mobile)

The analyst asks: (1) What does the app do — do the store subtitle and first screen speak the same language? (2) Is signup mandatory on the first screen, or is value shown first? (3) When are location/notification/contacts permissions requested? (4) Is the main CTA in the thumb zone? (5) Is the performance promise (fast, lightweight) consistent with the loading experience? (6) If there is a subscription, are price and cancellation path visible? First-timer and student personas want a jargon-free, visual guide; price-sensitive wants IAP transparency; skeptical wants to avoid fake social proof and excessive permissions. Exaggerated slogans like "Change your life" generate hype instead of clarity.

## Onboarding and Activation (Consumer Mobile)

Activation is usually the first successful core action: first saved content, first workout, first post, first list, first payment flow attempt. If the onboarding carousel has 5+ slides, busy users skip; valuable interaction is delayed. Good pattern: skippable short tour + single clear CTA in empty state + sample content. Bad pattern: mandatory account + email verification + profile photo + friend invite chain before value. Permission: deferring notification permission until after the aha moment is a common good practice (heuristic). For users coming via deep link, shortening onboarding supports adoption. In the FirstClick Onboarding timeline, note step count, presence of skip, and permission order.

## Price, Trust, and Compliance Warnings (Consumer Mobile)

For IAP and subscriptions, price, trial period, renewal, and cancellation language must comply with store rules and local consumer expectations. Saying "free" and immediately showing a soft-paywall creates distrust in price-sensitive and skeptical personas. KVKK: which data is requested and why must be explained in the permission dialog and privacy policy; extra care is needed for products aimed at children — do not make definitive legal judgments, flag incomplete disclosure as a risk signal. If there are transparency statements like Tracking / ATT, check for consistency. Fake discount countdowns and manipulative dark patterns suppress ethical and trust scores.

## Persona Reactions (Consumer Mobile)

Busy-professional: abandons at long carousels and mandatory social login. Price-sensitive: pressure for annual plan and hidden cancellation. Skeptical: inflated rating claims, stock testimonials. Non-technical: settings labyrinth and jargon. Student: ad frequency and "premium required" wall. First-timer: category ambiguity. In persona reactions, quote from store text, screenshot, and first screen copy. Do not fabricate claims like "90% of users..." from the persona voice if not in the corpus.

## Drop-off Timeline Patterns (Consumer Mobile)

Heuristic drop-off points: Store listing — unclear screenshot. First launch — splash + mandatory update. Permission — early notification/location. Signup — mandatory account. Onboarding — long tour. Paywall before aha. Silence after push opt-in rejection (retention risk). Performance — first frame delay can be marked as friction, not confusion. In the timeline, mobile-specific stages: Permission, Soft-paywall, Push. Do not write rates; write observed UI sequence.

## Evidence to Seek in Corpus (Consumer Mobile)

Store description, screenshot texts, onboarding slides, permission dialog copy, paywall screen, cancellation/subscription FAQ, privacy policy link, empty state CTA, tab bar labels, performance claims, age/eligibility indicators. Contradiction: "No account needed" vs mandatory signup; "We care about privacy" vs excessive permissions; "Start in 3 seconds" vs 7 steps. If no evidence, note as missing signal.

## FirstClick Score Effects (Consumer Mobile)

ClarityScore: consistency between store and first screen. AdoptionScore: number of steps before aha and skip. OnboardingRisk: increases with permission and mandatory account. Trust: IAP transparency, KVKK, manipulative paywall. If performance promise is broken, adoption and firstImpression are affected together. Link rationale with a quote.

## Action Checklist (Consumer Mobile)

1. Align store subtitle with first screen promise. 2. Show value before signup (if possible). 3. Move permission requests after aha and add justification sentence. 4. Reduce onboarding to fewer than 3 slides, add skip. 5. Place paywall after first value; make price/cancellation clear. 6. Put a single CTA in empty state. 7. Simplify KVKK/permission texts. 8. Remove dark pattern countdowns. 9. Check primary action in thumb-zone. 10. Lock FirstClick findings with screen quotes.

## Deep Diagnosis: Store Listing and In-App Consistency (Consumer Mobile)

In consumer mobile, the first impression often starts in the store listing. In the FirstClick corpus, store screenshot texts, subtitle, and in-app first screen should be read together. Contradiction examples: screenshot says "Start with one tap" but app requires a mandatory 6-step profile; subtitle says "free" but a soft-paywall appears in the first session. These contradictions affect both firstImpression and trust. If there is no store text, the analyst relies only on in-app evidence and notes "no store signal." If rating/download count is not in the corpus but exaggerated social proof claims come from product copy, skeptical toughQuestion is generated.

## Deep Diagnosis: Permission Architecture and Value Order (Consumer Mobile)

Requesting permission is a technical need; timing is a product decision. Heuristic order: first show core value, then explain the reason for permission in one sentence, then open the system dialog. If location permission is requested before the map feature is seen, non-technical and skeptical personas write distrust. If notification permission is requested before the aha moment, risk of rejection and subsequent silence increases (do not fabricate rates). If contacts access is requested early for "find friends," privacy concern rises. In the FirstClick timeline, keep Permission event separate; do not assume "user did not grant permission" — write UI sequence.

## Deep Diagnosis: Subscription and Soft-Paywall (Consumer Mobile)

In consumer mobile, freemium, trial, and lifetime packages may be mixed. Analyst asks: Can meaningful work be done in the free tier? At which action does the paywall appear? Is the price clear in local currency and period? Is the cancellation path explained in-app or only in the store? "If you don't cancel in 3 days, you will be charged" can be transparent; if hidden, it's a dark pattern. Price-sensitive persona objects if annual plan is preselected by default. Student persona experiences adoption drop under ad+paywall double pressure. Do not leave "thousands of premium members" claims without citation.

## Deep Diagnosis: Notification, Retention, and Fatigue (Consumer Mobile)

Although week-1 retention is critical for mobile, FirstClick does not fabricate numerical churn. In the corpus, look for push copy, email/SMS preferences, and quiet hours. If permission or rating modal appears at every launch, busy-professional experiences friction. "We miss you" spam without value promise erodes trust. After activation, if the user has performed the core action, the next meaningful action should be suggested. Analyst links retention suggestion to UI evidence.

## Good and Weak Example Patterns (Consumer Mobile)

Good: 2-slide tour with skip + sample feed. Weak: 8-slide mandatory tour. Good: "Enable notifications — for daily summary" with justification. Weak: push request at launch without reason. Good: free core action, then paywall. Weak: annual subscription immediately after splash. Good: error "Retry / Saved offline." Weak: generic "Something went wrong."

## Analyst Writing Template (Consumer Mobile)

"First screen '[quote]' requires signup; first-timer friction; onboardingRisk↑; add guest/demo path that shows value first." In store-app contradiction, put both quotes side by side.

## Additional Corpus Checklist and False Positives (Consumer Mobile)

False positive: automatically marking every permission request as "bad." Analyst reads context: if camera permission is justified right before QR feature, friction may be low. False negative: considering paywall only as a price page; modal soft-paywall is also a paywall. Additional signals to seek in corpus: age gate, parental gate, accessibility labels, tablet layout, widget/live activity promise, contradiction if widget is missing, dark mode promise. If there is an accessibility promise in FirstClick score but no a11y signal, add clarification note. "Viral growth" claim contradicts adoption promise if there is no invite UI. This section is for independent retrieval: in consumer mobile analysis, permission, paywall, and store consistency are considered together; statistics are not fabricated.

## Additional Expert Note 1

Despite the heuristic that session length is short in consumer mobile, FirstClick does not measure duration; it qualitatively notes step count and permission order. If rating modal appears at every launch, it is friction.

## Additional Expert Note 2

In apps with an offline promise, look for 'no connection' microcopy and local save signal in error states. If missing, there is a promise-UI gap.
