import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Courses', href: '#courses', id: 'courses' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e, linkId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (linkId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (linkId === 'courses') {
      const coursesSection = document.querySelector('header');
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(linkId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/30 bg-white/20 shadow-lg shadow-fuchsia-900/10 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition duration-200">
              <span className="text-white font-bold text-lg">US</span>
            </div>
            <span className="text-xl font-bold text-slate-900 transition duration-200">Undo School</span>
          </div>

          {/* Desktop Navigation Links - Rightmost */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className="transition duration-200 font-medium cursor-pointer relative group text-slate-700 hover:text-blue-700"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto md:ml-4">
            <button
              className="md:hidden rounded-lg p-2 text-slate-700 transition duration-200 hover:bg-white/40"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FiX size={24} />
              ) : (
                <FiMenu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slide-in-up border-t border-white/30 bg-white/25 pb-4 backdrop-blur-xl transition-colors duration-300">
            <div className="flex flex-col gap-2 mt-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="cursor-pointer rounded-lg px-4 py-2 text-slate-700 transition duration-200 hover:bg-white/40 hover:text-blue-700"
                  style={{
                    animation: `slideInDown 0.3s ease-out ${index * 0.05}s backwards`
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
