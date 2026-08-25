# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** technical leads and senior gameplay programmers at game studios, evaluating Daniel Dieguez for a **Unity gameplay/systems programmer** role. They are reading to judge engineering substance and whether he can own features end to end. They arrive from a job application, a LinkedIn profile, or a referral link, often with several candidate portfolios open at once, and they will follow through to a store listing or a playable build if the site makes that easy.

**Secondary (present, not the target):** studio recruiters and HR screeners who reach the site first and need role fit, a shipped title, and the resume without hunting. The site must not fail them, but it is not tuned for them.

## Product Purpose

A personal portfolio site for Daniel Dieguez that converts a technically literate reader into a candidate conversation. Success is a hiring dev leaving convinced he can own gameplay and systems work, and taking one of the exit actions: opening a project's store or itch.io page, downloading the resume, or making contact.

## Positioning

**The differentiator is the shipped release.** *Slash 'em Out!* is a real Android game, live on Google Play (`com.astroriftgames.slashemout`). A peer portfolio at the same career stage cannot honestly claim a published store title; almost all of them stop at itch.io. This is the strongest true claim on the site.

**Confirmed scope of work on *Slash 'em Out!*** — this list is authoritative and replaces the legacy contribution copy in `projects.js`, which is known to be inaccurate for this title:

- Unity developer, focused primarily on **game systems**
- **Google Play deployment and release**
- **Ads integration**
- **In-app purchase (IAP) integration**

Nothing beyond these four may be claimed about this project.

**Supporting, and true:**

- **Range across platforms and dimensions.** Eleven projects spanning Android, Meta Quest (VR), WebGL, and PC; 2D and 3D. Breadth of platform and target is verifiable from the store links themselves.
- **Formal study in game development.** Universidad Argentina De la Empresa, Video Game Development, 2022–2025. See the status caveat under Evidence on Hand.

**Explicitly NOT positioning evidence, and never rendered.** The legacy per-project contribution and role copy inherited from the previous portfolio is of **unverified accuracy**. Specific implementation claims of the kind it contains — pathfinding, state machines, object pooling, spawning algorithms, difficulty scaling, physics-based controls, SDK integrations, custom engines, and similar — are governed by the rule below.

**The verification rule.** Unverified contributions and roles:

- **may** remain stored as legacy or reference data (`legacyContributions` / `legacyRole` in `src/data/projects.js`);
- **must not** be rendered anywhere in the UI as Daniel's responsibilities;
- **must not** be used as positioning, headline copy, hero claims, or proof of responsibility;
- **may only** become visible after explicit verification — at which point the confirmed lines move into `contributions` / `role` and the project is marked `verified: true`.

*Slash 'em Out!* is currently the **only** project with a verified personal scope of work. No other project may display one until its responsibilities are confirmed.

This rule also applies to skills: a visible skill must be established by confirmed product truth. A project's target platform does not establish personal expertise in that platform's SDK.

## Operating Context

- Read on desktop and mobile, in English, usually inside a hiring evaluation with limited time per candidate.
- The reader's next step is almost always **off-site**: a Google Play listing, an itch.io page, a GitHub profile, a LinkedIn profile, or a downloaded PDF resume. The site's job is to earn and route those clicks, not to hold the visitor.
- Project evidence is currently static imagery (itch.io-hosted thumbnails plus one local PNG). There is no playable embed and no gameplay video on the site.

## Capabilities and Constraints

**Stack (existing, settled):** React 19, Vite 7, Tailwind CSS v4 (`@theme` in `src/index.css`), Framer Motion 12, react-icons. Single-page application, no router, no backend, static hosting.

**Content model:** project data lives in `src/data/projects.js` — 11 entries with `title`, `year`, `role`, `description`, `platform`, `storeType` (`googlePlay` | `itch`), `storeUrl`, `media`, `dimension` (2D/3D), `technologies[]`, and `contributions[]`.

**Verification debt (open):** the legacy contribution copy and role strings for every project other than *Slash 'em Out!* are inherited from the previous portfolio and have not been verified against what Daniel actually built. They are held in `legacyContributions` / `legacyRole`, are never rendered, and are not product truth. The *Slash 'em Out!* legacy entry was confirmed inaccurate and is superseded by the confirmed scope in Positioning.

**Section architecture (target):** Hero → Featured Work → More Work → About → Skills & Tools → Education → Contact.

**About and Contact** are required sections. The existing `src/components/About.jsx` and `src/components/Contact.jsx` are obsolete dead code — replace them, do not restore them.

**Positioning weight:** Unity, C#, gameplay and systems lead. Web and frontend skills are **secondary** and are presented as such, not as a co-equal block.

**Undecided / not established:**

