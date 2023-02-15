const colors = require('tailwindcss/colors')
const theme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js,jsx,ts,tsx}',
    './*.{html,js,jsx,ts,tsx}',
    './src/**/*.{html,js,jsx,ts,tsx}',
    './src/*.{html,js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontSize: {
      ...theme.fontSize,
      xs: ['11px', {}],
      sm: ['12px', {}],
      base: ['14px', {}],
      md: ['16px', {}],
    },
    extend: {
      colors: {
        primary: {
          0: colors.blue[500],
          1: colors.blue[600],
          2: colors.blue[700],
        },
        secondary: {
          0: colors.fuchsia[500],
          1: colors.fuchsia[600],
          2: colors.fuchsia[700],
        },
        success: {
          0: colors.green[500],
          1: colors.green[600],
          2: colors.green[700],
        },
        danger: {
          0: colors.red[500],
          1: colors.red[600],
          2: colors.red[700],
        },
        warning: {
          0: colors.orange[500],
          1: colors.orange[600],
          2: colors.orange[700],
        },
        info: {
          0: colors.cyan[500],
          1: colors.cyan[600],
          2: colors.cyan[700],
        },
        yellow: {
          ...colors.yellow,
          0: colors.yellow[500],
          1: colors.yellow[600],
          2: colors.yellow[700],
        },
        dark: {
          0: colors.gray[800],
          1: colors.gray[900],
          2: colors.slate[900],
        },
        light: {
          0: colors.white,
          1: colors.gray[50],
          2: colors.gray[100],
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
