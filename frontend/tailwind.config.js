module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "lg1": "0 0 15px 0 rgb(0 0 0 / 0.1)",
      },
      fontSize: {
        'xs1': '.656rem',
      }
    },
    colors: {
      white1: "#FCFCFC",
      black: "#0A0D0D",
      black2: "#343A3A",
      black3: "#20262C",
      green: "#09B682",
      green2: "#07CC6D",
      blue: "#21A3ED",
      purple: "#7B1CF3",
      gray: "#868686",
      gray2: "#ECECEC",
      gray3: "#8C979F",
    },
  },
  plugins: [],
};
