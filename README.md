# 🎓 Undo School - Interactive Learning Platform

A modern, feature-rich educational platform designed to inspire learning and growth for students of all ages. Undo School provides diverse, engaging courses with an intuitive interface, advanced filtering, and seamless enrollment experience.

## ✨ Key Features

- **🎯 Diverse Course Catalog** - 15+ carefully curated courses across multiple categories (Coding, Public Speaking, Chess, STEM, Art, and more)
- **🌓 Dark Mode Support** - Beautiful dark/light theme toggle with smooth transitions
- **🔍 Advanced Filtering System** - Filter courses by age group, category, price range, and ratings
- **🎨 Micro-Animations** - Smooth transitions, hover effects, and delightful micro-interactions throughout the UI
- **📱 Fully Responsive Design** - Optimized for mobile, tablet, and desktop devices
- **🔐 Secure Enrollment Modal** - User-friendly enrollment form with validation and confirmation
- **⚡ Fast Performance** - Built with Vite for lightning-fast development and production builds
- **🌈 Modern UI/UX** - Gradient backgrounds, smooth animations, and professional design patterns

## 🚀 Live Demo

[Visit Undo School](https://your-deployed-url.com) *(Update with your live URL)*

## 💻 Tech Stack

- **Frontend Framework:** React 18 with Hooks
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 3
- **Icons:** React Icons (FiChevronDown, FiFilter, FiHeart, etc.)
- **State Management:** React Hooks (useState, useMemo)
- **Animations:** CSS Keyframes + Tailwind CSS Animations
- **Package Manager:** npm

## 📁 Folder Structure

```
Undo School/
├── src/
│   ├── assets/
│   │   └── thumbnail.jpg
│   ├── components/
│   │   ├── App.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── CourseBrowse.jsx
│   │   ├── CourseCard.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── SearchBar.jsx
│   │   ├── EnrollmentModal.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── coursesData.js
│   ├── utils/
│   │   └── filterUtils.js
│   ├── index.css
│   ├── main.jsx
│   └── App.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/undo-school.git
cd undo-school
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```
The application will start at `http://localhost:5173` by default.

### Step 4: Build for Production
```bash
npm run build
```

### Step 5: Preview Production Build
```bash
npm run preview
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint (if configured) |

## 🔧 Environment Variables

Currently, the project doesn't require environment variables. If needed in the future, create a `.env.local` file:

```env
# Example - Add as needed
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Undo School
```

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" and import your GitHub repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

3. **Your site is live!**

### Deploy on Netlify

1. **Build your project**
   ```bash
   npm run build
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git" and select your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Click "Deploy"

### Deploy on Custom Server

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your hosting provider

3. **Configure server** to serve `index.html` for all routes (important for SPA routing)

## 📸 Screenshots

| Section | Preview |
|---------|---------|
| **Landing Page** | ![Hero Section](https://via.placeholder.com/600x400?text=Hero+Section) |
| **Course Catalog** | ![Course Browse](https://via.placeholder.com/600x400?text=Course+Catalog) |
| **Dark Mode** | ![Dark Mode UI](https://via.placeholder.com/600x400?text=Dark+Mode) |
| **Mobile View** | ![Mobile Responsive](https://via.placeholder.com/600x400?text=Mobile+View) |

*Replace placeholders with actual screenshots*

## 🎯 Key Components

### Navbar Component
- Sticky header with smooth navigation
- Dark mode toggle button
- Animated navigation links with gradient underlines
- Mobile-responsive menu with slide-down animations

### Hero Section
- Eye-catching gradient background with animations
- Animated logo with float effect
- CTA button with smooth scroll navigation
- Responsive design for all screen sizes

### Course Browse
- Advanced filtering (age groups, categories, price, ratings)
- Real-time search functionality
- Sort options (popular, newest, price, ratings)
- Staggered animation effects on course cards

### Course Card
- Image with hover zoom effect
- Course information display
- Favorite/wishlist button
- Quick enrollment overlay
- Badge for special offers

### Enrollment Modal
- Form validation (first name, last name, email, phone)
- Terms agreement checkbox
- Success state with confirmation animations
- Simulated submission with loading state

### Filter Panel
- Expandable filter sections
- Smooth collapse/expand animations
- Active filter indicators
- Mobile filter toggle button

## 🚀 Future Improvements

- [ ] Backend API integration (Node.js/Express)
- [ ] User authentication system (JWT)
- [ ] Payment processing (Stripe/Razorpay)
- [ ] Course progress tracking
- [ ] Student dashboard with learning analytics
- [ ] Certificate generation system
- [ ] Instructor portal
- [ ] Video streaming integration
- [ ] Real-time notifications
- [ ] Database integration (MongoDB)
- [ ] Advanced search with autocomplete
- [ ] Course ratings and reviews system
- [ ] Wishlist persistence
- [ ] Multi-language support
- [ ] Accessibility improvements (WCAG 2.1)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/undo-school.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes** and commit
   ```bash
   git commit -m "Add amazing feature"
   ```

4. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request** with a clear description of changes

### Code Style Guidelines
- Use meaningful variable and function names
- Follow React best practices and hooks conventions
- Keep components modular and reusable
- Add comments for complex logic
- Ensure responsive design for all screen sizes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- Portfolio: [your-portfolio.com](https://your-portfolio.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Inspired by modern educational platforms
- Icons from [React Icons](https://react-icons.github.io/react-icons)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Built with [Vite](https://vitejs.dev)
- Special thanks to all contributors

## 📞 Support

Have questions or suggestions? Feel free to:
- Open an [Issue](https://github.com/yourusername/undo-school/issues)
- Start a [Discussion](https://github.com/yourusername/undo-school/discussions)
- Contact via email

---

**Made with ❤️ for educators and learners worldwide**