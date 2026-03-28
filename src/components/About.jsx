import React from 'react';
import { FiAward, FiUsers, FiTarget, FiBook } from 'react-icons/fi';

export default function About() {
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
      className="px-4 py-16 transition-colors duration-300 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="mb-4 text-4xl font-bold text-slate-950">
            Why EduPathway feels more intentional
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-700">
            We combine discovery, trust, and structure so learners can move from curiosity to commitment with more confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="glass-tilt rounded-[1.75rem] border border-white/35 bg-white/58 p-6 shadow-lg shadow-fuchsia-950/5 backdrop-blur-md transition duration-300 hover:-translate-y-1.5 hover:bg-white/70 hover:shadow-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-rose-500 to-sky-500 text-white mb-4 shadow-lg">
                  <IconComponent size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-700">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { number: '10K+', label: 'Active Students' },
            { number: '100+', label: 'Courses Available' },
            { number: '95%', label: 'Satisfaction Rate' },
          ].map((stat, index) => (
            <div key={index} className="glass-tilt rounded-[1.75rem] border border-white/35 bg-white/55 p-6 text-center shadow-lg shadow-slate-900/5 backdrop-blur-md">
              <p className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                {stat.number}
              </p>
              <p className="mt-2 text-lg text-slate-700">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
