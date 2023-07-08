/**
 * Module contains global settings store.
 * @module src/shared/stores/SettingsStore
 */
import type { TProfile } from '@sandbox/player-app-server';
import type { Nullable } from '@sandbox/types';

import { type Locale, getUserLocale } from '../../translations';

declare global {
    interface IGlobalStore {
        settings: SettingsStore;
    }
}

type SettingsSoreState = {
    locale: Locale;
    theme: string;
    waitProfile: Nullable<TProfile>;
    waitQueue: number;
};

type SettingsStoreActions = {
    completeWait: () => void;
    setTheme: (theme: 'dark' | 'light') => void;
    startWait: (profile?: Nullable<TProfile>) => void;
    stopWait: () => void;
};

export type SettingsStore = {
    actions: SettingsStoreActions;
    state: SettingsSoreState;
};

/**
 *  Creates settings store instance.
 *  @returns {SettingsStore} store, containing state and action.
 */
const createSettingsStore = (): SettingsStore => {
    const [state, setState] = createStore<SettingsSoreState>({
        locale: getUserLocale(),
        theme: 'dark',
        waitProfile: null,
        waitQueue: 0,
    });

    return {
        actions: {
            completeWait: () => {
                if (state.waitQueue > 0) {
                    setState({
                        waitProfile: null,
                        waitQueue: 0,
                    });
                }
            },
            setTheme: (theme: 'dark' | 'light') => {
                setState('theme', theme);
            },
            startWait: (profile?: Nullable<TProfile>) => {
                setState(({ waitQueue }) => ({
                    waitProfile: profile || null,
                    waitQueue: waitQueue + 1,
                }));
            },
            stopWait: () => {
                if (state.waitQueue > 0) {
                    setState(({ waitQueue }) => ({
                        waitProfile: null,
                        waitQueue: waitQueue - 1,
                    }));
                }
            },
        },
        state,
    };
};

export const settingsStore = createRoot(createSettingsStore);

