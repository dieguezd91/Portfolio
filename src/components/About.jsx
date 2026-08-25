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
    <Section id="about" heading="About" className="pt-20 sm:pt-24 lg:pt-28">
      <div className="mt-12 grid gap-x-10 gap-y-10 lg:mt-16 lg:grid-cols-12 lg:items-start">
        <Reveal className="lg:col-span-4">
          <figure className="media-frame max-w-[22rem] lg:max-w-none">
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

          <dl className="mt-6 max-w-[22rem] border-t border-[color:var(--color-rule)] lg:max-w-none">
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
              I&rsquo;m a game developer working in Unity and C#, focused on gameplay and
              systems. I take features from concept to implementation, and I&rsquo;d rather
              own a system end to end than hand it off half-built.
            </p>

            <p className="type-body text-[0.9375rem] text-[color:var(--color-muted)] sm:text-base">
              That includes the part after the fun part. On{' '}
              <span className="text-[color:var(--color-bone)]">Slash &rsquo;em Out!</span> I
              worked on the game&rsquo;s systems, then took it through Google Play deployment,
              ads integration, and in-app purchases &mdash; the work that only exists once
              something actually ships.
            </p>

            <p className="type-body text-[0.9375rem] text-[color:var(--color-muted)] sm:text-base">
              Across eleven projects I&rsquo;ve built for Android, Meta Quest, WebGL and PC, in
              both 2D and 3D &mdash; a mobile deckbuilder, a VR arcade game, bullet hell, survival
              horror, and an advergame for a cereal brand. I studied Video Game Development at
              Universidad Argentina De la Empresa.
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
