import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseBrowse from './components/CourseBrowse';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_#fde68a_0%,_#fb7185_22%,_#c084fc_48%,_#60a5fa_74%,_#22d3ee_100%)] text-neutral-900">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),transparent_38%,rgba(255,255,255,0.12)_100%)]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-fuchsia-300/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-cyan-200/25 blur-3xl" />

      <div className="relative font-sans">
        <Navbar />
        <Hero />
        <CourseBrowse />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
