import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

export default function Footer({ isDarkMode }) {
  const socialLinks = [
    { icon: FiFacebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: FiTwitter, label: 'Twitter', href: 'https://twitter.com' },
    { icon: FiInstagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  return (
    <footer className={`transition-colors duration-300 ${
      isDarkMode
        ? 'bg-black border-t border-neutral-700'
        : 'bg-black border-t border-neutral-800'
    } text-neutral-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">US</span>
            </div>
            <span className="text-lg font-bold text-white">Undo School</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-blue-500 transition duration-200 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-800 cursor-pointer hover:scale-110 hover:-rotate-12"
                  style={{
                    animation: `fade-in 0.5s ease-in-out ${index * 0.1}s backwards`
                  }}
                  aria-label={social.label}
                >
                  <IconComponent size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:animate-subtle-bounce active:scale-95 transition-all duration-200 group ${
          isDarkMode
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
        }`}
        style={{
          opacity: typeof window !== 'undefined' && window.scrollY > 300 ? 1 : 0,
          pointerEvents: typeof window !== 'undefined' && window.scrollY > 300 ? 'auto' : 'none',
        }}
        aria-label="Scroll to top"
      >
        <span className="group-hover:translate-y-0 transition-transform duration-200 group-hover:animate-bounce">↑</span>
      </button>
    </footer>
  );
}
