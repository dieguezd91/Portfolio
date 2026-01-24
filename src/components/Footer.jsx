import { motion } from 'framer-motion';
import { SiGithub, SiLinkedin, SiItchdotio, SiLinktree } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/dieguezd91",
      icon: <SiGithub className="w-6 h-6" />
    },
    {
      name: "itch.io",
      href: "https://danidieguez.itch.io",
      icon: <SiItchdotio className="w-6 h-6" />
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/daniel-dieguez/",
      icon: <SiLinkedin className="w-6 h-6" />
    },
    {
      name: "Linktree",
      href: "https://linktr.ee/daniel_dieguez",
      icon: <SiLinktree className="w-6 h-6" />
    }
  ];

  return (
    <footer className="bg-black text-gray-400 py-8 border-t border-gray-800 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-purple-500/5 blur-2xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <p className="font-semibold text-white mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Daniel Dieguez
            </p>
            <p className="text-sm">Game & Web Developer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#a855f7" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                className="hover:text-white transition-colors flex items-center justify-center"
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-center md:text-right"
          >
            © {currentYear} Daniel Dieguez. All rights reserved.
          </motion.p>
        </div>

        {/* Subtle decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
        />
      </div>
    </footer>
  );
}
