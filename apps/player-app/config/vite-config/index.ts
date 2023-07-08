/**
 * Module contains vite configuration public API.
 * @module config/vite-config
 */
import { type UserConfig, type UserConfigExport, defineConfig, mergeConfig } from 'vite';

import { getCommonConfig } from './config.common';
import { getDevelopmentConfig } from './config.development';
import { getProductionConfig } from './config.production';
import { getTestConfig } from './config.test';

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
    return defineConfig(async ({ command, mode }) => {
        const { overrides = {} } = options;

        const commonConfig = await getCommonConfig(mode, command);

        const mergedConfig = mergeConfig(commonConfig, (() => {
            switch (mode) {
                case 'analyze':
                case 'production': {
                    return getProductionConfig();
                }
                case 'test': {
                    return getTestConfig();
                }
                default: {
                    return getDevelopmentConfig();
                }
            }
        })());

        return mergeConfig(mergedConfig, overrides);
    });
};
