import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Education from './components/Education';
import Technologies from './components/Technologies';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="scroll-smooth">
      <Navbar />
      <Hero />
      <Projects />
      <Education />
      <Technologies />
      <Contact />
      <Footer />
    </div>
  );
}
