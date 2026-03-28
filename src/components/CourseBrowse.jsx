import React, { useEffect, useMemo, useState } from 'react';
import { Show, SignInButton, useAuth } from '@clerk/react';
import { FiClock, FiFilter, FiStar } from 'react-icons/fi';
import { coursesData, filterOptions } from '../data/coursesData';
import CategoryChips from './CategoryChips';
import CourseCard from './CourseCard';
import CourseSliderSection from './CourseSliderSection';
import FilterTags from './FilterTags';
import SearchBar from './SearchBar';
import SkeletonLoader from './SkeletonLoader';

const getInitialFilterState = (initialFilters = {}) => ({
  searchQuery: initialFilters.searchQuery || '',
  selectedCategories: initialFilters.selectedCategories || [],
  selectedAgeGroups: initialFilters.selectedAgeGroups || [],
  selectedPriceRange: initialFilters.selectedPriceRange || null,
  selectedRating: initialFilters.selectedRating || null,
  sortBy: initialFilters.sortBy || 'popular',
});

export default function CourseBrowse({
  previewOnly = false,
  compactMode = false,
  savedCourseIdSet,
  enrolledById,
  initialFilters,
  onFiltersChange,
  onToggleSavedCourse,
  onEnrollCourse,
  onContinueCourse,
}) {
  const { isSignedIn } = useAuth();
  const [filters, setFilters] = useState(() => getInitialFilterState(initialFilters));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = window.setTimeout(() => setIsLoading(false), 220);

    return () => window.clearTimeout(timeout);
  }, [
    filters.searchQuery,
    filters.selectedCategories,
    filters.selectedAgeGroups,
    filters.selectedPriceRange,
    filters.selectedRating,
    filters.sortBy,
  ]);

  const filteredCourses = useMemo(() => {
    let result = [...coursesData];

    if (filters.searchQuery.trim()) {
      const normalizedQuery = filters.searchQuery.toLowerCase();
      result = result.filter((course) =>
        [course.title, course.category, course.instructor].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        )
      );
    }

    if (filters.selectedCategories.length > 0) {
      result = result.filter((course) => filters.selectedCategories.includes(course.category));
    }

    if (filters.selectedAgeGroups.length > 0) {
      result = result.filter((course) => filters.selectedAgeGroups.includes(course.ageGroup));
    }

    if (filters.selectedPriceRange) {
      result = result.filter(
        (course) =>
          course.price >= filters.selectedPriceRange.min &&
          course.price <= filters.selectedPriceRange.max
      );
    }

    if (filters.selectedRating) {
      result = result.filter((course) => course.rating >= filters.selectedRating);
    }

    switch (filters.sortBy) {
      case 'newest':
        result.reverse();
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort(
          (a, b) =>
            Number.parseInt(b.enrolledCount.replace(',', ''), 10) -
            Number.parseInt(a.enrolledCount.replace(',', ''), 10)
        );
    }

    return result;
  }, [filters]);

  const trendingCourses = useMemo(
    () =>
      [...coursesData]
        .sort(
          (a, b) =>
            Number.parseInt(b.enrolledCount.replace(',', ''), 10) -
            Number.parseInt(a.enrolledCount.replace(',', ''), 10)
        )
        .slice(0, 6),
    []
  );

  const topRatedCourses = useMemo(
    () => [...coursesData].sort((a, b) => b.rating - a.rating).slice(0, 6),
    []
  );

  const newCourses = useMemo(
    () => coursesData.filter((course) => course.badge === 'New course').slice(0, 6),
    []
  );

  const hasActiveFilters =
    Boolean(filters.searchQuery) ||
    filters.selectedCategories.length > 0 ||
    filters.selectedAgeGroups.length > 0 ||
    Boolean(filters.selectedPriceRange) ||
    Boolean(filters.selectedRating) ||
    filters.sortBy !== 'popular';

  const updateFilters = (nextFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...nextFilters,
    }));
  };

  const handleCategoryToggle = (category) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((item) => item !== category)
        : [...prev.selectedCategories, category],
    }));
  };

  const handleAgeGroupToggle = (ageGroup) => {
    setFilters((prev) => ({
      ...prev,
      selectedAgeGroups: prev.selectedAgeGroups.includes(ageGroup)
        ? prev.selectedAgeGroups.filter((item) => item !== ageGroup)
        : [...prev.selectedAgeGroups, ageGroup],
    }));
  };

  const handleResetFilters = () => {
    setFilters(getInitialFilterState());
  };

  const getCourseCardProps = (course) => {
    const enrollmentState = enrolledById.get(course.id);

    return {
      isAuthenticated: isSignedIn,
      isPreviewMode: previewOnly,
      isSaved: savedCourseIdSet.has(course.id),
      isEnrolled: Boolean(enrollmentState),
      progress: enrollmentState?.progress || 0,
      onToggleSave: onToggleSavedCourse,
      onEnroll: onEnrollCourse,
      onContinue: onContinueCourse,
    };
  };

  return (
    <section id="courses" className={compactMode ? 'py-0' : 'px-4 py-14 sm:px-6 lg:px-8'}>
      <div className="mx-auto max-w-7xl">
        <div className={`border border-white/45 bg-white/70 shadow-xl shadow-slate-900/5 backdrop-blur-xl ${compactMode ? 'rounded-[1.5rem] p-4 md:p-5' : 'rounded-[2rem] p-6 md:p-8'}`}>
          <div className={`flex flex-col ${compactMode ? 'gap-4' : 'gap-6'} lg:flex-row lg:items-start lg:justify-between`}>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                <FiStar className="h-4 w-4" />
                Visitor and member flows stay connected
              </div>
              <h2 className={`font-bold text-slate-900 ${compactMode ? 'mt-3 text-2xl md:text-3xl' : 'mt-4 text-3xl md:text-4xl'}`}>
                {previewOnly
                  ? 'Explore a polished course preview before you sign in.'
                  : 'Explore courses with sharper filters and clearer enrollment cues.'}
              </h2>
              <p className={`text-sm text-slate-600 ${compactMode ? 'mt-2' : 'mt-3 md:text-base'}`}>
                {previewOnly
                  ? 'Use age group and domain filters to discover what fits, then log in to unlock full course details, dashboard access, and enrollment flows.'
                  : 'Browse by age group and domain, compare trusted signals like ratings and demand, then sign in only when you are ready to enroll.'}
              </p>
            </div>

            <div className={`w-full max-w-md border border-white/45 bg-slate-950 text-white shadow-lg shadow-slate-950/15 ${compactMode ? 'rounded-[1.25rem] p-4' : 'rounded-[1.75rem] p-5'}`}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">State-aware UX</p>
              <div className="mt-4 space-y-3 text-sm text-slate-200">
                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                  <FiFilter className="mt-0.5 h-4 w-4 text-cyan-300" />
                  Filters persist before login and shape dashboard recommendations after login.
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                  <FiClock className="mt-0.5 h-4 w-4 text-cyan-300" />
                  Enrolled courses keep progress locally so the dashboard feels alive immediately.
                </div>
              </div>

              <div className="mt-4">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                      Login to unlock enrollment
                    </button>
                  </SignInButton>
                </Show>
                <Show when="signed-in">
                  <div className="rounded-2xl bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-200">
                    Logged in: enroll, save, and continue learning from your dashboard.
                  </div>
                </Show>
              </div>
            </div>
          </div>

          <div className={compactMode ? 'mt-5' : 'mt-8'}>
            <SearchBar
              searchQuery={filters.searchQuery}
              setSearchQuery={(searchQuery) => updateFilters({ searchQuery })}
            />
          </div>

          <div className={compactMode ? 'mt-5' : 'mt-6'}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Domains</h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                >
                  Clear all filters
                </button>
              )}
            </div>
            <CategoryChips
              categories={filterOptions.categories}
              selectedCategories={filters.selectedCategories}
              onCategoryToggle={handleCategoryToggle}
            />
          </div>

          <div className={`grid gap-3 lg:grid-cols-4 ${compactMode ? 'mt-5' : 'mt-6'}`}>
            <label className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Age group
              </span>
              <select
                value={filters.selectedAgeGroups[0] || ''}
                onChange={(event) =>
                  updateFilters({
                    selectedAgeGroups: event.target.value ? [event.target.value] : [],
                  })
                }
                className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
              >
                <option value="">All age groups</option>
                {filterOptions.ageGroups.map((ageGroup) => (
                  <option key={ageGroup} value={ageGroup}>
                    {ageGroup}
                  </option>
                ))}
              </select>
            </label>

            <label className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Budget
              </span>
              <select
                value={filters.selectedPriceRange?.label || ''}
                onChange={(event) =>
                  updateFilters({
                    selectedPriceRange:
                      filterOptions.priceRanges.find((range) => range.label === event.target.value) || null,
                  })
                }
                className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
              >
                <option value="">Any budget</option>
                {filterOptions.priceRanges.map((range) => (
                  <option key={range.label} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Minimum rating
              </span>
              <select
                value={filters.selectedRating || ''}
                onChange={(event) =>
                  updateFilters({
                    selectedRating: event.target.value ? Number(event.target.value) : null,
                  })
                }
                className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
              >
                <option value="">Any rating</option>
                {filterOptions.ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} and up
                  </option>
                ))}
              </select>
            </label>

            <label className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Sort by
              </span>
              <select
                value={filters.sortBy}
                onChange={(event) => updateFilters({ sortBy: event.target.value })}
                className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
              >
                {filterOptions.sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={`flex flex-wrap gap-2 ${compactMode ? 'mt-4' : 'mt-5'}`}>
            {filterOptions.ageGroups.map((ageGroup) => {
              const isActive = filters.selectedAgeGroups.includes(ageGroup);

              return (
                <button
                  key={ageGroup}
                  type="button"
                  onClick={() => handleAgeGroupToggle(ageGroup)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                      : 'bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {ageGroup}
                </button>
              );
            })}
          </div>

          <FilterTags
            searchQuery={filters.searchQuery}
            selectedCategories={filters.selectedCategories}
            selectedAgeGroups={filters.selectedAgeGroups}
            selectedPriceRange={filters.selectedPriceRange}
            selectedRating={filters.selectedRating}
            onClearSearch={() => updateFilters({ searchQuery: '' })}
            onRemoveCategory={(category) =>
              updateFilters({
                selectedCategories: filters.selectedCategories.filter((item) => item !== category),
              })
            }
            onRemoveAgeGroup={(ageGroup) =>
              updateFilters({
                selectedAgeGroups: filters.selectedAgeGroups.filter((item) => item !== ageGroup),
              })
            }
            onRemovePriceRange={() => updateFilters({ selectedPriceRange: null })}
            onRemoveRating={() => updateFilters({ selectedRating: null })}
            onClearAll={handleResetFilters}
          />
        </div>

        {!hasActiveFilters && (
          <div className={`space-y-8 ${compactMode ? 'mt-7' : 'mt-10'}`}>
            <CourseSliderSection
              title="Trending now"
              subtitle="High-demand learning paths with strong enrollment velocity."
              courses={trendingCourses}
              getCourseCardProps={getCourseCardProps}
            />
            <CourseSliderSection
              title="Top rated"
              subtitle="Courses learners consistently rate highly."
              courses={topRatedCourses}
              getCourseCardProps={getCourseCardProps}
            />
            <CourseSliderSection
              title="New to EduPathway"
              subtitle="Fresh additions for learners exploring new interests."
              courses={newCourses}
              getCourseCardProps={getCourseCardProps}
            />
          </div>
        )}

        <div id="all-courses" className={compactMode ? 'mt-7' : 'mt-10'}>
          <div className={`flex flex-col gap-2 md:flex-row md:items-end md:justify-between ${compactMode ? 'mb-4' : 'mb-6'}`}>
            <div>
              <h2 className={`font-bold text-slate-900 ${compactMode ? 'text-2xl' : 'text-3xl'}`}>
                {hasActiveFilters
                  ? `Matching courses (${filteredCourses.length})`
                  : previewOnly
                  ? 'Featured course previews'
                  : 'Explore all courses'}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {previewOnly
                  ? 'Visitors can preview the catalog here, then move into the full dashboard and enrollment flow after login.'
                  : 'Clear cues, stronger card hierarchy, and login-aware actions make browsing feel more intentional.'}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <SkeletonLoader count={6} />
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {(previewOnly ? filteredCourses.slice(0, 6) : filteredCourses).map((course) => (
                <CourseCard key={course.id} course={course} {...getCourseCardProps(course)} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/65 px-6 py-12 text-center backdrop-blur-md">
              <h3 className="text-2xl font-semibold text-slate-900">No courses match these filters</h3>
              <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">
                Try broadening the age group or domain selection. Your saved filter state will still be waiting after login.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-5 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Reset filters
              </button>
            </div>
          )}

          {previewOnly && filteredCourses.length > 0 && (
            <div className="mt-8 rounded-[2rem] border border-slate-900/10 bg-slate-900 px-6 py-8 text-center text-white shadow-xl shadow-slate-900/10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Unlock the full experience
              </p>
              <h3 className="mt-3 text-2xl font-bold">
                Sign in to view full course details, enrollments, and your learning dashboard.
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-200">
                After login, learners move into the dashboard where recommendations, saved courses, enrollment progress, and course management all live together.
              </p>
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="mt-5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Sign in to continue
                </button>
              </SignInButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
