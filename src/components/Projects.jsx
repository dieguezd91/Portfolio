const projects = [
  {
    id: 1,
    title: "Clockwork Siege",
    description: "A dynamic 2D mobile strategy game blending Tower Defense tactics with a Roguelike Deckbuilder",
    tags: ["Mobile", "Strategy", "Deckbuilder"],
    link: "https://danidieguez.itch.io/clockwork-siege"
  },
  {
    id: 2,
    title: "BinforcerVR",
    description: "VR Arcade Educational Game – Sort and recycle trash in zero gravity",
    tags: ["VR", "Educational", "Unity"],
    link: "https://danidieguez.itch.io/binforcervr"
  },
  {
    id: 3,
    title: "Evolster",
    description: "Bullet hell style game set in a horror world",
    tags: ["Bullet Hell", "Horror", "Survival"],
    link: "https://danidieguez.itch.io/evolster"
  },
  {
    id: 4,
    title: "Project C.O.R.V.U.S.",
    description: "Survival game developed with Astro Rift Games",
    tags: ["Survival", "Action"],
    link: "https://astroriftgames.itch.io/project-corvus"
  },
  {
    id: 5,
    title: "Müecas Game",
    description: "Survival experience with in-browser playability",
    tags: ["Survival", "Browser"],
    link: "https://astroriftgames.itch.io/muecas"
  },
  {
    id: 6,
    title: "Arkanoid 3D",
    description: "Fun 3D arkanoid prototype",
    tags: ["Arcade", "3D", "Prototype"],
    link: "https://danidieguez.itch.io/arkanoid-3d"
  },
  {
    id: 7,
    title: "Wheelin' To Roll",
    description: "Browser-playable survival game",
    tags: ["Survival", "Browser"],
    link: "https://danidieguez.itch.io/wheelin-to-roll"
  },
  {
    id: 8,
    title: "Forbbiden Rhytms",
    description: "Survival game experience",
    tags: ["Survival", "Action"],
    link: "https://danidieguez.itch.io/forbbiden-rhytms"
  }
];

function ProjectCard({ title, description, tags, link }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={tag} className="bg-gray-700 px-3 py-1 rounded text-sm">
            {tag}
          </span>
        ))}
      </div>
      <a
        href={link}
        className="text-white hover:underline"
      >
        View Project →
      </a>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen bg-gray-900 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
