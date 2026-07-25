# Search UX: Discovery, Recovery, and Zero Results

A FirstClick analyst interprets search not as a "luxury feature," but as a recovery mechanism when IA and navigation fail. Especially in growing SaaS, marketplace, and content products, search quality directly impacts adoption and confusion scores. This document is the search UX evaluation standard. [kb:53-search-ux]

## Scope

Scope: global search input, scope (what is being searched), suggestion/autocomplete, result list hierarchy, filters, zero result state, typo tolerance, keyboard accessibility, and "create via search" shortcuts. Out of scope: general IA ([kb:51-information-architecture]), nav placement ([kb:52-navigation]), general empty state principles ([kb:55-empty-loading-error-states]) — the zero result empty state is addressed here in the context of search.

Heuristic: If a user resorts to search, they are usually already lost or in a hurry. Search is a second chance; if the second chance fails, the risk of leaving is high (qualitative observation rule, not a statistical claim).

## Diagnostic Signals

1. **No search or buried search**: In a content-heavy product, only finding via menu; creates busy-professional friction.
2. **Unclear placeholder**: “Search…” — search for what? Projects, people, documents? Scope ambiguity creates confusion.
3. **No/slow autocomplete**: Silence after 3+ characters; perceived performance drops ([kb:64-performance-perception]).
4. **Mixed result types**: File, person, setting, invoice all in a flat list without icons; non-technical users can't distinguish.
5. **Zero result dead end**: “No results” and that's it. No alternatives: typo suggestion, go to category, create, support.
6. **Excessive filter wall**: 8 mandatory filters before results; first-timers abandon search.
7. **Permission leakage or over-hiding**: Inaccessible items in results lead to 403 on click; or search never shows authorized content — both hurt trust/friction.
8. **Only exact match**: Breaks on Turkish suffixes, i/ı, mixed English-Turkish terms. Critical in TR products.
9. **Command vs content mix-up**: Typing “invite” returns both command and old record; no semantic distinction.

Positive signals: clear scope chips (Everyone / This project), type-based grouped results, recent searches, typo correction suggestion (“Did you mean?”), create/CTA on zero result, opens with Cmd/Ctrl+K, keyboard result selection.

## Persona Reactions

- **busy-professional**: Search = speed tool. Keyboard-focused, wants recent + shortcut. If results are slow, perceives product as slow. Being able to find “Settings > Notifications” via search saves adoption.
- **non-technical**: Doesn't know what to type. Example queries (“e.g. customer name”) and categorized results are essential. Blank “No results” causes panic.
- **skeptical**: Irrelevant or unauthorized results create a “system is random” perception. Consistency in GDPR/access is expected in search too.
- **price-sensitive**: Constant upgrade gates in search results; if content appears available but is locked, feels like bait.
- **student / first-timer**: Doesn't know product terms. Synonyms and natural language (“create invoice” → invoice creation screen) support activation.

## Good and Bad Examples

**Bad — decorative search**  
Search box at the top; every query returns zero results or only matches page titles. User returns to menu; trust in search is lost. Analyst notes: “search is decorative.”

**Good — recovery search**  
Results: Actions (commands), Records, Settings, Help articles. “Invite” returns both command and help. On zero result: “Create new customer” + “Search help” + similar spellings.

**Bad — filter first**  
Date, owner, tag, status, custom field… all mandatory; list is empty until Apply is clicked. First-timer gives up.

**Good — results first, then narrow**  
Broad results first, optional facets on left/top. Active filter can be removed as a chip. Heuristic: progressive filtering.

**Bad — language break**  
User types “musteri” (without ş); zero results. No tolerance for Turkish keyboard and spelling errors.

**Good — tolerant matching**  
Typo suggestion + fuzzy; “müşteri” is suggested. For English UI labels, TR query matching (heuristic: synonym map).

## FirstClick Score Impact

- **clarity**: Scope text, result groups, empty result explanation. Unclear search lowers clarity.
- **adoption**: Speed of lost user returning to task. Good search saves adoption; bad search is a second drop-off.
- **onboardingRisk**: If both menu and search fail in the first session, risk is high. Example queries for first-timers reduce risk.
- Confusion: pile of irrelevant results; friction: slow/broken search; trust: permission inconsistency.
- Landing “smart search / AI search” promise vs. simple string match → [web:…] contradiction.

