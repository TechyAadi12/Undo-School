import React from 'react';
import bgImage from '../assets/hero.jpg';

export default function Hero() {
  const handleExploreCourses = () => {
    const coursesSection = document.querySelector('section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-96 overflow-hidden transition-colors duration-300 md:h-96"
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.72),rgba(37,99,235,0.38),rgba(168,85,247,0.44))]"></div>

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
              className="relative overflow-hidden rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 shadow-lg shadow-fuchsia-950/20 transition duration-200 hover:bg-blue-50 hover:shadow-2xl active:scale-95 group md:py-4"
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
