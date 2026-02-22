import React, { useState, useEffect } from 'react';
import { FiX, FiChevronDown } from 'react-icons/fi';

export default function FilterDrawer({
  isOpen,
  onClose,
  categories,
  selectedCategories,
  onCategoryToggle,
  ageGroups,
  selectedAgeGroups,
  onAgeGroupToggle,
  selectedPriceRange,
  onPriceRangeChange,
  priceRanges,
  selectedRating,
  onRatingChange,
  ratings,
  hasActiveFilters,
  onResetFilters,
  sortBy,
  onSortChange,
  sortOptions,
  isDarkMode,
}) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    age: true,
    price: true,
    rating: true,
    sort: false,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-full md:w-80 z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:z-0 md:transform-none md:transition-none ${
          isDarkMode ? 'bg-neutral-800' : 'bg-white'
        } overflow-y-auto md:sticky md:top-0 md:max-h-screen`}
      >
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-4 border-b md:hidden ${isDarkMode ? 'border-neutral-700 bg-neutral-800' : 'border-neutral-200 bg-white'}`}>
          <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            Filters
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition ${isDarkMode ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'}`}
            aria-label="Close filters"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                onResetFilters();
                onClose();
              }}
              className={`w-full mb-4 flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors-smooth font-medium ${isDarkMode ? 'text-primary-400 hover:bg-primary-950' : 'text-primary-600 hover:bg-primary-50'}`}
            >
              <span>Reset all filters</span>
              <FiX className="w-4 h-4" />
            </button>
          )}

          {/* Category Filter */}
          <div className={`mb-6 pb-6 border-b ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
            <button
              onClick={() => toggleSection('category')}
              className={`flex items-center justify-between w-full mb-3 font-semibold transition-colors-smooth ${isDarkMode ? 'text-white hover:text-primary-400' : 'text-neutral-900 hover:text-primary-600'}`}
              aria-expanded={expandedSections.category}
            >
              <span>Category</span>
              <FiChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.category ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.category && (
              <div className="space-y-2 animate-expand">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => onCategoryToggle(category)}
                      className={`w-4 h-4 rounded text-primary-500 focus:ring-primary-500 cursor-pointer accent-primary-500 ${isDarkMode ? 'bg-neutral-700 border-neutral-600' : 'border-neutral-300'}`}
                      aria-label={`Filter by ${category}`}
                    />
                    <span className={`text-body-md transition-colors-smooth ${isDarkMode ? 'text-neutral-300 group-hover:text-primary-400' : 'text-neutral-700 group-hover:text-primary-600'}`}>
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Age Group Filter */}
          <div className={`mb-6 pb-6 border-b ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
            <button
              onClick={() => toggleSection('age')}
              className={`flex items-center justify-between w-full mb-3 font-semibold transition-colors-smooth ${isDarkMode ? 'text-white hover:text-primary-400' : 'text-neutral-900 hover:text-primary-600'}`}
              aria-expanded={expandedSections.age}
            >
              <span>Age Group</span>
              <FiChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.age ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.age && (
              <div className="space-y-2 animate-expand">
                {ageGroups.map((ageGroup) => (
                  <label key={ageGroup} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedAgeGroups.includes(ageGroup)}
                      onChange={() => onAgeGroupToggle(ageGroup)}
                      className={`w-4 h-4 rounded text-primary-500 focus:ring-primary-500 cursor-pointer accent-primary-500 ${isDarkMode ? 'bg-neutral-700 border-neutral-600' : 'border-neutral-300'}`}
                      aria-label={`Filter by ${ageGroup}`}
                    />
                    <span className={`text-body-md transition-colors-smooth ${isDarkMode ? 'text-neutral-300 group-hover:text-primary-400' : 'text-neutral-700 group-hover:text-primary-600'}`}>
                      {ageGroup}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className={`mb-6 pb-6 border-b ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
            <button
              onClick={() => toggleSection('price')}
              className={`flex items-center justify-between w-full mb-3 font-semibold transition-colors-smooth ${isDarkMode ? 'text-white hover:text-primary-400' : 'text-neutral-900 hover:text-primary-600'}`}
              aria-expanded={expandedSections.price}
            >
              <span>Price Range</span>
              <FiChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.price ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.price && (
              <div className="space-y-2 animate-expand">
                {priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange?.label === range.label}
                      onChange={() => onPriceRangeChange(range)}
                      className={`w-4 h-4 text-primary-500 focus:ring-primary-500 cursor-pointer accent-primary-500 ${isDarkMode ? 'bg-neutral-700 border-neutral-600' : 'border-neutral-300'}`}
                      aria-label={`Filter by ${range.label}`}
                    />
                    <span className={`text-body-md transition-colors-smooth ${isDarkMode ? 'text-neutral-300 group-hover:text-primary-400' : 'text-neutral-700 group-hover:text-primary-600'}`}>
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className={`mb-6 pb-6 border-b ${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
            <button
              onClick={() => toggleSection('rating')}
              className={`flex items-center justify-between w-full mb-3 font-semibold transition-colors-smooth ${isDarkMode ? 'text-white hover:text-primary-400' : 'text-neutral-900 hover:text-primary-600'}`}
              aria-expanded={expandedSections.rating}
            >
              <span>Rating</span>
              <FiChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.rating ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.rating && (
              <div className="space-y-2 animate-expand">
                {ratings.map((rating) => (
                  <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => onRatingChange(rating)}
                      className={`w-4 h-4 text-primary-500 focus:ring-primary-500 cursor-pointer accent-primary-500 ${isDarkMode ? 'bg-neutral-700 border-neutral-600' : 'border-neutral-300'}`}
                      aria-label={`Filter by ${rating}+ rating`}
                    />
                    <span className={`text-body-md transition-colors-smooth ${isDarkMode ? 'text-neutral-300 group-hover:text-primary-400' : 'text-neutral-700 group-hover:text-primary-600'}`}>
                      {rating}+ ⭐
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className={`${isDarkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
            <button
              onClick={() => toggleSection('sort')}
              className={`flex items-center justify-between w-full mb-3 font-semibold transition-colors-smooth ${isDarkMode ? 'text-white hover:text-primary-400' : 'text-neutral-900 hover:text-primary-600'}`}
              aria-expanded={expandedSections.sort}
            >
              <span>Sort by</span>
              <FiChevronDown
                className={`w-5 h-5 transition-transform ${
                  expandedSections.sort ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedSections.sort && (
              <div className="space-y-2 animate-expand">
                {sortOptions.map((option) => (
                  <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={sortBy === option.value}
                      onChange={(e) => onSortChange(e.target.value)}
                      className={`w-4 h-4 text-primary-500 focus:ring-primary-500 cursor-pointer accent-primary-500 ${isDarkMode ? 'bg-neutral-700 border-neutral-600' : 'border-neutral-300'}`}
                      aria-label={`Sort by ${option.label}`}
                    />
                    <span className={`text-body-md transition-colors-smooth ${isDarkMode ? 'text-neutral-300 group-hover:text-primary-400' : 'text-neutral-700 group-hover:text-primary-600'}`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="md:hidden w-full mt-6 px-4 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors active:scale-95"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
