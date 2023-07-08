/**
 * Module contains capitalizeFirstLetter utility function.
 * @module src/shared/utils/string/capitalize
 */

/**
 * Capitalizes first string letter.
 * @function
 * @name src/shared/utils/string/capitalize
 * @category String
 * @param {string} str - target string.
 * @returns {string} result.
 */
export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
