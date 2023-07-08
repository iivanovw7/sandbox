/*
    eslint-disable
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/explicit-module-boundary-types
*/

import { toArray } from '../../../src/shared/utils';

/**
 * Assigns stubs for method or collections of methods.
 *
 * @param {function | function[]} methods - method to stub or collection of methods.
 * @param {Object} target - reference to a target module.
 * @param {any | function} implementation - custom method implementation.
 * @returns {Mock | Object.<string, Mock>} - single stub or object, containing stubs.
 */
export const stubMethod = (
    methods: string | string[],
    target: any,
    implementation?: (() => unknown) | unknown
): any => {
    const methodList = toArray(methods);
    const stub: Record<string, AnyObject> = {};

    let i;
    let methodName;
    let q;

    for (i = 0, q = methodList.length; i < q; i += 1) {
        methodName = methodList[i];
        stub[methodName] = vi.spyOn(target, methodName);

        if (typeof implementation === 'function') {
            stub[methodName].mockImplementation(implementation);
        }
        else {
            stub[methodName].mockReturnValue(implementation);
        }
    }

    return typeof methods === 'string'
        ? stub[methods]
        : stub;
};

/**
 * Verifies if stub has been called once or number of times.
 *
 * @param {Mock} method to verify.
 * @param {number | undefined} times - number of calls.
 */
export const verifyCalled = (method: Mock, times?: number): void => {
    if (times) {
        expect(method).toHaveBeenCalledTimes(times);
    }
    else {
        expect(method).toHaveBeenCalled();
    }
};

/**
 * Verifies if stub has not been called.
 *
 * @param {Mock} method to verify.
 */
export const verifyNotCalled = (method: Mock): void => {
    expect(method).toHaveBeenCalledTimes(0);
};

/**
 * Verifies stub methods call.
 *
 * @param {Mock | Mock[]} stub - collection of methods.
 * @param {Object} props - object contains additional verification props.
 * @param {Array.<any>} [props.args = []] - call arguments.
 */
export const verifyCall = (stub: Mock | Mock[], props: { args: unknown | unknown[] }): void => {
    for (const spyInstance of toArray(stub)) {
        expect(spyInstance).toHaveBeenCalledWith(...('args' in props
            ? toArray(props.args)
            : []));
    }
};

/**
 * Resets all stub methods.
 * @returns {void}
 */
export const resetStub: () => void = () => vi.resetAllMocks();

/**
 * Removes method spy stubs.
 * @param {Mock | Mock[]} stub - single stub object or list of stubs.
 */
export const removeStub = (stub: Mock | Mock[]): void => {
    for (const spyInstance of toArray(stub)) {
        spyInstance.mockRestore();
    }
};

/*
    eslint-enable
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/explicit-module-boundary-types
*/
