/**
 * Module contains async method stub.
 * @module src/shared/utils/stub/wait
 */

/**
 * Wait helper method.
 * @template Data
 * @param {Data} [data] - represents resolve data structure.
 * @param {number} [delay = 600] - timeout delay.
 * @returns {Promise.<any>} promise object.
 */
export const wait = async <Data>(data?: Data, delay = 600): Promise<unknown> => {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};
