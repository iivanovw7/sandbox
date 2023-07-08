/**
 * Module contains svg icons plugin.
 * @module config/vite-config/plugins/svgIcons.ts
 */

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import { pathResolve } from '../utils';

/**
 * Creates svg icons plugin instance.
 * @param {boolean} isBuild - if running in build mode.
 * @returns {Object} svg icons plugin.
 */
export const configSvgIconsPlugin = (isBuild: boolean) => {
    return createSvgIconsPlugin({
        iconDirs: [`${pathResolve('assets/icons')}/`],
        inject: 'body-last',
        svgoOptions: isBuild,
        symbolId: 'icon-[dir]-[name]',
    });
};
