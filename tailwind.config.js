/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#48cae4',
        mainText: '#000000',
        subText: '#767676',
        accentText: '#EB5757',
        background: '#00b4d8',
      },
      fontFamily: {
        spoqa: ['SpoqaHanSansNeo-Regular'],
        spoqaMedium: ['SpoqaHanSansNeo-Medium'],
        spoqaBold: ['SpoqaHanSansNeo-Bold'],
      },
    },

    screens: {
      ss: '480px' /* 480이상일때 적용 */,
      md: '768px' /* 768이상일떄 적용 */,
      lg: '1200px',
    },
  },

  corePlugins: {
    preflight: true,
  },

  plugins: [require('daisyui')],
};
