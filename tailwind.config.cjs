/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            blockquote: {
              background: theme("colors.gray.600"),
              "border-left-color": theme("colors.zinc.400"),
              content: "none",
            },
            maxWidth: "100%",
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
