# Behavioral Segmentation

This document explains how separating users by behavior, motivation, and constraint—rather than demographics—connects to FirstClick diagnosis. The goal is not to produce segment posters, but to clarify which set of behaviors creates which friction and how it affects scores. Each section is independently readable for RAG; even analysts unfamiliar with segmentation jargon can apply it.

## Purpose and Scope

Behavioral segmentation groups people based on what they do, what they postpone, at which evidence threshold they proceed, and at which constraint they drop off. Typical axes include: need for immediate value, evidence threshold, budget sensitivity, collaboration need, technical competence, risk and compliance concerns, channel (desktop versus mobile), accessibility need. In the FirstClick context, a segment determines which persona package to select, where toughQuestions should focus, and suggestion priority.

Out of scope: segmenting by age, gender, city; treating one-off ad campaign tags as permanent personas; writing market share percentages without a sample; reducing segments to “personality types.” In scope: defining behavioral axes, segment overlaps, splitting product paths, message and price effects, score mapping, diagnosing losing segments.

## Behavioral Axes

The speed axis stretches between “immediate value” and “value after correct setup.” Segments seeking immediate value drop off in long wizards, mandatory integrations, and training videos. Segments seeking correct setup may feel insecure with empty sample data and “set up later” language. If the product enforces a single path, one segment wins, the other systematically loses; FirstClick writes this clearly in the timeline.

The evidence axis ranges from low threshold (try and see) to high threshold (reference, security review, contract, GDPR). High-threshold segments drop off at hidden pricing, superlative slogans, and unsubstantiated social proof. The trust score is especially sensitive to this axis. Low-threshold segments suffocate at overly formal “request a demo” walls.

The budget axis separates behaviors like instant trial with card, visible monthly plan, annual commitment, and enterprise payments requiring purchase approval. A single “contact us” card on the same landing page loses the budget-sensitive self-serve segment. The absence of a pricing page suppresses both price and trust in FirstClick.

The collaboration axis separates those who complete the task alone from those requiring approval or team invites. Mandatory invite onboarding penalizes the individual segment. Conversely, if there’s no team feature, the admin segment stalls in B2B.

The competence axis is the novice versus expert distinction; it is explored in depth in a separate document. Here, it suffices as a segment selection signal: which side does the default UI assume?

The risk axis ranges from consumer comfort to enterprise veto. SSO, audit log, data location, and role-based access signals are sought on this axis. If absent, features are not fabricated; toughQuestions are generated.

## Segment Identification Method

Step one: select a behavioral event—export in the first session, sending an invite, visiting the pricing page, opening support, filling out a demo form, mobile drop-off. Step two: write down the constraints observed alongside this event. Step three: name the segment in a single sentence; for example, “trial user seeking proof without providing a card.” Step four: map the primary friction to the product path. Step five: connect to the FirstClick persona package: skeptic, price-sensitive, busy professional, B2B committee roles.

Segment names can be internal; demographic information should not leak into external communication. Instead of “twenty-eight-year-old in Ankara,” write “price-sensitive buyer making quick comparisons on mobile.” Naming should include a behavioral verb; otherwise, there’s a risk of creating a poster.

Prioritization: segments causing veto and payment barriers are fixed first; then come high-volume but fixable frictions. Simply changing a color to postpone a trust issue as an “easy win” is an anti-pattern.

## Concrete Examples

Example A — PLG productivity tool. Segment one: busy individual, wants the first note in two minutes. Segment two: team admin, wants roles and SSO. Segment three: skeptical evaluator, checks price and GDPR. A single onboarding forces everyone into the same sequence: ask company size, invite team, connect integration, then editor. Segment one dies. FirstClick suggestion: make the personal path default, move admin and security steps to a secondary path, show price early.

Example B — E-commerce. Segments: discount hunter, loyal repeat buyer, first-timer, return-concerned. If the hero only says “season’s best,” clarity on returns and shipping is weak; the return-concerned segment drops in trust score. Suggestion: make the return policy visible, tie social proof to the product, don’t use fake countdowns.

Example C — Education platform. Segments: student panicking during exam week, long-term planner, parent decision-maker. For the panicker, speed to first lesson is critical; for the parent, cancellation, invoicing, and security language are key. A single message may miss both; entry paths should be separated.

