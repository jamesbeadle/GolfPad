/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    screens: {
      xs: "480px",
      // => @media (min-width: 640px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "3xl": "1920px",
      // => @media (min-width: 1920px) { ... }
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
    },
    extend: {
      colors: {
        BrandDarkGreen: "#01261C",
        BrandDarkPurple: "#260A01",
        BrandDarkRed: "#7B3F2D",
        BrandDeepGreen: "#1D6652",
        BrandGreen: "#58A691",
        BrandLightGreen: "#014023",
        BrandLightGreen2: "#0D4001",
        BrandLightGreen3: "#01400E",
        BrandBlue: "#010C40",
        BrandGreenBlue: "#014038",
        BrandSeafoamBlue: "#63BFB3",
        BrandGold: "#BFB463",
        BrandPurple: "#393240",
        BrandBluePurple: "#223280",


        Brand1: "#85B4F2",
        Brand1b: "#8DC3F2",
        Brand1c: "#A7F205",
        Brand1d: "#94A60A",
        Brand1e: "#8C840B",
        Brand2c: "#9FBF2C",
        Brand2d: "#B1BF45",
        Brand2e: "#D9BF8F",
      },
    },
  },
  plugins: [],
};
