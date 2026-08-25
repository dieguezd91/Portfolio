/**
 * Authored icon set. One grid (24), one stroke weight (1.5), round caps.
 * Brand marks (GitHub, LinkedIn, itch.io, Linktree, Google Play) come from
 * react-icons — those are logos, not icons, and must keep their own form.
 */

const base = {
  width: '1em',
  height: '1em',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function ArrowUpRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8 16 16 8" />
      <path d="M9.5 8H16v6.5" />
    </svg>
  );
}

export function ArrowDown(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14" />
      <path d="M6.5 13.5 12 19l5.5-5.5" />
    </svg>
  );
}

export function Download(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v10.5" />
      <path d="M7.5 10.5 12 15l4.5-4.5" />
      <path d="M5 18.5h14" />
    </svg>
  );
}

export function Menu(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </svg>
  );
}

export function Close(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

/** Identity mark — the same letterform as the favicon. */
export function Monogram({ className = '' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 4h10c7.7 0 12 4.9 12 12s-4.3 12-12 12H6z" fill="currentColor" />
      <path
        d="M12 9.5h3.6c4.1 0 6.4 2.4 6.4 6.5s-2.3 6.5-6.4 6.5H12z"
        fill="#FF5C29"
      />
    </svg>
  );
}
