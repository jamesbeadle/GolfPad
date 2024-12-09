/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    screens: {
      xs: "480px",

      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",

      "3xl": "1920px",
    },
    fontSize: {
      xxs: ".625rem",
      xs: "0.7rem",
      sm: "0.8rem",
      base: "1rem",
      lg: "1.1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "6.104rem",
      "7xl": "8.000rem",
      cta: "7rem",
    },
    extend: {
      colors: {
        BrandYellow: "#F4C802",
        BrandForest: "#1C4932",
        BrandGreen: "#2D7B66",
        BrandAcceptGreen: "#66E094",
        BrandBlue: "#2D5D7A",
        BrandLightBlue: "#D9EDFA",
        BrandDarkGreen: "#243B35",
        BrandLightGreen: "#D9FAF1",
        BrandDeclineRed: "#FF403C",
        BrandDarkRed: "#7A3F2D",
        BrandDarkGray: "#8C8C8C",
        BrandLightGray: "#F3F3F3",
        BrandDivider: "#DDDDDD",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        body: ["16px", "22.4px"],
      },
      fontWeight: {
        light: "300",
        med: "400",
        sub: "600",
      },
    },
  },
  plugins: [],
};
