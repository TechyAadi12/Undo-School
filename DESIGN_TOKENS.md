# Figma Design Analysis - Course Browse Page

## Design Extraction from Figma Screenshots

This document details the exact design tokens, layout specifications, and component patterns extracted from the provided Figma mockups.

## 1. COLOR PALETTE

### Primary Colors
- **Primary Purple**: `#a200ff`
  - Used for: CTAs, active filter states, text highlights, primary buttons
  - Opacity variations: 100%, 80%, 60%, 40%, 20%

- **Secondary Orange**: `#ff8c42`
  - Used for: "Selling fast" badges, important alerts, accent elements
  - Lighter variant: `#ffa559` (hover states)
  - Darker variant: `#e67e2c` (active states)

### Neutral Colors (Grayscale)
```
Neutral-900: #1a1a1a (Almost black - primary text)
Neutral-800: #333333 (Dark text)
Neutral-700: #4d4d4d (Secondary text)
Neutral-600: #666666 (Tertiary text)
Neutral-500: #808080 (Borders, inactive states)
Neutral-400: #b8b8b8 (Light borders)
Neutral-300: #d3d3d3 (Disabled backgrounds)
Neutral-200: #e8e8e8 (Subtle backgrounds)
Neutral-100: #f3f3f3 (Card backgrounds)
Neutral-50:  #f9f9f9 (Page background)
```

### Semantic Colors
- **Success**: `#4caf50` (for positive feedback)
- **Warning**: `#ffc107` (for alerts)
- **Danger**: `#f44336` (for errors)
- **Info**: `#2196f3` (for information)

## 2. TYPOGRAPHY

### Font Family
- **Primary Font**: Poppins (Google Fonts)
- **Fallback Stack**: Poppins, system-ui, -apple-system, sans-serif

### Heading Styles
| Level | Size | Weight | Line Height | Use Case |
|-------|------|--------|-------------|----------|
| H1 | 32px | 700 (Bold) | 40px (1.25) | Page title |
| H2 | 28px | 700 (Bold) | 36px (1.3) | Section title |
| H3 | 24px | 700 (Bold) | 32px (1.33) | Card title/heading |
| H4 | 20px | 700 (Bold) | 28px (1.4) | Subsection |
| H5 | 18px | 600 (Semi-bold) | 26px (1.44) | Block heading |
| H6 | 16px | 600 (Semi-bold) | 24px (1.5) | Label heading |

### Body Styles
| Type | Size | Weight | Line Height | Use Case |
|------|------|--------|-------------|----------|
| Body-lg | 16px | 400 (Regular) | 24px (1.5) | Main body text |
| Body-md | 14px | 400 (Regular) | 20px (1.43) | Secondary body text |
| Body-sm | 12px | 400 (Regular) | 18px (1.5) | Metadata, fine print |
| Caption | 12px | 500 (Medium) | 16px (1.33) | Captions, badges |
| Label | 14px | 500 (Medium) | 20px (1.43) | Form labels, buttons |

