export default function Contact() {
  return (
    <section className="min-h-screen bg-gray-900 text-white py-20 px-6 flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Get In Touch
        </h2>
        <p className="text-xl text-gray-300 text-center mb-12">
          Interested in working together? Let's connect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:your.email@example.com"
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
          >
            Email
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition text-center"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 transition text-center"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
