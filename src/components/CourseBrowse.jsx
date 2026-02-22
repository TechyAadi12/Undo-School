import React, { useState, useMemo } from 'react';
import { FiFilter } from 'react-icons/fi';
import { coursesData, filterOptions } from '../data/coursesData';
import CourseCard from './CourseCard';
import FilterDrawer from './FilterDrawer';
import SearchBar from './SearchBar';
import CategoryChips from './CategoryChips';
import FilterTags from './FilterTags';
import CourseSliderSection from './CourseSliderSection';
import SkeletonLoader from './SkeletonLoader';

export default function CourseBrowse({ isDarkMode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState('popular');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Helper functions to categorize courses
  const getTrendingCourses = () => {
    return coursesData
      .slice()
      .sort((a, b) => parseInt(b.enrolledCount.replace(',', '')) - parseInt(a.enrolledCount.replace(',', '')))
      .slice(0, 6);
  };

  const getTopRatedCourses = () => {
    return coursesData
      .filter((course) => course.rating >= 4.7)
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  };

  const getNewCourses = () => {
    return coursesData
      .filter((course) => course.badge === 'New course')
      .slice(0, 6);
  };

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

  const handleRemoveCategory = (category) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
  };

  const handleRemovePriceRange = () => {
    setSelectedPriceRange(null);
  };

  const handleRemoveRating = () => {
    setSelectedRating(null);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategories.length > 0 ||
    selectedAgeGroups.length > 0 ||
    selectedPriceRange ||
    selectedRating ||
    sortBy !== 'popular';

  const trendingCourses = getTrendingCourses();
  const topRatedCourses = getTopRatedCourses();
  const newCourses = getNewCourses();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-neutral-950' : 'bg-gradient-to-b from-purple-50 via-blue-50 to-white'}`}>
      {/* Sticky Header Section */}
      <header className={`sticky top-0 z-20 transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 border-neutral-700' : 'bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 border-blue-100'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 xs:px-6 md:px-8 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className={`text-h4 md:text-h3 font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                Browse Courses
              </h1>
            </div>

            {/* Desktop Sort */}
            <div className="hidden md:flex items-center gap-2">
              <label className={`text-label transition-colors duration-300 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-2 text-sm rounded-lg transition-all-smooth ${
                  isDarkMode
                    ? 'bg-neutral-700 border border-neutral-600 text-white hover:border-primary-400 focus:ring-primary-400'
                    : 'border border-neutral-300 bg-white text-neutral-900 hover:border-primary-500 focus:ring-primary-500'
                } focus-outline`}
              >
                {filterOptions.sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-3">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} isDarkMode={isDarkMode} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 xs:px-6 md:px-8 py-6 md:py-8">
        {/* Category Chips Row */}
        <div className="mb-8 animate-fade-in">
          <CategoryChips
            categories={filterOptions.categories}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Filters Section Above Courses */}
        <div className="mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div className={`rounded-lg border p-4 transition-colors ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}`}>
              <h3 className={`text-sm font-bold mb-3 transition-colors ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                Category
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {filterOptions.categories.map((category) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className={`w-4 h-4 rounded accent-primary-500 cursor-pointer ${isDarkMode ? 'bg-neutral-700 border-neutral-600' : 'border-neutral-300'}`}
                    />
                    <span className={`text-xs sm:text-sm transition-colors ${isDarkMode ? 'text-neutral-300 group-hover:text-primary-400' : 'text-neutral-700 group-hover:text-primary-600'}`}>
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Age Group Filter */}
            <div className={`rounded-lg border p-4 transition-colors ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}`}>
              <h3 className={`text-sm font-bold mb-3 transition-colors ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                Age Group
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {filterOptions.ageGroups.map((ageGroup) => (
                  <label key={ageGroup} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedAgeGroups.includes(ageGroup)}
                      onChange={() => handleAgeGroupToggle(ageGroup)}
                      className={`w-4 h-4 rounded accent-primary-500 cursor-pointer ${isDarkMode ? 'bg-neutral-700 border-neutral-600' : 'border-neutral-300'}`}
                    />
                    <span className={`text-xs sm:text-sm transition-colors ${isDarkMode ? 'text-neutral-300 group-hover:text-primary-400' : 'text-neutral-700 group-hover:text-primary-600'}`}>
                      {ageGroup}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className={`rounded-lg border p-4 transition-colors ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}`}>
              <h3 className={`text-sm font-bold mb-3 transition-colors ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                Price Range
              </h3>
              <div className="space-y-2">
                {filterOptions.priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange?.label === range.label}
                      onChange={() => setSelectedPriceRange(range)}
                      className={`w-4 h-4 accent-primary-500 cursor-pointer ${isDarkMode ? 'bg-neutral-700 border-neutral-600' : 'border-neutral-300'}`}
                    />
                    <span className={`text-xs sm:text-sm transition-colors ${isDarkMode ? 'text-neutral-300 group-hover:text-primary-400' : 'text-neutral-700 group-hover:text-primary-600'}`}>
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className={`rounded-lg border p-4 transition-colors ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}`}>
              <h3 className={`text-sm font-bold mb-3 transition-colors ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                Rating
              </h3>
              <div className="space-y-2">
                {filterOptions.ratings.map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                      className={`w-4 h-4 accent-primary-500 cursor-pointer ${isDarkMode ? 'bg-neutral-700 border-neutral-600' : 'border-neutral-300'}`}
                    />
                    <span className={`text-xs sm:text-sm transition-colors ${isDarkMode ? 'text-neutral-300 group-hover:text-primary-400' : 'text-neutral-700 group-hover:text-primary-600'}`}>
                      {rating}+ ⭐
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleResetFilters}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${isDarkMode ? 'text-primary-400 hover:bg-primary-950 bg-neutral-800' : 'text-primary-600 hover:bg-primary-50 bg-neutral-50'}`}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Courses Section */}
        <section className="w-full">
            {/* Filter Tags */}
            {hasActiveFilters && (
              <FilterTags
                searchQuery={searchQuery}
                selectedCategories={selectedCategories}
                selectedPriceRange={selectedPriceRange}
                selectedRating={selectedRating}
                priceRanges={filterOptions.priceRanges}
                onRemoveCategory={handleRemoveCategory}
                onRemovePriceRange={handleRemovePriceRange}
                onRemoveRating={handleRemoveRating}
                onClearAll={handleResetFilters}
                isDarkMode={isDarkMode}
              />
            )}

            {/* Trending Courses Slider */}
            {!hasActiveFilters && trendingCourses.length > 0 && (
              <CourseSliderSection
                title="🔥 Trending Now"
                courses={trendingCourses}
                isDarkMode={isDarkMode}
              />
            )}

            {/* Top Rated Courses Slider */}
            {!hasActiveFilters && topRatedCourses.length > 0 && (
              <CourseSliderSection
                title="⭐ Top Rated"
                courses={topRatedCourses}
                isDarkMode={isDarkMode}
              />
            )}

            {/* New Courses Slider */}
            {!hasActiveFilters && newCourses.length > 0 && (
              <CourseSliderSection
                title="✨ New Courses"
                courses={newCourses}
                isDarkMode={isDarkMode}
              />
            )}

            {/* All Courses Slider */}
            <div id="all-courses">
              <h2 className={`text-h4 md:text-h3 font-bold mb-6 transition-colors ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {hasActiveFilters ? `Search Results (${filteredCourses.length})` : 'All Courses'}
              </h2>

              {/* Loading State */}
              {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <SkeletonLoader isDarkMode={isDarkMode} count={6} />
                </div>
              )}

              {/* Empty State */}
              {filteredCourses.length === 0 && !isLoading && (
                <div className="text-center py-12 md:py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className={`text-h4 mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    No courses found
                  </h3>
                  <p className={`text-body-md mb-6 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Try adjusting your filters or search query
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-all duration-200 active:scale-95 hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Reset filters
                  </button>
                </div>
              )}

              {/* Courses Slider */}
              {filteredCourses.length > 0 && !isLoading && (
                <CourseSliderSection
                  title=""
                  courses={filteredCourses}
                  isDarkMode={isDarkMode}
                  maxItems={filteredCourses.length}
                />
              )}

              {/* Load More Button */}
              {filteredCourses.length > 0 && !isLoading && (
                <div className="mt-12 text-center animate-fade-in">
                  <button
                    className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 active:scale-95 border-2 hover:shadow-lg transform hover:-translate-y-1 group relative overflow-hidden ${
                      isDarkMode
                        ? 'border-primary-400 text-primary-400 hover:bg-primary-950'
                        : 'border-primary-500 text-primary-500 hover:bg-primary-50'
                    }`}
                  >
                    <span className="relative z-10">Load more courses</span>
                    <span className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-200 ${isDarkMode ? 'bg-primary-950' : 'bg-primary-50'}`}></span>
                  </button>
                </div>
              )}
            </div>
        </section>
      </div>
    </div>
  );
}
