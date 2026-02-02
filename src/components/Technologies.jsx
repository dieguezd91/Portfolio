import { motion } from 'framer-motion';

const technologies = [
  "Unity",
  "C#",
  "Unreal Engine",
  "VR Development",
  "JavaScript",
  "React",
  "Node.js",
  "Tailwind CSS",
  "TypeScript",
  "Git",
  "Game Design",
  "3D Modeling"
];

export default function Technologies() {
  return (
    <section className="py-12 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Technologies I Work With
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {technologies.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(99, 102, 241, 0.5)" }}
              className="px-6 py-3 bg-[#2a2a2a] border-2 border-zinc-800 rounded-lg text-white font-medium hover:border-indigo-500/50 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
