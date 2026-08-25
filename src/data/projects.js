/**
 * Project catalogue.
 *
 * CONTRIBUTIONS — read PRODUCT.md § Positioning before changing this.
 *
 *   `contributions` is rendered in the UI as Daniel's personal scope of work.
 *   It may therefore only be populated for projects whose responsibilities have
 *   been independently confirmed, and those projects carry `verified: true`.
 *
 *   `legacyContributions` holds the unverified copy inherited from the previous
 *   portfolio. It is retained so nothing is lost, and it is NEVER rendered.
 *   To promote an entry: confirm the responsibilities, move the accurate lines
 *   into `contributions`, and set `verified: true`. The presentation layer needs
 *   no change — it reads `contributions` only.
 *
 *   The same rule applies to `role`. It is rendered only when `verified`.
 *   Unverified role strings live in `legacyRole`.
 *
 * MEDIA — `mediaWidth` / `mediaHeight` are the true pixel dimensions of the
 * source image, measured from the served file. They set intrinsic size (no
 * layout shift) and let frames respect each image's real aspect ratio.
 * `mediaNote` records an asset that should be replaced with a better capture;
 * it is a production note, never a reason to rank a project lower.
 * Anything hosted on img.itch.zone is outside this project's control.
 *
 * FEATURED — `featured` is a presentation rank chosen on properties of the
 * projects themselves: commercial relevance, overall relevance, quality and
 * complexity of the project, recency, platform variety, and how well the set
 * represents the body of work. It is never justified by unverified claims
 * about personal contribution, and source image quality is a presentation
 * constraint handled by the media treatment, never a ranking input.
 *
 * STATUS — `status` is a project-level fact rendered above the title
 * (release state, commercial outcome). It describes the project, never
 * Daniel's personal responsibilities.
 */

