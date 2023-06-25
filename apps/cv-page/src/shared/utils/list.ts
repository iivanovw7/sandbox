/*
    eslint-disable
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/no-unsafe-return
 */

export const toArray = <T>(value: T): T extends any[] ? T : [T] => {
    return Array.isArray(value)
        ? (value as any)
        : [value];
};

/**
 * Returns a new Array by plucking named property off all objects in the Array supplied.
 *
 * @function
 * @param {Array} arr - array to consider.
 * @param {number | string} key - key name to pluck off.
 *
 * @returns {Array} The list of values for the given key.
 *
 * @example
 *      const arr = [{a: "a_1", b: "b_1"}, {a: "a_2", b: "b_2"}];
 *      pluck(arr, "a"); //=> ["a_1", "a_2"]
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const pluck = <T, K extends keyof T>(arr: T[], key: K) => arr.map((i: T) => i[key]);

/*
    eslint-enable
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/no-unsafe-return
*/
