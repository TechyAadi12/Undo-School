import React, { useRef, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

export default function CategoryChips({
  categories,
  selectedCategories,
  onCategoryToggle,
  isDarkMode,
}) {
  const scrollContainer = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const checkScroll = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScroll = () => {
    checkScroll();
  };

  const scroll = (direction) => {
    const container = scrollContainer.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCategoryClick = (category) => {
    onCategoryToggle(category);
  };

  return (
    <div className="relative mb-6">
      {/* Scroll Left Button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className={`absolute -left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all ${
            isDarkMode
              ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
              : 'bg-white hover:bg-neutral-100 text-neutral-900'
          } shadow-lg hover:shadow-xl`}
          aria-label="Scroll left"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Categories Container */}
      <div
        ref={scrollContainer}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-2"
      >
        {/* "All" chip */}
        <button
          onClick={() => {
            // Clear all selections
            selectedCategories.forEach((cat) => onCategoryToggle(cat));
          }}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 ${
            selectedCategories.length === 0
              ? isDarkMode
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-primary-500 text-white shadow-lg'
              : isDarkMode
              ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          All
        </button>

        {/* Category Chips */}
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 ${
                isSelected
                  ? isDarkMode
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-primary-500 text-white shadow-lg'
                  : isDarkMode
                  ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {category}
              {isSelected && <FiX className="w-4 h-4" />}
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className={`absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all ${
            isDarkMode
              ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
              : 'bg-white hover:bg-neutral-100 text-neutral-900'
          } shadow-lg hover:shadow-xl`}
          aria-label="Scroll right"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      )}

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
    </div>
  );
}
