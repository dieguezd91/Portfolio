import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SiGithub, SiLinkedin, SiItchdotio } from 'react-icons/si';
import HudButton from './HudButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const externalLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/dieguezd91',
      icon: <SiGithub className="w-6 h-6 md:w-7 md:h-7" />,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/daniel-dieguez/',
      icon: <SiLinkedin className="w-6 h-6 md:w-7 md:h-7" />,
    },
    {
      name: 'itch.io',
      href: 'https://danidieguez.itch.io',
      icon: <SiItchdotio className="w-6 h-6 md:w-7 md:h-7" />,
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#0F1020]/95 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.04)]'
          : 'bg-[#0F1020]/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Left — social icons (desktop only) */}
          <div className="hidden md:flex items-center gap-6">
            {externalLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-zinc-400 hover:text-white transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Right — Resume button (desktop only) */}
          <HudButton
            href="/Daniel_Dieguez_CV.pdf"
            download="Daniel_Dieguez_CV.pdf"
            className="hidden md:flex px-4 py-2 rounded-lg text-lg"
          >
            RESUME
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </HudButton>

        </div>
      </div>
    </motion.nav>
  );
}
