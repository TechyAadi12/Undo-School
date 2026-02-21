import React from 'react';

export default function Hero() {
  const handleExploreCourses = () => {
    const coursesSection = document.querySelector('section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-96 md:h-96 overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 400">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="1200" height="400" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4 md:px-8">
        <div className="max-w-4xl">
          {/* Logo Icon */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white border-opacity-30">
              <span className="text-4xl md:text-5xl font-bold text-white">US</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            Welcome to Undo School
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-blue-50 mb-6 md:mb-8 max-w-2xl mx-auto">
            Discover diverse, engaging courses designed to inspire learning and growth for every age and skill level. Start your educational journey today!
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={handleExploreCourses}
              className="px-8 py-3 md:py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-200 shadow-lg hover:shadow-xl active:scale-95"
            >
              Explore Courses
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900 opacity-10 rounded-full blur-3xl -ml-48 -mb-48"></div>
    </div>
  );
}
