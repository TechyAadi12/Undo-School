import React from 'react';
import bgImage from '../assets/hero.jpg';

export default function Hero({ isDarkMode }) {
  const handleExploreCourses = () => {
    const coursesSection = document.querySelector('section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative w-full h-96 md:h-96 overflow-hidden transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900'
        : 'bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 animate-gradient'
    }`}
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      {/* Overlay for better text readability */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-black/40'}`}></div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4 md:px-8 z-20">
        <div className="max-w-4xl">
          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 animate-slide-in-up stagger-1 drop-shadow-lg">
            Welcome to Undo School
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white mb-6 md:mb-8 max-w-2xl mx-auto animate-slide-in-up stagger-2 drop-shadow-md">
            Discover diverse, engaging courses designed to inspire learning and growth for every age and skill level. Start your educational journey today!
          </p>

          {/* CTA Button */}
          <div className="flex justify-center animate-slide-in-up stagger-3">
            <button
              onClick={handleExploreCourses}
              className="px-8 py-3 md:py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-200 shadow-lg hover:shadow-2xl active:scale-95 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Courses
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </button>
          </div>
        </div>
      </div>


    </div>
  );
}
