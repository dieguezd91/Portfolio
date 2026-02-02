import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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

        {/* COPYRIGHT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-sm text-zinc-600"
        >
          © {currentYear} Daniel Dieguez. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
