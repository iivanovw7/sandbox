import type { Theme } from '../types/ui';

export type Env = {
    isBrowser: () => boolean;
    isDarkTheme: () => boolean;
    isNavigator: () => boolean;
    setBrowserTheme: (theme: Theme) => void;
};

const isDarkTheme = () => {
    return isBrowser() && document.documentElement.classList.contains('dark');
};

const setBrowserTheme = (theme: Theme) => {
    if (isBrowser()) {
        if (theme === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
        else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
        }
    }
};

export const isBrowser = () => typeof window !== 'undefined';

export const isNavigator = () => typeof navigator !== 'undefined';

export const env: Env = {
    isBrowser,
    isDarkTheme,
    isNavigator,
    setBrowserTheme,
};
