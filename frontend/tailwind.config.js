/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "#0b0f19",
          card: "#111827",
          border: "#1f293d",
          accent: "#6366f1",
          neon: "#06b6d4",
          success: "#10b981",
          warning: "#f59e0b"
        }
      }
    },
  },
  plugins: [],
}
