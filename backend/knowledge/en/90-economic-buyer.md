# Economic Buyer Persona Depth

This document defines how to model the economic buyer who approves the budget in B2B purchasing within FirstClick. The economic buyer is not the champion; they ask about TCO, risk, vendor lock-in, and measurable return. Sections are independent for RAG.

## Purpose and Scope

The economic buyer may be in finance, a general manager, operations director, or a budget owner. Behavior: reads price as total cost, dislikes hidden add-ons, considers depreciation and opportunity cost, asks about contract duration and exit terms, wants an answer to "why now, this year." Persuasion: transparent packaging, proven savings or risk reduction, reference context, manageability of security veto. Deterrents: ambiguous pricing, exaggerated ROI, perpetual commitment, unclear data export, lack of evidence beyond champion enthusiasm.

Out of scope: discount negotiation scripts, fabricated savings percentages. In scope: TCO reading, difference from champion, score effects.

## Behavior Model

The economic buyer rarely uses the product daily. They look at the decision package: cost, risk, alternatives (including doing nothing), implementation burden. In the FirstClick corpus, they search for price page, case, security, and implementation time signals.

The "do nothing" alternative is strong. If the product cannot convey urgency and cost, postponement wins. Likelihood drops; this is independent of champion excitement.

## Concrete Examples

Example A — Price only after demo. Economic buyer is eliminated early or sales cycle is prolonged. Suggestion: package logic or range.

Example B — ROI "10x" without proof. Trust is broken. Use contextual metric or toughQuestions.

Example C — Low seat price, mandatory high professional services. TCO surprise. Make transparent.

Example D — Annual lock-in, no data export. Exit risk. Trust and price are affected.

Example E — Champion loves trial; economic buyer sees security form is empty. Veto risk.

Example F — Competitor comparison is speculative. Offer honest difference or remain silent.

## Diagnostic Questions

Is price/TCO transparent? Is ROI proven? Are contract and exit terms clear? Is implementation cost visible? Is there material for security veto? Can champion evidence be translated into economic language? Are there surprise add-ons? Is there an argument against the do-nothing alternative? Is payment period flexible? Was there a budget block in previous analysis?

## Response Patterns

Pattern 1 — TCO is unclear. Price is hidden or add-on heavy. Suggest transparent packaging; price/trust under pressure.

Pattern 2 — Exaggerated ROI. Break it; request proof or turn into a question.

Pattern 3 — Exit risk. Export/cancellation unclear. Clarify.

Pattern 4 — Champion-economic disconnect. Add a shareable cost-benefit summary.

Pattern 5 — Security gap. Economic approval does not come before security. FAQ/toughQuestions.

Pattern 6 — Demo-only pricing. Show a range early.

## Anti-patterns

Fabricated savings percentage. Mistaking economic buyer for champion. Only offering discounts. Ignoring TCO. Hiding exit terms. Speculative competitor pricing. Postponing security issues. Leaving "price is hidden because it's enterprise" in conflict with PLG.

## FirstClick Prompt and Score Effects

Prompt: TCO signals, ROI quality, exit risk, security readiness, score, micro-action. PersonaReaction: what is the total cost, how long is the payback, is there lock-in, what is the risk?

Score: Price and Trust are primary; B2B decision maturity; Likelihood increases with transparency and evidence. Suggestion: package transparency, honest metrics, export/exit, trust material, shareable summary.

## Action Checklist

- [ ] Check price/TCO visibility
- [ ] Prove or break ROI claim
- [ ] Scan for exit/export clarity
- [ ] Flag surprise add-ons
- [ ] Check security material
- [ ] Build bridge between champion and economic language
- [ ] Do not write fabricated percentages
- [ ] Add TCO items to ToughQuestions
- [ ] Select citations correctly
- [ ] [past] check for budget block

## Economic Buyer versus Budget-Constrained

Budget-constrained fears affordability and surprise card charges. Economic buyer asks about corporate budget, risk, and vendor governance. Suggestion language changes accordingly: plan transparency and trial for one, TCO and exit for the other.

## Internal Approval Package

The package the economic buyer wants: problem, options, cost, risk, success metric, timeline. Does the corpus provide these package elements? If not, the "three sentence test" in the champion document expands here.

## Timeline

