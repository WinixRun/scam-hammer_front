// tailwind.config.cjs
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primaryStart: '#A2F9FF',
        primaryEnd: '#008FC1',
        primaryHover: '#16D369',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(180deg, #  0%, #250E47 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
};
