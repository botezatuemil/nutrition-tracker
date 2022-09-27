module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    //'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx, html}'
  ],
  theme: {
    extend: {
      fontFamily: {
        Jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      backgroundImage: {
        'split-green': "linear-gradient(to right, #ABC5A3 6% , #EBF9E7 1%);",
        'ocean-pattern': "url('/src/images/backgroundOcean.svg')",
      },
      screens: {
        '4k': '3840px',
        'hd': '1920px',
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [
    // @ts-ignore
     //require("/node_modules/flowbite/plugin.js")
  ],
}