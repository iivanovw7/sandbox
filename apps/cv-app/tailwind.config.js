module.exports = {
    content: [
        './src/**/*.{html,js,jsx,svelte,ts,tsx,vue}',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
        require('postcss-import'),
        require('postcss-100vh-fix'),
        require('autoprefixer'),
    ],
    darkMode: 'class',
};
