import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import FeaturedWork from './components/FeaturedWork';
import MoreWork from './components/MoreWork';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[color:var(--color-ink)]">
      <Nav />
      <main>
        <Hero />
        <FeaturedWork />
        <MoreWork />
        <About />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
