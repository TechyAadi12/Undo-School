import React, { useRef, useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import CourseCard from './CourseCard';

export default function CourseSliderSection({
  title,
  courses,
  isDarkMode,
  maxItems = 6,
}) {
  const scrollContainer = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    checkScroll();
    const container = scrollContainer.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const checkScroll = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    const container = scrollContainer.current;
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      {/* Section Header */}
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`text-h4 md:text-h3 font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-neutral-900'
            }`}
          >
            {title}
          </h2>
          <a
            href="#all-courses"
            className={`text-sm font-medium transition hover:underline ${
              isDarkMode
                ? 'text-primary-400 hover:text-primary-300'
                : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            View all →
          </a>
        </div>
      )}

      {/* Slider Container with overflow hidden at container level */}
      <div className="relative overflow-hidden">
        {/* Scroll Left Button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/3 -translate-y-1/2 z-10 p-2 rounded-full transition-all shadow-lg ${
              isDarkMode
                ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                : 'bg-white hover:bg-neutral-100 text-neutral-900'
            } hover:shadow-xl active:scale-95`}
            aria-label="Scroll left"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Courses Container with proper overflow */}
        <div
          ref={scrollContainer}
          className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-2 px-1"
        >
          {courses.slice(0, maxItems).map((course, index) => (
            <div
              key={course.id}
              className="flex-shrink-0 w-full sm:w-80 min-w-0 animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <CourseCard course={course} isDarkMode={isDarkMode} />
            </div>
          ))}
        </div>

        {/* Scroll Right Button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/3 -translate-y-1/2 z-10 p-2 rounded-full transition-all shadow-lg ${
              isDarkMode
                ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
                : 'bg-white hover:bg-neutral-100 text-neutral-900'
            } hover:shadow-xl active:scale-95`}
            aria-label="Scroll right"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
