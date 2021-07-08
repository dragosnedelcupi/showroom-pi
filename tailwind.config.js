module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './storybook-static/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#41c0bf',
        },
        secondary: {
          DEFAULT: '#33404a',
        },
        danger: '#ff0000',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms') /*({strategy: 'class'})// for no default form styling*/,
  ],
}
