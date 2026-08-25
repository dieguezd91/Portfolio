import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion as Motion, useReducedMotion } from 'framer-motion';
import { SiGithub, SiLinkedin, SiItchdotio } from 'react-icons/si';
import { site, navSections } from '../data/site';
import { ArrowDown, Close, Download, Menu, Monogram } from './icons';

const brandIcon = {
  GitHub: SiGithub,
  LinkedIn: SiLinkedin,
  'itch.io': SiItchdotio,
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  /* Masthead condenses once the hero edge is passed */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Active section marker */
  useEffect(() => {
    const targets = navSections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!targets.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  /* Mobile panel: scroll lock, Escape, focus return */
  useEffect(() => {
    if (!open) return undefined;

    const { overflow } = document.body.style;
    const toggle = toggleRef.current;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);

    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <a
        href="#work"
        className="btn btn-signal sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70]"
      >
        Skip to work
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open
            ? 'border-b border-[color:var(--color-rule)] bg-[#0A0A0B]/88 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-[1440px] items-center justify-between gap-6 px-6 sm:px-8 lg:h-[4.75rem] lg:px-12">
          {/* Identity */}
          <a
            href="#top"
            className="group -ml-1 flex min-h-11 shrink-0 items-center gap-3 rounded-[3px] px-1"
            aria-label={`${site.name} — back to top`}
          >
            <Monogram className="h-6 w-6 text-[color:var(--color-bone)] transition-opacity duration-200 group-hover:opacity-80" />
            <span className="hidden text-[0.9375rem] text-[color:var(--color-bone)] sm:inline" style={{ fontVariationSettings: "'wdth' 104, 'wght' 650", letterSpacing: '-0.01em' }}>
              {site.name}
            </span>
          </a>

          {/* Desktop sections */}
          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navSections.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative flex min-h-9 items-center px-3 py-2 text-[0.875rem] transition-colors duration-200 ${
                        isActive
                          ? 'text-[color:var(--color-bone)]'
                          : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-bone)]'
                      }`}
                      style={{ fontVariationSettings: "'wdth' 100, 'wght' 500" }}
                    >
                      {label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 bottom-0 h-px origin-left bg-[color:var(--color-signal)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            {site.links.slice(0, 3).map(({ label, href }) => {
              const Icon = brandIcon[label];
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-[3px] text-[color:var(--color-dim)] transition-colors duration-200 hover:bg-white/[0.05] hover:text-[color:var(--color-bone)]"
                >
                  <Icon className="h-[1.05rem] w-[1.05rem]" />
                </a>
              );
            })}
            <a
              href={site.resumeUrl}
              download={site.resumeFilename}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost ml-2 px-4 py-2 text-[0.8125rem]"
            >
              Résumé
              <Download className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex min-h-11 items-center gap-2 rounded-[3px] px-2 py-2 text-[0.9375rem] text-[color:var(--color-bone)] lg:hidden"
          >
            {open ? 'Close' : 'Menu'}
            {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <Motion.div
            id="mobile-menu"
            ref={panelRef}
            tabIndex={-1}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#0A0A0B] pb-10 pt-[4.25rem] lg:hidden"
          >
            <nav aria-label="Sections" className="px-6 pt-6 sm:px-8">
              <ul>
                {navSections.map(({ id, label }, i) => (
                  <Motion.li
                    key={id}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: reduced ? 0 : 0.04 + i * 0.035,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-[color:var(--color-rule)]"
                  >
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className="type-title flex items-center justify-between gap-4 py-4 text-[1.75rem] text-[color:var(--color-bone)]"
                    >
                      {label}
                      <ArrowDown className="h-5 w-5 shrink-0 text-[color:var(--color-dim)]" />
                    </a>
                  </Motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto px-6 pt-10 sm:px-8">
              <a
                href={site.resumeUrl}
                download={site.resumeFilename}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn btn-signal w-full"
              >
                Download résumé
                <Download className="h-4 w-4" />
              </a>

              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {site.links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.875rem] text-[color:var(--color-muted)] underline decoration-[color:var(--color-rule-strong)] hover:text-[color:var(--color-bone)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
