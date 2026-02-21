#!/bin/bash
# Setup Verification Script
# Run this to verify all project files are in place

echo "🔍 Verifying Undo School - Course Browse Page Setup..."
echo "=================================================="

# Check root files
echo "📄 Checking root configuration files..."
files=(
  "package.json"
  "tailwind.config.js"
  "postcss.config.js"
  "vite.config.js"
  "index.html"
  ".gitignore"
  ".env.example"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ Missing: $file"
  fi
done

# Check src directory
echo ""
echo "🗂️  Checking src/ structure..."
src_files=(
  "src/App.jsx"
  "src/main.jsx"
  "src/index.css"
  "src/components/CourseBrowse.jsx"
  "src/components/CourseCard.jsx"
  "src/components/FilterPanel.jsx"
  "src/components/SearchBar.jsx"
  "src/data/coursesData.js"
  "src/utils/filterUtils.js"
)

for file in "${src_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ Missing: $file"
  fi
done

# Check documentation
echo ""
echo "📚 Checking documentation files..."
docs=(
  "README.md"
  "TECHNICAL.md"
  "DESIGN_TOKENS.md"
  "ANIMATIONS.md"
  "COMPONENT_API.md"
  "QUICK_START.md"
  "PROJECT_SUMMARY.md"
)

for doc in "${docs[@]}"; do
  if [ -f "$doc" ]; then
    echo "✅ $doc"
  else
    echo "❌ Missing: $doc"
  fi
done

# Check node_modules (if installed)
echo ""
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
  echo "✅ node_modules/ exists"
  if [ -d "node_modules/react" ]; then
    echo "✅ React installed"
  else
    echo "⚠️  React not installed - run: npm install"
  fi
else
  echo "⚠️  node_modules/ not found - run: npm install"
fi

echo ""
echo "=================================================="
echo "✅ Setup verification complete!"
echo ""
echo "🚀 Next steps:"
echo "  1. npm install          (if not already done)"
echo "  2. npm run dev          (start development server)"
echo "  3. Open http://localhost:5173 in your browser"
echo ""
echo "📖 Documentation:"
echo "  - QUICK_START.md        (Getting started)"
echo "  - README.md             (Full overview)"
echo "  - TECHNICAL.md          (Architecture)"
echo ""
