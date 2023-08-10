/**
 * Module contains vercel config adapter.
 * @module config/vite-config/config.vercel.ts
 */
import { vercelEdgeAdapter } from '@builder.io/qwik-city/adapters/vercel-edge/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';

import { commonConfig } from './config.common';
import { pathResolve } from './utils';

/**
 * Creates production vite config instance.
 */
export default extendConfig(commonConfig, () => ({
    build: {
        outDir: `${pathResolve('.vercel/output/functions/_qwik-city.func')}`,
        rollupOptions: {
            input: [
                `${pathResolve('src/entry.vercel-edge.tsx')}`,
                '@qwik-city-plan'
            ],
        },
        ssr: true,
    },
    plugins: [vercelEdgeAdapter()],
}));
