/**
 * Module contains application local storages.
 * @module src/shared/storage
 */

import { createStorage } from '@solid-primitives/storage';

import { getLogger } from '../log';

const logger = getLogger('LocalStorage');

/**
 * Set of storage keys.
 * @readonly
 * @enum {StorageKey}
 */
export const StorageKey = {
    /** Basic API access token. */
    accessToken: 'accessToken',
    /** Use locale. */
    locale: 'locale',
    /** User profile id. */
    profile: 'profile',
    /** Basic API refreshToken token. */
    refreshToken: 'accessToken',
} as const;

export type StorageKey = typeof StorageKey[keyof typeof StorageKey];

/*
    eslint-disable
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-explicit-any
 */

export const [storage, setStorage] = createRoot(() => createStorage({
    api: localStorage,
    deserializer: (v: any) => {
        try {
            return JSON.parse(v as string);
        }
        catch (errorData) {
            logger.error('Deserializer error', errorData);

            return null;
        }
    },
    prefix: 'player-app-root',
    serializer: (v: any) => JSON.stringify(v),
}));

/*
    eslint-enable
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-explicit-any
*/
