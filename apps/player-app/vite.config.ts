/**
 * Module contains vite configuration.
 * @module vite-config
 */
import { getConfig } from './config/vite-config';

export default getConfig({
    overrides: {
        server: {
            port: 3050,
        },
    },
});
