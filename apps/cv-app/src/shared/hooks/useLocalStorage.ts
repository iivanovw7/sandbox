import { $, useVisibleTask$ } from '@builder.io/qwik';

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
    const data = useSignal<T | null>(null);

    const set = $((payload: T) => {
        const stringifiedData = JSON.stringify(payload);

        localStorage.setItem(key, stringifiedData);
        data.value = payload;
    });

    const remove = $((itemKey: string) => {
        localStorage.removeItem(itemKey);
        data.value = null;
    });

    const handleLocalStorage = $((e: Event) => {
        const { key: storageKey, newValue, storageArea } = e as StorageEvent;

        if (storageArea === localStorage) {
            if (key === storageKey) {
                const newVal = newValue
                    ? JSON.parse(newValue)
                    : null;
                data.value = newVal as T;
            }
        }
    });

    useVisibleTask$(async ({ track }) => {
        track(() => key);

        const currentData = localStorage.getItem(key);

        if (
            (! currentData || typeof currentData === 'undefined' || typeof currentData === null)
                && defaultValue
        ) {
            await set(defaultValue);
        }

        if (
            currentData &&
                typeof currentData !== 'undefined' &&
                typeof currentData !== null
        ) {
            const parsedData = JSON.parse(currentData);

            if (parsedData) {
                data.value = parsedData as T;
            }
        }
    });

    useOnWindow('storage', handleLocalStorage);

    return {
        data,
        remove,
        set,
    };
};
