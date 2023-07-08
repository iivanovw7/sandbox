/**
 * Module contains app container utils.
 * @module src/app/lib
 */
import { dark } from '@/shared/ui/styles';

/**
 * Sets active theme class.
 * @param theme - theme class name.
 */
export const setThemeClassName = (theme: string) => {
    document.documentElement.className = theme === 'dark'
        ? dark
        : ''; // TODO: Add light theme.
};

