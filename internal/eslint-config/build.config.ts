/**
 * Build config.
 * @module internal/eslint-config/build-config.ts
 */

import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    clean: true,
    declaration: true,
    entries: ['src/index', 'src/solid', 'src/test', 'src/astro'],
    rollup: {
        emitCJS: true,
    },
});
