import React from 'react';
import { FiX } from 'react-icons/fi';

export default function FilterTags({
  searchQuery,
  selectedCategories,
  selectedPriceRange,
  selectedRating,
  priceRanges,
  onRemoveCategory,
  onRemovePriceRange,
  onRemoveRating,
  onClearAll,
  isDarkMode,
}) {
  const tags = [];

  if (searchQuery) {
    tags.push({
      id: `search-${searchQuery}`,
      label: `Search: "${searchQuery}"`,
      type: 'search',
    });
  }

  selectedCategories.forEach((cat) => {
    tags.push({
      id: `category-${cat}`,
      label: cat,
      type: 'category',
    });
  });

  if (selectedPriceRange) {
    tags.push({
      id: 'price-range',
      label: selectedPriceRange.label,
      type: 'priceRange',
    });
  }

  if (selectedRating) {
    tags.push({
      id: 'rating',
      label: `${selectedRating}+ rated`,
      type: 'rating',
    });
  }

  if (tags.length === 0) {
    return null;
  }

  const handleRemoveTag = (tag) => {
    switch (tag.type) {
      case 'category':
        onRemoveCategory(tag.label);
        break;
      case 'priceRange':
        onRemovePriceRange();
        break;
      case 'rating':
        onRemoveRating();
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`mb-6 p-4 rounded-lg border animate-fade-in ${
        isDarkMode
          ? 'bg-blue-900 border-blue-700'
          : 'bg-blue-50 border-blue-200'
      }`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`text-sm font-medium ${
            isDarkMode ? 'text-blue-200' : 'text-blue-700'
          }`}
        >
          Active filters:
        </span>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleRemoveTag(tag)}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all hover:shadow-md active:scale-95 ${
                isDarkMode
                  ? 'bg-blue-700 text-blue-100 hover:bg-blue-600'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
              aria-label={`Remove ${tag.label} filter`}
            >
              {tag.label}
              <FiX className="w-4 h-4" />
            </button>
          ))}
        </div>

        {tags.length > 0 && (
          <button
            onClick={onClearAll}
            className={`ml-auto text-sm font-medium hover:underline transition ${
              isDarkMode
                ? 'text-blue-300 hover:text-blue-200'
                : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
