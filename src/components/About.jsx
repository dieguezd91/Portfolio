const skills = [
  "JavaScript",
  "React",
  "Node.js",
  "Unity",
  "C#",
  "Tailwind CSS",
  "Git",
  "TypeScript"
];

export default function About() {
  return (
    <section className="min-h-screen bg-gray-800 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          About
        </h2>
        <div className="mb-12">
          <p className="text-xl text-gray-300 leading-relaxed">
            Game and web developer passionate about creating engaging digital experiences.
            Specialized in both interactive games and modern web applications.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-6">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map(skill => (
              <span
                key={skill}
                className="bg-gray-700 px-4 py-2 rounded-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
