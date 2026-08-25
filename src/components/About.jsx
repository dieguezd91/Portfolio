import Section from './Section';
import Reveal from './Reveal';
import { site } from '../data/site';
import portrait from '../assets/Profile_pic.jpg';
import { ArrowDown } from './icons';

/**
 * Every sentence here is backed by PRODUCT.md § Evidence on Hand.
 * No metrics, no employers, no credentials beyond what is confirmed.
 */
export default function About() {
  return (
    <Section id="about" heading="About" className="pt-16 sm:pt-20 lg:pt-24">
      <div className="mt-10 grid gap-x-10 gap-y-8 lg:mt-12 lg:grid-cols-12 lg:items-start">
        <Reveal className="lg:col-span-4">
          <figure className="media-frame max-w-[13rem] sm:max-w-[15rem]">
            <img
              src={portrait}
              width={512}
              height={512}
              alt={`${site.name}, game developer`}
              loading="lazy"
              decoding="async"
              className="aspect-square"
            />
          </figure>

          <dl className="mt-5 max-w-[20rem] border-t border-[color:var(--color-rule)]">
            {[
              ['Discipline', 'Gameplay · Systems'],
              ['Engine', 'Unity · C#'],
              ['Targets', 'Android · Quest · WebGL · PC'],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[color:var(--color-rule)] py-2.5"
              >
                <dt className="type-meta text-[color:var(--color-dim)]">{k}</dt>
                <dd className="type-meta text-[color:var(--color-muted)]">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.06} className="lg:col-span-7 lg:col-start-6">
          <div className="max-w-[64ch] space-y-6">
            <p className="type-body text-[1.0625rem] text-[color:var(--color-bone)] sm:text-[1.1875rem]">
              I&rsquo;m a game developer working in Unity and C#, focused on gameplay and game
              systems. I focus on taking features from concept to implementation with a strong
              engineering mindset.
            </p>

            <p className="type-body text-[0.9375rem] text-[color:var(--color-muted)] sm:text-base">
              On <span className="text-[color:var(--color-bone)]">Slash &rsquo;em Out!</span>, I
              worked primarily on game systems and handled Google Play deployment and release,
              Ads integration, and in-app purchases.
            </p>

            <p className="type-body text-[0.9375rem] text-[color:var(--color-muted)] sm:text-base">
              I&rsquo;ve worked on projects targeting Android, Meta Quest, WebGL and PC, across
              both 2D and 3D games.
            </p>

            <p>
              <a href="#contact" className="link-rule text-[0.9375rem]">
                <span style={{ fontVariationSettings: "'wdth' 102, 'wght' 600" }}>
                  Get in touch
                </span>
                <ArrowDown className="h-4 w-4" />
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
