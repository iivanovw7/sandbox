/**
 * Module contains global stores controller.
 * @module src/shared/stores/controller
 */

const initCallbacks: (() => void)[] = [];

export const controller = {
    /**
     * Initializes the root store.
     * @param {IGlobalStore} stores - root stores instances.
     * @returns init method.
     */
    init(stores: IGlobalStore) {
        Object.assign(this.stores, stores);

        return () => {
            while (initCallbacks.length) {
                initCallbacks.pop()!();
            }
        };
    },
    /**
     * Initialization callback
     * @param {Function} callback - callback function.
     */
    onInit(callback: () => void) {
        initCallbacks.push(callback);
    },
    stores: {} as IGlobalStore,
};
