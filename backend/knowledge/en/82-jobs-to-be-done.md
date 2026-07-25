# Jobs-to-be-done (JTBD) Framework

This document connects the JTBD approach to FirstClick persona, messaging, and activation analysis. The goal is to diagnose the job the user wants to progress, the trigger, and the success criteria, instead of a feature list. Each section is independent for RAG; analysts unfamiliar with JTBD jargon can also apply it.

## Purpose and Scope

JTBD is the definition of progress for which a person "hires" a product. Progress can be seen on three layers: functional (finishing a report), emotional (avoiding loss of control and embarrassment), social (looking good to a manager or team). In FirstClick, JTBD is used to check whether the hero text, CTA, onboarding first task, empty state, and aha moment all promise the same job.

Out of scope: abstract customer journey posters, unproven persona stories, "innovation theater" workshop outputs. In scope: job sentence discipline, trigger, current solution and frustration, distinction between big and small jobs, competitor displacement, payment job, score and suggestion links. If the analyst finds no job signal in the corpus, they do not make one up; they state that the message remains generic.

## Job Sentence Discipline

A good job sentence carries this skeleton: "In situation X, to achieve outcome Y, I am looking for a way with constraint Z." Example: "At month-end closing, to give accounting an error-free CSV, I want to export without opening an IT ticket." This sentence directly links to diagnosis, CTA, and onboarding design.

Bad sentence examples: "The user wants to increase productivity." "Seeks a better experience." "Wants a modern solution." These are not measurable; they cannot be turned into a FirstClick score rationale. A job is not a feature name. "AI dashboard" is not a job, but a candidate solution. The job could be "making a decision with confidence within a certain time."

Job levels must be separated. The big job defines meaningful progress in the company or life: "Making reporting reliable and repeatable." The small job is today's concrete step: "Save and share a filter this morning." The landing can carry the big job; onboarding must deliver the small job immediately. If the two are disconnected, the user reads the promise but cannot find the job in the product; activation drops.

When writing a job sentence, the constraint (Z) is critical. Constraints can be time, authority, technical skill, budget, compliance, or device. Constraints like "in five minutes," "on mobile," "without giving a card" are the backbone of friction diagnosis in FirstClick.

## Trigger, Current Solution, Frustration

The trigger event makes the job urgent: new manager, audit date, campaign week, churn increase, broken Excel file, team growth, competitor security breach news. If there is no trigger language in the corpus, the message remains generic; it reads weakly for intense professional and economic buyers.

The current solution is often not another SaaS. Email chains, spreadsheets, "asking someone," copy-paste, consulting hours are common. The user hires the product to fire these. If the "Why us" section only shows competitor logos, JTBD is weak; the transition cost should be explained according to the current workflow.

Frustration expressions are highly valuable in diagnosis: "wrong column again," "waiting for approval again," "another demo appointment," "price is hidden again." If the landing does not reflect this language, there is an empathy gap. The skeptical persona seeks recognized pain, not exaggerated promises.

## Concrete Examples

Example A — Education marketplace. Big job: quickly finding a reliable private tutor to raise this term's grade. Small job: scheduling the first lesson with a suitable tutor this week. If the landing says "invest in your future," there is an emotional layer but the functional job is unclear. If onboarding first asks for a long profile, the small job is postponed. FirstClick suggestion: pull the hero to "find a suitable tutor today," link the first CTA to search or discovery, postpone profile fields.

Example B — B2B security and compliance tool. End user job: extracting access evidence from a single place before an audit. Economic buyer job: explaining risk and cost to management. Security job: proving control with SSO and logs. One persona is not enough. ToughQuestions should include "how many steps to report?", "how is annual cost read?", and "is there SSO?"

Example C — AI writing assistant. The user's job may not be "to be more creative"; "sending a customer email in ten minutes without embarrassment" is more real. Exaggerated creativity promises repel skeptics. The limit "produces a draft, you approve" aligns with the job and supports the trust score.

Example D — Analytics product. Big job: making weekly decisions with data. Small job: seeing an anomaly from a ready-made dashboard. If the product opens with an empty dashboard, there is no small job. Placing an industry template and sample data in the empty state aligns with JTBD; forcing "connect integration" blocks the job.

Example E — Freemium note app. The payment job may be "unlimited device sync"; the activation job is "capturing the first note in two clicks." If the paywall comes before the activation job, adoption drops. JTBD explains paywall timing.

## Diagnostic Questions

