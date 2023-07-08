/**
 * Module contains toArray util.
 * @module src/shared/utils/list/findOr
 */

/*
    eslint-disable
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-explicit-any
 */

/**
 * Casts value to array.
 * @func toArray
 * @category List
 * @param {any | Array.<any>} value - target value.
 * @returns {Array.<any>} - value inside array or unchanged value if array was received.
 */
export const toArray = <T>(value: T): T extends unknown[] ? T : [T] => {
    return Array.isArray(value)
        ? value as any
        : [value];
};

/*
    eslint-enable
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-explicit-any
 */
