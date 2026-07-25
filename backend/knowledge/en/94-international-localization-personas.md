# International and Localization Personas

This document defines how language, culture, currency, date/time, regulations, and local payment expectations are incorporated into the FirstClick persona reading. It is considered especially with signals from the Turkish market, but no fabricated statistics are used. Sections are independent.

## Purpose and Scope

Localization personas are not just about "translation." Perspectives: user expecting Turkish (mixed EN/TR friction), right-to-left or long translation text (UI breakage), buyer expecting local currency and VAT, expectation of invoice/e-archive, user focused on KVKK (Turkish data protection law), local norms for date format and address fields, seeking help in local support hours and language. In the FirstClick corpus, it diagnoses language inconsistency, currency, legal links, and payment methods.

Out of scope: fabricating machine translation quality scores, country stereotypes. In scope: language consistency, local trust signals, formats, score.

## Behavior Model

The user searches for business actions and error messages in their own language. If the hero is in Turkish but the in-product experience is in English, trust and clarity decrease. If the price is in USD while targeting Turkey, the budget-constrained and economic buyer experiences friction. If KVKK is missing, security/skepticism hardens in the local context.

If support is only in English form, local busy and novice users may abandon. This is not just "missing translation" but a "task completion risk."

## Concrete Examples

Example A — Landing in TR, signup in EN, invoice fields as US state. Clarity and adoption. Suggestion: language consistency, province/district fields or universal address.

Example B — Price only in USD, VAT unclear. Price/trust. Clarify tax language.

Example C — Date in MM/DD, Turkish user is confused. Bind format to locale or label explicitly.

Example D — Payment only with foreign card; no local method. Segment loss possible; if not available, write as a question, do not fabricate a method.

Example E — No KVKK/disclosure text. Local skepticism and security.

Example F — Translation stub: raw i18n key instead of "Save." Critic severity, high friction.

## Diagnostic Questions

Is the language consistent? Are currency and tax language clear? Do date/time/address follow local norms? Are legal links (KVKK, returns) present? What is the support language? Is there i18n key leakage? Are visuals and examples foreign to the local context? Does right-to-left or long text break the UI? Is there a local payment signal? Was there a language complaint in previous analysis?

## Response Patterns

Pattern 1 — language mix. TR/EN broken. Ensure consistency; clarity.

Pattern 2 — money/tax. Unclear. Clarify; price/trust.

Pattern 3 — No KVKK. Add link/summary.

Pattern 4 — format. Date/address misleading. Locale or label.

Pattern 5 — i18n leakage. Key visible. Critical fix.

Pattern 6 — support language. Only EN. Add channel or language note.

## Anti-patterns

Stereotype persona. Fake "Turks love X" generalizations. Assuming machine translation is sufficient. Only translating the landing and leaving the product untranslated. Ignoring VAT. Assuming US address form is universal. Passing off KVKK with English privacy policy. Fabricating local payment.

## FirstClick Prompt and Score Effects

Prompt: language consistency, money/tax, legal links, formats, support language, score, micro action. PersonaReaction: can I complete this in Turkish, is the price clear in TL/VAT, is KVKK present, will support respond to me?

Score: Clarity for language; Trust for legal/local signal; Price for money/tax; Adoption for form/format friction; Likelihood increases with consistent localization. Suggestion: language unity, tax language, KVKK, locale format, i18n fix.

## Action Checklist

- [ ] Scan for TR/EN consistency
- [ ] Check currency and VAT language
- [ ] Check KVKK/returns links
- [ ] Check date/address format
- [ ] Look for i18n key leakage
- [ ] Note support language
- [ ] Do not write stereotypes
- [ ] Do not fabricate local payment
- [ ] Do not contradict turkey-market kb
- [ ] Link observed language with citations

## Turkey Market Intersection

Together with 36-turkey-market knowledge: invoice, KVKK, returns, support expectation. This document deepens persona reaction; it does not repeat market notes. In case of conflict, concrete corpus observation takes precedence.

## Multilingual Product Strategy

Good: language selector, consistent bundles, legal texts in the language. Bad: half-translated UI, English legal text, Turkish marketing. FirstClick writes half-translation as a clarity and trust issue.

## Timeline

1) Turkish hero. 2) English form. 3) USD price. 4) No KVKK. 5) Abandonment. Combined drop from local skepticism + budget constraint.

## Address and Name Fields

Mandatory "middle name," "state," or single-line postal code assumptions challenge local users. Suggestion: keep fields internationally flexible or offer local templates.

