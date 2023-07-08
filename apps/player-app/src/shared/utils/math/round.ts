/**
 * Module contains number round util.
 * @module src/shared/utils/math/round
 */

import { bind, curryN } from 'ramda';

/**
 * Returns the value of a number rounded to the nearest integer.
 * @function
 * @name src/shared/utils/math/round
 * @category Math
 * @param {number} number The number to round
 * @returns {number} The value of the given number rounded to the nearest integer
 * @example
 *      round(0.9); //=> 1
 *      round(5.95); //=> 6
 *      round(5.5); //=> 6
 *      round(5.05); //=> 5
 *      round(-5.05); //=> -5
 */

export const round = curryN(1, bind(Math.round, Math));
