# B2B SaaS Sector Playbook

This file gains importance in FirstClick analysis when the sector package **B2B SaaS** is selected. Each section can be read as an independent RAG piece; sections carry the sector name and analysis context within themselves.

## Scope and Business Model Context

In B2B SaaS, value typically comes from subscriptions (seat, usage, or feature package). The buyer is not a single person: the champion tries the product, the economic buyer approves the budget, security/IT reviews the risk, and the end user handles daily tasks. In FirstClick B2B SaaS analysis, if the pitch says "for teams," the corpus is checked for self-serve onboarding, team invite, role permissions, and purchase path together. The business model can be PLG (product-led growth), sales-led, or hybrid; each model produces different first impression and activation expectations. Heuristic: If "Book a demo" is the only path, it contradicts the PLG promise; if only self-serve exists, lack of SSO/audit in an enterprise promise creates friction. This playbook does not claim numerical conversion rates; evidence must be quoted from the product corpus.

## First Impression Questions (B2B SaaS)

The FirstClick analyst asks the following questions in B2B SaaS landing and pitch copy: (1) For whom? Are role and company size clear? (2) What business outcome is promised — time savings, error reduction, revenue increase? (3) Is the setup claim ("in minutes") consistent with the UI/wizard? (4) Is pricing visible or only "contact us"? (5) Is there a trust signal (logo, case, security page)? (6) Is there a single CTA, or a demo + trial duality? The busy-professional persona wants ROI and time in the first 10 seconds; the skeptical persona wants evidence; the non-technical persona wants benefit language without jargon. A generic slogan like "AI-powered platform for modern teams" in the hero is likely to lower the clarityScore because category and outcome are unclear.

## Onboarding and Activation (B2B SaaS)

B2B SaaS activation is usually "the first valuable business output": first project, first integration, first report, first team invite, or first workflow. If the empty state shows a blank dashboard, the aha moment is delayed; onboardingRisk increases. Good pattern: workspace filled with sample data or templates, 3-step checklist, ability to postpone integration connection. Bad pattern: mandatory company card + tax number + 12-field form + SSO requirement on day one. In team products, the invite loop is part of activation; "single user onboarding" contradicts the "for teams" promise. In the FirstClick timeline, during the Onboarding stage, wizard length, empty state quality, and aha moment are written together. Name the activation event from the product corpus (e.g., "Create first board"); do not invent metrics.

## Pricing, Trust, and Compliance Warnings (B2B SaaS)

Pricing may be seat, usage, or feature-gated. The price-sensitive persona looks for limits and the "no card required" micro-assurance; hidden pricing raises skepticism. In the enterprise package, SSO, SCIM, audit log, DPA/KVKK text are expected; if security is promised but not present in the UI, trust friction occurs. For B2B SaaS in Turkey, KVKK disclosure, data processing location, and data deletion request path are sought in the corpus; if absent, trust score is heuristically suppressed, but no legal judgment is made. If trial duration and cancellation language are unclear, adoption drops. Unsupported claims like "ROI %X" violate citation discipline; if the case study lacks methodology, the skeptical persona generates toughQuestions.

## Persona Reactions (B2B SaaS)

Busy-professional: "How fast is the result?" — high friction with long demo forms and vague ROI language. Skeptical: logo wall and generic testimonials are not enough; wants metric-based case and security page. Price-sensitive: annual discount pressure and seat inflation trigger objections. Non-technical: confusion with jargon like "orchestration / synergy." Student/first-timer is rarely the primary buyer in B2B SaaS; if the pitch uses student language, note a target audience mismatch. Enterprise champion: wants self-serve + "security summary for IT" together. Economic buyer: if there is no pricing table and ROI framework, purchasing questions increase. In FirstClick persona reactions, quoting from the product corpus is mandatory; general industry clichés are not sufficient.

## Drop-off Timeline Patterns (B2B SaaS)

Typical B2B SaaS drop-off points (heuristic, do not invent rates): Landing — unclear hero or multiple CTAs. Signup — mandatory demo or long form. Onboarding — empty workspace, mandatory integration. Invite — if team invite is postponed, week-1 silence. Paywall — critical feature locked before trial ends. Security review — if no SSO, sales cycle lengthens (record as a separate event in the timeline). In FirstClick timeline events, write the stage name (Landing / Signup / Onboarding / Invite / Paywall / Security) and the type of friction (confusion, friction, distrust). "7 days of silence" can be noted as an early churn signal; do not give percentages.

## Evidence to Seek in the Corpus (B2B SaaS)

Text/UI signals to look for: hero value statement; CTA text (trial / demo); pricing page or "contact sales"; seat/usage language; SSO, SAML, audit log, role; KVKK/privacy links; case study titles; integration list; empty state / checklist copy; invite UI; trial duration; DPA. Examples of contradictions: "Setup in 2 minutes" vs 8-step wizard; "self-serve" vs only Calendly; "secure" vs no security page. If there is no evidence, apply the [kb] general rule + note "not found in corpus"; fabricated quotes are prohibited.

