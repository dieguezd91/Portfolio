import { motion } from 'framer-motion';

const gameDev = [
  "C#",
  "Unity",
  "Game Design",
  "VR Development"
];

const webDev = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React",
  "Node.js",
  "Tailwind CSS",
  "Git"
];

export default function Technologies() {
  return (
    <section className="py-12 bg-[#0F1020] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            Technologies I Work With
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-4"
        >
          {/* Game Development */}
          <div className="flex flex-wrap gap-4 justify-center">
            {gameDev.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="font-body px-6 py-3 bg-[#14162A] border border-white/[0.06] rounded-lg text-zinc-300 font-medium hover:text-[#00F5D4] hover:border-[#00F5D4]/25 transition-all duration-150"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Web Development */}
          <div className="flex flex-wrap gap-4 justify-center">
            {webDev.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="font-body px-6 py-3 bg-[#14162A] border border-white/[0.06] rounded-lg text-zinc-300 font-medium hover:text-[#00F5D4] hover:border-[#00F5D4]/25 transition-all duration-150"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
