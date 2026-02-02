import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* COLUMNA IZQUIERDA: Texto */}
          <div className="order-2 lg:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl lg:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Game Systems & Web Architecture
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-zinc-300 max-w-xl leading-relaxed"
            >
              Designing scalable game systems and modern web experiences,
              with a strong focus on architecture and interaction.
            </motion.p>
          </div>

          {/* COLUMNA DERECHA: Foto */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <img
                src="/profile.jpg"
                alt="Daniel Dieguez"
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border-4 border-indigo-500/30 object-cover"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