After which trigger event does the user hire this product? Can functional success be measured in one sentence? Is emotional and social progress exaggerated or honest? What is the current solution: Excel, email, competitor, manual process? Does the first screen solve the big job or just account settings? Is the CTA verb the same as the job verb: "Create report" versus "Sign up"? Is transition cost (import, learning, approval) clearly managed? Which job is paid for; which should be a free hook? Do veto roles carry different jobs? Has the job sentence slipped into feature jargon? Is mobile constraint part of the job? Is the failure state (what happens if the job is left incomplete) present in the product language?

## Response Patterns

Pattern one — job and interface alignment. "The job is to issue the first invoice; onboarding starts with uploading the company logo. The small job is postponed; there is an aha shift. Suggestion: invoice preview with sample data, logo later. Adoption is under pressure, onboardingRisk is high."

Pattern two — job and messaging. "Hero is a feature list; no trigger or success. Weak for skeptical and intense professionals. Suggestion: trigger plus duration plus output: access report in one click during audit week."

Pattern three — multi-job conflict. "Individual job is self-serve; team job requires admin invite. If team is mandatory in the first path, individual adoption drops. Suggestion: personal space as default, team optional."

Pattern four — competitor displacement. "User comes from Excel; no import, only empty dashboard. Transition cost is ignored. Suggestion: CSV import or sample data."

Pattern five — payment job. "Seat paywall appears before activation job is completed. Price perception is punitive; likelihood drops. Suggestion: show first value, then limit."

## Anti-patterns

Putting persona name or demographics instead of job. Writing an unmeasurable "better experience" job. Inflating by declaring every feature as a separate job. Thinking JTBD is done with only an emotional slogan. Promising the big job but hiding the small job inside the product. Not separating the payment job from the activation job. Writing only the end user job in B2B. Always assuming the current solution is a competitor SaaS. Equating the job sentence to the marketing team's slogan. Scoring a job in FirstClick that is not seen.

## FirstClick Prompt and Score Effects

Prompt skeleton: trigger, job sentence, current solution, corpus match, friction, score, suggestion, citation. Timeline steps are written in job language. "Logo upload barrier" is less accurate than "invoice preview blocked" because it ties to the user metric.

Score effects: Clarity is the visibility of job language. Adoption is the number of steps to the small job. Trust is the unexaggerated success promise and transparency of limits. Price is the timing of the payment job. B2B is the appearance of veto jobs in toughQuestions. OnboardingRisk rises if mandatory settings block the job. Likelihood increases if the job and product path align; it drops if demo-only and job is self-serve.

Suggestion priority: turn the CTA into the job verb, show first value with sample data, offer a single clear transition path, add a separate proof block for veto jobs, shift the paywall according to the payment job. Each suggestion refers to a job sentence.

## Action Checklist

Write the job sentence with the situation, outcome, constraint skeleton. Name the trigger event. Note the current solution and frustration. Separate big and small jobs. Check hero, CTA, and onboarding alignment. Write a separate job for veto roles. Translate the feature list into job language. Position the paywall according to the payment job. Dedicate a screen or empty state for transition cost. Prove the job claim with citations or state if absent. Consider the failure state (if the job is left incomplete). Do not add fake "market research percentages."

## Transferring the Job Map to FirstClick Timeline

The timeline should show the user's job progress step by step. For each step, think of three fields: user intent, product action, friction. If the intent is "see the first report with sample data" but the product says "name your workspace" first, friction is labeled. This transfer is more actionable than a generic "onboarding is long" comment.

Good timeline sentence example: "User wants to see an anomaly with sample data; system first requires connecting a data source; risk of drop-off increases." Bad sentence: "User gets confused." Confusion is not a diagnosis but a symptom; a job barrier is a diagnosis.

In multi-step jobs, intermediate successes are marked. Before the big job is completed, micro-progress like "template selected," "preview seen," "share link copied" is translated into adoption language. FirstClick suggestions are written to unlock these micro-progresses.

Competitive JTBD reading: The user may hire multiple solutions in parallel for the same job. If the corpus says "replace everything," transition fear increases; "works alongside Excel" language is safer for busy and skeptical users. This nuance affects trust and adoption together.

## Common Job–Product Misalignments

Self-serve promise, sales requirement: If the job is to try immediately but the only path is scheduling a meeting, likelihood drops. Content job, account job: If the user is looking for content but must first create an account, clarity and adoption suffer. Collaboration job, individual setup: If invite is mandatory, individual progress is broken. Trust job, marketing exaggeration: If limits are hidden, skeptics leave. Admin job, end user onboarding: Roles are mixed, B2B friction increases.

These misalignments should be written in the score rationale as "job misalignment," not "persona." Thus, the suggestion is directed to the product, not mistakenly to a persona poster.
