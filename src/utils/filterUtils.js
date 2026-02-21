// Utility functions for filtering, sorting, and search
// These are embedded in CourseBrowse.jsx but documented here for reference

/**
 * SEARCH ALGORITHM
 * Real-time substring search across multiple fields
 * Case-insensitive matching
 */

const searchCourses = (courses, query) => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return courses;
  
  return courses.filter((course) => 
    course.title.toLowerCase().includes(lowerQuery) ||
    course.category.toLowerCase().includes(lowerQuery) ||
    course.instructor.toLowerCase().includes(lowerQuery)
  );
};

/**
 * CATEGORY FILTER
 * Multi-select filtering using array inclusion
 * Shallow equality check
 */

const filterByCategories = (courses, selectedCategories) => {
  if (selectedCategories.length === 0) return courses;
  
  return courses.filter((course) =>
    selectedCategories.includes(course.category)
  );
};

/**
 * PRICE RANGE FILTER
 * Inclusive range check: min <= price <= max
 * Handles null/undefined safely
 */

const filterByPriceRange = (courses, priceRange) => {
  if (!priceRange) return courses;
  
  return courses.filter(
    (course) =>
      course.price >= priceRange.min &&
      course.price <= priceRange.max
  );
};

/**
 * RATING FILTER
 * Minimum rating threshold
 * Courses must have rating >= selected minimum
 */

const filterByRating = (courses, minRating) => {
  if (!minRating) return courses;
  
  return courses.filter((course) => course.rating >= minRating);
};

/**
 * SORTING FUNCTIONS
 * Multiple sort strategies with composition
 */

const sortCourses = (courses, sortBy) => {
  const sorted = [...courses]; // Non-mutative copy
  
  switch (sortBy) {
    case 'newest':
      // Assume last added courses are at the end
      return sorted.reverse();
    
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    
    case 'popular':
    default:
      // Sort by enrollment count (descending)
      return sorted.sort((a, b) =>
        parseInt(b.enrolledCount.replace(',', '')) -
        parseInt(a.enrolledCount.replace(',', ''))
      );
  }
};

/**
 * COMPOSITE FILTER PIPELINE
 * Filters applied in order:
 * 1. Search (broadest)
 * 2. Category
 * 3. Price
 * 4. Rating (narrowest)
 * 5. Sort (final)
 */

const applyFilters = (
  courses,
  searchQuery,
  selectedCategories,
  selectedPriceRange,
  selectedRating,
  sortBy
) => {
  let result = courses;
  
  // Apply filters sequentially
  result = searchCourses(result, searchQuery);
  result = filterByCategories(result, selectedCategories);
  result = filterByPriceRange(result, selectedPriceRange);
  result = filterByRating(result, selectedRating);
  
  // Sort last (after all filtering)
  result = sortCourses(result, sortBy);
  
  return result;
};

/**
 * COURSE MATCHING ALGORITHM
 * For search - matches across multiple fields with priority
 */

const scoreMatch = (course, query) => {
  const lowerQuery = query.toLowerCase();
  let score = 0;
  
  // Exact title match gets highest priority
  if (course.title.toLowerCase() === query) score += 100;
  
  // Title contains gets high priority
  if (course.title.toLowerCase().includes(query)) score += 50;
  
  // Category match
  if (course.category.toLowerCase().includes(query)) score += 25;
  
  // Instructor match
  if (course.instructor.toLowerCase().includes(query)) score += 10;
  
  return score;
};

/**
 * FILTER STATE COMPRESSION
 * Useful for URL params or storage
 */

const serializeFilters = (filters) => {
  return {
    search: filters.searchQuery,
    categories: filters.selectedCategories.join(','),
    price: filters.selectedPriceRange 
      ? `${filters.selectedPriceRange.min}-${filters.selectedPriceRange.max}`
      : null,
    rating: filters.selectedRating || null,
    sort: filters.sortBy,
  };
};

