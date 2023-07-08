/**
 * Module contains localization utilities.
 * @module src/shared/translations
 */
import { getLocale } from '../storage';
import { env } from '../utils';

import type * as localeSource from './en.json';

export type LocaleMessages = typeof localeSource;
export type LocaleKey = keyof LocaleMessages;

export { messages as commonMessages } from './common';

/**
 * Imports translations file.
 * @param {string} locale - locale string.
 * @returns {Promise<LocaleMessages>} - dynamically imported messages file.
 */
export const importMessages = (locale: Locale): Promise<LocaleMessages> => {
    switch (locale) {
        case 'en': {
            return import('./en.json').then((res) => res.default);
        }
        default: {
            return import('./en.json').then((res) => res.default);
        }
    }
};

/**
 * Contains locales short codes ISO 639-1.
 * @see {@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes}
 */
export const LOCALES = ['ru', 'en'] as const;

export type Locale = typeof LOCALES[number];

/**
 * Returns user or browser locale.
 * @param {Locale} [defaultLocale = 'ru'] - fallback value.
 * @returns {Locale} current user locale.
 */
export const getUserLocale = (defaultLocale: Locale = 'ru'): Locale => {
    let userLocale = (getLocale() || env.browserLocale) as Locale;

    if (userLocale) {
        while (userLocale && LOCALES.indexOf(userLocale) === -1) {
            userLocale = userLocale.substring(0, userLocale.lastIndexOf('-')) as Locale;
        }
    }

    return userLocale || defaultLocale;
};
