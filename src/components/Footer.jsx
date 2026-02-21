import React, { useState } from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin, FiArrowRight } from 'react-icons/fi';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // Handle navigation link clicks
  const handleNavClick = (e, linkId) => {
    e.preventDefault();
    
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

  // Handle support page navigation
  const handleSupportLink = (linkType) => {
    alert(`${linkType} page would be displayed here.\n\nIn a full implementation, this would navigate to the dedicated page.`);
  };

  // Handle course category filter
  const handleCategoryFilter = (category) => {
    // Scroll to courses section
    const coursesSection = document.querySelector('header');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Show a message about filtering
    setTimeout(() => {
      alert(`Filtering courses by: ${category}\n\nIn a full implementation, this would automatically filter the courses.`);
    }, 500);
  };

  const quickLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Courses', href: '#courses', id: 'courses' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const courseCategories = [
    'Coding',
    'Public Speaking',
    'Chess',
    'Home Work Help',
    'App Building',
  ];

  const supportLinks = [
    { label: 'Help Center', type: 'Help Center' },
    { label: 'FAQ', type: 'FAQ' },
    { label: 'Privacy Policy', type: 'Privacy Policy' },
    { label: 'Terms of Service', type: 'Terms of Service' },
  ];

  const socialLinks = [
    { icon: FiFacebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: FiTwitter, label: 'Twitter', href: 'https://twitter.com' },
    { icon: FiInstagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">US</span>
              </div>
              <span className="text-xl font-bold text-white">Undo School</span>
            </div>
            <p className="text-neutral-400 text-sm mb-6">
              Empowering learners of all ages with engaging courses and inspiring educational experiences.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-blue-500 transition duration-200 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-800 cursor-pointer"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="text-neutral-400 hover:text-blue-500 transition duration-200 text-sm cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              {courseCategories.map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryFilter(category);
                    }}
                    className="text-neutral-400 hover:text-blue-500 transition duration-200 text-sm cursor-pointer"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3 mb-6">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSupportLink(link.type);
                    }}
                    className="text-neutral-400 hover:text-blue-500 transition duration-200 text-sm cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Newsletter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-neutral-800 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <a
                href="mailto:info@undoschool.com"
                className="flex items-center gap-3 text-neutral-400 hover:text-blue-500 transition duration-200 group"
              >
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-neutral-700 transition">
                  <FiMail size={20} />
                </div>
                <span className="text-sm">info@undoschool.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-neutral-400 hover:text-blue-500 transition duration-200 group"
              >
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-neutral-700 transition">
                  <FiPhone size={20} />
                </div>
                <span className="text-sm">+1 (234) 567-890</span>
              </a>
              <div className="flex items-start gap-3 text-neutral-400">
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <FiMapPin size={20} />
                </div>
                <span className="text-sm">123 Education Street, Learning City, LC 12345</span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Stay Updated</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Subscribe to our newsletter for the latest courses and educational tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-neutral-800 text-white placeholder-neutral-500 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition duration-200 flex items-center gap-2"
              >
                <FiArrowRight size={18} />
              </button>
            </form>
            {subscribed && (
              <p className="text-green-500 text-sm mt-2">✓ Thank you for subscribing!</p>
            )}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left text-neutral-400 text-sm">
            <div>
              <p>&copy; 2026 Undo School. All rights reserved.</p>
            </div>
            <div className="flex justify-center gap-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSupportLink('Privacy Policy');
                }}
                className="hover:text-blue-500 transition cursor-pointer"
              >
                Privacy
              </a>
              <span>•</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSupportLink('Terms of Service');
                }}
                className="hover:text-blue-500 transition cursor-pointer"
              >
                Terms
              </a>
              <span>•</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Sitemap page would be displayed here.\n\nIn a full implementation, this would show a detailed sitemap of all pages.');
                }}
                className="hover:text-blue-500 transition cursor-pointer"
              >
                Sitemap
              </a>
            </div>
            <div className="text-right">
              <p>Made with ❤️ for learners worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition duration-200 active:scale-95 opacity-0 hover:opacity-100 pointer-events-none hover:pointer-events-auto"
        style={{
          opacity: typeof window !== 'undefined' && window.scrollY > 300 ? 1 : 0,
          pointerEvents: typeof window !== 'undefined' && window.scrollY > 300 ? 'auto' : 'none',
        }}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </footer>
  );
}