export const projects = [
  {
    id: 10,
    title: "Slash 'em Out!",
    year: 2026,
    role: 'Unity Developer — Game Systems',
    description:
      'A 2D casual action game where moving is attacking. Every jump eliminates enemies and demands precision, combining reflexes, strategy, and frenetic pace.',
    platform: 'Android',
    storeType: 'googlePlay',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.astroriftgames.slashemout',
    studio: 'Astro Rift Games',
    media: '/SlashEmOut.png',
    mediaWidth: 640,
    mediaHeight: 360,
    mediaNote: 'Replace with a higher-resolution capture; this is the hero proof image.',
    dimension: '2D',
    technologies: ['Unity', 'C#', 'Android'],
    /* Confirmed scope of work — PRODUCT.md § Positioning. */
    contributions: [
      'Unity development focused on game systems.',
      'Google Play deployment and release.',
      'Ads integration.',
      'In-app purchase (IAP) integration.',
    ],
    verified: true,
    /* Retained, never rendered: inaccurate copy from the previous portfolio. */
    legacyContributions: [
      'Developed responsive physics-based movement controls on Android.',
      'Programmed enemy spawning algorithms and difficulty scaling.',
    ],
    /* Project-level fact, not a personal contribution claim. */
    status: 'Released on Google Play',
    featured: 1,
  },
  {
    id: 1,
    title: 'Clockwork Siege',
    year: 2025,
    legacyRole: 'Game Designer & Developer',
    description:
      'A 2D mobile strategy game blending Tower Defense tactics with a Roguelike Deckbuilder.',
    platform: 'Mobile',
    storeType: 'itch',
    storeUrl: 'https://danidieguez.itch.io/clockwork-siege',
    media: 'https://img.itch.zone/aW1nLzI0NTQ0NDkyLnBuZw==/315x250%23c/NbkGJG.png',
    mediaWidth: 315,
    mediaHeight: 250,
    mediaNote:
      'Only a 315x250 thumbnail is available; the /original/ variant 404s. Needs a full-size capture.',
    dimension: '2D',
    technologies: ['Unity', 'C#', 'Mobile'],
    tags: ['Strategy', 'Deckbuilder'],
    legacyContributions: [
      'Implemented deck management and card draw mechanics.',
      'Created pathfinding logic for enemy waves.',
      'Designed dynamic UI elements for mobile devices.',
    ],
    featured: 0,
  },
  {
    id: 2,
    title: 'BinforcerVR',
    year: 2025,
    legacyRole: 'VR Developer',
    description:
      'A VR arcade educational game about sorting and recycling waste in zero gravity.',
    platform: 'Meta Quest',
    storeType: 'itch',
    storeUrl: 'https://danidieguez.itch.io/binforcervr',
    media: 'https://img.itch.zone/aW1nLzIzODc4MjQxLnBuZw==/original/6%2Bq1bX.png',
    mediaWidth: 524,
    mediaHeight: 551,
    dimension: '3D',
    technologies: ['Unity', 'C#', 'Meta Quest'],
    tags: ['VR', 'Educational'],
    legacyContributions: [
      'Programmed physics-based item sorting in zero gravity.',
      'Integrated Oculus SDK for hand tracking and grab mechanics.',
    ],
    featured: 3,
  },
  {
    id: 11,
    title: 'Flag Fights',
    year: 2026,
    legacyRole: 'Unity Developer — Gameplay',
    description:
      'A 3D capture-the-flag prototype about running, dodging enemies, stealing the flag, and bringing it back to base.',
    platform: 'Browser',
    storeType: 'itch',
    storeUrl: 'https://danidieguez.itch.io/flag-fights',
    media: 'https://img.itch.zone/aW1nLzI4MzY5NTY0LnBuZw==/original/0beslL.png',
    mediaWidth: 965,
    mediaHeight: 567,
    dimension: '3D',
    technologies: ['Unity', 'C#', 'WebGL'],
    legacyContributions: [
      'Developed round logic, scoring, and base returns.',
      'Programmed cooperative enemy AI chasing and evasion states.',
    ],
    featured: 0,
  },
  {
    id: 4,
    title: 'Project C.O.R.V.U.S.',
    year: 2024,
    legacyRole: 'Gameplay Programmer',
    description:
      'Survival horror with tactical combat and strategic character switching.',
    platform: 'PC / Windows',
    storeType: 'itch',
    storeUrl: 'https://astroriftgames.itch.io/project-corvus',
    studio: 'Astro Rift Games',
    media: 'https://img.itch.zone/aW1nLzIwNTE2NjU4LnBuZw==/315x250%23c/u3qUlB.png',
    mediaWidth: 315,
    mediaHeight: 250,
    mediaNote:
      'Only a 315x250 thumbnail is available; the /original/ variant 404s. Needs a full-size capture.',
    dimension: '2D',
    technologies: ['Unity', 'C#', 'PC'],
    tags: ['Survival Horror', 'Tactical'],
    legacyContributions: [
      'Developed three-character real-time switching mechanics.',
      'Implemented tactical combat state machines.',
      'Programmed inventory and resource management systems.',
    ],
    featured: 0,
  },
  {
    id: 5,
    title: 'Müecas Game',
    year: 2024,
    legacyRole: 'Lead Developer',
    description:
      'An endless runner advergame produced for the MÜECAS cereal brand.',
    platform: 'Browser',
    storeType: 'itch',
    storeUrl: 'https://astroriftgames.itch.io/muecas',
    studio: 'Astro Rift Games',
    media: 'https://img.itch.zone/aW1nLzE4NDA1MTAyLnBuZw==/347x500/WxMnkm.png',
    mediaWidth: 347,
    mediaHeight: 289,
    dimension: '2D',
    technologies: ['Unity', 'C#', 'WebGL'],
    tags: ['Endless Runner', 'Advergame'],
    legacyContributions: [
      'Programmed infinite terrain and obstacle generation.',
      'Integrated WebGL build optimization for desktop browsers.',
    ],
    /* Project-level fact, not a personal contribution claim. */
    status: 'Commercial project — generated revenue',
    featured: 2,
  },
  {
    id: 6,
    title: 'Arkanoid 3D',
    year: 2024,
    legacyRole: 'Game Developer',
    description: 'A 3D Arkanoid prototype with modern block-breaking mechanics.',
    platform: 'Browser',
    storeType: 'itch',
    storeUrl: 'https://danidieguez.itch.io/arkanoid-3d',
    media: 'https://img.itch.zone/aW1hZ2UvMjg0ODA3My8xNzAyMjMyNy5wbmc=/original/Nli7a4.png',
    mediaWidth: 1598,
    mediaHeight: 895,
    dimension: '3D',
    technologies: ['Unity', 'C#', 'WebGL'],
    tags: ['Arcade', 'Prototype'],
    legacyContributions: [
      'Programmed 3D paddle physics and ball deflection angles.',
      'Created modular block destruction triggers.',
    ],
    featured: 0,
  },
  {
    id: 3,
    title: 'Evolster',
    year: 2023,
    legacyRole: 'Game Developer',
    description: 'A bullet hell set in a horror world.',
    platform: 'PC / Windows',
    storeType: 'itch',
    storeUrl: 'https://danidieguez.itch.io/evolster',
    media: 'https://img.itch.zone/aW1nLzE3MjE0NDM4LnBuZw==/original/KN6nAD.png',
    mediaWidth: 1080,
    mediaHeight: 1087,
    dimension: '2D',
    technologies: ['Unity', 'C#', 'PC'],
    tags: ['Bullet Hell', 'Horror'],
    legacyContributions: [
      'Designed bullet pattern generation and pooling systems.',
      'Programmed player survival mechanics and health systems.',
    ],
    featured: 0,
  },
  {
    id: 7,
    title: "Wheelin' To Roll",
    year: 2023,
    legacyRole: 'Game Developer',
    description: 'A browser-playable survival game built around a single rolling mechanic.',
    platform: 'Browser',
    storeType: 'itch',
    storeUrl: 'https://danidieguez.itch.io/wheelin-to-roll',
    media: 'https://img.itch.zone/aW1nLzE0ODc1ODQ0LnBuZw==/original/07A6It.png',
    mediaWidth: 961,
    mediaHeight: 599,
    dimension: '3D',
    technologies: ['Unity', 'C#', 'WebGL'],
    tags: ['Survival', 'Action'],
    legacyContributions: [
      'Developed endless obstacle generation algorithms.',
      'Implemented score calculation and high score persistence.',
    ],
    featured: 0,
  },
  {
    id: 9,
    title: 'Cyber Realm: Shadows of Neo-City',
    year: 2022,
    legacyRole: 'Game Developer',
    description: "A pixel-art cyberpunk adventure with turn-based combat in Neo-City's depths.",
    platform: 'PC / Windows',
    storeType: 'itch',
    storeUrl: 'https://tomas-taboada.itch.io/cyberrealm',
    media: 'https://img.itch.zone/aW1nLzE0ODc1ODM5LnBuZw==/original/OHRs81.png',
    mediaWidth: 1919,
    mediaHeight: 1079,
    dimension: '2D',
    technologies: ['Unity', 'C#', 'PC'],
    tags: ['Cyberpunk', 'RPG'],
    legacyContributions: [
      'Programmed turn-based combat algorithms and stats calculation.',
      'Developed tilemap exploration and camera boundaries systems.',
    ],
    featured: 0,
  },
  {
    id: 8,
    title: 'Forbbiden Rhytms',
    year: 2022,
    legacyRole: 'Game Developer',
    description: 'A survival game driven by rhythm-based mechanics.',
    platform: 'PC / Windows',
    storeType: 'itch',
    storeUrl: 'https://danidieguez.itch.io/forbbiden-rhytms',
    media: 'https://img.itch.zone/aW1nLzE3MjE0Njk3LnBuZw==/original/adoidh.png',
    mediaWidth: 1280,
    mediaHeight: 720,
    dimension: '2D',
    technologies: ['C#', 'Console App'],
    tags: ['Rhythm', 'Survival'],
    legacyContributions: [
      'Created custom rhythm engine driven by system timers.',
      'Implemented command-line drawing loop for arcade rendering.',
    ],
    featured: 0,
  },
];

/** Case studies shown in full, ranked by professional relevance. */
export const featuredProjects = projects
  .filter((p) => p.featured > 0)
  .sort((a, b) => a.featured - b.featured);

/** The rest of the catalogue, newest first. Lower presentation priority only. */
export const otherProjects = projects
  .filter((p) => !p.featured)
  .sort((a, b) => b.year - a.year);
