import Section from './Section';
import Reveal from './Reveal';
import { skills } from '../data/site';

/**
 * Game development leads and is set at full weight. Release work sits beside
 * it as its own column. Web and tooling are deliberately subordinate — smaller,
 * dimmer, and set as a single run of text rather than a matching block.
 */
export default function Skills() {
  return (
    <Section
      id="skills"
      heading="Skills & tools"
      lede="What I work in day to day, weighted the way the work is."
      className="pt-20 sm:pt-24 lg:pt-28"
    >
      <div className="mt-12 grid gap-x-10 gap-y-12 lg:mt-16 lg:grid-cols-12">
        {/* Primary — game development */}
        <Reveal className="lg:col-span-7">
          <h3
            className="text-[1.25rem] text-[color:var(--color-bone)]"
            style={{ fontVariationSettings: "'wdth' 108, 'wght' 650", letterSpacing: '-0.02em' }}
          >
            {skills.primary.heading}
          </h3>

          <dl className="mt-6 border-t border-[color:var(--color-rule)]">
            {skills.primary.groups.map(({ label, items }) => (
              <div
                key={label}
                className="grid gap-x-6 gap-y-2 border-b border-[color:var(--color-rule)] py-4 sm:grid-cols-[7rem_minmax(0,1fr)]"
              >
                <dt className="type-meta pt-1 text-[color:var(--color-dim)]">{label}</dt>
                <dd className="flex flex-wrap gap-x-2 gap-y-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-[3px] border border-[color:var(--color-rule)] px-3 py-1.5 text-[0.875rem] text-[color:var(--color-bone)]"
                      style={{ fontVariationSettings: "'wdth' 100, 'wght' 500" }}
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Release work — the differentiating column */}
        <Reveal delay={0.06} className="lg:col-span-4 lg:col-start-9">
          <h3
            className="text-[1.25rem] text-[color:var(--color-bone)]"
            style={{ fontVariationSettings: "'wdth' 108, 'wght' 650", letterSpacing: '-0.02em' }}
          >
            {skills.release.heading}
          </h3>

          <ul className="mt-6 border-t border-[color:var(--color-rule)]">
            {skills.release.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 border-b border-[color:var(--color-rule)] py-3.5"
              >
                <span
                  aria-hidden="true"
                  className="h-px w-3 shrink-0 bg-[color:var(--color-signal)]"
                />
                <span
                  className="text-[0.9375rem] text-[color:var(--color-bone)]"
                  style={{ fontVariationSettings: "'wdth' 100, 'wght' 500" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <p className="type-body mt-5 max-w-[38ch] text-[0.875rem] text-[color:var(--color-dim)]">
            Shipped on Slash &rsquo;em Out! for Android.
          </p>
        </Reveal>

        {/* Secondary — subordinate by construction */}
        <Reveal delay={0.1} className="lg:col-span-12">
          <div className="flex flex-col gap-x-8 gap-y-3 border-t border-[color:var(--color-rule)] pt-6 sm:flex-row sm:items-baseline">
            <h3 className="type-meta shrink-0 text-[color:var(--color-dim)] sm:w-[7rem]">
              {skills.secondary.heading}
            </h3>
            <p className="type-body text-[0.875rem] text-[color:var(--color-muted)]">
              {skills.secondary.items.join(' · ')}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
