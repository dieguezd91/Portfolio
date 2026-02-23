import { motion } from 'framer-motion';
import { SiLinktree } from 'react-icons/si';
import HudButton from './HudButton';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1020] border-t border-white/[0.05] text-zinc-400 py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">

        {/* CTA phrase */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.3em] uppercase text-zinc-500 text-center"
        >
          Available for game development opportunities
        </motion.p>

        {/* Contact button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <HudButton
            href="https://linktr.ee/daniel_dieguez"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-lg text-sm"
          >
            <SiLinktree className="w-4 h-4" />
            GET IN TOUCH
          </HudButton>
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="text-xs text-zinc-600 tracking-wider"
        >
          © {currentYear} Daniel Dieguez
        </motion.p>

      </div>
    </footer>
  );
}