## Action Checklist

1. Is there a search UI in the corpus? Quote the placeholder and scope text.
2. Note how result types are separated (icon, group, tab).
3. Describe the zero result screen: just a message, or is there a CTA?
4. Mark whether filters are mandatory or optional.
5. Check for TR language/spelling tolerance or synonym hints.
6. Check for keyboard shortcut and accessible label ([kb:58-accessibility]).
7. Evaluate how paywalled results are marked (lock icon + clear plan language).
8. When writing suggestions, do not invent new features; if not in corpus, write “did not see global search in corpus; IA/nav recovery risk.”

## Attribution Discipline

- Product search behavior: [doc:…] / [web:…].
- Search UX rules: [kb:53-search-ux].
- If zero result empty pattern overlaps with general empty: [kb:55-empty-loading-error-states] + this file.
- Do not claim “Fuzzy search increases conversion by %X”; write heuristic and observed friction.
- Link previous “user got lost in search” findings with [past:…].

## Analyst Implementation Note

The search chunk should include these words: scope, autocomplete, zero result, facet, fuzzy/typo, command vs record. Example persona sentence: “busy-professional searches ‘notification’ with Cmd+K; only old tickets appear in results, no Settings path → missed adoption recovery, friction medium.”

## Deep Implementation: Layers of Search Quality

FirstClick reads search in three layers: entry (where, how to open), matching (what is found), post-result (what is done next). If one layer is strong but others are weak, the user still abandons.

**Entry layer**: Is global search in the top bar, or only on list pages? Does the placeholder carry scope? Is there a keyboard shortcut? Is the search icon in the thumb zone on mobile? These determine adoption recovery potential.

**Matching layer**: Exact match, prefix, fuzzy, synonym. In TR products, i/ı, ş/s, English label + Turkish query often break. If behavior is not visible in corpus, write “typo tolerance not observed”; do not invent fuzzy engine claims. If there is an AI search promise ([web:…]) but results look like simple string match, note drift.

**Post-result**: Does clicking a result go to the correct record, or just a general list? Is there an explanation for unauthorized results? Is plan language clear for locked results? Read price-sensitive bait feeling here.

**Command search**: Intents like “create invoice” should be separated as commands. If not, it's confusion. Help article results can be a lifesaver for first-timers; if only old records are returned, educational escape is lost.

**Analytics trap**: “Search was used” can be vanity ([kb:65-product-analytics]). For FirstClick, what matters is task completion after search; if this event is not in corpus, do not write speculative success.

Zero result empty is different from general empty: filter empty is “clear filters,” first empty is “create,” search zero is “correct spelling / go by category / create.” Giving all three with the same text creates confusion.

RAG chunk keys: scope, autocomplete, facet, zero result, fuzzy, synonym, command vs record, permission, AI search drift.

## Scenario Lab: Search Recovery

**Scenario A:** User can't find “invoice number format” in settings menu; search for “invoice” returns zero results (UI in Turkish). No TR-EN synonym. clarity↓. Suggestion: synonym / dual language label (heuristic).

**Scenario B:** Busy-professional types “invite” with Cmd+K; only old messages appear, no command. Activation escape missed ([kb:62-activation]).

**Scenario C:** Price-sensitive user searches “report”; first three results are locked Pro. Feels like bait. Suggestion: clear plan on locked items + free alternative path.

**Scenario D:** Search with filters on; user thinks there is no data due to zero result. Empty text does not mention filter ([kb:55-empty-loading-error-states]).

FirstClick does not fabricate search logs. If there is a “popular searches” UI in corpus, quote it; if not, do not write speculative query lists. Suggesting example query UI is appropriate as it is an observable UX pattern.

## Operational Control: Search QA List (Analyst)

1. Record the scope text as is. 2. Write the types of the first three results (command/record/setting/help). 3. Intentionally create a typo scenario — if corpus is not interactive, write “not observed.” 4. List zero result CTAs. 5. Note search behavior with active filter. 6. Quote paywalled result marking. 7. Compare landing “smart search” claim. 8. Add a single recovery sentence to persona note.

Search is the barometer of IA and nav failure. Heavy search usage does not mean the product is “discoverable”; sometimes it means “users are getting lost” ([kb:65-product-analytics]). FirstClick does not write speculative search volume; if there is no “frequent searches” in UI, do not make this comment.
