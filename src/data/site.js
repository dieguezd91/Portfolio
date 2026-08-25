/**
 * Durable site facts. Every string here is confirmed — see PRODUCT.md.
 * Nothing in this file may be invented: no metrics, no credentials,
 * no claims the repository cannot back.
 */

export const site = {
  name: 'Daniel Dieguez',
  role: 'Unity Gameplay & Systems Developer',

  /* Brand commitment — preserved verbatim from PRODUCT.md. Kept on record;
     not used in the hero, where it repeated the headline's positioning. */
  roleLine:
    'Game Developer specializing in gameplay and systems, taking ownership of features from concept to implementation with a strong engineering mindset.',

  /* Hero supporting line. Adds demonstrated project and platform range rather
     than restating the headline; asserts no implementation responsibilities. */
  heroSupport:
    'Game Developer with experience building and shipping projects across mobile, PC, WebGL and VR.',
  availability: 'Available for game development opportunities',

  resumeUrl:
    'https://docs.google.com/document/d/1HPbOMsd2OPtrPolEdgYsLw9HlJyP51cpGVxyOe_9Pgg/export?format=pdf',
  resumeFilename: 'Daniel_Dieguez_CV.pdf',

  contactUrl: 'https://linktr.ee/daniel_dieguez',

  links: [
    { label: 'GitHub', handle: 'dieguezd91', href: 'https://github.com/dieguezd91' },
    { label: 'LinkedIn', handle: 'daniel-dieguez', href: 'https://www.linkedin.com/in/daniel-dieguez/' },
    { label: 'itch.io', handle: 'danidieguez', href: 'https://danidieguez.itch.io' },
    { label: 'Linktree', handle: 'daniel_dieguez', href: 'https://linktr.ee/daniel_dieguez' },
  ],
};

export const navSections = [
  { id: 'work', label: 'Featured' },
  { id: 'more-work', label: 'More work' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Skills. Game development leads; web and tooling are deliberately
 * subordinate — see PRODUCT.md § Capabilities and Constraints.
 */
export const skills = {
  primary: {
    heading: 'Game development',
    groups: [
      { label: 'Engine', items: ['Unity', 'Unity XR / Oculus SDK'] },
      { label: 'Language', items: ['C#', '.NET'] },
      { label: 'Discipline', items: ['Gameplay programming', 'Game systems', 'Game design', 'VR development'] },
      { label: 'Targets', items: ['Android', 'Meta Quest', 'WebGL', 'PC / Windows'] },
    ],
  },
  release: {
    heading: 'Release & live operations',
    items: ['Google Play deployment', 'Ads integration', 'In-app purchases'],
  },
  secondary: {
    heading: 'Web & tooling',
    items: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Node.js', 'Git'],
  },
};

/**
 * Education — presented conservatively. Field of study, institution and dates
 * only; completion of the UADE programme is NOT confirmed, so no degree is
 * asserted. See PRODUCT.md § Evidence on Hand.
 */
export const education = [
  {
    id: 1,
    programme: 'Video Game Development',
    institution: 'Universidad Argentina De la Empresa',
    kind: 'University programme',
    years: '2022 — 2025',
  },
  {
    id: 2,
    programme: 'Web Development',
    institution: 'Coderhouse',
    kind: 'Course',
    years: '2022',
  },
  {
    id: 3,
    programme: 'Game Production & Design',
    institution: 'Udemy',
    kind: 'Course',
    years: '2023',
  },
  {
    id: 4,
    programme: 'Unity Programming with C#',
    institution: 'Udemy',
    kind: 'Course',
    years: '2023',
  },
];
