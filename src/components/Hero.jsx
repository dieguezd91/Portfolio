import { motion as Motion, useReducedMotion } from 'framer-motion';
import { SiGoogleplay } from 'react-icons/si';
import { site } from '../data/site';
import { featuredProjects } from '../data/projects';
import { ArrowDown, ArrowUpRight, Download } from './icons';


/**
 * First viewport: the thesis on the left, the proof on the right.
 *
 * The shipped title sits beside the claim rather than three screens below it,
 * presented as a release record — media, spec, store link — so a hiring
 * engineer can verify the strongest fact on the page without scrolling.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const shipped = featuredProjects[0];

  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section
      id="top"
      className="relative px-6 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 lg:pb-20 lg:pt-36"
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-x-10 gap-y-12 lg:grid-cols-12 lg:items-start">
        {/* ── Thesis ─────────────────────────────────────────────────────── */}
        <div className="lg:col-span-7 xl:col-span-6">
          <h1>
            <Motion.span
              {...rise(0)}
              className="type-display block text-[clamp(2.15rem,5vw,3.5rem)] text-[color:var(--color-bone)]"
            >
              Unity and C# developer focused on gameplay and game systems.
            </Motion.span>

            <Motion.span
              {...rise(0.09)}
              className="mt-7 block border-t border-[color:var(--color-rule)] pt-5 text-[1.0625rem] text-[color:var(--color-bone)] sm:text-[1.1875rem]"
              style={{ fontVariationSettings: "'wdth' 104, 'wght' 650", letterSpacing: '-0.015em' }}
            >
              {site.name}
            </Motion.span>
          </h1>

          <Motion.p
            {...rise(0.16)}
            className="type-body mt-6 max-w-[58ch] text-[0.9375rem] text-[color:var(--color-muted)] sm:text-base"
          >
            {site.heroSupport}
          </Motion.p>

          <Motion.div {...rise(0.24)} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn btn-signal">
              See the work
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={site.resumeUrl}
              download={site.resumeFilename}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Résumé
              <Download className="h-4 w-4" />
            </a>
          </Motion.div>
        </div>

        {/* ── Proof: the release record ──────────────────────────────────── */}
        <Motion.aside
          {...rise(0.30)}
          className="lg:col-span-5 lg:col-start-8"
          aria-label="Latest release"
        >
          <div className="overflow-hidden rounded-[4px] border border-[color:var(--color-rule)] bg-[color:var(--color-ink-raised)]">
            {/* Detail band — the full plate runs in the case study below */}
            <div className="aspect-[21/9] w-full border-b border-[color:var(--color-rule)]">
              <img
                src={shipped.media}
                width={shipped.mediaWidth}
                height={shipped.mediaHeight}
                alt={`Gameplay from ${shipped.title}`}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="block h-full w-full object-cover"
              />
            </div>

            <div className="p-5 sm:p-6">
              <p className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-signal)]"
                />
                <span className="type-meta text-[color:var(--color-signal)]">
                  Live on Google Play
                </span>
              </p>

              <h2
                className="type-title mt-3 text-[1.5rem] text-[color:var(--color-bone)]"
              >
                {shipped.title}
              </h2>

              <dl className="mt-5 border-t border-[color:var(--color-rule)]">
                {[
                  ['Platform', shipped.platform],
                  ['Engine', 'Unity · C#'],
                  ['Released', String(shipped.year)],
                  ['Studio', shipped.studio],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 border-b border-[color:var(--color-rule)] py-2.5"
                  >
                    <dt className="type-meta text-[color:var(--color-dim)]">{k}</dt>
                    <dd className="type-meta tabular text-right text-[color:var(--color-muted)]">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={shipped.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mt-5 w-full"
              >
                <SiGoogleplay className="h-4 w-4" aria-hidden="true" />
                Get it on Google Play
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Motion.aside>
      </div>
    </section>
  );
}
