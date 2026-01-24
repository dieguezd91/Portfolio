import { motion } from 'framer-motion';
import { SiGithub, SiLinkedin, SiItchdotio, SiLinktree } from 'react-icons/si';
import { HiMail } from 'react-icons/hi';

export default function Contact() {
  const contacts = [
    {
      name: "Email",
      icon: <HiMail className="w-6 h-6" />,
      link: "mailto:contact@danieldieguez.dev",
      label: "contact@danieldieguez.dev",
      color: "from-purple-600 to-pink-600"
    },
    {
      name: "GitHub",
      icon: <SiGithub className="w-6 h-6" />,
      link: "https://github.com/dieguezd91",
      label: "github.com/dieguezd91",
      color: "from-gray-600 to-gray-700"
    },
    {
      name: "itch.io",
      icon: <SiItchdotio className="w-6 h-6" />,
      link: "https://danidieguez.itch.io",
      label: "danidieguez.itch.io",
      color: "from-red-600 to-pink-600"
    },
    {
      name: "LinkedIn",
      icon: <SiLinkedin className="w-6 h-6" />,
      link: "https://www.linkedin.com/in/daniel-dieguez/",
      label: "daniel-dieguez",
      color: "from-blue-600 to-blue-700"
    },
    {
      name: "Linktree",
      icon: <SiLinktree className="w-6 h-6" />,
      link: "https://linktr.ee/daniel_dieguez",
      label: "linktr.ee/daniel_dieguez",
      color: "from-green-600 to-green-700"
    }
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-20 px-6 flex items-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Have a project in mind? Whether it's a game or web application,
            I'd love to hear about it.
          </motion.p>
        </motion.div>

        <div className="mb-12">
          {/* Email destacado - ocupa todo el ancho */}
          <motion.a
            href={contacts[0].link}
            target="_self"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -8, borderColor: "rgba(168, 85, 247, 0.5)" }}
            className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 transition-all duration-300 block mb-6"
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r ${contacts[0].color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
            />

            <div className="relative flex items-center gap-6 justify-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className={`p-4 bg-gradient-to-r ${contacts[0].color} rounded-lg text-white shadow-lg`}
              >
                {contacts[0].icon}
              </motion.div>
              <div className="flex-1 max-w-md">
                <h3 className="font-semibold mb-1 text-xl group-hover:text-purple-300 transition-colors">
                  {contacts[0].name}
                </h3>
                <p className="text-gray-400 break-all">{contacts[0].label}</p>
              </div>
              <motion.svg
                className="w-6 h-6 text-gray-500 group-hover:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            </div>
          </motion.a>

          {/* Redes sociales en grid 2x2 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {contacts.slice(1).map((contact) => (
              <motion.a
                key={contact.name}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -8, borderColor: "rgba(168, 85, 247, 0.5)" }}
                className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 transition-all duration-300"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${contact.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                />

                <div className="relative flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`p-3 bg-gradient-to-r ${contact.color} rounded-lg text-white shadow-lg`}
                  >
                    {contact.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-lg group-hover:text-purple-300 transition-colors">
                      {contact.name}
                    </h3>
                    <p className="text-gray-400 text-sm break-all">{contact.label}</p>
                  </div>
                  <motion.svg
                    className="w-5 h-5 text-gray-500 group-hover:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-gray-500 mb-4">Or download my resume</p>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
