/**
 * Module contains `isValidCode` checker.
 * @module src/shared/utils/string/isValidCode
 */

import { allPass, isNil, not, pipe } from 'ramda';

import { isNumeric } from '../lang';

export type LengthPredicateFn = (value?: Maybe<string>) => boolean;

/**
 * Length verification predicate.
 * @function
 * @name src/shared/utils/string/hasLength
 * @param {number} valueLength - required value length.
 * @returns {boolean} `true` if value has required length `false`.
 */
const hasLength = (valueLength: number): LengthPredicateFn => (val) => {
    return val?.length === valueLength;
};

/**
 * Creates string code validation function. Verifies if string can be converted in number of required length.
 * @function
 * @name src/shared/utils/string/isValidCode
 * @param {string} [value] - validating string value.
 * @param {number} [valueLength = 4] - required code length.
 * @returns {LengthPredicateFn} `true` if code is valid and `false` otherwise.
 */
export const isValidCode = (value?: Maybe<string>, valueLength = 4) => allPass<LengthPredicateFn>([
    pipe(isNil, not),
    hasLength(valueLength),
    isNumeric,
])(value);