## FirstClick Score Effects (B2B SaaS)

ClarityScore: sensitive to clarity of category + outcome statement. AdoptionScore: sensitive to self-serve path, speed to aha, invite, and fair paywall. OnboardingRisk: increases with empty dashboard, mandatory integration, long form. Trust: suppressed if security/KVKK/case evidence is weak. Promise-UI contradiction can lower both clarity and adoption. In score justification, always use a corpus quote or "missing signal" statement; do not invent industry averages.

## Action Checklist (B2B SaaS)

1. Reduce the hero to a single outcome sentence; add role + company size.
2. Separate trial and demo paths in visual hierarchy.
3. Place a template or sample data in the empty state.
4. Define the activation event and link it to the checklist.
5. Place the invite within the first 24 hours of onboarding (if the product is for teams).
6. Make pricing/limits visible or write the "why sales" justification.
7. Place a security summary + KVKK link in the footer and next to pricing.
8. Remove unsupported ROI percentages or link them to methodology.
9. Verify SSO/audit promises with UI or docs.
10. In the FirstClick report, lock every finding with a quote.

## Deep Diagnosis: PLG and Sales-led Tension (B2B SaaS)

Even if the growth model is not explicitly stated in the B2B SaaS corpus, CTAs reveal the model. If only "Book a demo" exists, the product is assumed sales-led; if only "Try for free" exists, PLG is assumed; if both exist, it's hybrid. In hybrid, visual hierarchy is critical: which is the primary CTA? The FirstClick analyst looks for contradictions: if the pitch says "self-serve" but there is no pricing page and a form is required, adoptionScore is suppressed. Conversely, if the pitch says "enterprise-grade" but there are no signals for security, SSO, SLA, and role management, the skeptical persona generates distrust. Diagnostic questions: Who buys? Who uses? Is IT needed for first value? If not, why is SSO mandatory on day one? If yes, why does the trial promise imply IT-free setup? Write this tension in the timeline at the "Signup" or "Security" stage; do not give percentages.

## Deep Diagnosis: Activation Definition and Empty State (B2B SaaS)

The activation event varies by product type: in a collaboration tool, first share or comment; in analytics, first dashboard; in integration products, first sync; in documentation/AI assistant, first successful response. If there is no activation definition in the corpus, the analyst suggests a heuristic but does not say "industry average is X." If the empty state text ends with "No data yet" and there is no next step, onboardingRisk increases. Strong empty state: what it is, why it matters, single CTA, optional "load sample data." Weak empty state: decorative illustration + "Coming soon." In team products, an empty state tailored only to a single user contradicts the "team productivity" promise; Invite CTA should be visible. If integration is mandatory and no alternative path (CSV, manual, sandbox) is offered, busy-professional friction is noted.

## Deep Diagnosis: Pricing Package Readability (B2B SaaS)

Package names (Starter/Pro/Enterprise) alone do not provide clarity. For each package, who it is for, what limits, what support level, and what triggers an upgrade should be readable. If the "unlimited" claim is limited by a footnote, the skeptical persona makes this a toughQuestion. If seat price is combined with hidden usage fees, the price-sensitive persona says "total cost of ownership is unclear." If annual commitment contradicts the trial, distrust arises. In the FirstClick pricing section, quote plan names from the corpus; if absent, write "no pricing signal found." Mark unsupported claims like "40% cheaper than competitors" as a product claim and request evidence.

## Deep Diagnosis: Security and Buying Committee (B2B SaaS)

Security review is a frequent drop-off or delay source in B2B SaaS. Look for in the corpus: security page, sub-processor list, data center region, encryption language, SOC/ISO logos (if present — do not fabricate if absent), DPA request, KVKK disclosure. Logo wall does not substitute for security evidence. Role-based access and audit log are technical counterparts for the "team management" promise. If the champion proceeds self-serve but IT blocks, add "Security review friction" to the timeline. The analyst does not make legal compliance decisions; lack of transparency is noted as a risk signal.

## Good and Weak Example Patterns (B2B SaaS)

Good hero pattern: "[For role] [outcome] — [how] in [time]." Weak: "The OS for your business." Good CTA: "Try for 14 days — no card required." Weak: "Submit." Good onboarding: 3-step checklist + template. Weak: 12-field company form. Good trust: short security summary + contact. Weak: "Bank-level security" unsupported slogan. These patterns are heuristic; scoring depends on product corpus evidence.

## Analyst Writing Template (B2B SaaS)

Finding format: Observation (quote) → Persona impact → Timeline event → Score impact → Recommendation. Example skeleton: "Landing hero '[quote]' does not specify category; non-technical confusion; clarityScore↓; reduce hero to role+outcome sentence." Do not fabricate user quotes; only use corpus or [kb] rule.
