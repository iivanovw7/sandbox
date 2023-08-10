/**
 * PostCss configuration.
 * @module postcss.config.js
 */

module.exports = {
    plugins: {
        tailwindcss: {
            config: './tailwind.config.js',
        },
        autoprefixer: {},
        'postcss-100vh-fix': {},
        'postcss-normalize': {
            forceImport: true,
        },
        'postcss-preset-env': {
            browsers: 'last 2 versions',
        },
    },
}
