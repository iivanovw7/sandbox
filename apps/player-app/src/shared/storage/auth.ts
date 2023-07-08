/**
 * Module contains auth local storage.
 * @module src/shared/storage/auth
 */
import type { Maybe } from '@sandbox/types';

import { StorageKey, setStorage, storage } from './storage';

/**
 * Saves new user accessToken.
 * @param {string} accessToken - accessToken.
 */
export const setAccessToken = (accessToken?: Maybe<string>): void => {
    setStorage(StorageKey.accessToken, accessToken || null);
};

/**
 * Retrieves accessToken out of local storage.
 * @returns {string | null} - accessToken.
 */
export const getAccessToken = (): string => {
    return (storage[StorageKey.accessToken] || null) as string;
};

// TODO: `refreshToken` should be kept in `http-only` cookies when working with real backend.

/**
 * Saves new user refreshToken.
 * @param {string} refreshToken - refreshToken.
 */
export const setRefreshToken = (refreshToken?: Maybe<string>): void => {
    setStorage(StorageKey.refreshToken, refreshToken || null);
};

/**
 * Retrieves refreshToken out of local storage.
 * @returns {string | null} - refreshToken.
 */
export const getRefreshToken = (): string => {
    return (storage[StorageKey.refreshToken] || null) as string;
};
