import React, { useState } from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import EnrollmentModal from './EnrollmentModal';

export default function CourseCard({ course, isDarkMode }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`rounded-xl overflow-hidden border transition-all-smooth hover:shadow-2xl group animate-fade-in hover:-translate-y-2 ${isDarkMode ? 'bg-neutral-800 border-neutral-700 hover:border-primary-400' : 'bg-white border-neutral-200 hover:border-primary-300'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden h-48 sm:h-56 ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`}>
        {/* Lazy loaded image with skeleton */}
        <img
          src={course.image}
          alt={course.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Badge with enhanced styling */}
        {course.badge && (
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 ${
              course.badge === 'Selling fast'
                ? 'bg-accent-orange text-white'
                : course.badge === 'New course'
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white'
            }`}>
              {course.badge}
            </span>
          </div>
        )}

        {/* Favorite Button with enhanced interaction */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all-smooth transform hover:scale-110 active:scale-95 backdrop-blur-sm ${isDarkMode ? 'bg-neutral-800/80 hover:bg-neutral-700/90' : 'bg-white/80 hover:bg-white/90'}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <FiHeart
            className={`w-5 h-5 transition-all duration-300 ${
              isFavorite
                ? 'fill-accent-orange text-accent-orange scale-125'
                : 'text-neutral-600'
            }`}
          />
        </button>

        {/* Quick Info Overlay with enhanced animation */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center animate-fade-in backdrop-blur-sm">
            <button
              onClick={() => setIsEnrollModalOpen(true)}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-all duration-200 flex items-center gap-2 active:scale-95 hover:shadow-xl transform hover:scale-105 shadow-lg"
            >
              <FiShoppingCart className="w-5 h-5 animate-pulse" />
              Enroll now
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col h-full">
        {/* Category & Level */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${isDarkMode ? 'text-primary-400 bg-primary-950 group-hover:bg-primary-900' : 'text-primary-600 bg-primary-50 group-hover:bg-primary-100'}`}>
            {course.category}
          </span>
          <span className={`text-xs px-2 py-1 rounded font-medium transition-colors ${isDarkMode ? 'text-neutral-400 bg-neutral-700 group-hover:bg-neutral-600' : 'text-neutral-600 bg-neutral-100 group-hover:bg-neutral-200'}`}>
            {course.level}
          </span>
        </div>

        {/* Title with enhanced hover */}
        <h3 className={`text-body-md sm:text-body-lg font-semibold mb-2 line-clamp-2 transition-colors-smooth cursor-pointer ${isDarkMode ? 'text-white group-hover:text-primary-400' : 'text-neutral-900 group-hover:text-primary-600'}`}>
          {course.title}
        </h3>

        {/* Duration & Rating with icons */}
        <div className={`flex items-center justify-between mb-3 text-xs sm:text-body-sm gap-2 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <span>⏱️</span>
            <span className="hidden sm:inline">{course.duration}</span>
            <span className="sm:hidden">{course.duration.split('-')[0]}yrs</span>
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <span>⭐</span>
            <span>{course.rating}</span>
            <span className="hidden sm:inline text-neutral-500">({course.reviews})</span>
          </span>
        </div>

        {/* Instructor Info with enhanced styling */}
        <div className={`flex items-center gap-2 mb-4 pb-4 border-b transition-colors ${isDarkMode ? 'border-neutral-700 group-hover:border-primary-700' : 'border-neutral-200 group-hover:border-primary-200'}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md">
            {course.instructor.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs sm:text-body-sm font-medium truncate transition-colors ${isDarkMode ? 'text-neutral-300 group-hover:text-primary-400' : 'text-neutral-700 group-hover:text-primary-600'}`}>
              By {course.instructor}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>{course.enrolledCount} enrolled</p>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div>
            <p className={`text-h5 sm:text-h6 font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-primary-400' : 'text-neutral-900 group-hover:text-primary-600'}`}>
              ${course.price}
            </p>
          </div>
          <button
            onClick={() => setIsEnrollModalOpen(true)}
            className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg font-medium text-sm hover:bg-primary-600 active:bg-primary-700 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap hover:shadow-lg transform hover:-translate-y-0.5 group/btn relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover/btn:opacity-20 transition duration-200"></span>
            <FiShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
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
