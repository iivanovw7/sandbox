import type { AnyStore } from '#/common';

/**
 * Module contains withLocalStore hoc.
 * @module src/shared/hoc/withLocalStore
 */
export type UseLocalStore<Store extends AnyStore> = () => Store;

export type WithLocalStoreProvider = {
    <Props>(Cmp: Component<Props>): (props: Props) => JSXElement;
};

type Result<Store extends AnyStore> = [
    useLocalStore: UseLocalStore<Store>,
    withLocalStoreProvider: WithLocalStoreProvider
];

/**
 * Creates local store hook and provider.
 * @param {Function} storeConstructor - local store constructor.
 * @returns {Array} local store hook and provider.
 */
export const withLocalStore = <Store extends AnyStore>(storeConstructor: () => Store): Result<Store> => {
    const store = storeConstructor();
    const LocalStoreContext = createContext<Store>(store);

    /**
     * Local store hook.
     * @returns {Function} local store hook.
     */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const useLocalStore = () => useContext<Store>(LocalStoreContext);

    /**
     * Creates local store provider.
     * @param Cmp - component.
     * @returns Component
     */
    const withLocalStoreProvider = (Cmp) => (props) => (
        <LocalStoreContext.Provider value={store}>
            <Cmp {...props} />
        </LocalStoreContext.Provider>
    );

    return [
        useLocalStore,
        withLocalStoreProvider
    ];
};

