import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseBrowse from './components/CourseBrowse';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <CourseBrowse />
      <Footer />
    </div>
  );
}
