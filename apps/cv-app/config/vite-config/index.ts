/**
 * Module contains vite configuration public API.
 * @module config/vite-config
 */
import { type UserConfig, type UserConfigExport, defineConfig, mergeConfig } from 'vite';

import { commonConfig } from './config.common';

type DefineOptions = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    options?: {};
    overrides?: UserConfig;
};

/**
 * Main vite config getter.
 * @param {DefineOptions} [options] = options overrides.
 * @returns {UserConfigExport} user config export instance.
 */
export const getConfig = (options: DefineOptions = {}): UserConfigExport => {
    return defineConfig(() => {
        const { overrides = {} } = options;

        return mergeConfig(commonConfig, overrides);
    });
};
