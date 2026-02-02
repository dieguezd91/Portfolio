import { motion } from 'framer-motion';
import profilePic from '../assets/Profile_pic.jpg';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white flex items-center">
      <div className="max-w-6xl mx-auto px-6 pt-56 pb-40 w-full">
        <div className="grid lg:grid-cols-2 gap-4 items-center">

          {/* COLUMNA IZQUIERDA: Foto */}
          <div className="order-1 lg:order-1 flex justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <img
                src={profilePic}
                alt="Daniel Dieguez"
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border-4 border-indigo-500/30 object-cover"
              />
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: Texto */}
          <div className="order-2 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-xl lg:text-2xl text-zinc-300 max-w-2xl leading-loose uppercase"
            >
Programmer specialized in gameplay and systems, with a strong foundation in software engineering. Entrepreneurial by nature, I’m used to taking ownership of projects, making technical decisions, and balancing creativity with practical constraints. Open to new challenges and adaptable beyond game development.            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
