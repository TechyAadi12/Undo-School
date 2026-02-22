import React from 'react';

export default function SkeletonLoader({ isDarkMode, count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`rounded-xl overflow-hidden border animate-pulse ${
            isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'
          }`}
        >
          {/* Image skeleton */}
          <div className={`h-48 sm:h-56 ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />

          {/* Content skeleton */}
          <div className="p-4 sm:p-5 space-y-4">
            {/* Badge & Level */}
            <div className="flex gap-2">
              <div className={`h-6 w-20 rounded-full ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
              <div className={`h-6 w-16 rounded ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <div className={`h-4 w-full rounded ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
              <div className={`h-4 w-3/4 rounded ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
            </div>

            {/* Rating & Info */}
            <div className="flex justify-between">
              <div className={`h-4 w-16 rounded ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
              <div className={`h-4 w-20 rounded ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
            </div>

            {/* Instructor */}
            <div className={`flex gap-2 pb-4 border-b ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
              <div className={`h-8 w-8 rounded-full ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
              <div className="flex-1 space-y-1">
                <div className={`h-3 w-20 rounded ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
                <div className={`h-3 w-16 rounded ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
              </div>
            </div>

            {/* Price & Button */}
            <div className="flex gap-3 justify-between items-center">
              <div className={`h-6 w-16 rounded ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
              <div className={`flex-1 h-10 rounded-lg ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
