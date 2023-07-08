/**
 * Module contains isNumeric type check helper.
 * @module shared/utils/lang/isNumeric
 */

import { identical, not, pipe } from 'ramda';

/**
 * Checks if input value is Numeric.
 * @func isNumeric
 * @category Lang
 * @returns {boolean}
 */
export const isNumeric = pipe(
    (value?: unknown) => Number(value),
    identical(NaN),
    not
);
