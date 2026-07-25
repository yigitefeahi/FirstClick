# Novice versus expert

This document defines how to diagnose different competency levels within the same product and how these are reflected in FirstClick scores. The goal is not to create two separate products; the default path, progressive disclosure, and escape hatches must be set up correctly. Each section is independent for RAG.

## Purpose and scope

A novice is new to the domain or tool. Jargon is risky, error cost is perceived as high, they want examples and reversibility, and will abandon if they don’t see early success. An expert is familiar with similar tools. They want shortcuts, dense information, skippable tours, search, command palette, bulk actions, and deep documentation. Mandatory training and slow modal flows reduce expert likelihood.

In FirstClick, if the corpus is locked to a single level, the other level is written as the loser in the timeline. Scope: language layers, information architecture, onboarding, empty states, error messages, power features, docs entry, level switching. Out of scope: IQ assumptions, condescending language, mapping level to age or title, elitism that makes the expert the sole hero.

## Design principles

Progressive disclosure: get the job done first, then teach the concept. Don’t explain the data model or API object to a novice on the first screen. Don’t force long tooltips on every click for experts. Information should appear at the moment of need.

Defaults should be novice-safe, escapes should be expert-fast. Strong defaults: sample data, safe limits, undoable deletion, clear next step. Escapes: skip tour, search, keyboard shortcuts, start with empty file, dense view, CLI or API entry.

Language layers are separated. The primary interface speaks in the language of business outcomes. Advanced settings and documentation can use technical language. Filling the hero area with API jargon reduces novice clarity; leaving docs only in marketing language undermines expert trust.

Error messages must meet two needs: what happened (plain language) and how to fix it (concrete step). For experts, an error code can be given in a secondary line. Just a code or just an apology is not enough.

Level switching: users start as novices, become experts. If a permanent beginner mode cannot be turned off, experts are penalized. Options to hide checklist, enable dense mode, and turn off tips are needed.

## Concrete examples

Example A — Analytics. Novices want a ready dashboard and “what changed this week.” Experts want SQL or custom metrics. Opening with an empty SQL editor reduces novice adoption. Suggestion: template dashboard as default; custom query as a second level.

Example B — Design tool. Experts want shortcuts and a dense canvas. If the mandatory tour can’t be skipped, likelihood drops. Skip tour is essential.

Example C — Developer platform. Novices want a working example; experts want SDK, CLI, webhook logs. If the landing is just a slogan, neither level can get their job done. Docs entry increases expert trust.

Example D — Accounting. Novices panic at tax jargon. Labels should be in business language; technical terms should open in help.

Example E — Security product. Novices want protection first; experts want policy as code. Default safe policy protects the novice; the editor is open to experts.

Example F — Maturity. If the checklist opens on every login months later, expert friction accumulates. Suggestion: allow permanent hiding.

## Diagnostic questions

Which level does the default first screen assume? Is there a skip tour? Is jargon in the primary navigation? Does the empty state offer sample data? Are advanced features discoverable? Does the error message include a fix step? Is there a signal for keyboard, search, or command palette? Are docs layered by level? Is reversibility clear? Is there a signal for bulk action or API? Does mandatory training kill self-serve? Are both levels called with the same CTA? Can the checklist be closed? Is the novice path usable on mobile?

## Response patterns

Pattern 1 — novice overwhelm. First screen is dense with advanced settings; no example. Suggestion: start with a template. Clarity and adoption are at risk.

Pattern 2 — expert penalty. Mandatory tour cannot be skipped. Add skip; likelihood increases.

Pattern 3 — language. Hero uses API terms; no business outcome. Business outcome as heading, technical details below.

Pattern 4 — docs. No documentation entry; expert trust is lacking. Add docs link.

Pattern 5 — switching. Checklist cannot be closed. Add hide and dense mode.

Pattern 6 — error. Only code is shown. Write plain language plus fix step.

## Anti-patterns

