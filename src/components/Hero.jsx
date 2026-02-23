import { useRef } from 'react';
import { motion } from 'framer-motion';
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
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-28 pb-20 flex flex-col items-center text-center gap-6">

        {/* Name — dominant focal point */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-wide leading-none"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Daniel Dieguez
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
          className="text-xs md:text-sm text-[#00F5D4] uppercase tracking-[0.3em] font-medium"
        >
          Game Developer
        </motion.p>

        {/* Description — constrained width for elegance */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: 'easeOut' }}
          className="max-w-xl text-sm md:text-base text-zinc-500 leading-relaxed uppercase mt-2"
        >
          Programmer specialized in gameplay and systems, with a strong foundation in software engineering. Entrepreneurial by nature, I'm used to taking ownership of projects, making technical decisions, and balancing creativity with practical constraints. Open to new challenges and adaptable beyond game development.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: 'easeOut' }}
          className="mt-2"
        >
          <HudButton href="#projects" className="px-7 py-3 rounded-lg text-sm">
            EXPLORE PROJECTS
          </HudButton>
        </motion.div>

      </div>
    </section>
  );
}
