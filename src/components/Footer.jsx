import { site } from '../data/site';
import { Monogram } from './icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-ink-raised)] px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-3">
          <Monogram className="h-4 w-4 text-[color:var(--color-dim)]" />
          <span className="type-meta tabular text-[color:var(--color-dim)]">
            &copy; {year} {site.name}
          </span>
        </p>

        <p className="type-meta text-[color:var(--color-dim)]">
          Archivo &amp; Martian Mono · Built with React and Vite
        </p>
      </div>
    </footer>
  );
}
