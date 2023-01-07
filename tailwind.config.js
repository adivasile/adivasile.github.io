const defaultTheme = require('tailwindcss/defaultTheme');

const customColors = {
  primary: '#323649',
  secondary: '#2F6271',
  ornament: '#BA8C4E',
  font: '#F1F2EE',
};

module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_pages/**/*.html',
    './_posts/*.md',
    './*.md',
    './*.html',
  ],
  theme: {
    extend: {
      colors: customColors,
    },
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
