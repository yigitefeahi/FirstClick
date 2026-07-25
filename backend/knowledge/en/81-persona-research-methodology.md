# Persona Research Methodology

This document defines how a FirstClick analyst should validate a persona claim, what constitutes sufficient evidence, and how it should be reflected in the score and timeline outputs. It is the operational framework for moving from demographic labels to behavioral evidence. Each section is independently readable for RAG; there is no mandatory dependency on another document.

## Purpose and Scope

Persona research seeks to answer not so much "who" but "in what situation, trying to solve what job, under what constraint." In the context of FirstClick, the goal is to diagnose whether the default user model in the product corpus (landing, onboarding, pricing, security copy, support language) conflicts with actual user behavior. This document does not produce a survey template, workshop agenda, or persona poster; it provides the discipline of diagnosis, synthesis, and scoring.

Out of scope: brand archetypes, imaginary age-city-hobby portraits, psychographic stories without evidence, "ideal customer" slogans. In scope: job context, triggering event, definition of success, obstacles, decision and veto roles, sources of evidence, mapping to FirstClick output fields. If the corpus is weak, the analyst should honestly indicate the gap; the gap should not be filled with a persona story.

## Core Principles

Behavior trumps demographics. "A 35-year-old marketing manager" alone cannot be a prompt or score justification. What is required is a situational sentence: "Needs to deliver the campaign report to the CFO by Friday noon; in the current tool, export is four steps and column mapping is fragile." This sentence produces a diagnosis; age and title do not.

A persona is a hypothesis, not a fact. A hypothesis is not written as a "definite persona" without being supported by at least one of: interview, support ticket, product telemetry, or sales objection. In FirstClick, if there is no primary evidence, it is explicitly stated as "insufficient evidence." Features or user motivations are not fabricated. The distinction between "probable" and "observed" is maintained.

One persona is not enough. In a B2B package, the champion, economic buyer, security reviewer, and end user all read the same product with different risks. Even in B2C and PLG products, a first-time user and a power user encounter different friction in the same flow. At least two perspectives are considered together in the analysis package; for example, skeptic and heavy professional, or end user and admin.

The evidence hierarchy is kept clear. Primary evidence: user’s own words, recorded workflow, in-product errors and exit points. Secondary: sales notes, support ticket summaries, success story drafts. Tertiary: industry generalizations and [kb] rules. If there is no primary in the citations list, the general rule is limited to [kb]; features are not claimed as if [doc] or [web] exist.

The time dimension is not forgotten. The persona hypothesis becomes outdated as the product, market, and competitors change. If the same objection is repeated in the previous analysis [past], this is a strengthening pattern; a poster written once is not assumed to be valid forever.

## Research Cycle

Step one — write the hypothesis. Format: "A person doing job Y in situation X with constraint Z looks for A in the first ten seconds; if not found, falls into behavior B or abandons." The hypothesis must be testable.

Step two — gather evidence. Sources: landing promise, onboarding steps, pricing visibility, security and GDPR signals, empty state copy, error messages, previous analysis. Each source type is tagged with a citation label.

Step three — look for contradictions. Promise vs. interface; persona need vs. CTA language; self-serve promise vs. demo only; "try for free" vs. early card request; "secure" claim vs. lack of visible policy.

Step four — label the diagnosis. Clarity, trust, activation, price, B2B fit, accessibility, performance. No score justification is written without a label.

Step five — link score and suggestion. Each finding is linked to a score impact and a micro action. The micro action is actionable and single-focused: remove a field, shorten copy, add an evidence link, make a step optional.

Sample cycle (SaaS reporting): Hypothesis — heavy professional wants to generate the first report from a ready template within five minutes; mandatory company profile and seven-field form reduce activation. Evidence — density of required fields in the signup form, "quick setup" promise in the hero. Contradiction — promise vs. form. Diagnosis — signup friction and first value delay. Suggestion — reduce fields to three, link template selection to hero CTA. Score — clarity medium, onboardingRisk high, adoption under pressure.

## Concrete Examples

Example A — Wrong method. The team produces three posters in a workshop: Young Entrepreneur, Corporate IT, Freelance Designer. The landing has a single CTA "Request Demo," no pricing, no case study, no security page. The analyst repeats the posters and ties scores to demographics. This is anti-research; there is no behavioral evidence and the FirstClick output is misleading.

The correct method produces three situational sentences for the same product. One: founder wants to try immediately with a card, does not want to delay sales. Two: IT asks about security SSO, audit log, and data location. Three: operations leader wants team invite and role separation. If the corpus only has a demo form, likelihood remains low for one; for two and three, toughQuestions include security and roles; suggestion recommends adding a self-serve path or at least price and security signals.

