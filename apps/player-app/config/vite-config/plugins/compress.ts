/**
 * Module contains compress plugin. Used to package and output gzip.
 * @module config/vite-config/plugins/compress.ts
 */

import type { PluginOption } from 'vite';
import compressPlugin from 'vite-plugin-compression';

export type ConfigureCompressPluginParams = {
    compress: string;
    deleteOriginFile?: boolean;
};

/**
 * Creates compress plugin instance.
 * @param {ConfigureCompressPluginParams} params - compress params.
 * @returns {Array.<PluginOption>} compress plugin config.
 */
export const configCompressPlugin = (params: ConfigureCompressPluginParams): PluginOption[] => {
    const {
        compress,
        deleteOriginFile = false,
    } = params;

    const compressList = compress.split(',');
    const plugins: PluginOption[] = [];

    if (compressList.includes('gzip')) {
        plugins.push(
            compressPlugin({
                deleteOriginFile,
                ext: '.gz',
            })
        );
    }

    if (compressList.includes('brotli')) {
        plugins.push(
            compressPlugin({
                algorithm: 'brotliCompress',
                deleteOriginFile,
                ext: '.br',
            })
        );
    }

    return plugins;
};
