const defaultTheme = require('tailwindcss/defaultTheme');

const customColors = {
  primary: '#323649',
  secondary: '#BA8C4E',
  background: '#2F6271',
  neutral: '#F1F2EE',
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
      fontSize: {
        xxs: '0.625rem',
      },
    },
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