Example B — Persona from support tickets. If support tags like "forgot my password," "download invoice," "where is CSV export" are dense, the persona strengthens towards "non-technical operations user" and "need for evidence/invoice." If the landing jargon is "orchestrate your workflows," the language is mismatched. Clarity drops; suggestion is to translate benefit language into job outcome: "Download your weekly report as CSV."

Example C — Hypothesis testing with telemetry. High drop-off at the third step in onboarding; third step is "connect integration." If the persona seeks quick value, making integration optional and reaching the aha moment with sample data tests the hypothesis. "Mandatory integration delays first value" is written to the timeline; suggestion remains concrete and measurable.

Example D — Sales objections. If the sales team says "no progress without seeing the price" and "GDPR is being asked," signals for skeptic and economic buyer are strengthened. If price is hidden and GDPR is weak on the landing, trust and price are affected together. This is more valuable than soft claims like "entrepreneur persona loves innovation."

## Diagnostic Questions

What evidence source does this persona claim rely on: interview, support, sales, telemetry, or assumption? Can the user's job-to-be-done sentence be written in a single sentence? Is the definition of success a product metric (signed up) or a user metric (report sent)? Which role decides, who vetoes, who uses daily? Does the landing promise match the first onboarding screen? Is price and plan visibility aligned with the persona's risk threshold; is hidden pricing harmful for the skeptic? Does the security and GDPR copy come before the economic buyer, or is it missing? Are mobile and accessibility constraints critical for this persona? Is the same persona objection repeated in previous analysis? Are all scores explained with a single persona; is a second perspective missing? Is the hypothesis testable, or just a slogan? Are there conflicting signals in the corpus and which is considered primary?

## Response Patterns

Pattern one — evidence-based diagnosis. "There is a five-minute setup promise in the corpus, but the signup form contains nine required fields. In the heavy professional hypothesis, first value is delayed; clarity is medium, onboardingRisk increases. Suggestion: reduce fields to three, defer company info." Citation: web or doc promise, kb onboarding rule.

Pattern two — insufficient evidence. "There is an enterprise security persona assumption, but no SSO, audit log, or GDPR signal in the corpus. I am not fabricating features; I add SSO and data location to toughQuestions. Trust score cannot be speculatively increased."

Pattern three — multiple roles. "Self-serve trial seems suitable for the champion; there is no trust center for security. Likelihood is medium for champion, low for security. Suggestion: a single ready page for security questions and optional demo."

Pattern four — segment contradiction. "There is language for students and first-timers, but price is enterprise seat. Message is mixed; lock onto the primary job or separate individual and team paths."

Pattern five — past repeat. "Hidden price objection also appeared in previous analysis. Pattern is strengthening; prioritize fix for price and trust."

## Anti-patterns

Mistaking demographic posters for real users. Generalizing a persona from a single interview. Canceling the persona by saying "everyone," thus canceling the diagnosis. Copying persona language from a competitor's site. Adding features not seen in FirstClick as persona needs. Using the persona name as the entire score justification. Using workshop output for years without updating. Only writing positive personas and skipping veto roles. Creating certainty with fake statistics ("seventy percent are like this"). Confusing the persona research process with writing landing copy.

## FirstClick Prompt and Score Effects

The prompt skeleton works as follows: situation, job sought, obstacle, corpus signal, contradiction, score impact, micro suggestion, citation. Likelihood is tied to the alignment between persona and product path; if there is no evidence, it is kept low or medium and the justification is "missing signal." PersonaReaction text is written in situational language; not as a title list.

Score mapping: Clarity is the proximity of language to job outcome. Trust is evidence, transparency of limits, and GDPR visibility. Adoption and activation are the number of steps to first value and mandatory steps. Price is visibility and persona budget risk. B2B is role separation and security questions. OnboardingRisk increases with mandatory steps, jargon, hidden price, and demo-only paths.

Suggestion rules: One actionable micro action for each persona friction. If multiple personas conflict, priority is usually security and veto, then economic buyer, then daily user; adjusted by product type. Suggestion text should be measurable: instead of "add SSO," if not in the corpus, "add a trust item clarifying whether SSO exists" is more accurate.

## Action Checklist

Write the persona hypothesis as a single situational sentence. Tag the evidence source. Define at least two roles or two situational perspectives. Scan for contradictions in the landing, onboarding, and pricing triangle. Produce toughQuestions for the veto role. Do not fabricate features; if missing, state it is not in the corpus. Link every finding to a score field. Make the suggestion a single-sentence micro action. Place kb, doc, web, past correctly in citations. Do not base score on persona poster or demographics. Compare the hypothesis with [past]. Do not add fake percentages or fabricated research results.