1) Looks for price/TCO. 2) Sees exaggerated ROI or cannot find proof. 3) Asks about security/exit. 4) Postponement or demo request. Score follows this sequence.

## Do Nothing Alternative

The economic buyer likes to postpone. If the product does not contextualize "why now" with cost, risk, or timing (audit, season), postponement wins. FirstClick can use this as a low likelihood reason; does not recommend fake urgency countdowns.

## Contract and Exit

Annual lock-in, lack of data export, unclear transition fees inflate TCO. Suggestion demands exit clarity. Security reviewer also sees data export as a risk; the two documents are stronger together.

## Proven Savings Language

Claims of "time saved" or "error reduction" require context (who, how long, which process). Otherwise, turn into toughQuestions. Do not write percentages without citation.

## Supplementary Note

## Do Nothing Alternative

The economic buyer likes to postpone. If the product does not contextualize "why now" with cost, risk, or timing (audit, season), postponement wins. FirstClick can use this as a low likelihood reason; does not recommend fake urgency countdowns.

## Supplementary Note

## Contract and Exit

Annual lock-in, lack of data export, unclear transition fees inflate TCO. Suggestion demands exit clarity. Security reviewer also sees data export as a risk; the two documents are stronger together.

## Supplementary Note

## Proven Savings Language

Claims of "time saved" or "error reduction" require context (who, how long, which process). Otherwise, turn into toughQuestions. Do not write percentages without citation.

## Field Application Note 1

## Contract and Exit

Annual lock-in, lack of data export, unclear transition fees inflate TCO. Suggestion demands exit clarity. Security reviewer also sees data export as a risk; the two documents are stronger together.

## Field Application Note 2

## Proven Savings Language

Claims of "time saved" or "error reduction" require context (who, how long, which process). Otherwise, turn into toughQuestions. Do not write percentages without citation.

## Field Application Note 3

## Do Nothing Alternative

The economic buyer likes to postpone. If the product does not contextualize "why now" with cost, risk, or timing (audit, season), postponement wins. FirstClick can use this as a low likelihood reason; does not recommend fake urgency countdowns.

## Field Application Note 4

## Contract and Exit

Annual lock-in, lack of data export, unclear transition fees inflate TCO. Suggestion demands exit clarity. Security reviewer also sees data export as a risk; the two documents are stronger together.

## Field Application Note 5

## Proven Savings Language

Claims of "time saved" or "error reduction" require context (who, how long, which process). Otherwise, turn into toughQuestions. Do not write percentages without citation.

## Field Application Note 6

## Do Nothing Alternative

The economic buyer likes to postpone. If the product does not contextualize "why now" with cost, risk, or timing (audit, season), postponement wins. FirstClick can use this as a low likelihood reason; does not recommend fake urgency countdowns.

## Field Application Note 7

## Contract and Exit

Annual lock-in, lack of data export, unclear transition fees inflate TCO. Suggestion demands exit clarity. Security reviewer also sees data export as a risk; the two documents are stronger together.

## Field Application Note 8

## Proven Savings Language

Claims of "time saved" or "error reduction" require context (who, how long, which process). Otherwise, turn into toughQuestions. Do not write percentages without citation.

## Field Application Note 9

## Do Nothing Alternative

The economic buyer likes to postpone. If the product does not contextualize "why now" with cost, risk, or timing (audit, season), postponement wins. FirstClick can use this as a low likelihood reason; does not recommend fake urgency countdowns.

## Field Application Note 10

## Contract and Exit

Annual lock-in, lack of data export, unclear transition fees inflate TCO. Suggestion demands exit clarity. Security reviewer also sees data export as a risk; the two documents are stronger together.

## Position in the Buying Committee

The economic buyer is usually the final signature but not alone. Champion creates value, security can veto, legal reads the contract. In FirstClick analysis, economic buyer questions should not be limited to price and TCO; veto readiness should also be visible. Otherwise, the scenario of a successful champion but no signature is missed.

## Packaging and Negotiation Space

Transparent packaging does not reduce negotiation; it reduces bad surprises. If "special price" is the only option, self-serve economic buyers are eliminated early. Even in an enterprise sales model, a range or package logic accelerates the internal approval package. Suggestion: at least state which variables affect the price (seat, usage, support).
