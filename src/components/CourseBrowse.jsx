import React, { useState, useMemo } from 'react';
import { FiSearch, FiX, FiChevronDown, FiFilter, FiMoon, FiSun } from 'react-icons/fi';
import { coursesData, filterOptions } from '../data/coursesData';
import CourseCard from './CourseCard';
import FilterPanel from './FilterPanel';
import SearchBar from './SearchBar';

export default function CourseBrowse() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState('popular');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Filter and sort logic
  const filteredCourses = useMemo(() => {
    let result = coursesData;

    // Search filter
    if (searchQuery.trim()) {
      result = result.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((course) =>
        selectedCategories.includes(course.category)
      );
    }

    // Age group filter
    if (selectedAgeGroups.length > 0) {
      result = result.filter((course) =>
        selectedAgeGroups.includes(course.ageGroup)
      );
    }

    // Price range filter
    if (selectedPriceRange) {
      result = result.filter(
        (course) =>
          course.price >= selectedPriceRange.min &&
          course.price <= selectedPriceRange.max
      );
    }

    // Rating filter
    if (selectedRating) {
      result = result.filter((course) => course.rating >= selectedRating);
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        result = result.reverse();
        break;
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        result = [...result].sort((a, b) =>
          parseInt(b.enrolledCount.replace(',', '')) -
          parseInt(a.enrolledCount.replace(',', ''))
        );
    }

    return result;
  }, [searchQuery, selectedCategories, selectedAgeGroups, selectedPriceRange, selectedRating, sortBy]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleAgeGroupToggle = (ageGroup) => {
    setSelectedAgeGroups((prev) =>
      prev.includes(ageGroup)
        ? prev.filter((a) => a !== ageGroup)
        : [...prev, ageGroup]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedAgeGroups([]);
    setSelectedPriceRange(null);
    setSelectedRating(null);
    setSortBy('popular');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategories.length > 0 ||
    selectedAgeGroups.length > 0 ||
    selectedPriceRange ||
    selectedRating ||
    sortBy !== 'popular';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
      {/* Header Section */}
      <header className={`${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 xs:px-6 md:px-8 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className={`text-h3 md:text-h2 font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                Browse Courses
              </h1>
              <p className={`text-body-md mt-1 md:mt-2 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {filteredCourses.length} courses available
              </p>
            </div>
            
            {/* Dark Mode Toggle and Desktop Sort */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors-smooth ${
                  isDarkMode
                    ? 'bg-neutral-700 text-yellow-400 hover:bg-neutral-600'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>

              {/* Desktop Sort Dropdown */}
              <div className="hidden md:flex items-center gap-2">
                <label className={`text-label ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-3 py-2 rounded-lg text-body-md transition-all-smooth ${
                    isDarkMode
                      ? 'bg-neutral-700 border-neutral-600 text-white hover:border-primary-400 focus:ring-primary-400'
                      : 'border border-neutral-300 text-neutral-900 hover:border-primary-500 focus:ring-primary-500'
                  } border focus-outline`}
                >
                  {filterOptions.sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-4 md:mt-6">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} isDarkMode={isDarkMode} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 xs:px-6 md:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors-smooth active:scale-95 transition-transform"
            aria-label="Toggle filters"
          >
            <FiFilter className="w-5 h-5" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-accent-orange rounded-full text-white">
                {[selectedCategories.length > 0 ? 1 : 0, selectedAgeGroups.length > 0 ? 1 : 0, selectedPriceRange ? 1 : 0, selectedRating ? 1 : 0, sortBy !== 'popular' ? 1 : 0].filter(Boolean).length}
              </span>
            )}
          </button>

          {/* Filter Panel */}
          <aside
            className={`${
              isFilterOpen ? 'block' : 'hidden'
            } lg:block lg:w-80 lg:flex-shrink-0`}
          >
            <FilterPanel
              categories={filterOptions.categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              ageGroups={filterOptions.ageGroups}
              selectedAgeGroups={selectedAgeGroups}
              onAgeGroupToggle={handleAgeGroupToggle}
              selectedPriceRange={selectedPriceRange}
              onPriceRangeChange={setSelectedPriceRange}
              priceRanges={filterOptions.priceRanges}
              selectedRating={selectedRating}
              onRatingChange={setSelectedRating}
              ratings={filterOptions.ratings}
              hasActiveFilters={hasActiveFilters}
              onResetFilters={handleResetFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
              sortOptions={filterOptions.sortOptions}
              isDarkMode={isDarkMode}
            />
          </aside>

          {/* Courses Grid */}
          <section className="flex-1">
            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className={`mb-6 p-4 rounded-lg border ${
                isDarkMode
                  ? 'bg-blue-900 border-blue-700'
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-center justify-between gap-2">
                  <div className={`text-sm ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                    <span className="font-semibold">{filteredCourses.length} results</span>
                    {searchQuery && ` for "${searchQuery}"`}
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className={`text-sm font-medium hover:underline ${
                      isDarkMode
                        ? 'text-blue-300 hover:text-blue-200'
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}

            {/* No Results State */}
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12 md:py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className={`text-h4 mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>No courses found</h3>
                <p className={`text-body-md mb-4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors-smooth"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} isDarkMode={isDarkMode} />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredCourses.length > 0 && (
              <div className="mt-8 text-center">
                <button className={`px-8 py-3 rounded-lg font-medium transition-colors-smooth active:scale-95 transition-transform border-2 ${
                  isDarkMode
                    ? 'border-primary-400 text-primary-400 hover:bg-primary-950'
                    : 'border-primary-500 text-primary-500 hover:bg-primary-50'
                }`}>
                  Load more courses
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
