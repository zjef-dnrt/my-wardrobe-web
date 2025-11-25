/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  mode: "jit",
  prefix: "tw-",
  theme: {
    extend: {
      width: {
        100: "30rem",
      },
      colors: {
        mistyRose: {
          100: "#fcf8f8",
          200: "#f9f2f2",
          300: "#f7ebeb",
          400: "#f4e5e5",
          500: "#f1dede",
          600: "#c1b2b2",
          700: "#918585",
          800: "#605959",
          900: "#302c2c",
        },
        helioGray: {
          100: "#f1eef3",
          200: "#e4dee6",
          300: "#d6cdda",
          400: "#c9bdcd",
          500: "#bbacc1",
          600: "#968a9a",
          700: "#706774",
          800: "#4b454d",
          900: "#252227",
        },
        oldLavender: {
          100: "#e6e3e5",
          200: "#ccc7ca",
          300: "#b3aab0",
          400: "#998e95",
          500: "#80727b",
          600: "#665b62",
          700: "#4d444a",
          800: "#332e31",
          900: "#1a1719",
        },
        darkPurple: {
          100: "#d2cfd4",
          200: "#a5a0a9",
          300: "#77707e",
          400: "#4a4153",
          500: "#1d1128",
          600: "#170e20",
          700: "#110a18",
          800: "#0c0710",
          900: "#060308",
        },
        darkSienna: {
          100: "#dad0d3",
          200: "#b5a1a7",
          300: "#91717b",
          400: "#6c424f",
          500: "#471323",
          600: "#390f1c",
          700: "#2b0b15",
          800: "#1c080e",
          900: "#0e0407",
        },
      },
      fontFamily: {
        raleway: "Raleway",
        festive: "Festive",
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        h1: { fontSize: theme("fontSize.4xl") },
        h3: { fontSize: theme("fontSize.lg") },
      });
    }),
  ],
};

