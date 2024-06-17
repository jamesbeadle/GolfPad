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
        Brand1: "#40212E",
        Brand1b: "#80626E",
        Brand1c: "#BF95A7",
        Brand1d: "#7F9580",
        Brand1e: "#C7EDC9",
        Brand2: "#3D2F2F",
        Brand2b: "#7D6161",
        Brand2c: "#BD6464",
        Brand2d: "#669272",
        Brand2e: "#8AEBA6",
        Brand3: "#2F5C4A",
        Brand3b: "#769C8D",
        Brand3c: "#ADDBC9",
        Brand3d: "#B19A95",
        Brand3e: "#FFDFD9",
        Brand4: "#132A2E",
        Brand4b: "#48686E",
        Brand4c: "#9AABAD",
        Brand4d: "#837161",
        Brand4e: "#DBC9BA",
        Brand5: "#001824",
        Brand5w: "#009AE7",
        Brand5x: "#0083C5",
        Brand5y: "#006DA3",
        Brand5z: "#005681",
        Brand5b: "#194B63",
        Brand5c: "#5288A3",
        Brand5d: "#795528",
        Brand5e: "#D19D5C",
        Brand6: "#000000",
      },
    },
  },
  plugins: [],
};
