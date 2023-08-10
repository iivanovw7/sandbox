/**
 * Module contains bundler configuration.
 * @module config/vite-config/config.common.ts
 */
import autoprefixer from 'autoprefixer';
import postcss100VhFix from 'postcss-100vh-fix';
import postcssNormalize from 'postcss-normalize';
import postcssPresetEnv from 'postcss-preset-env';
import { type UserConfigExport, loadEnv } from 'vite';

import { createPlugins } from './plugins';
import { pathResolve, root } from './utils';

/**
 * Creates common vite config instance.
 * @param {string} mode - current running mode.
 * @param {string} command - current command.
 */
export const getCommonConfig = async (mode: string, command: string): Promise<UserConfigExport> => {
    const { VITE_BUILD_COMPRESS, VITE_ENABLE_ANALYZE } = loadEnv(mode, root);

    return {
        css: {
            postcss: {
                plugins: [
                    postcss100VhFix,
                    postcssNormalize({
                        forceImport: true
                    }),
                    autoprefixer,
                    postcssPresetEnv({
                        browsers: 'last 2 versions'
                    }),
                ],
            },
        },
        plugins: await createPlugins({
            command,
            compress: VITE_BUILD_COMPRESS,
            enableAnalyze: VITE_ENABLE_ANALYZE === 'true',
            mode,
        }),
        resolve: {
            alias: [
                {
                    find: /\/@\//,
                    replacement: `${pathResolve('src')}/`,
                },
                {
                    find: /\/#\//,
                    replacement: `${pathResolve('types')}/`,
                },
                {
                    find: /@\//,
                    replacement: `${pathResolve('src')}/`,
                },
                {
                    find: /#\//,
                    replacement: `${pathResolve('types')}/`,
                },
            ],
        },
        root: `${pathResolve('')}/`,
    };
};
