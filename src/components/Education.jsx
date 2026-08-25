import Section from './Section';
import Reveal from './Reveal';
import { education } from '../data/site';

/**
 * Presented conservatively: field of study, institution, and dates.
 * No degree is asserted — completion of the UADE programme is not confirmed.
 * See PRODUCT.md § Evidence on Hand before changing this wording.
 */
export default function Education() {
  return (
    <Section id="education" heading="Education" className="pt-20 sm:pt-24 lg:pt-28">
      <ul className="mt-10 border-t border-[color:var(--color-rule)] lg:mt-14">
        {education.map((item, i) => (
          <Reveal
            as="li"
            key={item.id}
            delay={Math.min(i, 4) * 0.05}
            className="border-b border-[color:var(--color-rule)]"
          >
            <div className="grid gap-x-8 gap-y-2 py-5 sm:grid-cols-12 sm:items-baseline sm:py-6">
              <p
                className="text-[1.0625rem] text-[color:var(--color-bone)] sm:col-span-5"
                style={{ fontVariationSettings: "'wdth' 104, 'wght' 600", letterSpacing: '-0.015em' }}
              >
                {item.programme}
              </p>

              <p className="type-body text-[0.9375rem] text-[color:var(--color-muted)] sm:col-span-4">
                {item.institution}
              </p>

              <p className="type-meta text-[color:var(--color-dim)] sm:col-span-2">
                {item.kind}
              </p>

              <p className="type-meta tabular text-[color:var(--color-muted)] sm:col-span-1 sm:text-right">
                {item.years}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
