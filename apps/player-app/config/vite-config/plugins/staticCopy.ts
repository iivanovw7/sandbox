/**
 * Module contains staticCopy plugin.
 * @module config/vite-config/plugins/staticCopy.ts
 */

import type { PluginOption } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { pathResolve } from '../utils';

/**
 * Copies static files to build folder.
 * @returns {Object} static copy plugin.
 */
export const configStaticCopyPlugin = () => {
    return viteStaticCopy({
        targets: [
            {
                dest: 'assets',
                src: `${pathResolve('assets/stub')}/`
            }
        ]
    }) as PluginOption;
};