- Final About copy. No biography text beyond the hero role line is confirmed.
- Whether contact stays routed through Linktree or gains a direct email.
- Region, work authorization, and remote/on-site preference are not stated anywhere and must not be invented.

## Brand Commitments

- **Name:** Daniel Dieguez. Page title: "Daniel Dieguez - Game Developer".
- **Role line, as written by the user:** "Game Developer specializing in gameplay and systems, taking ownership of features from concept to implementation with a strong engineering mindset."
- **Availability line, as written by the user:** "Available for game development opportunities."
- **Studio association:** some projects are published under **Astro Rift Games** (`astroriftgames.itch.io`, and the Google Play package id) rather than his personal account. Both identities are real; do not merge or erase either.
- Voice is factual and technical. No hype adjectives, no invented metrics, and no borrowed credit for work not confirmed.

## Evidence on Hand

**Verified:**

- Live Google Play listing: `https://play.google.com/store/apps/details?id=com.astroriftgames.slashemout`, with the four confirmed work items in Positioning
- itch.io pages for 10 titles across `danidieguez.itch.io`, `astroriftgames.itch.io`, and `tomas-taboada.itch.io` — the existence, title, platform, and store link of each project
- GitHub: `https://github.com/dieguezd91` · LinkedIn: `https://www.linkedin.com/in/daniel-dieguez/` · itch.io: `https://danidieguez.itch.io` · Linktree: `https://linktr.ee/daniel_dieguez`
- Resume: Google Docs PDF export
- Local assets: `public/SlashEmOut.png`, `public/Portfolio_BG.jpeg`, `public/google-play-badge.svg`, `src/assets/Profile_pic.jpg`

**Confirmed commercial outcome:** *Müecas Game*, the advergame produced for the MÜECAS cereal brand, was a **commercial project that generated revenue**. This is confirmed and may be presented as a project-level fact. The amounts, sales figures, conversion rates, and every other financial metric are **unknown** and must never be invented, estimated, or implied.

**Unverified — stored only, never rendered:** all legacy contribution bullets and role strings in `projects.js` other than the *Slash 'em Out!* scope confirmed above. See the verification rule in Positioning.

**Education status — do not overstate.** The previous UI listed "Bachelor's Degree in Video Game Development, 2022 - 2025" at Universidad Argentina De la Empresa. Completion is **not confirmed**; that string is legacy UI copy, not a verified credential. The programme is **confirmed ongoing** — Daniel is currently studying, and both About and Education must say so consistently rather than leaving the entry ambiguous. No wording anywhere may imply it was completed: do not assert a conferred degree, and **show no dates at all** — any range, open or closed, implies a completion status that is not confirmed. Mark the ongoing state with a status ("In progress"), never with a date. Present the field of study, the institution, and the kind of programme only, until completion is explicitly confirmed. The same applies to Coderhouse (Web development) and the two Udemy courses (Game Production & Design; Unity Programming with C#): dates are held in this file as reference, not rendered. The dates on record are UADE 2022–2025, Coderhouse 2022, and both Udemy courses 2023, all from legacy UI copy.

**Absent — must never be fabricated:** download or install counts, ratings or review scores, **any revenue amount, sales figure, conversion rate or other financial metric** (the fact that *Müecas Game* generated revenue is confirmed; every number attached to it is not), team sizes, studio employment history, client names beyond the MÜECAS advergame already in the data, testimonials, press coverage, awards, or any performance benchmark. Gameplay video and playable embeds do not exist on the site; do not reference them as if they do.

**Fragile:** every itch.io thumbnail is hotlinked to `img.itch.zone`. Those URLs are outside the project's control and can change or disappear.

## Product Principles

1. **The shipped release leads.** *Slash 'em Out!* on Google Play is the differentiator and earns the most prominent placement of any single piece of evidence — on the strength of being shipped, released, and monetized, not on implementation detail.
2. **Verified beats specific.** A precise technical claim that has not been confirmed is a liability, not proof. Where verification is thin, lean on what a store link, a platform, or a build can demonstrate on its own.
3. **Route the reader outward.** Every project reaches its store or itch.io page in one click; resume and contact are never more than one action away. A visitor who leaves for a playable build is a success, not a bounce.
4. **Depth over breadth for the primary reader.** Weight the page toward Unity gameplay and systems; keep web and frontend present but subordinate.
5. **Claim only what can be backed.** No invented metrics, credentials, or social proof, and no upgrade of an unverified line into a headline.

## Accessibility & Inclusion

No product-specific standard has been established. Baseline obligations apply: keyboard operability with visible focus, WCAG AA contrast, and a `prefers-reduced-motion` path — the previous build animated heavily with no such path, which is a known gap to close rather than carry forward.
