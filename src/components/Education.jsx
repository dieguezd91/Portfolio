import { motion } from 'framer-motion';

const education = [
  {
    id: 1,
    institution: "Universidad Argentina De la Empresa",
    degree: "Bachelor's Degree in Video Game Development",
    years: "2022 - 2025"
  },
  {
    id: 2,
    institution: "Coderhouse",
    degree: "Web development",
    years: "2022"
  },
  {
    id: 3,
    institution: "Udemy",
    degree: "Game Production & Design",
    years: "2023"
  },
  {
    id: 4,
    institution: "Udemy",
    degree: "Unity Programming with C#",
    years: "2023"
  }
];

function EducationCard({ institution, degree, years, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="p-6 bg-[#2a2a2a] border border-zinc-800 hover:border-indigo-500/50 rounded-lg transition-all duration-300"
    >
      <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
        {institution}
      </h3>
      <p className="text-sm text-zinc-400 mb-2">{degree}</p>
      <p className="text-sm text-indigo-400 font-mono">{years}</p>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="bg-[#1a1a1a] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2
            className="text-5xl md:text-6xl font-bold mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Education
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-1 bg-indigo-600 mx-auto"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <EducationCard key={edu.id} {...edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