Example D — Wrong segmentation. Two groups are defined as “Millennial” and “Gen Z”; behavior is identical: compare price and drop off. Demographics are noise. The behavioral diagnosis should shift to price transparency and trial friction.

Example E — Marketplace with two sides. Buyers want quick trust; sellers want quick listing and payment clarity. If a single onboarding “community rules” wall slows both sides, side-based paths are needed. Read together with the marketplace document, but the lesson here is behavioral separation.

## Diagnostic Questions

Which behavioral event defines the segment? Is the segment based on demographics or constraint? Which segment systematically loses on the same product path? Is there a trust signal for the high evidence threshold segment? Is plan comparison visible for the price-sensitive segment? Does mandatory collaboration block the individual segment? Does the segment starting on mobile encounter desktop assumptions? Is the security segment represented in toughQuestions? Have segment names leaked as demographics in external communication? Does the same segment friction repeat in previous analysis? Does an improvement for one segment break another? Is the proxy metric (export, invite, pricing page, drop-off step) clear? Are self-serve and demo paths separated for different segments?

## Response Patterns

Pattern 1 — losing segment. Speed segment drops off at mandatory integration. Suggestion: aha moment with sample data; make integration optional. Adoption shifts from pressure, onboardingRisk drops.
Pattern 2 — conflict. Skeptic wants price; sales wants demo. If there are not two paths, likelihood is low. Suggestion: visible pricing page plus optional demo.
Pattern 3 — measurement. Segment ‘admin sending invite’ can be separated by behavior; invite is mandatory in onboarding. For B2B, move invite after value.
Pattern 4 — demographic rejection. Age bracket does not produce behavior; price comparison does. Shifting diagnosis to price.
Pattern 5 — side effect. Guide added for novice; not skippable for expert. Add skip tour, note the side effect.
Pattern 6 — risk segment. Enterprise veto signal exists; no trust center. Not fabricating features; adding SSO and data location to toughQuestions.

## Anti-patterns

Calling demographics a segment. Inflating endless micro-segments. Designing for only one segment and ignoring the rest. Fabricating segment percentages. Confusing segment with ad targeting tags. Writing as a segment a behavior not seen in FirstClick. Linking all scores to a single segment. Making the segment name the entire score rationale. Postponing trust issues with easy copy changes. Reducing a two-sided product to a single behavior.

## FirstClick Prompt and Score Effects

Prompt skeleton: primary behavioral segment, secondary segment, losing path, corpus signal, contradiction, score effect, micro-action, citation. Persona package selection is made according to these axes; personas are not chosen randomly or out of habit. Likelihood is tied to the primary segment’s ability to complete the critical path.

Score mapping: Clarity is the alignment of the message with the segment’s language; Trust is meeting the evidence threshold; Adoption is speed and barrier structure; Price is the budget axis and visibility; B2B is risk and role axis; OnboardingRisk is mandatory steps in the wrong order. Suggestion is usually written for a single segment but includes a side effect sentence: “Admin path must be preserved.”

Citations: if the behavioral claim comes from telemetry or doc, use the relevant tag; general rule is kb; site promise is web; repetition is past. Do not write segment volume as a percentage if you haven’t seen it.

## Action Checklist

- [ ] Select and name behavioral axes - [ ] Write segments as situational sentences - [ ] Mark the losing segment’s product path - [ ] Avoid relying on demographics - [ ] Check price and evidence signals for high threshold - [ ] Separate individual and team paths - [ ] Validate mobile assumptions - [ ] Write toughQuestions according to risk segment - [ ] Note suggestion side effects - [ ] Limit claims with citations - [ ] Don’t write fake market share - [ ] Check for recurring friction with [past] - [ ] Prioritize according to veto/payment barrier

## Segment and Persona Relationship

A segment is a behavioral cluster; a persona is the perspective that voices that cluster in FirstClick simulation. The “price-sensitive mobile comparer” segment can be voiced with persona-price-sensitive and skeptic packages. Selecting a persona without a segment is speculation; diagnosing a segment without a persona is dry. Connecting both is the main application of this document.

In multi-segment products, the analysis summary should end with a “who won / who lost” sentence. Using only “average user” language erases behavioral reality.
