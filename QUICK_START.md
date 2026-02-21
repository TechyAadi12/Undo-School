# Quick Start Guide - Course Browse Page

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
cd "c:\Users\pande\Undo School"
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The app will open automatically at `http://localhost:5173`

### 3. (Optional) Build for Production
```bash
npm run build
npm run preview
```

## 📂 Project Structure at a Glance

```
src/
├── components/          # React UI components
│   ├── CourseBrowse.jsx   ← Main page (filters + courses)
│   ├── CourseCard.jsx     ← Individual course card
│   ├── FilterPanel.jsx    ← Sidebar filters
│   └── SearchBar.jsx      ← Search input
├── data/
│   └── coursesData.js     ← 16 dummy courses
├── utils/
│   └── filterUtils.js     ← Filter helper functions
├── App.jsx              # App root
├── main.jsx             # React entry
└── index.css            # Global styles

tailwind.config.js       # Design tokens
postcss.config.js        # CSS processing
vite.config.js          # Build config
```

## 🎨 Key Features

✅ **Search** - Real-time course search  
✅ **Filter** - Category, price, rating  
✅ **Sort** - 5 sorting options  
✅ **Responsive** - Mobile, tablet, desktop  
✅ **Accessible** - WCAG 2.1 AA compliant  
✅ **Animated** - Smooth hover effects  

## 🔧 Common Customizations

### Add More Courses
Edit `src/data/coursesData.js`:
```javascript
export const coursesData = [
  // ... existing courses
  {
    id: 17,
    title: "Your Course Title",
    image: "https://...",
    category: "Coding",
    level: "Beginner",
    duration: "8-12 yrs",
    rating: 4.8,
    reviews: 300,
    price: 249,
    badge: null,
    instructor: "Your Name",
    enrolledCount: "1,500",
  },
];
```

### Change Color Scheme
Edit `tailwind.config.js`:
```javascript
primary: {
  500: "#your-color",    // Main color
  600: "#darker-color",  // Hover
}
```

### Adjust Spacing
Edit `tailwind.config.js`:
```javascript
spacing: {
  md: "16px",  // Change from 12px
  lg: "20px",  // Change from 16px
}
```

## 📊 File Breakdown

| File | Size | Purpose |
|------|------|---------|
| CourseBrowse.jsx | 6KB | Main filtering logic |
| CourseCard.jsx | 3KB | Course card UI |
| FilterPanel.jsx | 4KB | Filter controls |
| coursesData.js | 8KB | Course data + options |
| index.css | 2KB | Global styles |

## 🚀 Deployment

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Build: `npm run build`
2. Deploy `dist/` folder

### Traditional Server
```bash
npm run build
# Copy dist/ to your server
```

## 📱 Testing Responsiveness

Use Chrome DevTools:
1. Press `F12` to open DevTools
2. Toggle device toolbar (`Ctrl+Shift+M`)
3. Test at:
   - **375px** (Mobile)
   - **768px** (Tablet)
   - **1440px** (Desktop)

## 🐛 Troubleshooting

### Port already in use
```bash
npm run dev -- --port 3000
```

### Module not found error
```bash
rm -rf node_modules
npm install
```

### CSS not loading
Check that Tailwind classes are in `src/` files (they are!)

## 📚 Documentation Files

- **README.md** - Full project overview & features
- **TECHNICAL.md** - Architecture & implementation details
- **DESIGN_TOKENS.md** - Figma design analysis
- **QUICK_START.md** - This file

## 🎯 Next Steps

1. **Explore the code** - Start with `src/components/CourseBrowse.jsx`
2. **Modify courses** - Add your own courses in `coursesData.js`
3. **Customize colors** - Edit `tailwind.config.js`
4. **Build & deploy** - Run `npm run build`

## 💬 Key Concepts

### State Management
Uses React `useState` for all UI state:
```javascript
const [searchQuery, setSearchQuery] = useState('');
const [selectedCategories, setSelectedCategories] = useState([]);
// ... more state
```

### Filtering
Live filtering with `useMemo` - updates instantly as you type/filter!

### Responsive Design
- **Mobile first** approach (375px base)
- **Breakpoints** at 640px, 768px, 1024px, 1440px
- **TailwindCSS** handles all responsive classes

### Accessibility
- **WCAG 2.1 AA** compliant
- **ARIA labels** on all interactive elements
- **Keyboard navigation** fully supported
- **Focus states** visible on all buttons/links

## 🎓 Learning Paths

### For Beginners
1. Read components in order: SearchBar → CourseCard → FilterPanel → CourseBrowse
2. Understand state flow in CourseBrowse.jsx
3. Try adding a new filter type

### For Intermediate
1. Study the filtering algorithm in filterUtils.js
2. Implement localStorage for filter persistence
3. Add pagination for large datasets

### For Advanced
1. Convert to Context API for global state
2. Implement URL search params for shareable filters
3. Add backend API integration
4. Set up Jest/React Testing Library tests

## 🔗 Resources

- [React Hooks](https://react.dev/reference/react)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)
- [Web Accessibility](https://www.w3.org/WAI/)

## 📞 Support

Check the README.md and TECHNICAL.md for detailed documentation.

---

**Happy coding! 🚀**
