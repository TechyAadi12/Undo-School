# Component API Reference

## Complete Guide to Component Props and Usage

---

## `<CourseBrowse />`

**Location**: `src/components/CourseBrowse.jsx`

Main container component that orchestrates filtering, searching, and sorting logic.

### Props
None - This is the root component for the page.

### State Management
```javascript
const [searchQuery, setSearchQuery] = useState('');
const [selectedCategories, setSelectedCategories] = useState([]);
const [selectedPriceRange, setSelectedPriceRange] = useState(null);
const [selectedRating, setSelectedRating] = useState(null);
const [sortBy, setSortBy] = useState('popular');
const [isFilterOpen, setIsFilterOpen] = useState(false);
```

### Methods

#### `handleCategoryToggle(category: string): void`
Toggles a category in the selected categories array.
```javascript
// Add category if not present, remove if present
handleCategoryToggle('Coding');
```

#### `handleResetFilters(): void`
Resets all filters and search to default state.
```javascript
handleResetFilters();
// Clears all state to initial values
```

### Computed Properties

#### `filteredCourses: Array`
Memoized array of courses after applying all filters and sorting.
- Recalculates only when filter dependencies change
- Optimized with useMemo for performance
- Returns sorted, filtered course array

#### `hasActiveFilters: boolean`
Indicator if any filters are currently active.
- Used to show filter badge counter
- Used to show reset filters button
- Used to display filter summary

### Rendered Subcomponents

1. **`<SearchBar />`** - Search input
2. **`<FilterPanel />` - Filter sidebar (desktop) / modal (mobile)
3. **CourseCard grid** - Maps over filteredCourses

### Key Features
- Real-time search filtering
- Multi-select category filtering
- Price range filtering
- Minimum rating filtering
- Multiple sorting options
- Filter reset functionality
- Responsive layout with filter toggle

---

## `<SearchBar />`

**Location**: `src/components/SearchBar.jsx`

Input component for searching courses by title, category, or instructor.

### Props

```typescript
{
  searchQuery: string;        // Current search text
  setSearchQuery: (text: string) => void;  // Update handler
}
```

### Example Usage
```jsx
<SearchBar 
  searchQuery={searchQuery} 
  setSearchQuery={setSearchQuery}
/>
```

### Internal State
None - Pure controlled component that uses parent state.

### Features
- Real-time search input
- Clear button when text present
- Search icon indicator
- Accessible with ARIA labels
- Placeholder text: "What do you want to learn today?"

### Styling
- Border: neutral-300 (default), primary-500 (focus)
- Padding: 12px vertical, 12px horizontal
- Border radius: 12px (xl)
- Focus ring: 2px primary-500 with offset

---

## `<FilterPanel />`

**Location**: `src/components/FilterPanel.jsx`

Sidebar component containing all filter controls and sort options.

### Props

```typescript
{
  categories: string[];                              // Available categories
  selectedCategories: string[];                      // Currently selected
  onCategoryToggle: (category: string) => void;     // Toggle handler
  
  selectedPriceRange: {min: number; max: number} | null;  // Current range
  onPriceRangeChange: (range: object) => void;      // Range change handler
  priceRanges: Array<{min, max, label}>            // Available ranges
  
  selectedRating: number | null;                     // Current minimum rating
  onRatingChange: (rating: number) => void;          // Rating change handler
  ratings: number[];                                  // Available ratings
  
  hasActiveFilters: boolean;                         // Show reset button
  onResetFilters: () => void;                        // Reset handler
  
  sortBy: string;                                     // Current sort option
  onSortChange: (sortBy: string) => void;           // Sort change handler
  sortOptions: Array<{value, label}>;               // Available sorts
}
```

### Example Usage
```jsx
<FilterPanel
  categories={filterOptions.categories}
  selectedCategories={selectedCategories}
  onCategoryToggle={handleCategoryToggle}
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
/>
```

### Internal State
```javascript
const [expandedSections, setExpandedSections] = useState({
  category: true,
  price: true,
  rating: true,
  sort: false,  // Mobile only
});
```

### Methods

#### `toggleSection(section: string): void`
Expands or collapses a filter section.
```javascript
toggleSection('category');  // Toggles category section
```

### Features by Section

#### Category Filter
- Checkbox list of available categories
- Multi-select (can select multiple)
- Shows count of selected categories
- Toggles enable/disable

#### Price Range Filter
- Radio button list (single select)
- Options: Under $200, $200-$350, $350+
- Shows current selection
- Toggles on/off (click again to deselect)

