import { SiGoogleplay, SiItchdotio } from 'react-icons/si';
import { featuredProjects } from '../data/projects';
import Section from './Section';
import Reveal from './Reveal';
import { ArrowUpRight } from './icons';

const storeMeta = {
  googlePlay: { Icon: SiGoogleplay, label: 'View on Google Play' },
  itch: { Icon: SiItchdotio, label: 'View on itch.io' },
};

function CaseStudy({ project, index }) {
  const {
    title,
    year,
    role,
    description,
    platform,
    dimension,
    technologies,
    contributions,
    storeType,
    storeUrl,
    media,
    mediaWidth,
    mediaHeight,
    studio,
    status,
    verified,
  } = project;

  const { Icon, label } = storeMeta[storeType];

  /* Wide captures fill their mount; square, portrait and small captures sit
     centred at their own scale, capped at a 1.25x upscale. A weak source is a
     media-treatment problem, never a reason to rank a project lower. */
  const wide = mediaWidth / mediaHeight >= 1.4;

  /* Only confirmed facts reach the spec table. `role` is rendered solely for
     verified projects — see PRODUCT.md § Positioning. */
  const spec = [
    ['Year', String(year)],
    ...(verified && role ? [['Role', role]] : []),
    ['Platform', platform],
    ['Build', `${dimension} · ${technologies.join(' · ')}`],
    ...(studio ? [['Studio', studio]] : []),
  ];

  return (
    <article className="border-t border-[color:var(--color-rule)] pt-10 sm:pt-12 lg:pt-16">
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12 lg:items-start">
        {/* Plate */}
        <Reveal className="lg:col-span-7">
          <figure
            className={`media-frame ${wide ? '' : 'media-plate'}`}
            style={{ aspectRatio: wide ? `${mediaWidth} / ${mediaHeight}` : '16 / 10' }}
          >
            <img
              src={media}
              width={mediaWidth}
              height={mediaHeight}
              alt={`Gameplay from ${title}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              style={wide ? undefined : { height: `min(100%, ${Math.round(mediaHeight * 1.25)}px)` }}
            />
          </figure>
        </Reveal>

        {/* Record */}
        <Reveal delay={0.06} className="lg:col-span-5 lg:col-start-8">
          {/* Project-level fact only — never a personal contribution claim. */}
          {status && (
            <p className="mb-4 flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-signal)]"
              />
              <span className="type-meta text-[color:var(--color-signal)]">{status}</span>
            </p>
          )}

          <h3 className="type-title text-[clamp(1.6rem,3vw,2.25rem)] text-[color:var(--color-bone)]">
            {title}
          </h3>

          <p className="type-body mt-4 max-w-[54ch] text-[0.9375rem] text-[color:var(--color-muted)]">
            {description}
          </p>

          <dl className="mt-7 border-t border-[color:var(--color-rule)]">
            {spec.map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-[color:var(--color-rule)] py-2.5"
              >
                <dt className="type-meta text-[color:var(--color-dim)]">{k}</dt>
                <dd className="type-meta tabular text-[color:var(--color-muted)]">{v}</dd>
              </div>
            ))}
          </dl>

          {/* Rendered only where responsibilities are confirmed. */}
          {verified && contributions?.length > 0 && (
            <div className="mt-7">
              <h4 className="type-meta text-[color:var(--color-dim)]">Scope of work</h4>
              <ul className="mt-3 space-y-2">
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

          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-rule type-meta mt-5 inline-flex text-[color:var(--color-bone)]"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span>
              {label}
              <span className="sr-only"> — {title}</span>
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </article>
  );
}

export default function FeaturedWork() {
  return (
    <Section
      id="work"
      heading="Featured work"
      lede="Three projects in depth — what each one is, what it was built with, and where to play it."
      className="pt-20 sm:pt-24 lg:pt-28"
    >
      <div className="mt-14 space-y-16 sm:space-y-20 lg:mt-20 lg:space-y-28">
        {featuredProjects.map((project, i) => (
          <CaseStudy key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
