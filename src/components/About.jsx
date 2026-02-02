import { motion } from 'framer-motion';

const skills = [
  { name: "Unity", category: "game" },
  { name: "C#", category: "game" },
  { name: "Unreal Engine", category: "game" },
  { name: "VR Development", category: "game" },
  { name: "JavaScript", category: "web" },
  { name: "React", category: "web" },
  { name: "Node.js", category: "web" },
  { name: "Tailwind CSS", category: "web" },
  { name: "TypeScript", category: "web" },
  { name: "Git", category: "tools" },
  { name: "Game Design", category: "tools" },
  { name: "3D Modeling", category: "tools" }
];

const stats = [
  { label: "Games Developed", value: "9+" },
  { label: "Years Experience", value: "5+" },
  { label: "Technologies", value: "12+" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function About() {
  return (
    <section id="about" className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white py-20 px-6 relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-heading)' }}>
            About Me
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8"
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, borderColor: "rgba(168, 85, 247, 0.5)" }}
              className="text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1, type: "spring", bounce: 0.4 }}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-12 hover:border-gray-600/50 transition-colors duration-300">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              Game and web developer passionate about creating engaging digital experiences.
              I specialize in developing both immersive games and modern web applications,
              with expertise ranging from VR experiences to mobile strategy games.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              My journey includes working on diverse projects like
              <span className="text-purple-400 font-semibold"> VR educational games</span>,
              <span className="text-purple-400 font-semibold"> mobile deckbuilders</span>,
              <span className="text-purple-400 font-semibold"> survival horror titles</span>, and
              <span className="text-purple-400 font-semibold"> browser-based adventures</span>.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-heading)' }}>Technical Skills</h3>

          <div className="space-y-8">
            {[
              { category: "game", title: "Game Development", color: "purple" },
              { category: "web", title: "Web Development", color: "pink" },
              { category: "tools", title: "Tools & Others", color: "blue" }
            ].map((section, sectionIndex) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.1, ease: "easeOut" }}
              >
                <h4 className={`text-lg font-semibold text-${section.color}-400 mb-4 flex items-center`}>
                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`w-2 h-2 bg-${section.color}-500 rounded-full mr-2`}
                  />
                  {section.title}
                </h4>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-3"
                >
                  {skills
                    .filter(skill => skill.category === section.category)
                    .map((skill, index) => (
                      <motion.span
                        key={skill.name}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.05,
                          borderColor: section.color === "purple"
                            ? "rgba(168, 85, 247, 0.6)"
                            : section.color === "pink"
                            ? "rgba(236, 72, 153, 0.6)"
                            : "rgba(59, 130, 246, 0.6)"
                        }}
                        className={`px-5 py-2 bg-gradient-to-r from-${section.color}-500/20 to-${section.color === "purple" ? "pink" : section.color === "pink" ? "purple" : "cyan"}-500/20 border border-${section.color}-500/30 rounded-lg transition-all duration-300 cursor-default`}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
