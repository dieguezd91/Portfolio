import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Clockwork Siege",
    year: 2024,
    role: "Game Designer & Programmer",
    description: "A dynamic 2D mobile strategy game blending Tower Defense tactics with a Roguelike Deckbuilder",
    media: "https://img.itch.zone/aW1nLzI0NTQ0NDkyLnBuZw==/original/5BYBsz.png",
    mediaType: "image",
    tags: ["Mobile", "Strategy", "Deckbuilder"],
    link: "https://danidieguez.itch.io/clockwork-siege"
  },
  {
    id: 2,
    title: "BinforcerVR",
    year: 2023,
    role: "VR Developer",
    description: "VR Arcade Educational Game – Sort and recycle trash in zero gravity",
    media: "https://img.itch.zone/aW1nLzIzODc4MjQxLnBuZw==/original/6%2Bq1bX.png",
    mediaType: "image",
    tags: ["VR", "Educational", "Unity"],
    link: "https://danidieguez.itch.io/binforcervr"
  },
  {
    id: 3,
    title: "Evolster",
    year: 2023,
    role: "Game Developer",
    description: "Bullet hell style game set in a horror world",
    media: "https://img.itch.zone/aW1nLzE3MjE0NDM4LnBuZw==/original/KN6nAD.png",
    mediaType: "image",
    tags: ["Bullet Hell", "Horror", "Survival"],
    link: "https://danidieguez.itch.io/evolster"
  },
  {
    id: 4,
    title: "Project C.O.R.V.U.S.",
    year: 2023,
    role: "Gameplay Programmer",
    description: "Survival horror video game with tactical combat and strategic character switching",
    media: "https://img.itch.zone/aW1nLzIwNTE2ODQ3LnBuZw==/original/JvEPqn.png",
    mediaType: "image",
    tags: ["Survival", "Horror", "Tactical"],
    link: "https://astroriftgames.itch.io/project-corvus"
  },
  {
    id: 5,
    title: "Müecas Game",
    year: 2022,
    role: "Lead Developer",
    description: "Endless runner advergame created for the MÜECAS cereal brand",
    media: "https://img.itch.zone/aW1nLzE4NDA1MTAyLnBuZw==/347x500/WxMnkm.png",
    mediaType: "image",
    tags: ["Endless Runner", "Browser", "Advergame"],
    link: "https://astroriftgames.itch.io/muecas"
  },
  {
    id: 6,
    title: "Arkanoid 3D",
    year: 2024,
    role: "Game Developer",
    description: "Fun 3D arkanoid prototype with modern mechanics",
    media: "https://img.itch.zone/aW1hZ2UvMjg0ODA3My8xNzAyMjMyNi5wbmc=/original/aBoCqA.png",
    mediaType: "image",
    tags: ["Arcade", "3D", "Prototype"],
    link: "https://danidieguez.itch.io/arkanoid-3d"
  },
  {
    id: 7,
    title: "Wheelin' To Roll",
    year: 2022,
    role: "Game Developer",
    description: "Browser-playable survival game with unique mechanics",
    media: "https://img.itch.zone/aW1nLzE0ODc1ODQ0LnBuZw==/original/07A6It.png",
    mediaType: "image",
    tags: ["Survival", "Browser", "Action"],
    link: "https://danidieguez.itch.io/wheelin-to-roll"
  },
  {
    id: 8,
    title: "Forbbiden Rhytms",
    year: 2023,
    role: "Game Developer",
    description: "Survival game with rhythm-based mechanics",
    media: "https://img.itch.zone/aW1nLzE3MjE0Njk3LnBuZw==/original/adoidh.png",
    mediaType: "image",
    tags: ["Survival", "Rhythm", "Action"],
    link: "https://danidieguez.itch.io/forbbiden-rhytms"
  },
  {
    id: 9,
    title: "Cyber Realm: Shadows of Neo-City",
    year: 2022,
    role: "Game Developer",
    description: "A pixel-art cyberpunk adventure with turn-based combat in Neo-City's depths",
    media: "https://img.itch.zone/aW1nLzE0ODc1ODM5LnBuZw==/original/OHRs81.png",
    mediaType: "image",
    tags: ["Cyberpunk", "Pixel Art", "RPG"],
    link: "https://tomas-taboada.itch.io/cyberrealm"
  }
];

function ProjectCard({ title, year, role, description, tags, link, media, mediaType, index }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative bg-[#2a2a2a] rounded-lg overflow-hidden transition-all duration-300 border border-zinc-800 hover:border-indigo-500/50"
    >
      {/* MEDIA: Video, GIF o Image */}
      <div className="aspect-video overflow-hidden bg-[#1a1a1a] relative">
        {mediaType === 'video' ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src={media} type="video/mp4" />
          </video>
        ) : mediaType === 'gif' ? (
          <img
            src={media}
            alt={title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        ) : (
          <img
            src={media}
            alt={title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        )}
      </div>

      {/* CONTENIDO */}
      <div className="p-6 relative">
        {/* Título + Año */}
        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors duration-300" style={{ fontFamily: 'var(--font-heading)' }}>
          {title} <span className="text-lg text-zinc-500 font-normal">({year})</span>
        </h3>

        {/* Rol */}
        <p className="text-sm text-indigo-400 font-medium mb-3">{role}</p>

        {/* Descripción */}
        <p className="text-zinc-400 mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-[#1a1a1a] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl font-bold mb-4 text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            My Games
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-1 bg-indigo-600 mx-auto mb-6"
          />
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A collection of games ranging from VR experiences to mobile strategy and browser-based adventures
          </p>
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
