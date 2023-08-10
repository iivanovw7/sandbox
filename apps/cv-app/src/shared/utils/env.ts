import { isBrowser } from '@builder.io/qwik/build';

import type { Theme } from '#/ui';

export type Env = {
    isDarkTheme: () => boolean;
    setBrowserTheme: (theme: Theme) => void;
};

const isDarkTheme = () => {
    return isBrowser && document.documentElement.classList.contains('dark');
};

const setBrowserTheme = (theme: Theme) => {
    if (isBrowser) {
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

export const env: Env = {
    isDarkTheme,
    setBrowserTheme
};
