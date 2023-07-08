/**
 * Module contains profile local storage.
 * @module src/shared/storage/profile
 */
import type { TProfile } from '@sandbox/player-app-server';
import type { Nullable } from '@sandbox/types';

import { StorageKey, setStorage, storage } from './storage';

/**
 * Saves new user profile.
 * @param {Object} profile - user profile.
 */
export const setLocalProfile = (profile: Nullable<TProfile>): void => {
    setStorage(StorageKey.profile, profile);
};

/**
 * Retrieves user profile out of local storage.
 * @returns {Object | null} - user profile.
 */
export const getLocalProfile = (): Nullable<TProfile> => {
    return (storage[StorageKey.profile] || null) as Nullable<TProfile>;
};