#### Rating Filter
- Radio button list (single select)
- Options: 4.5+, 4.6+, 4.7+, 4.8+, 4.9+ stars
- Shows star emoji for clarity
- Single choice

#### Sort Filter (Mobile Only)
- Radio button list (single select)
- Options: Popular, Newest, Price (Low-High), Price (High-Low), Rating
- Hidden on desktop (shown in header dropdown)
- Affects course grid order

#### Reset Button
- Shows only if `hasActiveFilters` is true
- Triggers `onResetFilters` callback
- Visual: Red/primary colored text

### Styling & Layout
- Sticky positioning on desktop
- White background with border
- Collapsible sections with chevron icons
- 280px width on desktop, full width on mobile

---

## `<CourseCard />`

**Location**: `src/components/CourseCard.jsx`

Displays a single course with all relevant information and interactions.

### Props

```typescript
{
  course: {
    id: number;
    title: string;
    image: string;                          // Image URL
    category: string;                       // e.g., "Coding"
    level: string;                          // e.g., "Intermediate"
    duration: string;                       // e.g., "7-10 yrs"
    rating: number;                         // 0.0 - 5.0
    reviews: number;                        // Number of reviews
    price: number;                          // Price in USD
    badge: string | null;                   // "Selling fast", "New course", etc.
    instructor: string;                     // Instructor name
    enrolledCount: string;                  // e.g., "1,250"
  }
}
```

### Example Usage
```jsx
<CourseCard course={courseData} />
```

### Internal State
```javascript
const [isFavorite, setIsFavorite] = useState(false);  // Favorite toggle
const [isHovered, setIsHovered] = useState(false);    // Hover state
```

### Methods

#### Favorite Toggle
```javascript
// Controlled through isFavorite state
// Click heart icon to toggle
```

#### Enroll Button Click
Currently visual only - no API integration.

### Sections

#### Header Image Container
- Height: 192px (mobile), 224px (tablet+)
- Background: Neutral-200 while loading
- Image: Lazy loaded, responsive sizing
- Hover effect: Image scales to 1.1 (10% zoom)
- Duration: 500ms

#### Badge (Top-Left)
- Shows "Selling fast" or "New course" if populated
- Orange background, white text
- Bold font, 10px size
- Fully rounded (20px border-radius)

#### Favorite Button (Top-Right)
- Heart icon (FiHeart from react-icons)
- Toggles between outline and filled on click
- Color: Neutral-600 (default) → Accent-orange (favorited)
- Hover: Scales up 1.2x
- Shadow: 1px on button background

#### Quick Action Overlay
- Appears on card hover
- Black background 50% opacity
- Center button: "Enroll now" with shopping cart icon
- Smooth fade-in animation

#### Category & Level Badges (Below Image)
- Category: Primary-50 background, primary-600 text
- Level: Neutral-100 background, neutral-700 text
- Pills with 6px border-radius
- Display: Inline-flex with 8px gap

#### Title
- 2-line truncation (line-clamp-2)
- Body-md font (14px) on mobile, body-lg on tablet
- Semi-bold weight
- Hover: Changes to primary-600 color
- Smooth color transition

#### Metadata (Duration & Rating)
- Duration: "⏱️ 7-10 yrs"
- Rating: "⭐ 4.7 (280)"
- Small text, neutral-600 color
- Side-by-side layout

#### Instructor Info
- Avatar: 32px circle with gradient background
- First letter of instructor name in white
- Name truncated with ellipsis
- Enrolled count below: "1,250 enrolled"
- Divider line below this section

#### Price & CTA
- Price: Large bold text (H5/H6 size)
- Button: Full-width flex, primary-500 background
- Button text: "Enroll" (responsive, "Enroll" on mobile)
- Button icon: Shopping cart (FiShoppingCart)
- Hover: Background darkens to primary-600

### Styling
- Border: neutral-200 (default), primary-300 (hover)
- Shadow: None (default), lg (hover)
- Transition: All changes smooth over 250ms
- Animations: Fade-in on mount, scale effects on hover

---

## Data Structures

### Course Object
```typescript
interface Course {
  id: number;                          // Unique identifier
  title: string;                       // Full course title
  image: string;                       // Image URL
  category: string;                    // One of available categories
  level: string;                       // "Beginner", "Intermediate", etc.
  duration: string;                    // e.g., "7-10 yrs"
  rating: number;                      // 4.5 to 5.0
  reviews: number;                     // Number of reviews
  price: number;                       // USD price
  badge: string | null;                // Optional badge label
  instructor: string;                  // Instructor full name
  enrolledCount: string;               // Formatted with comma (e.g., "1,250")
}
```

