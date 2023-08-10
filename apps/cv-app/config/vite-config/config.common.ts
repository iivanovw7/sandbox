/**
 * Module contains bundler configuration.
 * @module config/vite-config/config.common.ts
 */
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import autoImport from 'unplugin-auto-import/vite';
import type { PluginOption, UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { pathResolve } from './utils';

/**
 * Creates common vite config instance.
 */
export const commonConfig: UserConfig = {
    plugins: [
        qwikCity(),
        qwikVite(),
        tsconfigPaths(),
        autoImport({
            dts: `${pathResolve('types/auto-imports.d.ts')}/`,
            eslintrc: {
                enabled: true,
            },
            imports: [
                {
                    from: '@builder.io/qwik',
                    imports: [
                        'noSerialize',
                        'useOnWindow',
                        'useSignal',
                        'useStore',
                        'Slot'
                    ],
                },
                {
                    from: '@builder.io/qwik',
                    imports: [
                        'NoSerialize',
                        'Signal',
                        'JSXNode'
                    ],
                    type: true
                },
                {
                    from: '@builder.io/qwik-city',
                    imports: [
                        'useDocumentHead',
                        'useLocation',
                        'routeLoader$',
                        'QwikCityProvider',
                        'RouterOutlet',
                        'ServiceWorkerRegister'
                    ],
                },
                {
                    from: '@builder.io/qwik-city',
                    imports: [
                        'DocumentHead',
                    ],
                    type: true
                },
            ],
        }) as PluginOption
    ],
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
};

