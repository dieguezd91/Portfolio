import { motion as Motion } from 'framer-motion';
import { projects } from '../data/projects';

const storeMeta = {
  itch: {
    label: 'itch.io',
    badgeClassName: 'border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-100',
  },
  googlePlay: {
    label: 'Google Play',
    badgeClassName: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-100',
  },
  external: {
    label: 'External link',
    badgeClassName: 'border-cyan-400/20 bg-cyan-500/10 text-cyan-100',
  },
};

function ProjectCard({
  title,
  year,
  role,
  description,
  tags = [],
  technologies = [],
  highlights = [],
  platform,
  storeType = 'external',
  storeUrl,
  ctaLabel,
  media,
  mediaType,
  index,
}) {
  const chips = technologies.length > 0 ? technologies : tags;
  const meta = storeMeta[storeType] ?? storeMeta.external;
  const actionLabel = ctaLabel || `Open ${title}`;
  const cardLabel = `${title} - ${actionLabel}`;
  const badges = [];

  if (platform) {
    badges.push({
      key: 'platform',
      label: platform,
      className: 'border border-white/[0.08] bg-white/[0.04] text-zinc-300',
    });
  }

  if (storeType !== 'itch') {
    badges.push({
      key: storeType,
      label: meta.label,
      className: meta.badgeClassName,
    });
  }

  return (
    <Motion.a
      href={storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={cardLabel}
      title={cardLabel}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="group relative bg-[#0F1020] rounded-lg overflow-hidden hud-card"
    >
      <div className="aspect-video overflow-hidden bg-[#14162A] relative">
        {mediaType === 'video' ? (
          <video autoPlay loop muted playsInline className="w-full h-full object-cover object-center">
            <source src={media} type="video/mp4" />
          </video>
        ) : media ? (
          <img
            src={media}
            alt={title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        ) : (
          <div
            className="relative flex h-full w-full items-end overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(0,245,212,0.24),_transparent_42%),linear-gradient(135deg,_#0F1020_0%,_#1C1F3A_55%,_#14162A_100%)]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.07)_0,rgba(255,255,255,0.02)_35%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.12)_0,transparent_18%),radial-gradient(circle_at_25%_75%,rgba(0,245,212,0.18)_0,transparent_20%)] opacity-80" />
            <div className="relative z-10 flex w-full items-end p-5 sm:p-6 md:p-8">
              <h3 className="max-w-xs font-heading text-2xl md:text-3xl font-semibold leading-tight text-white">
                {title}
              </h3>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 relative">
        {badges.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge.key}
                className={`font-body rounded-full px-3 py-1 text-xs font-medium ${badge.className}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}

        <h3 className="font-heading text-lg md:text-xl font-semibold text-white mb-1 group-hover:text-[#00F5D4] transition-colors duration-150">
          {title}{' '}
          {year ? (
            <span className="font-body text-sm text-zinc-400 font-normal">({year})</span>
          ) : null}
        </h3>

        <p className="font-body text-sm text-zinc-400 font-medium mb-3">{role}</p>

        <p className="font-body font-normal text-base text-zinc-300 mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {highlights.length > 0 && (
          <ul className="mb-4 space-y-2">
            {highlights.slice(0, 4).map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-sm text-zinc-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00F5D4]" />
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="font-body bg-white/[0.04] border border-white/[0.08] text-zinc-400 px-3 py-1 rounded-full text-sm transition-colors duration-150"
            >
              {chip}
            </span>
          ))}
        </div>

        {ctaLabel && (
          storeType === 'googlePlay' ? (
            <div className="mt-5 inline-flex items-center">
              <img
                src="/google-play-badge.svg"
                alt={ctaLabel}
                className="h-12 w-auto transition-transform duration-150 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-200 transition-colors duration-150 group-hover:border-[#00F5D4]/30 group-hover:bg-[#00F5D4]/10 group-hover:text-white">
              <span className="h-2 w-2 rounded-full bg-[#00F5D4]" />
              {ctaLabel}
            </div>
          )
        )}
      </div>
    </Motion.a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-[#14162A] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-white">
            Projects
          </h2>
          <Motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="h-1 bg-[#00F5D4]/50 mx-auto mb-6"
          />
          <p className="font-body font-normal text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Projects and prototypes built during my professional training and indie game development journey.
          </p>
          </Motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
