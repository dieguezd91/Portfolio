import { useRef } from 'react';
import { motion } from 'framer-motion';
import profilePic from '../assets/Profile_pic.jpg';
import HeroParticles from './HeroParticles';

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
      className="relative bg-gradient-to-b from-[#0F1020] to-[#14162A] text-white flex items-center overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Particle layer — sits behind all content */}
      <HeroParticles mouseRef={mouseRef} />

      {/* Content — layered above canvas */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-32 w-full">
        <div className="grid lg:grid-cols-[auto_1fr] gap-12 lg:gap-16 items-center">

          {/* Left — profile photo */}
          <div className="order-1 flex justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              <img
                src={profilePic}
                alt="Daniel Dieguez"
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border-4 border-white/10 object-cover"
              />
            </motion.div>
          </div>

          {/* Right — name, role, description, CTAs */}
          <div className="order-2 flex flex-col gap-6">

            {/* Name + role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-wide leading-none mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Daniel Dieguez
              </h1>
              <p className="text-sm md:text-base text-[#00F5D4] uppercase tracking-widest font-medium">
                Game Developer
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="text-lg lg:text-xl text-zinc-400 leading-relaxed uppercase"
            >
              Programmer specialized in gameplay and systems, with a strong foundation in software engineering. Entrepreneurial by nature, I'm used to taking ownership of projects, making technical decisions, and balancing creativity with practical constraints. Open to new challenges and adaptable beyond game development.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <motion.a
                href="#projects"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="hud-btn w-full sm:w-auto justify-center px-6 py-3 rounded-lg font-bold text-base flex items-center gap-2"
              >
                EXPLORE PROJECTS
              </motion.a>
              <motion.a
                href="/Daniel_Dieguez_CV.pdf"
                download="Daniel_Dieguez_CV.pdf"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="hud-btn w-full sm:w-auto justify-center px-6 py-3 rounded-lg font-bold text-base flex items-center gap-2"
              >
                DOWNLOAD RESUME
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
