import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiGithub, SiLinkedin, SiItchdotio, SiLinktree } from 'react-icons/si';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const externalLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/dieguezd91',
      icon: <SiGithub className="w-8 h-8" />
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/daniel-dieguez/',
      icon: <SiLinkedin className="w-8 h-8" />
    },
    {
      name: 'itch.io',
      href: 'https://danidieguez.itch.io',
      icon: <SiItchdotio className="w-8 h-8" />
    }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800'
        : 'bg-black/80 backdrop-blur-md border-b border-zinc-800/50'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-24 md:h-28">
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="text-xl md:text-3xl font-bold text-white uppercase tracking-wide whitespace-nowrap">
              Daniel Dieguez
            </span>
            <span className="text-xs md:text-base text-zinc-400 uppercase tracking-wider">
              Game Developer
            </span>
          </motion.a>

          {/* Desktop Navigation */}
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
            <motion.a
              href="/Daniel_Dieguez_CV.pdf"
              download="Daniel_Dieguez_CV.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 border-2 border-indigo-600 hover:border-indigo-500 bg-transparent rounded-lg text-white font-bold transition-colors text-lg flex items-center gap-2"
            >
              RESUME
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-zinc-400 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-zinc-800/50"
            >
              <div className="py-6 flex flex-col items-center gap-6">
                {/* Íconos sociales */}
                <div className="flex justify-center gap-8">
                  {externalLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      whileHover={{ scale: 1.1 }}
                      className="text-zinc-400 hover:text-white transition-all"
                      aria-label={link.name}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>

                {/* Botón Resume */}
                <motion.a
                  href="/Daniel_Dieguez_CV.pdf"
                  download="Daniel_Dieguez_CV.pdf"
                  className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-indigo-600 hover:border-indigo-500 bg-transparent rounded-lg text-white font-bold transition-colors text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  RESUME
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
