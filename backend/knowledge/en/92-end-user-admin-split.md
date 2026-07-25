# End User and Admin Split

This document links the conflict of needs between daily users and administrator (admin) roles within the same product to FirstClick diagnosis. A single onboarding and a single success metric is incorrect for most B2B and collaboration products. Sections are independent.

## Purpose and Scope

The end user wants to get the job done: fast creation, clear errors, minimal permission friction, easy-to-learn flow. The admin wants control: roles, permissions, billing, SSO, audit, invites, data retention, branding/settings. Conflict: if admin controls are forced into the end user journey, adoption drops; if admin tools are missing, enterprise sales and security are vetoed.

Scope: journey split, permission design, invite timing, empty states, scoring. Out of scope: complex IAM architecture lesson, fake SSO.

## Design Principles

Define two success metrics. End user: first output. Admin: first secure configuration. The product does not force these into the same mandatory sequence.

Default should be secure but lightweight. Giving everyone admin is easy, but wrong. Least privilege; elevation should be conscious.

Invite timing: after value. “Add your team first” punishes the individual end user and the busy professional.

Language split: user interface uses task language; admin console uses control language. If the hero only speaks admin, the end user does not see themselves.

## Concrete Examples

Example A — Mandatory workspace settings after signup (SSO, retention policy). End user cannot see the report. Suggestion: personal space as default; admin checklist separate.

Example B — Every member has billing and delete authority. Security and economic buyer veto. Suggest role templates.

Example C — There is an admin panel but no invite link. Champion cannot show their team.

Example D — End user error message is “policy 403.” Do not leak admin language to users; use plain language + “ask your admin for permission.”

Example E — When a PLG tool switches to a team plan, the entire UI turns into admin jargon. Clarity drops. Preserve layers.

Example F — Audit log is promised in sales, but not present in the product. Write the contradiction for the security reviewer.

## Diagnostic Questions

Which role is assigned by default at signup? Do admin settings block the first value? Is invite mandatory? Are roles and permissions visible? Is billing only on admin? Is end user error language understandable? Is the admin checklist separate? Is SSO on the admin path? Are security signals sufficient for admin? Is a single success metric enforced?

## Response Patterns

Pattern 1 — admin blocker. Mandatory admin setting blocks first value. Separate; adoption increases.

Pattern 2 — excessive permissions. Everyone is admin. Suggest role templates; trust/B2B.

Pattern 3 — invite mandatory. Move to after value.

Pattern 4 — language leakage. 403/policy to user. Write in plain language.

Pattern 5 — no admin. Enterprise path missing. Add invite/role/audit questions to toughQuestions.

Pattern 6 — contradiction. Landing says SSO, no admin UI. Fake.

## Anti-patterns

Single path, single role. Everyone is admin. Forcing invite. Embedding admin tasks into end user onboarding. Not removing jargon from error language. Ignoring admin and only providing consumer UI. Hiding security control as “advanced setting” and selling as enterprise. Mapping roles to demographics.

## FirstClick Prompt and Score Effects

Prompt: default role, blocker order, invite timing, permission risk, score, micro action. PersonaReaction end user: let me finish my task. Admin: who can see what, where is billing, how is SSO?

Score: Adoption is the end user path; Trust/B2B is admin controls; Clarity is language split; OnboardingRisk is wrong sequence; Likelihood increases if there are two paths. Suggestion: split the path, shift invite, role template, fix error language, separate admin checklist.

## Action Checklist

- [ ] Define the default role
- [ ] Separate admin blockers from first value
- [ ] Check invite timing
- [ ] Write excessive permission risk
- [ ] Scan error language
- [ ] Check if admin checklist is separate
- [ ] Verify SSO/audit claim
- [ ] Define two success metrics
- [ ] Do not write fake features
- [ ] Cross-link to security/economic buyer documents

## Role Matrix (Summary)

End user: create, edit, share (limited), own settings. Admin: invite, role, billing, SSO, audit, delete, workspace settings. Billing admin is sometimes separate. Does the corpus reflect this split? If not, the diagnosis is “role blur.”

## Timeline Example

1) User signs up, admin questions appear. 2) First output is delayed. 3) Abandonment or support. Better alternative: 1) output with sample data 2) optional team 3) admin checklist. FirstClick suggestion describes the second path.

