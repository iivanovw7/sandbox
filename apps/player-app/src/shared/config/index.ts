/**
 * Module contains main application configuration public API.
 * @module src/shared/config
 */
import { getConfig } from '@/shared/config/data';

import { env } from '../utils/env';

/**
 *  Changes config according to application running mode.
 *  @type {TConfigEnv}
 */
export const config = getConfig({
    reconfig: {
        logLevel: env.logLevel
    }
});
