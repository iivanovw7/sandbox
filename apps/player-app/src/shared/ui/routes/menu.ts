/**
 * Contains application navigation menu.
 * @module src/shared/ui/routes/menu
 */
import { routePath } from './routes';

const {
    browse,
    genre,
    latest,
    list
} = routePath;

export type MenuItem = {
    disabled?: boolean;
    replace?: boolean;
    text: string;
    to: string;
};

/**
 * Object representing single menu item.
 * @typedef {Object} module:shared/Menu~menuItem
 * @property {string} to - navigation path.
 * @property {string} text - title text.
 * @property {boolean} [disabled] - if item is disabled.
 */

/**
 * Set of application menu items.
 * @type {Object.<string, module:~/shared/Menu~menuItem>}
 */
export const menuItemSet: Record<string, MenuItem> = {
    home: {
        text: 'Home',
        to: browse,
    },
    latest: {
        disabled: true,
        text: 'New & Popular',
        to: latest,
    },
    list: {
        disabled: true,
        text: 'My List',
        to: list,
    },
    shows: {
        text: 'TV Shows',
        to: `${genre}/tv-shows`,
    },
};

/**
 * Creates a list of navigation options.
 * @returns {Array.<module:~/shared/ui/routes/menu~menuItems>} menu items list.
 */
export const menuItems: Array<MenuItem> = Object.values(menuItemSet);
