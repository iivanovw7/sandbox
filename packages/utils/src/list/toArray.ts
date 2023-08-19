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

/*
    eslint-enable
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/no-unsafe-return
*/
