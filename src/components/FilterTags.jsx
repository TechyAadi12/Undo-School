import React from 'react';
import { FiX } from 'react-icons/fi';

export default function FilterTags({
  searchQuery,
  selectedCategories,
  selectedAgeGroups,
  selectedPriceRange,
  selectedRating,
  onClearSearch,
  onRemoveCategory,
  onRemoveAgeGroup,
  onRemovePriceRange,
  onRemoveRating,
  onClearAll,
}) {
  const tags = [];

  if (searchQuery) {
    tags.push({
      id: `search-${searchQuery}`,
      label: `Search: ${searchQuery}`,
      type: 'search',
    });
  }

  selectedCategories.forEach((category) => {
    tags.push({
      id: `category-${category}`,
      label: category,
      type: 'category',
    });
  });

  selectedAgeGroups.forEach((ageGroup) => {
    tags.push({
      id: `age-${ageGroup}`,
      label: ageGroup,
      type: 'age',
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
      label: `${selectedRating}+ rating`,
      type: 'rating',
    });
  }

  if (!tags.length) {
    return null;
  }

  const handleRemoveTag = (tag) => {
    switch (tag.type) {
      case 'category':
        onRemoveCategory(tag.label);
        break;
      case 'search':
        onClearSearch?.();
        break;
      case 'age':
        onRemoveAgeGroup(tag.label);
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
    <div className="mt-5 rounded-[1.5rem] border border-blue-100 bg-blue-50/70 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-semibold text-blue-800">Active filters</span>

        {tags.map((tag) => (
          <button
            key={tag.id}
            type="button"
            onClick={() => handleRemoveTag(tag)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:shadow"
          >
            {tag.label}
            <FiX className="h-4 w-4" />
          </button>
        ))}

        <button
          type="button"
          onClick={onClearAll}
          className="ml-auto text-sm font-semibold text-blue-700 transition hover:text-blue-800"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
