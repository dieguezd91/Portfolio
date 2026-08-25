import { otherProjects } from '../data/projects';
import Section from './Section';
import Reveal from './Reveal';
import { ArrowUpRight } from './icons';

function ProjectEntry({ project, index }) {
  const { title, year, platform, dimension, technologies, storeUrl, media, mediaWidth, mediaHeight } =
    project;

  return (
    <Reveal as="li" delay={Math.min(index, 5) * 0.04}>
      <a
        href={storeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="media-quiet group block"
      >
        <div className="media-frame aspect-[16/10]">
          <img
            src={media}
            width={mediaWidth}
            height={mediaHeight}
            alt={`Key art from ${title}`}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 border-b border-[color:var(--color-rule)] pb-4 transition-colors duration-300 group-hover:border-[color:var(--color-rule-strong)]">
          <div className="min-w-0">
            <h3
              className="truncate text-[1.0625rem] text-[color:var(--color-bone)]"
              style={{ fontVariationSettings: "'wdth' 106, 'wght' 600", letterSpacing: '-0.015em' }}
              title={title}
            >
              {title}
            </h3>
            <p className="type-meta tabular mt-2 text-[color:var(--color-dim)]">
              {year} · {platform} · {dimension}
            </p>
          </div>

          <ArrowUpRight
            className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-dim)] transition-colors duration-300 group-hover:text-[color:var(--color-signal)]"
          />
        </div>

        <p className="type-meta mt-3 text-[color:var(--color-dim)]">
          {technologies.join(' · ')}
        </p>
      </a>
    </Reveal>
  );
}

export default function MoreWork() {
  return (
    <Section
      id="more-work"
      heading="More work"
      lede="The rest of the catalogue, across Unity, C# and four target platforms. Each entry links straight to its playable page."
      count={`${otherProjects.length} projects`}
      className="pt-20 sm:pt-24 lg:pt-28"
    >
      <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:grid-cols-4">
        {otherProjects.map((project, i) => (
          <ProjectEntry key={project.id} project={project} index={i} />
        ))}
      </ul>
    </Section>
  );
}