### Filter Options Object
```typescript
interface FilterOptions {
  categories: string[];
  priceRanges: Array<{
    min: number;
    max: number;
    label: string;
  }>;
  ratings: number[];
  sortOptions: Array<{
    value: string;
    label: string;
  }>;
}
```

### Price Range Object
```typescript
interface PriceRange {
  min: number;    // Minimum price (inclusive)
  max: number;    // Maximum price (inclusive)
  label: string;  // Display label (e.g., "Under $200")
}
```

---

## Hook Usage

### useState Examples
```javascript
// Search state
const [searchQuery, setSearchQuery] = useState('');

// Multi-select categories
const [selectedCategories, setSelectedCategories] = useState([]);

// Single-select price
const [selectedPriceRange, setSelectedPriceRange] = useState(null);

// Controlled favorite toggle
const [isFavorite, setIsFavorite] = useState(false);
```

### useMemo Examples
```javascript
// Expensive filtering/sorting calculation
const filteredCourses = useMemo(() => {
  // Complex logic here
  return result;
}, [searchQuery, selectedCategories, selectedPriceRange, selectedRating, sortBy]);
```

---

## Event Handlers

### Search Changes
```javascript
const handleSearchChange = (e) => {
  setSearchQuery(e.target.value);
};
```

### Category Toggle
```javascript
const handleCategoryToggle = (category) => {
  setSelectedCategories(prev =>
    prev.includes(category)
      ? prev.filter(c => c !== category)
      : [...prev, category]
  );
};
```

### Price Range Selection
```javascript
const handlePriceChange = (range) => {
  setSelectedPriceRange(range);
};
```

### Rating Selection
```javascript
const handleRatingChange = (rating) => {
  setSelectedRating(rating);
};
```

### Sort Change
```javascript
const handleSortChange = (sortOption) => {
  setSortBy(sortOption);
};
```

### Reset All
```javascript
const handleResetFilters = () => {
  setSearchQuery('');
  setSelectedCategories([]);
  setSelectedPriceRange(null);
  setSelectedRating(null);
  setSortBy('popular');
};
```

---

## Accessibility API

### ARIA Labels
All interactive elements include aria-labels:
```jsx
<input aria-label="Search courses" />
<button aria-label="Toggle filters" />
<button aria-expanded={isOpen} />
<label><input aria-label="Filter by Coding" /></label>
```

### Focus Management
- Tab through all interactive elements
- Focus visible on buttons, inputs, checkboxes
- Focus ring color: primary-500
- Focus ring offset: 2px

### Keyboard Navigation
- Search input: Type to search, Clear button clearable
- Checkboxes: Space to toggle, Tab to navigate
- Radio buttons: Arrow keys for selection
- Buttons: Enter/Space to activate

---

## Performance Considerations

### useMemo Dependencies
```javascript
const filteredCourses = useMemo(() => {
  // Recalculates only when these change:
}, [searchQuery, selectedCategories, selectedPriceRange, selectedRating, sortBy]);
```

### Lazy Loading
```jsx
<img loading="lazy" src={course.image} />
```

### Non-Mutative Updates
```javascript
// Good - spreads first
setSelectedCategories(prev => [...prev, category]);

// Good - creates new array
setSelectedCategories(prev =>
  prev.filter(c => c !== category)
);

// Bad - mutation
selectedCategories.push(category);
```

---

## Styling Classes Reference

### Responsive Classes
```
xs:     375px base mobile
sm:     640px small screen
md:     768px tablet
lg:     1024px large tablet
xl:     1440px desktop
2xl:    1600px large desktop
```

### Example
```jsx
<div className="px-4 xs:px-6 md:px-8">
  {/* 16px padding on mobile, 24px on tablet, 32px on desktop */}
</div>
```

### Color Classes
```
text-primary-500  (purple)
bg-primary-50     (light purple background)
text-accent-orange
border-neutral-300
```

### Utility Classes
```
transition-all-smooth    (250ms transition)
focus-outline           (focus ring styling)
animate-fade-in         (fade animation)
group-hover:scale-110   (scale on parent hover)
```

---

## Extending the Components

### Adding a New Filter Type
1. Add state in `CourseBrowse.jsx`
2. Add filter logic in useMemo
3. Create section in `FilterPanel.jsx`
4. Update `filterOptions` in `coursesData.js`

### Adding a New Sort Option
1. Add option to `sortOptions` in `coursesData.js`
2. Add case in sort switch statement
3. Update UI in header or filter panel

### Customizing Course Card
1. Modify props in `CourseCard.jsx`
2. Update data structure in `coursesData.js`
3. Add new elements or sections to display

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Component Count**: 4 main components + data file
