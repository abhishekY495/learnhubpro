/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "0%": {
            backgroundColor: "#f2f2f2",
          },
          "50%": {
            backgroundColor: "#eaeaea",
          },
          "100%": {
            backgroundColor: "#f2f2f2",
          },
        },
      },
      animation: {
        "shimmer-ui": "shimmer 0.8s infinite",
      },
    },
  },
  plugins: [],
};
