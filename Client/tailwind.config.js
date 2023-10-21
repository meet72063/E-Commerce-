/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}" /* src folder, for example */],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        cursive: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
});