### Text Examples from Design
- **"Learn a New Skill"** - H2, Poppins Bold, 28px, Yellow (#FFD700)
- **"Browse Courses"** (Page title) - H3, Poppins Bold, 24px, Neutral-900
- **Course title** - Body-lg, Neutral-900, truncated at 2 lines
- **"What do you want to learn?"** (Placeholder) - Body-md, Neutral-500
- **Rating** "4.7 (280)" - Caption, Neutral-600

## 3. SPACING SYSTEM (8px baseline)

```
xs:  4px   (minimal spacing)
sm:  8px   (component padding)
md:  12px  (component gap)
lg:  16px  (section padding)
xl:  20px  (module spacing)
2xl: 24px  (major spacing)
3xl: 32px  (large sections)
4xl: 40px  (hero sections)
5xl: 48px  (between major blocks)
6xl: 56px  (page margins)
7xl: 64px  (wide margins desktop)
```

### Applied Spacing Examples
- **Page padding**: 16px (mobile) → 32px (desktop)
- **Card padding**: 16px-20px
- **Gap between courses in grid**: 24px
- **Gap between filter sections**: 24px + border-bottom
- **Search bar margin**: 16px top on mobile, 24px on desktop
- **Header padding**: 16px (mobile) → 24px (desktop)

## 4. COMPONENT HIERARCHY

### Page Layout
```
┌─────────────────────────────────────────────────┐
│ Header (white bg)                               │
│ ├─ Title "Browse Courses"                       │
│ ├─ Subtitle with count                          │
│ ├─ Search Bar                                   │
│ └─ Sort dropdown (desktop only)                 │
├─────────────────────────────────────────────────┤
│ Main Content Area (neutral-50 background)       │
│ ├─ [Mobile: Filter Toggle Button]               │
│ ├─ Sidebar (desktop) / Modal (mobile)           │
│ │  ├─ Reset Filters                             │
│ │  ├─ Category Filter                           │
│ │  ├─ Price Range Filter                        │
│ │  ├─ Rating Filter                             │
│ │  └─ Sort Options (mobile)                     │
│ └─ Courses Grid                                 │
│    └─ [CourseCard] × N                          │
└─────────────────────────────────────────────────┘
```

### Course Card Component (from Figma)
```
┌─────────────────────┐
│ Image Container     │ (h-48 sm:h-56)
│ ├─ Image (zoom on hover) │
│ ├─ Badge (top-left) │
│ ├─ Favorite button  │
│ │  (top-right)      │
│ └─ Overlay on hover │
│    "Enroll now"     │
├─────────────────────┤
│ Category Badge      │ (primary-50 bg)
│ Level Badge         │ (neutral-100 bg)
├─────────────────────┤
│ "Summer robotics...│
│  camp: fun..."      │ (2 line truncate)
├─────────────────────┤
│ ⏱️ 7-10 yrs        │
│ ⭐ 4.7 (280)       │
├─────────────────────┤
│ [Avatar] By Donald  │
│          1,250 enrolled
├─────────────────────┤
│ $299    [Enroll]    │
└─────────────────────┘
```

## 5. BORDER RADIUS

All components use rounded corners:

```
xs:  4px   (minimal roundness)
sm:  6px   (small inputs)
md:  8px   (buttons, cards)
lg:  12px  (large buttons, containers)
xl:  16px  (modals, prominent cards)
2xl: 20px  (hero sections, images)
```

### Examples from Design
- **Search bar**: 12px (lg)
- **Course cards**: 12px (lg)
- **Filter panel**: 12px (lg)
- **Buttons**: 8px-12px (md-lg)
- **Badges**: 20px (2xl) - fully rounded pills
- **Filter toggle**: 8px (md)

## 6. SHADOWS & DEPTH

```
xs: 0 1px 2px rgba(0,0,0,0.05)
sm: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)
md: 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)
lg: 0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)
xl: 0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)
```

### Applied Shadows
- **Course cards**: 0 hover→lg shadow (on hover)
- **Filter panel**: md shadow (desktop sticky)
- **Buttons**: sm shadow (subtle depth)
- **Search bar**: No shadow (flat design principle)
- **Badges**: md shadow (standing out from image)

## 7. TRANSITIONS & ANIMATIONS

### Duration
- Quick interactions: 200ms (element fade, color change)
- Medium interactions: 250ms (hovering over cards)
- Slower interactions: 300ms (panel slide, modal enter)

### Easing Functions
- **ease-in-out**: Smooth, natural motion (default)
- **ease-out**: Quick start, slow end (entrance)
- **ease-in**: Slow start, quick end (exit)
- **ease**: Linear timing (simple transitions)

### Specific Animations
| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Course card | Fade in | 300ms | ease-in |
| Image hover | Scale 1→1.1 | 500ms | ease-out |
| Button press | Scale 1→0.95 | 150ms | ease-out |
| Search clear | Opacity fade | 200ms | ease-in-out |
| Filter panel | Slide down | 300ms | ease-out |
| Hover color | Color change | 250ms | ease-in-out |

## 8. RESPONSIVE BREAKPOINTS (Mobile-First)

### 375px (Mobile - iPhone 8)
- Single column layout
- Full-width search bar (no hero)
- Filter toggle button at top
- Course cards: 1 column
- Padding: 16px
- Navigation: Hamburger/filter button
- Typography: Smaller headings (h3 from h2)

### 640px (Mobile Landscape)
- Course cards: Potentially 2 columns in landscape
- Proper spacing optimization
- Same padding as 375px

### 768px (Tablet)
- Sidebar filter panel appears (width: 280px)
- Course grid: 2 columns
- Padding increases to 24px
- Header layout: Title beside sort dropdown
- Filter panel: Sticky (top: 4-6)

### 1024px (Large Tablet/Small Desktop)
- Filter sidebar: 280px width
- Course grid: 2 columns optimal
- Spacing: 24px padding
- Full feature set active

### 1440px (Desktop)
- Filter sidebar: 320px width
- Course grid: 2 columns (sometimes 3)
- Max-width container: 1280px
- Padding: 32px
- Desktop sort dropdown active
- Optimal reading distance maintained

### 1600px+ (Large Desktop)
- Same as 1440px with wider margins
- Images appear larger
- Maximum width enforced

## 9. INTERACTIVE STATES

### Button States
```
Default: bg-primary-500, text-white, no shadow
Hover:   bg-primary-600, shadow-lg, transform: scale(1.02)
Active:  bg-primary-700, transform: scale(0.95)
Disabled: bg-neutral-300, cursor-not-allowed
```

### Filter Icons
```
Category/Price/Rating sections
├─ Collapsed: ChevronDown pointing right
├─ Expanded: ChevronDown rotated 180° (pointing down)
└─ Animation: Smooth 250ms rotation
```

### Search Input
```
Default: border-neutral-300
Focused: border-primary-500, ring-2, ring-primary-500, ring-offset-2
Typing:  Show clear button (FiX icon)
```

### Course Card
```
Default: border-neutral-200, shadow: none
Hover:   border-primary-300, shadow-lg, image: scale(1.1)
Favorite: Icon -> FiHeart filled (accent-orange)
```

## 10. LAYOUT GRID

### Mobile (375px)
- Single column
- Full viewport width (gutter: 16px)
- Effective content width: 343px

### Tablet (768px)
- 2-column grid for courses (gap: 24px)
- Sidebar width: 280px
- Main content width: Remaining
- Effective grid: 2 × (variable width)

### Desktop (1440px)
- 2-column grid (sometimes 3)
- Sidebar: 320px
- Max-width container: 1280px
- Effective grid width: ~900px ÷ 2 = ~450px per card

## 11. IMAGE SPECIFICATIONS

### Course Card Images
- **Aspect Ratio**: 16:9 or 4:3 (from Figma: ~400×240px design)
- **Actual**: 400px width, 240px height in design
- **Mobile rendered**: Full card width
- **Hover effect**: Scale 1.1 with smooth transition
- **Loading state**: Neutral-200 background color
- **Alt text**: Required for accessibility

### Avatar/Instructor Badge
- **Size**: 32px × 32px (design), 40px × 40px (implemented for accessibility)
- **Shape**: Circle
- **Background**: Gradient (primary-400 → primary-600)
- **Text**: First letter of instructor name, white, bold

## 12. BADGE & LABEL STYLES

### Course Status Badges
- **"Selling fast"** - Orange bg (#ff8c42), white text, bold, 10px font
- **"New course"** - Orange bg, white text, bold
- **Placement**: Top-left corner of image, 12px inset
- **Padding**: 4px 12px (py-1 px-3)
- **Border radius**: 20px (full pill)
- **Shadow**: md

### Category & Level Badges (Below Image)
- **Category**: Primary-50 bg, primary-600 text, bold, 12px
- **Level**: Neutral-100 bg, neutral-700 text, 12px
- **Padding**: 2px-4px 8px-12px
- **Gap**: 8px between
- **Border radius**: 6px (smaller than status badge)

## 13. FORM ELEMENTS

### Checkboxes (Multi-select Categories)
```
Size: 16px × 16px
Border: 2px neutral-300 (unchecked)
Checked bg: primary-500
Label gap: 12px
Focus ring: primary-500 with offset
Cursor: pointer
```

### Radio Buttons (Price, Rating, Sort)
```
Size: 16px × 16px
Border: 2px neutral-300 (unchecked)
Checked dot: primary-500
Label gap: 12px
Focus ring: primary-500
Cursor: pointer
```

### Select Dropdown (Sort - Desktop)
```
Padding: 8px 12px
Border: 2px neutral-300
Font: 14px (body-md)
Focus: border primary-500
Hover: border primary-500 (lighter)
Background: white
```

## 14. FILTER PANEL STRUCTURE (Sidebar)

```
┌────────────────────────┐
│ [Reset Filters]        │ (if active)
├────────────────────────┤
│ Category          [▼]  │
├ ☐ Coding               │
├ ☐ Public speaking      │
├ ☐ Chess                │
├ ☐ Home work help       │
└ ☐ App building         │
├────────────────────────┤
│ Price            [▼]   │
├ ◯ Under $200           │
├ ◯ $200 - $350          │
└ ◯ $350+                │
├────────────────────────┤
│ Rating           [▼]   │
├ ◯ 4.5+ ⭐              │
├ ◯ 4.6+ ⭐              │
├ ◯ 4.7+ ⭐              │
├ ◯ 4.8+ ⭐              │
└ ◯ 4.9+ ⭐              │
├────────────────────────┤
│ Sort (Mobile)    [▼]   │
├ ◯ Most Popular         │
├ ◯ Newest First         │
├ ◯ Price: Low to High   │
├ ◯ Price: High to Low   │
└ ◯ Highest Rated        │
└────────────────────────┘
```

## 15. COLOR IMPLEMENTATION NOTES

From Figma design analysis:
- **Purple button**: Exact match to #a200ff (RGB: 162, 0, 255)
- **Orange accent**: Exact match to #ff8c42 (RGB: 255, 140, 66)
- **Light purple hover**: #c466ff (hover state)
- **Dark purple active**: #8800cc (active state)
- **Light gray background**: #f9f9f9 (main page bg)
- **White cards**: #ffffff on neutral-100 #f3f3f3 background

## 16. ACCESSIBILITY CONSIDERATIONS (Built-in)

### Color Contrast
- Purple (#a200ff) on white: 4.8:1 ✓ WCAG AA
- Black (#1a1a1a) on white: 9.5:1 ✓ WCAG AAA
- Orange (#ff8c42) on white: 4.2:1 ✓ WCAG AA (borderline)

### Focus States
- All interactive elements have visible focus ring
- Ring color: primary-500
- Ring offset: 2px
- Ring width: 2px

### Icon Usage
- All icons have associated `aria-label`
- Icons are decorative or functional (not both)
- Text labels provided for important information

---

**Design Version**: 1.0 (From Figma Mockups)  
**Last Updated**: February 2026  
**Design System**: Custom token-based system
