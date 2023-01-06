const defaultTheme = require('tailwindcss/defaultTheme');

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
    theme: {
      extend: {},
    },
    colors: {
      primary: '#323649',
      secondary: '#2F6271',
      ornament: '#BA8C4E',
    },
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
