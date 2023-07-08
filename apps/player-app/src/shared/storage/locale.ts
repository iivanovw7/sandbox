/**
 * Module contains locale local storage.
 * @module src/shared/storage/locale
 */
import type { Maybe } from '@sandbox/types';

import { StorageKey, setStorage, storage } from './storage';

/**
 * Saves new user locale.
 * @param {string} locale - user locale.
 */
export const setLocale = (locale?: Maybe<string>): void => {
    setStorage(StorageKey.locale, locale || null);
};

/**
 * Retrieves locale out of local storage.
 * @returns {string | null} - locale - browser locale.
 */
export const getLocale = (): string => {
    return (storage[StorageKey.locale] || null) as string;
};
