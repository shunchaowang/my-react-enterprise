const colors = require('tailwindcss/colors')
// module.exports = {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: { extend: {} },
//   // Add only if you want to use the @tailwindcss/forms package
//   plugins: [require('@tailwindcss/forms')],
// }

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      ...colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
