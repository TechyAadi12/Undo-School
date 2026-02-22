import React from 'react';
import { FiAward, FiUsers, FiTarget, FiBook } from 'react-icons/fi';

export default function About({ isDarkMode }) {
  const features = [
    {
      icon: FiTarget,
      title: 'Our Mission',
      description: 'Empower learners worldwide with accessible, high-quality education that transforms careers and lives.'
    },
    {
      icon: FiBook,
      title: 'Expert Content',
      description: 'Carefully curated courses from industry experts with real-world experience and proven track records.'
    },
    {
      icon: FiUsers,
      title: 'Learning Community',
      description: 'Join thousands of students in a supportive environment where everyone can learn and grow together.'
    },
    {
      icon: FiAward,
      title: 'Quality Assurance',
      description: 'All courses meet strict quality standards ensuring you receive the best educational experience.'
    },
  ];

  return (
    <section
      id="about"
      className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        isDarkMode ? 'bg-neutral-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            About Undo School
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-neutral-400' : 'text-gray-600'}`}>
            We believe that education should be accessible, engaging, and transformative. Undo School is committed to providing high-quality online courses that help you achieve your goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`p-6 rounded-lg transition duration-300 hover:shadow-lg ${
                  isDarkMode
                    ? 'bg-neutral-800 hover:bg-neutral-700'
                    : 'bg-white hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-4">
                  <IconComponent size={24} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={isDarkMode ? 'text-neutral-400' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '10K+', label: 'Active Students' },
            { number: '100+', label: 'Courses Available' },
            { number: '95%', label: 'Satisfaction Rate' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                {stat.number}
              </p>
              <p className={`text-lg mt-2 ${isDarkMode ? 'text-neutral-400' : 'text-gray-600'}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
