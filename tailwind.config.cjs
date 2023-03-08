/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Example content paths...
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        "color-warning": "var(--el-color-warning)",
        "color-warning-light-8": "var(--el-color-warning-light-8)",
        "color-warning-light-9": "var(--el-color-warning-light-9)",
        "color-primary": "var(--el-color-primary)",
        primary: {
          DEFAULT: "var(--el-color-primary)",
          contrast: "#ffffff",
        },
      },
      minWidth: {
        min: "290px",
      },
      backgroundColor: {
        transparent: "transparent",
      },
    },
  },
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
