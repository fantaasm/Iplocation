module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      fontFamily: {
        oxygen: ["Oxygen"],
        roboto: ["Roboto"]
      },
      colors: {
        lightPurple: "#BB86FC",
        dark:"#1A1A1A",
        lightDark: "#2C2C2C"
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

