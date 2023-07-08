/**
 * Module contains html plugin
 * @module config/vite-config/plugins/html.ts
 */

import { createHtmlPlugin } from 'vite-plugin-html';

/**
 * Vite html config plugin configuration.
 * @param {boolean} isBuild - if running in build mode.
 * @returns {Object} html plugin instance.
 */
export const configHtmlPlugin = (isBuild: boolean) => {
    return createHtmlPlugin({
        entry: './src/main.tsx',
        inject: {
            data: {
                injectScript: '<script type="module" src="./src/main.jsx" async></script>',
                title: 'Netflix browse page',
            },
        },
        minify: isBuild,
        template: 'index.html',
    });
};
