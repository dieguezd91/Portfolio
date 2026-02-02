import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiGithub, SiLinkedin, SiItchdotio } from 'react-icons/si';

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
      icon: <SiGithub className="w-5 h-5" />
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/daniel-dieguez/',
      icon: <SiLinkedin className="w-5 h-5" />
    },
    {
      name: 'itch.io',
      href: 'https://danidieguez.itch.io',
      icon: <SiItchdotio className="w-5 h-5" />
    }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800'
          : 'bg-black/80 backdrop-blur-md border-b border-zinc-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Daniel Dieguez
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {externalLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                {link.icon}
                <span>{link.name}</span>
              </motion.a>
            ))}
            <motion.a
              href="/Daniel_Dieguez_CV.pdf"
              download="Daniel_Dieguez_CV.pdf"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold transition-colors"
            >
              Download CV
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
              <div className="py-4 space-y-2">
                {externalLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 py-2 text-zinc-400 hover:text-white transition-all"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </motion.a>
                ))}
                <motion.a
                  href="/Daniel_Dieguez_CV.pdf"
                  download="Daniel_Dieguez_CV.pdf"
                  className="block mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold text-center transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Download CV
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
