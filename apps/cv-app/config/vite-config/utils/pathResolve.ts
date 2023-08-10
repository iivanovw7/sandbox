/**
 * Module contains path resolver.
 * @module config/vite-config/utils/pathResolve.ts
 */

import { resolve } from 'node:path';

export const root = process.cwd();

/**
 * Path resolver.
 * @param {string} pathname - module path.
 * @returns {string} resolved path.
 */
export const pathResolve = (pathname: string) => {
    return resolve(root, '.', pathname);
};
