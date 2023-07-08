/**
 * Module contains http constants.
 * @module src/shared/utils/http
 */

/**
 * Request method.
 * @readonly
 * @name RequestMethod
 * @enum {Record.<string, string>}
 */
export const RequestMethod = {
    DELETE: 'DELETE',
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
} as const;

export type RequestMethod = typeof RequestMethod[keyof typeof RequestMethod];

/**
 * ContentType.
 * @readonly
 * @name ContentType
 * @enum {Record.<string, string>}
 */
export const ContentType = {
    FORM_DATA: 'multipart/form-data;charset=UTF-8',
    FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
    JSON: 'application/json;charset=UTF-8',
} as const;

export type ContentType = typeof ContentType[keyof typeof ContentType];

