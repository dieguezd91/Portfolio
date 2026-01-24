import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Clockwork Siege",
    description: "A dynamic 2D mobile strategy game blending Tower Defense tactics with a Roguelike Deckbuilder",
    tags: ["Mobile", "Strategy", "Deckbuilder"],
    link: "https://danidieguez.itch.io/clockwork-siege",
    image: "https://img.itch.zone/aW1nLzI0NTQ0NDkyLnBuZw==/original/5BYBsz.png"
  },
  {
    id: 2,
    title: "BinforcerVR",
    description: "VR Arcade Educational Game – Sort and recycle trash in zero gravity",
    tags: ["VR", "Educational", "Unity"],
    link: "https://danidieguez.itch.io/binforcervr",
    image: "https://img.itch.zone/aW1nLzIzODc4MjQxLnBuZw==/original/6%2Bq1bX.png"
  },
  {
    id: 3,
    title: "Evolster",
    description: "Bullet hell style game set in a horror world",
    tags: ["Bullet Hell", "Horror", "Survival"],
    link: "https://danidieguez.itch.io/evolster",
    image: "https://img.itch.zone/aW1nLzE3MjE0NDM4LnBuZw==/original/KN6nAD.png"
  },
  {
    id: 4,
    title: "Project C.O.R.V.U.S.",
    description: "Survival horror video game with tactical combat and strategic character switching",
    tags: ["Survival", "Horror", "Tactical"],
    link: "https://astroriftgames.itch.io/project-corvus",
    image: "https://img.itch.zone/aW1nLzIwNTE2ODQ3LnBuZw==/original/JvEPqn.png"
  },
  {
    id: 5,
    title: "Müecas Game",
    description: "Endless runner advergame created for the MÜECAS cereal brand",
    tags: ["Endless Runner", "Browser", "Advergame"],
    link: "https://astroriftgames.itch.io/muecas",
    image: "https://img.itch.zone/aW1nLzE4NDA1MTAyLnBuZw==/347x500/WxMnkm.png"
  },
  {
    id: 6,
    title: "Arkanoid 3D",
    description: "Fun 3D arkanoid prototype with modern mechanics",
    tags: ["Arcade", "3D", "Prototype"],
    link: "https://danidieguez.itch.io/arkanoid-3d",
    image: "https://img.itch.zone/aW1hZ2UvMjg0ODA3My8xNzAyMjMyNi5wbmc=/original/aBoCqA.png"
  },
  {
    id: 7,
    title: "Wheelin' To Roll",
    description: "Browser-playable survival game with unique mechanics",
    tags: ["Survival", "Browser", "Action"],
    link: "https://danidieguez.itch.io/wheelin-to-roll",
    image: "https://img.itch.zone/aW1nLzE0ODc1ODQ0LnBuZw==/original/07A6It.png"
  },
  {
    id: 8,
    title: "Forbbiden Rhytms",
    description: "Survival game with rhythm-based mechanics",
    tags: ["Survival", "Rhythm", "Action"],
    link: "https://danidieguez.itch.io/forbbiden-rhytms",
    image: "https://img.itch.zone/aW1nLzE3MjE0Njk3LnBuZw==/original/adoidh.png"
  },
  {
    id: 9,
    title: "Cyber Realm: Shadows of Neo-City",
    description: "A pixel-art cyberpunk adventure with turn-based combat in Neo-City's depths",
    tags: ["Cyberpunk", "Pixel Art", "RPG"],
    link: "https://tomas-taboada.itch.io/cyberrealm",
    image: "https://img.itch.zone/aW1nLzE0ODc1ODM5LnBuZw==/original/OHRs81.png"
  }
];

function ProjectCard({ title, description, tags, link, image, index }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50"
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ pointerEvents: 'none' }}
      />

      <div className="aspect-video overflow-hidden bg-gray-900 relative">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 relative">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
              className="bg-purple-500/10 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-sm backdrop-blur-sm"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm flex items-center gap-1"
      >
        View on itch.io
        <motion.span
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.span>
      </motion.div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent"
          >
            My Games
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            A collection of games ranging from VR experiences to mobile strategy and browser-based adventures
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} {...project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
