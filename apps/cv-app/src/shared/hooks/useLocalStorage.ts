import type { AnyFunction } from '@sandbox/types';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';

import { isBrowser, noop } from '../utils';

/*
    eslint-disable
    @typescript-eslint/no-unused-expressions,
    @typescript-eslint/no-unsafe-argument,
    @typescript-eslint/no-unsafe-return,
    react-hooks/rules-of-hooks,
    no-nested-ternary
*/

type parserOptions<T> =
    | {
        deserializer: (value: string) => T;
        raw: false;
        serializer: (value: T) => string;
    }
    | {
        raw: true;
    };

export const useLocalStorage = <T>(key: string, initialValue?: T, options?: parserOptions<T>): [
    T | undefined,
    Dispatch<SetStateAction<T | undefined>>, () => void
] => {
    if (! isBrowser()) {
        return [initialValue as T, noop, noop];
    }

    if (! key) {
        throw new Error('useLocalStorage key may not be falsy');
    }

    const deserializer = options
        ? options.raw
            ? (value: unknown) => value
            : options.deserializer
        : JSON.parse;

    const initializer = useRef((key2: string) => {
        try {
            const serializer = options
                ? (options.raw
                    ? String
                    : options.serializer)
                : JSON.stringify;

            const localStorageValue = localStorage.getItem(key2);

            if (localStorageValue === null) {
                initialValue && localStorage.setItem(key2, serializer(initialValue));

                return initialValue;
            }
            else {
                return deserializer(localStorageValue);
            }
        }
        catch {
            return initialValue;
        }
    });

    const [state, setState] = useState<T | undefined>(() => initializer.current(key));

    useLayoutEffect(() => setState(initializer.current(key)), [key]);

    const set: Dispatch<SetStateAction<T | undefined>> = useCallback(
        (valOrFunc) => {
            try {
                const newState =
                    typeof valOrFunc === 'function'
                        ? (valOrFunc as AnyFunction)(state)
                        : valOrFunc;
                if (typeof newState === 'undefined') {
                    return;
                }
                let value: string;

                if (options) {
                    if (options.raw) {
                        if (typeof newState === 'string') {
                            value = newState;
                        }
                        else {
                            value = JSON.stringify(newState);
                        }
                    }
                    else if (options.serializer) {
                        value = options.serializer(newState);
                    }
                    else {
                        value = JSON.stringify(newState);
                    }
                }
                else {
                    value = JSON.stringify(newState);
                }

                localStorage.setItem(key, value);
                setState(deserializer(value));
            }
            catch { /* empty */
            }
        },
        [key, setState]
    );

    const remove = useCallback(() => {
        try {
            localStorage.removeItem(key);
            setState(undefined);
        }
        catch { /* empty */
        }
    }, [key, setState]);

    return [state, set, remove];
};

/*
    eslint-enable
    @typescript-eslint/no-unused-expressions,
    @typescript-eslint/no-unsafe-argument,
    @typescript-eslint/no-unsafe-return,
    react-hooks/rules-of-hooks,
    no-nested-ternary
*/
