import React, { useState } from 'react';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';

export default function Navbar({ isDarkMode, toggleDarkMode }) {
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
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border-b border-neutral-700 shadow-lg shadow-neutral-900/50'
        : 'bg-gradient-to-r from-blue-50 via-white to-purple-50 border-b border-blue-100 shadow-lg shadow-blue-500/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform hover:scale-110 transition duration-200">
              <span className="text-white font-bold text-lg">US</span>
            </div>
            <span className={`text-xl font-bold transition duration-200 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Undo School</span>
          </div>

          {/* Desktop Navigation Links - Rightmost */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`transition duration-200 font-medium cursor-pointer relative group ${
                  isDarkMode
                    ? 'text-neutral-300 hover:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Dark Mode Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-2 ml-auto md:ml-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 transform hover:scale-110 ${
                isDarkMode
                  ? 'bg-neutral-700 hover:bg-neutral-600 text-yellow-400'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <button
              className={`md:hidden p-2 rounded-lg transition duration-200 ${
                isDarkMode
                  ? 'text-neutral-300 hover:bg-neutral-700'
                  : 'text-gray-700 hover:bg-blue-100'
              }`}
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
          <div className={`md:hidden pb-4 border-t transition-colors duration-300 animate-slide-in-up ${
            isDarkMode
              ? 'border-neutral-700 bg-neutral-900'
              : 'border-blue-100 bg-blue-50'
          }`}>
            <div className="flex flex-col gap-2 mt-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`px-4 py-2 rounded-lg transition duration-200 cursor-pointer ${
                    isDarkMode
                      ? 'text-neutral-300 hover:text-blue-400 hover:bg-neutral-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-100'
                  }`}
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
