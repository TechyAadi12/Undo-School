import React, { useState } from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import EnrollmentModal from './EnrollmentModal';

export default function CourseCard({ course, isDarkMode }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  return (
    <div
      className={`rounded-xl overflow-hidden border transition-all-smooth hover:shadow-2xl group animate-fade-in hover:-translate-y-2 ${isDarkMode ? 'bg-neutral-800 border-neutral-700 hover:border-primary-400' : 'bg-white border-neutral-200 hover:border-primary-300'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden h-48 sm:h-56 ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`}>
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Badge */}
        {course.badge && (
          <div className="absolute top-3 left-3 animate-bounce-scale">
            <span className="inline-flex items-center px-3 py-1 bg-accent-orange text-white text-xs font-bold rounded-full shadow-md hover:shadow-lg transition duration-200">
              {course.badge}
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all-smooth transform hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-white hover:bg-neutral-50'}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiHeart
            className={`w-5 h-5 transition-colors-smooth ${
              isFavorite
                ? 'fill-accent-orange text-accent-orange'
                : 'text-neutral-600'
            }`}
          />
        </button>

        {/* Quick Info Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-fade-in backdrop-blur-sm">
            <button
              onClick={() => setIsEnrollModalOpen(true)}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-all duration-200 flex items-center gap-2 active:scale-95 hover:shadow-lg transform hover:scale-105"
            >
              <FiShoppingCart className="w-5 h-5 group-hover:animate-bounce" />
              Enroll now
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Category & Level */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${isDarkMode ? 'text-primary-400 bg-primary-950' : 'text-primary-600 bg-primary-50'}`}>
            {course.category}
          </span>
          <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? 'text-neutral-400 bg-neutral-700' : 'text-neutral-600 bg-neutral-100'}`}>
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className={`text-body-md sm:text-body-lg font-semibold mb-2 line-clamp-2 transition-colors-smooth cursor-pointer ${isDarkMode ? 'text-white hover:text-primary-400' : 'text-neutral-900 hover:text-primary-600'}`}>
          {course.title}
        </h3>

        {/* Duration & Rating */}
        <div className={`flex items-center justify-between mb-3 text-xs sm:text-body-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          <span className="flex items-center gap-1">
            ⏱️ {course.duration}
          </span>
          <span className="flex items-center gap-1">
            ⭐ {course.rating} ({course.reviews.toLocaleString()})
          </span>
        </div>

        {/* Instructor Info */}
        <div className={`flex items-center gap-2 mb-4 pb-4 border-b ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {course.instructor.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs sm:text-body-sm font-medium truncate ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              By {course.instructor}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>{course.enrolledCount} enrolled</p>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className={`text-h5 sm:text-h6 font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              ${course.price}
            </p>
          </div>
          <button
            onClick={() => setIsEnrollModalOpen(true)}
            className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg font-medium text-sm hover:bg-primary-600 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap hover:shadow-lg transform hover:-translate-y-0.5 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-primary-600 opacity-0 group-hover:opacity-20 transition duration-200"></span>
            <FiShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Enroll</span>
          </button>
        </div>
      </div>

      {/* Enrollment Modal */}
      <EnrollmentModal
        course={course}
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </div>
  );
}
