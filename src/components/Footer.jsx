import { motion } from 'framer-motion';
import { SiGithub, SiLinkedin, SiItchdotio } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/dieguezd91",
      icon: <SiGithub className="w-6 h-6" />
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/daniel-dieguez/",
      icon: <SiLinkedin className="w-6 h-6" />
    },
    {
      name: "itch.io",
      href: "https://danidieguez.itch.io",
      icon: <SiItchdotio className="w-6 h-6" />
    }
  ];

  return (
    <footer className="bg-black text-zinc-400 py-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* CARTA DE PRESENTACIÓN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="text-lg text-zinc-400 leading-relaxed">
            Soy un desarrollador apasionado por crear experiencias interactivas memorables.
            Con experiencia en desarrollo de juegos y aplicaciones web, combino creatividad
            técnica con diseño de sistemas robustos. Siempre buscando nuevos desafíos y
            oportunidades para aprender.
          </p>
        </motion.div>

        {/* SOCIAL LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-6 mb-6"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, color: "#818cf8" }}
              whileTap={{ scale: 0.9 }}
              className="text-zinc-500 hover:text-indigo-400 transition-colors flex items-center justify-center"
              aria-label={social.name}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* COPYRIGHT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-zinc-600"
        >
          © {currentYear} Daniel Dieguez. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
