import { SiGithub, SiItchdotio, SiLinkedin, SiLinktree } from 'react-icons/si';
import Reveal from './Reveal';
import { site } from '../data/site';
import { ArrowUpRight, Download } from './icons';

const brandIcon = {
  GitHub: SiGithub,
  LinkedIn: SiLinkedin,
  'itch.io': SiItchdotio,
  Linktree: SiLinktree,
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="mt-16 border-t border-[color:var(--color-rule)] bg-[color:var(--color-ink-raised)] px-6 pb-16 pt-16 sm:mt-20 sm:px-8 sm:pb-20 sm:pt-20 lg:mt-24 lg:px-12 lg:pb-24 lg:pt-24"
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-x-10 gap-y-12 lg:grid-cols-12 lg:items-start">
        <Reveal className="lg:col-span-7">
          <p className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-signal)]"
            />
            <span className="type-meta text-[color:var(--color-signal)]">Open to work</span>
          </p>

          <h2 className="type-display mt-6 text-[clamp(2rem,4.8vw,3.5rem)] text-[color:var(--color-bone)]">
            {site.availability}
          </h2>

          <p className="type-body mt-6 max-w-[54ch] text-[0.9375rem] text-[color:var(--color-muted)] sm:text-base">
            If you&rsquo;re hiring for gameplay or systems work in Unity, I&rsquo;d be glad to talk
            through any of the projects above in detail. Open to studio roles, and to contract or
            indie collaboration.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={site.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-signal"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={site.resumeUrl}
              download={site.resumeFilename}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Download resume
              <Download className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-4 lg:col-start-9">
          <h3 className="type-meta text-[color:var(--color-dim)]">Elsewhere</h3>

          <ul className="mt-4 border-t border-[color:var(--color-rule)]">
            {site.links.map(({ label, handle, href }) => {
              const Icon = brandIcon[label];
              return (
                <li key={label} className="border-b border-[color:var(--color-rule)]">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-3.5 transition-colors duration-200"
                  >
                    <Icon
                      className="h-4 w-4 shrink-0 text-[color:var(--color-dim)] transition-colors duration-200 group-hover:text-[color:var(--color-bone)]"
                      aria-hidden="true"
                    />
                    <span
                      className="text-[0.9375rem] text-[color:var(--color-bone)]"
                      style={{ fontVariationSettings: "'wdth' 100, 'wght' 500" }}
                    >
                      {label}
                    </span>
                    <span className="type-meta ml-auto truncate text-[color:var(--color-dim)]">
                      {handle}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[color:var(--color-dim)] transition-colors duration-200 group-hover:text-[color:var(--color-signal)]" />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
