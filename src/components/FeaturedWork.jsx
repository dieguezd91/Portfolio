import { SiGoogleplay, SiItchdotio } from 'react-icons/si';
import { featuredProjects } from '../data/projects';
import Section from './Section';
import Reveal from './Reveal';
import { ArrowUpRight } from './icons';

const storeMeta = {
  googlePlay: { Icon: SiGoogleplay, label: 'View on Google Play' },
  itch: { Icon: SiItchdotio, label: 'View on itch.io' },
};

function StatusMark({ status }) {
  /* Project-level fact only — never a personal contribution claim. */
  if (!status) return null;
  return (
    <p className="mb-4 flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-signal)]"
      />
      <span className="type-meta text-[color:var(--color-signal)]">{status}</span>
    </p>
  );
}

function StoreLink({ project, className = '' }) {
  const { Icon, label } = storeMeta[project.storeType];
  return (
    <a
      href={project.storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-rule type-meta inline-flex text-[color:var(--color-bone)] ${className}`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>
        {label}
        <span className="sr-only"> — {project.title}</span>
      </span>
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

function Plate({ project, ratio, eager = false, className = '' }) {
  const { media, mediaWidth, mediaHeight, title, mediaKind } = project;
  const isKeyArt = mediaKind === 'keyArt';

  /* Key art keeps its own aspect and a mat, so it is never stretched into an
     imitation of gameplay imagery. Width is set by the caller, so two plates
     of different kinds still read as equal rank. */
  return (
    <figure
      className={`media-frame ${isKeyArt ? 'media-keyart' : ''} ${className}`}
      style={{ aspectRatio: isKeyArt ? `${mediaWidth} / ${mediaHeight}` : ratio }}
    >
      <img
        src={media}
        width={mediaWidth}
        height={mediaHeight}
        alt={isKeyArt ? `Key art for ${title}` : `Gameplay from ${title}`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </figure>
  );
}

/**
 * Primary case study — the shipped release, with verified role and scope.
 * It earns the largest plate, the full spec table and the scope-of-work list.
 */
function PrimaryCase({ project }) {
  const {
    title, year, role, description, platform, dimension,
    technologies, contributions, studio, status, verified,
  } = project;

  const spec = [
    ['Year', String(year)],
    ...(verified && role ? [['Role', role]] : []),
    ['Platform', platform],
    ['Build', `${dimension} · ${technologies.join(' · ')}`],
    ...(studio ? [['Studio', studio]] : []),
  ];

  return (
    <article className="grid gap-x-10 gap-y-7 lg:grid-cols-12 lg:items-start">
      <Reveal className="lg:col-span-7">
        <Plate project={project} ratio="16 / 9" eager />
      </Reveal>

      <Reveal delay={0.06} className="lg:col-span-5 lg:col-start-8">
        <StatusMark status={status} />

        <h3 className="type-title text-[clamp(1.6rem,2.8vw,2.125rem)] text-[color:var(--color-bone)]">
          {title}
        </h3>

        <p className="type-body mt-3 max-w-[54ch] text-[0.9375rem] text-[color:var(--color-muted)]">
          {description}
        </p>

        <dl className="mt-5 border-t border-[color:var(--color-rule)]">
          {spec.map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-[color:var(--color-rule)] py-2"
            >
              <dt className="type-meta text-[color:var(--color-dim)]">{k}</dt>
              <dd className="type-meta tabular text-[color:var(--color-muted)]">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Rendered only where responsibilities are confirmed. */}
        {verified && contributions?.length > 0 && (
          <div className="mt-5">
            <h4 className="type-meta text-[color:var(--color-dim)]">Scope of work</h4>
            <ul className="mt-2.5 space-y-1.5">
              {contributions.map((c) => (
                <li
                  key={c}
                  className="type-body grid grid-cols-[0.75rem_minmax(0,1fr)] gap-3 text-[0.9375rem] text-[color:var(--color-bone)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.68em] h-px w-3 bg-[color:var(--color-signal)]"
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <StoreLink project={project} className="mt-3" />
      </Reveal>
    </article>
  );
}

/**
 * Secondary featured project — still Featured Work, but a compact composition.
 * Less verified information is available, so it does not claim the same
 * vertical footprint as the primary case study.
 */
function SecondaryCase({ project, index }) {
  const { title, year, description, platform, dimension, technologies, status } = project;

  return (
    <Reveal as="article" delay={0.05 + index * 0.06}>
      {/* Both plates share one width cap, so a gameplay capture and a piece of
          key art read as equal rank despite different treatments and heights.
          The record below always spans the full column. */}
      <Plate project={project} ratio="4 / 3" className="max-w-[28rem]" />

      <div className="mt-5">
        <StatusMark status={status} />

        <h3 className="type-title text-[1.25rem] text-[color:var(--color-bone)]">{title}</h3>

        <p className="type-body mt-2.5 max-w-[52ch] text-[0.9375rem] text-[color:var(--color-muted)]">
          {description}
        </p>

        <p className="type-meta tabular mt-4 border-t border-[color:var(--color-rule)] pt-3 text-[color:var(--color-dim)]">
          {year} · {platform} · {dimension} · {technologies.join(' · ')}
        </p>

        <StoreLink project={project} className="mt-1" />
      </div>
    </Reveal>
  );
}

export default function FeaturedWork() {
  const [primary, ...secondary] = featuredProjects;

  return (
    <Section
      id="work"
      heading="Featured work"
      lede="Three projects in depth — what each one is, what it was built with, and where to play it."
      className="pt-16 sm:pt-20 lg:pt-24"
    >
      <div className="mt-10 lg:mt-14">
        <PrimaryCase project={primary} />
      </div>

      {/* Two structurally equal columns across the full content width. The
          plates cap their own width so neither source is over-enlarged; the
          records fill the column, which is what keeps the pair balanced. */}
      <div className="mt-14 border-t border-[color:var(--color-rule)] pt-10 lg:mt-16 lg:pt-12">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {secondary.map((project, i) => (
            <SecondaryCase key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
