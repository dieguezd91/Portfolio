import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SiLinktree, SiGithub, SiLinkedin, SiItchdotio } from 'react-icons/si';
import HeroParticles from './HeroParticles';
import HudButton from './HudButton';

export default function Hero() {
  const mouseRef = useRef({ x: -9999, y: -9999 });

  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onMouseLeave() {
    mouseRef.current = { x: -9999, y: -9999 };
  }

  return (
    <section
      className="relative min-h-screen bg-gradient-to-b from-[#0F1020] to-[#14162A] text-white flex items-center justify-center overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Particle layer — concentrates behind the name */}
      <HeroParticles mouseRef={mouseRef} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 pt-16 pb-12 md:pt-28 md:pb-20 flex flex-col items-center text-center gap-0">

        {/* Name — dominant focal point */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-heading text-5xl md:text-6xl font-bold text-white uppercase tracking-wide leading-none"
        >
          Daniel Dieguez
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
          className="font-heading text-lg md:text-xl text-[#00F5D4] uppercase tracking-[0.25em] font-medium mt-5 md:mt-6"
        >
          Game Developer
        </motion.p>

        {/* ── Mobile menu buttons — hidden on md+ ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: 'easeOut' }}
          className="flex md:hidden flex-col w-full gap-3 mt-10"
        >
          <HudButton variant="solid" href="#projects" className="w-full py-4 rounded-lg text-base">
            EXPLORE PROJECTS
          </HudButton>

          <HudButton
            href="/Daniel_Dieguez_CV.pdf"
            download="Daniel_Dieguez_CV.pdf"
            className="w-full py-4 rounded-lg text-base"
          >
            DOWNLOAD RESUME
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </HudButton>

          <HudButton
            href="https://linktr.ee/daniel_dieguez"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-lg text-base"
          >
            <SiLinktree className="w-4 h-4" />
            CONTACT
          </HudButton>
        </motion.div>

        {/* Mobile social icons — centered below menu buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.42, ease: 'easeOut' }}
          className="flex md:hidden items-center justify-center gap-5 mt-10"
        >
          {[
            { href: 'https://github.com/dieguezd91',               icon: <SiGithub    className="w-5 h-5" />, label: 'GitHub'   },
            { href: 'https://www.linkedin.com/in/daniel-dieguez/', icon: <SiLinkedin  className="w-5 h-5" />, label: 'LinkedIn' },
            { href: 'https://danidieguez.itch.io',                 icon: <SiItchdotio className="w-5 h-5" />, label: 'itch.io'  },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              className="p-3.5 rounded-lg bg-[#1C1F3A] border border-white/[0.10] text-zinc-500
                         hover:border-white/[0.24] hover:text-zinc-300
                         active:bg-white/[0.06] active:border-white/[0.30]
                         transition-all duration-150"
              aria-label={label}
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Description */}
        {/* Desktop: after role, before CTA  |  Mobile: after buttons, reduced */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: 'easeOut' }}
          className="font-body font-normal max-w-sm md:max-w-xl text-base md:text-lg text-zinc-400 md:text-zinc-300 leading-relaxed uppercase mt-10 md:mt-8"
        >
          Game Developer specializing in gameplay and systems, taking ownership of features from concept to implementation with a strong engineering mindset.
        </motion.p>

        {/* Desktop CTA — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease: 'easeOut' }}
          className="hidden md:block mt-12"
        >
          <HudButton variant="solid" href="#projects" className="px-7 py-3 rounded-lg text-base">
            EXPLORE PROJECTS
          </HudButton>
        </motion.div>

      </div>
    </section>
  );
}