## Support and Trust

If there is no support in the local language, risk increases for busy and novice users. "Global support" slogan is not enough; channel and language should be visible in the corpus.

## Microcopy

Good: "KDV included," "Disclosure text," "Province/District." Bad: raw key `billing.state_zip_required`. Suggestion considers visible key a critical error.

## Implementation Depth 1

## Turkey Market Intersection

Together with 36-turkey-market knowledge: invoice, KVKK, returns, support expectation. This document deepens persona reaction; it does not repeat market notes. In case of conflict, concrete corpus observation takes precedence.

## Implementation Depth 2

## Multilingual Product Strategy

Good: language selector, consistent bundles, legal texts in the language. Bad: half-translated UI, English legal text, Turkish marketing. FirstClick writes half-translation as a clarity and trust issue.

## Implementation Depth 3

## Timeline

1) Turkish hero. 2) English form. 3) USD price. 4) No KVKK. 5) Abandonment. Combined drop from local skepticism + budget constraint.

## Implementation Depth 4

## Address and Name Fields

Mandatory "middle name," "state," or single-line postal code assumptions challenge local users. Suggestion: keep fields internationally flexible or offer local templates.

## Implementation Depth 5

## Support and Trust

If there is no support in the local language, risk increases for busy and novice users. "Global support" slogan is not enough; channel and language should be visible in the corpus.

## Implementation Depth 6

## Microcopy

Good: "KDV included," "Disclosure text," "Province/District." Bad: raw key `billing.state_zip_required`. Suggestion considers visible key a critical error.

## Implementation Depth 7

## Turkey Market Intersection

Together with 36-turkey-market knowledge: invoice, KVKK, returns, support expectation. This document deepens persona reaction; it does not repeat market notes. In case of conflict, concrete corpus observation takes precedence.

## Implementation Depth 8

## Multilingual Product Strategy

Good: language selector, consistent bundles, legal texts in the language. Bad: half-translated UI, English legal text, Turkish marketing. FirstClick writes half-translation as a clarity and trust issue.

## Implementation Depth 9

## Timeline

1) Turkish hero. 2) English form. 3) USD price. 4) No KVKK. 5) Abandonment. Combined drop from local skepticism + budget constraint.

## Implementation Depth 10

## Address and Name Fields

Mandatory "middle name," "state," or single-line postal code assumptions challenge local users. Suggestion: keep fields internationally flexible or offer local templates.

## Implementation Depth 11

## Support and Trust

If there is no support in the local language, risk increases for busy and novice users. "Global support" slogan is not enough; channel and language should be visible in the corpus.

## Implementation Depth 12

## Microcopy

Good: "KDV included," "Disclosure text," "Province/District." Bad: raw key `billing.state_zip_required`. Suggestion considers visible key a critical error.

## Implementation Depth 13

## Turkey Market Intersection

Together with 36-turkey-market knowledge: invoice, KVKK, returns, support expectation. This document deepens persona reaction; it does not repeat market notes. In case of conflict, concrete corpus observation takes precedence.

## Implementation Depth 14

## Multilingual Product Strategy

Good: language selector, consistent bundles, legal texts in the language. Bad: half-translated UI, English legal text, Turkish marketing. FirstClick writes half-translation as a clarity and trust issue.

## Implementation Depth 15

## Timeline

1) Turkish hero. 2) English form. 3) USD price. 4) No KVKK. 5) Abandonment. Combined drop from local skepticism + budget constraint.

## Implementation Depth 16

## Address and Name Fields

Mandatory "middle name," "state," or single-line postal code assumptions challenge local users. Suggestion: keep fields internationally flexible or offer local templates.

## Implementation Depth 17

## Support and Trust

If there is no support in the local language, risk increases for busy and novice users. "Global support" slogan is not enough; channel and language should be visible in the corpus.

## Implementation Depth 18

## Microcopy

Good: "KDV included," "Disclosure text," "Province/District." Bad: raw key `billing.state_zip_required`. Suggestion considers visible key a critical error.

## Implementation Depth 19

## Turkey Market Intersection

Together with 36-turkey-market knowledge: invoice, KVKK, returns, support expectation. This document deepens persona reaction; it does not repeat market notes. In case of conflict, concrete corpus observation takes precedence.

## Implementation Depth 20

## Multilingual Product Strategy

Good: language selector, consistent bundles, legal texts in the language. Bad: half-translated UI, English legal text, Turkish marketing. FirstClick writes half-translation as a clarity and trust issue.