## Marketplace and Multi-sided Products

In two-sided products, the “admin” may be the seller account owner. The buyer is the end user. The same split applies: seller onboarding should not block the buyer. Read together with the behavioral segmentation document.

## Microcopy

Good user: “Create draft,” “Copy share link.” Good admin: “Change member role,” “Download audit log.” Bad: to user, “enforce tenant policy.” Suggestion separates microcopy by role.

## FirstClick Package Selection

In B2B analysis, end user + admin + security are considered together. Relying only on the end user persona misses enterprise veto. Likelihood rationale clearly states which role is blocked.

## Measurement Proxies

End user proxy: first output event. Admin proxy: invite, role assignment, SSO connection. Merging both as “activation” clouds diagnosis. FirstClick suggestion specifies which proxy is broken.

## Implementation Depth 1

## Role Matrix (Summary)

End user: create, edit, share (limited), own settings. Admin: invite, role, billing, SSO, audit, delete, workspace settings. Billing admin is sometimes separate. Does the corpus reflect this split? If not, the diagnosis is “role blur.”

## Implementation Depth 2

## Timeline Example

1) User signs up, admin questions appear. 2) First output is delayed. 3) Abandonment or support. Better alternative: 1) output with sample data 2) optional team 3) admin checklist. FirstClick suggestion describes the second path.

## Implementation Depth 3

## Marketplace and Multi-sided Products

In two-sided products, the “admin” may be the seller account owner. The buyer is the end user. The same split applies: seller onboarding should not block the buyer. Read together with the behavioral segmentation document.

## Implementation Depth 4

## Microcopy

Good user: “Create draft,” “Copy share link.” Good admin: “Change member role,” “Download audit log.” Bad: to user, “enforce tenant policy.” Suggestion separates microcopy by role.

## Implementation Depth 5

## FirstClick Package Selection

In B2B analysis, end user + admin + security are considered together. Relying only on the end user persona misses enterprise veto. Likelihood rationale clearly states which role is blocked.

## Implementation Depth 6

## Measurement Proxies

End user proxy: first output event. Admin proxy: invite, role assignment, SSO connection. Merging both as “activation” clouds diagnosis. FirstClick suggestion specifies which proxy is broken.

## Implementation Depth 7

## Role Matrix (Summary)

End user: create, edit, share (limited), own settings. Admin: invite, role, billing, SSO, audit, delete, workspace settings. Billing admin is sometimes separate. Does the corpus reflect this split? If not, the diagnosis is “role blur.”

## Implementation Depth 8

## Timeline Example

1) User signs up, admin questions appear. 2) First output is delayed. 3) Abandonment or support. Better alternative: 1) output with sample data 2) optional team 3) admin checklist. FirstClick suggestion describes the second path.

## Implementation Depth 9

## Marketplace and Multi-sided Products

In two-sided products, the “admin” may be the seller account owner. The buyer is the end user. The same split applies: seller onboarding should not block the buyer. Read together with the behavioral segmentation document.

## Implementation Depth 10

## Microcopy

Good user: “Create draft,” “Copy share link.” Good admin: “Change member role,” “Download audit log.” Bad: to user, “enforce tenant policy.” Suggestion separates microcopy by role.

## Implementation Depth 11

## FirstClick Package Selection

In B2B analysis, end user + admin + security are considered together. Relying only on the end user persona misses enterprise veto. Likelihood rationale clearly states which role is blocked.

## Implementation Depth 12

## Measurement Proxies

End user proxy: first output event. Admin proxy: invite, role assignment, SSO connection. Merging both as “activation” clouds diagnosis. FirstClick suggestion specifies which proxy is broken.

## Implementation Depth 13

## Role Matrix (Summary)

End user: create, edit, share (limited), own settings. Admin: invite, role, billing, SSO, audit, delete, workspace settings. Billing admin is sometimes separate. Does the corpus reflect this split? If not, the diagnosis is “role blur.”

## Implementation Depth 14

## Timeline Example

1) User signs up, admin questions appear. 2) First output is delayed. 3) Abandonment or support. Better alternative: 1) output with sample data 2) optional team 3) admin checklist. FirstClick suggestion describes the second path.
