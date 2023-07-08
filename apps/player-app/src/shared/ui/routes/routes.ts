/**
 * Contains application routing config.
 * @module src/shared/ui/routes/routes
 */

/**
 * Application base route paths.
 * @readonly
 * @enum {string}
 */
export const basePath = {
    browse: '/browse',
    home: '/',
    login: '/login',
    notFound: '/404',
    search: '/search',
};

const { browse, home, login, notFound, search } = basePath;

/**
 * Application Route paths.
 * @readonly
 * @enum {string}
 */
export const routePath = {
    browse,
    genre: `${browse}/genre`,
    home,
    latest: `${browse}/latest`,
    list: `${browse}/list`,
    login,
    notFound,
    search,
};
