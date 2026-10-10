/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        text: "var(--color-text)",
        accent: "var(--color-accent)",
        "login-bg": "var(--color-login-bg)",
      },
      boxShadow: {
        'cta': '0 4px 24px rgba(115, 66, 226, 0.28)',
        'sheet': '-12px 0 48px rgba(25, 40, 55, 0.18)',
        'card': '0 10px 30px -10px rgba(25, 40, 55, 0.08), 0 4px 12px -2px rgba(25, 40, 55, 0.04)',
      }
    },
  },
  plugins: [],
}
