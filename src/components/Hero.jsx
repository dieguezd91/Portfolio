export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Game & Web Developer
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Creating immersive experiences and modern web solutions
        </p>
        <a
          href="#projects"
          className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          View Projects
        </a>
      </div>
    </section>
  );
}
