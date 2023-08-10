/**
 * Module contains vite configuration.
 * @module vite-config
 */
import { getConfig } from './config/vite-config';

export default getConfig({
    overrides: {
        preview: {
            headers: {
                'Cache-Control': 'public, max-age=600',
            },
        },
    },
});
