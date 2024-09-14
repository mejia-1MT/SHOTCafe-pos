/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        dela: ['Dela Gothic One', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        semibold: 600,
        bold: 700,
        black: 900,
      },
      colors: {
        primary: '#02342d',
        secondary: '#f4f7f7',
        tertiary: '#ffffff',
        customWhite: '#f1f0f0',
        customGray: '#8d8c8c',
        opaque: 'rgba(2, 52, 45, 0.05)',
        tealDark: 'hsla(172, 93%, 11%, 1)', // Dark teal
        tealLight: 'hsla(178, 90%, 38%, 1)',
        signUp: {
          0: '#f5f5f5',
          1: '#eeefee',
          2: '#fdfcfd',
          3: '#e5e5e4',
          gray: '#919090',
        },
      },
      fontSize: {
        '2xs': '10px', // Custom size
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({}),
        addComponents({
          '.btn-custom': {
            '@apply bg-blue-500 text-white font-bold py-2 px-4 rounded': {},
          },
        }),
        addUtilities({
          //Navigation
          //Desktop
          '.nav-icon': {
            '@apply w-8 h-12': {},
          },
          '.custom-outline': {
            '@apply outline outline-1 outline-offset-0': {},
          },
          '.nav-label': {
            '@apply text-sm font-semibold text-center': {},
          },
          '.nav-labeled-icon': {
            '@apply w-full flex flex-col items-center pt-1 pb-3 rounded-2xl transition-all duration-100':
              {},
          },

          //Mobile Nav
          '.m-nav-icon': {
            '@apply w-8 h-12 mx-5 text-customWhite': {},
          },
          '.m-nav-label': {
            '@apply text-base text-customWhite': {},
          },
          '.m-nav-labeled-icon': {
            '@apply w-[100%] flex items-center py-1 transition-all duration-300':
              {},
          },
          '.m-nav-labeled-icon:hover': {
            '@apply bg-secondary': {},
          },

          '.scrollbar-hide': {
            /* Hide scrollbar for WebKit browsers */
            '::-webkit-scrollbar': {
              display: 'none',
            },

            /* Hide scrollbar for Firefox */
            'scrollbar-width': 'none',

            /* Hide scrollbar for IE, Edge */
            '-ms-overflow-style': 'none',
          },

          '.card-buttons': {
            '@apply font-semibold border rounded-full w-[40px] h-[40px] mr-1':
              {},
          },
          '.category-cards': {
            '@apply h-[90px] w-[80px] rounded-2xl  mr-3 flex flex-col justify-center items-center border':
              {},
          },

          // '.m-nav-labeled-icon:hover .m-nav-label, .m-nav-labeled-icon:hover .m-nav-icon': {
          //   '@apply text-secondary-1': {},
          // },
        })
    }),
  ],
}
