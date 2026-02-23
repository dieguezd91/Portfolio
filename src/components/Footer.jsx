import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1020] border-t border-white/[0.05] text-zinc-400 py-16 px-6">
      <div className="max-w-4xl mx-auto">

        {/* CARTA DE PRESENTACIÓN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-lg text-white leading-relaxed">
            <span className="font-bold text-2xl">Hello, I'm Daniel</span>
            <br /><br />
            I'm a programmer who enjoys building things and understanding how systems work. I started with game development, driven by curiosity and a love for interactive experiences, but over time I became interested in software development as a whole. I like learning new tools, adapting to different kinds of projects, and taking on new challenges that help me grow.
            <br /><br />
            If you'd like to know more or think I could be a good fit, feel free to reach out — I'd be happy to connect.
          </p>
        </motion.div>

        {/* COPYRIGHT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-xs text-white"
        >
          © {currentYear} Daniel Dieguez. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
