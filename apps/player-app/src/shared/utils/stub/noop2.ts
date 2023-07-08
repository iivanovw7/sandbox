/**
 * Module contains curried no operation stub.
 * @module src/shared/utils/stub/noop2
 */

/*
    eslint-disable
    @typescript-eslint/no-empty-function,
    @typescript-eslint/no-explicit-any
*/

import type { AnyFunction } from '@sandbox/types';

/**
 * No operation curried function.
 * @function
 * @category Stub
 * @returns {Function} empty function.
 */
export const noop2: (...args: any[]) => AnyFunction = () => () => {
};

/*
    eslint-enable
    @typescript-eslint/no-empty-function,
    @typescript-eslint/no-explicit-any
*/
