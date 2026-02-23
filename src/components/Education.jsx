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
      className="p-6 bg-[#0F1020] border border-white/[0.06] hover:border-[#00F5D4]/20 hover:shadow-[0_0_20px_rgba(0,245,212,0.07)] rounded-lg transition-all duration-200"
    >
      <h3 className="font-heading text-lg font-medium text-white mb-2">
        {institution}
      </h3>
      <p className="font-body text-sm text-zinc-300 mb-2">{degree}</p>
      <p className="font-body text-sm text-[#00F5D4]/75">{years}</p>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="bg-[#14162A] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4 text-white">
            Education
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-1 bg-[#FF2D95]/60 mx-auto"
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
