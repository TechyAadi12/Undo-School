/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          50: "#f5e6ff",
          100: "#e8ccff",
          200: "#d699ff",
          300: "#c466ff",
          400: "#b333ff",
          500: "#a200ff", // Main purple
          600: "#8800cc",
          700: "#6d0099",
          800: "#520066",
          900: "#370033",
        },
        // Secondary/Accent Colors
        accent: {
          orange: "#ff8c42",
          orange_light: "#ffa559",
          orange_dark: "#e67e2c",
        },
        // Neutral Colors
        neutral: {
          50: "#f9f9f9",
          100: "#f3f3f3",
          200: "#e8e8e8",
          300: "#d3d3d3",
          400: "#b8b8b8",
          500: "#808080",
          600: "#666666",
          700: "#4d4d4d",
          800: "#333333",
          900: "#1a1a1a",
        },
        // Semantic Colors
        success: "#4caf50",
        warning: "#ffc107",
        danger: "#f44336",
        info: "#2196f3",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Heading Styles
        "h1": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "h2": ["28px", { lineHeight: "36px", fontWeight: "700" }],
        "h3": ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "h4": ["20px", { lineHeight: "28px", fontWeight: "700" }],
        "h5": ["18px", { lineHeight: "26px", fontWeight: "600" }],
        "h6": ["16px", { lineHeight: "24px", fontWeight: "600" }],
        // Body Styles
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "18px", fontWeight: "400" }],
        // Caption/Label Styles
        "caption": ["12px", { lineHeight: "16px", fontWeight: "500" }],
        "label": ["14px", { lineHeight: "20px", fontWeight: "500" }],
      },
      spacing: {
        "xs": "4px",
        "sm": "8px",
        "md": "12px",
        "lg": "16px",
        "xl": "20px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
        "5xl": "48px",
        "6xl": "56px",
        "7xl": "64px",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "pulse-subtle": "pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
      },
      transitionDuration: {
        250: "250ms",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "1600px",
      },
    },
  },
  plugins: [],
};
