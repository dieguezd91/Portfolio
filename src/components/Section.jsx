import Reveal from './Reveal';

/**
 * Editorial section shell.
 *
 * A hairline opens every section, the heading sits left, and an optional lede
 * sits in the right half of the measure. No eyebrows, no section numbers —
 * the heading carries its own weight.
 */
export default function Section({
  id,
  heading,
  lede,
  count,
  className = '',
  headerClassName = '',
  children,
}) {
  return (
    <section id={id} className={`px-6 sm:px-8 lg:px-12 ${className}`}>
      <div className="mx-auto w-full max-w-[1440px]">
        <Reveal className={`border-t border-[color:var(--color-rule)] pt-6 sm:pt-8 ${headerClassName}`}>
          <div className="grid gap-x-8 gap-y-4 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="type-section text-[clamp(1.75rem,3.4vw,2.75rem)] text-[color:var(--color-bone)]">
                {heading}
              </h2>
            </div>

            {(lede || count != null) && (
              <div className="md:col-span-6 md:col-start-7 md:pt-2">
                {lede && (
                  <p className="type-body max-w-[62ch] text-[0.9375rem] text-[color:var(--color-muted)] sm:text-base">
                    {lede}
                  </p>
                )}
                {count != null && (
                  <p className="type-meta tabular mt-4 text-[color:var(--color-dim)]">
                    {count}
                  </p>
                )}
              </div>
            )}
          </div>
        </Reveal>

        {children}
      </div>
    </section>
  );
}