Assuming everyone is a novice and using constant modals. Assuming everyone is an expert and showing a blank, complex interface. Condescending language. Never surfacing expert features. Forcing novices to only use a demo. Mistaking jargon for professionalism. Forcing a single video on everyone. Mapping level to age or title. Forcing the same mandatory sequence for both levels. Writing fake proficiency statistics.

## FirstClick prompt and score impacts

Prompt: default level, losing level, UI evidence, score, micro action, citation. PersonaReaction may use “I don’t know what to do” for novice, “this tour wastes my time” for expert.

Score: Clarity for jargon placement; Adoption for time to first success; Trust for honest limits and docs; OnboardingRisk for mandatory tour; Likelihood for skip and sample data. In B2B, novice end user and expert admin may coexist.

Suggestion: sample data, skip, progressive disclosure, search/command, error fix, dense mode, docs entry. “Simplify” alone is insufficient; what is default and what is escape must be specified.

## Action checklist

- [ ] Make the default path novice-safe
- [ ] Add skip and fast escapes
- [ ] Align hero language to business outcome
- [ ] Add sample to empty state
- [ ] Write fix step in error message
- [ ] Provide search, shortcut, or docs entry for experts
- [ ] Make mandatory tour skippable
- [ ] Offer checklist hiding / dense mode
- [ ] Remove jargon from primary UI
- [ ] Don’t lock both levels into the same mandatory flow
- [ ] Link UI evidence with citations
- [ ] Don’t write fake proficiency statistics

## Reading level signals in corpus

Novice signals: how it works, long welcome, mandatory checklist, frequent tooltips, request for training, learning by demo. Expert signals: API, CLI, keyboard, power user, dense table, empty canvas, webhook, SDK. If neither is present, the product is locked to a single level; FirstClick states this explicitly. If they appear in conflicting order (API key first, then welcome), a sequence error is written. This reading is not speculative psychology, but interface signal reading.

## Intersection with busy professionals

A busy professional often behaves like an expert, but not every expert is busy. Skip tour is common to both busy and expert users. A novice can be busy: they have little time and no patience for learning; in this case, sample data is even more critical. If a novice-busy combination appears in the FirstClick persona pack, mandatory training is a double penalty.

## Microcopy examples

Good for novice: “Start with a sample report”, “You can change this later”, “Deleted item can be restored for seven days”. Bad for novice: “Configure the pipeline”, “Workspace ontology”. Good for expert: “Shortcuts”, “Command palette”, “API reference”, “Bulk edit”. Bad for expert: “Watch this four-minute video before continuing”. FirstClick suggestions write microcopy with this contrast.

## Score justification template

“The default path assumes [novice/expert] because [UI evidence]. Losing level: [X]; impact: [score area]. Micro action: [single change]. Citation: [kb/doc/web].” This template prevents using the persona name as the entire justification.

## Additional application scenario

## Reading level signals in corpus

Novice signals: how it works, long welcome, mandatory checklist, frequent tooltips, request for training, learning by demo. Expert signals: API, CLI, keyboard, power user, dense table, empty canvas, webhook, SDK. If neither is present, the product is locked to a single level; FirstClick states this explicitly. If they appear in conflicting order (API key first, then welcome), a sequence error is written. This reading is not speculative psychology, but interface signal reading.

## Additional application scenario

## Intersection with busy professionals

A busy professional often behaves like an expert, but not every expert is busy. Skip tour is common to both busy and expert users. A novice can be busy: they have little time and no patience for learning; in this case, sample data is even more critical. If a novice-busy combination appears in the FirstClick persona pack, mandatory training is a double penalty.

## Additional application scenario

## Microcopy examples

Good for novice: “Start with a sample report”, “You can change this later”, “Deleted item can be restored for seven days”. Bad for novice: “Configure the pipeline”, “Workspace ontology”. Good for expert: “Shortcuts”, “Command palette”, “API reference”, “Bulk edit”. Bad for expert: “Watch this four-minute video before continuing”. FirstClick suggestions write microcopy with this contrast.
