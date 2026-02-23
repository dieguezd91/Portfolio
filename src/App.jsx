import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Education from './components/Education';
import Technologies from './components/Technologies';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="scroll-smooth">
      <Navbar />
      <div className="max-w-[1920px] mx-auto bg-[#0F1020] shadow-2xl">
        <Hero />
        <Projects />
        <Education />
        <Technologies />
        <Footer />
      </div>
    </div>
  );
}