const deserializeFilters = (serialized) => {
  return {
    searchQuery: serialized.search || '',
    selectedCategories: serialized.categories ? serialized.categories.split(',') : [],
    selectedPriceRange: serialized.price 
      ? (() => {
          const [min, max] = serialized.price.split('-');
          return { min: parseInt(min), max: parseInt(max) };
        })()
      : null,
    selectedRating: serialized.rating ? parseFloat(serialized.rating) : null,
    sortBy: serialized.sort || 'popular',
  };
};

/**
 * FILTER ANALYTICS
 * Track which filters are most used
 */

const analyzeFilters = (filterHistory) => {
  const filterCount = {};
  
  filterHistory.forEach(filter => {
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        filterCount[key] = (filterCount[key] || 0) + 1;
      }
    });
  });
  
  return filterCount;
};

/**
 * COURSE RECOMMENDATIONS
 * Simple recommendation based on category and rating
 */

const getRecommendations = (course, allCourses, limit = 3) => {
  return allCourses
    .filter(c => 
      c.id !== course.id &&
      (c.category === course.category || c.rating >= course.rating - 0.2)
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

/**
 * PRICE STATISTICS
 * Extract insights from course data
 */

const getPriceStats = (courses) => {
  const prices = courses.map(c => c.price);
  
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    median: prices.sort((a, b) => a - b)[Math.floor(prices.length / 2)],
  };
};

/**
 * CATEGORY DISTRIBUTION
 * Shows diversity of course offerings
 */

const getCategoryStats = (courses) => {
  const stats = {};
  
  courses.forEach(course => {
    stats[course.category] = (stats[course.category] || 0) + 1;
  });
  
  return Object.entries(stats)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
};

/**
 * SEARCH OPTIMIZATION
 * Potential optimization: Build search index for faster lookups
 */

class SearchIndex {
  constructor(courses) {
    this.courses = courses;
    this.buildIndex();
  }
  
  buildIndex() {
    this.titleIndex = new Map();
    this.categoryIndex = new Map();
    this.instructorIndex = new Map();
    
    this.courses.forEach(course => {
      // Index by course words in title
      course.title.toLowerCase().split(' ').forEach(word => {
        if (!this.titleIndex.has(word)) {
          this.titleIndex.set(word, []);
        }
        this.titleIndex.get(word).push(course.id);
      });
      
      // Index by category
      if (!this.categoryIndex.has(course.category)) {
        this.categoryIndex.set(course.category, []);
      }
      this.categoryIndex.get(course.category).push(course.id);
      
      // Index by instructor
      if (!this.instructorIndex.has(course.instructor)) {
        this.instructorIndex.set(course.instructor, []);
      }
      this.instructorIndex.get(course.instructor).push(course.id);
    });
  }
  
  search(query) {
    const words = query.toLowerCase().split(' ');
    const results = new Set();
    
    words.forEach(word => {
      const ids = this.titleIndex.get(word) || [];
      ids.forEach(id => results.add(id));
    });
    
    return Array.from(results)
      .map(id => this.courses.find(c => c.id === id));
  }
}

/**
 * PERFORMANCE MONITORING
 * Track filter application time for optimization
 */

const measureFilterPerformance = (courses, filters) => {
  const start = performance.now();
  
  const result = applyFilters(
    courses,
    filters.searchQuery,
    filters.selectedCategories,
    filters.selectedPriceRange,
    filters.selectedRating,
    filters.sortBy,
  );
  
  const end = performance.now();
  
  return {
    result,
    duration: end - start,
  };
};

export {
  searchCourses,
  filterByCategories,
  filterByPriceRange,
  filterByRating,
  sortCourses,
  applyFilters,
  scoreMatch,
  serializeFilters,
  deserializeFilters,
  analyzeFilters,
  getRecommendations,
  getPriceStats,
  getCategoryStats,
  SearchIndex,
  measureFilterPerformance,
};
