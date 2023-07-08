/**
 * Build config.
 * @module internal/player-app-server/build-config.ts
 */

import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    clean: true,
    declaration: true,
    entries: ['src/index', 'src/types'],
    rollup: {
        emitCJS: true,
    },
});
