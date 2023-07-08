import type { TBasicApiResult } from './types';

export const resultSuccess = <T>(result: T, { message = 'ok' } = {}) => ({
    code: 0,
    message,
    result,
    success: true
});

export const resultError = (code = 5000, { message = 'Unknown error' } = {}) => ({
    code,
    message,
    result: null,
    success: false,
});

/**
 *  Represents result constructor.
 */
export class Result {
    /**
     * Authorization server error.
     * @returns {Object} response - response data.
     */
    public static authorizationError(): TBasicApiResult<null> {
        return resultError(4001, {
            message: 'Basic API Authorization error'
        });
    }

    /**
     * Forbidden server error.
     * @returns {Object} response - response data.
     */
    public static forbiddenError(message = 'Forbidden'): TBasicApiResult<null> {
        return resultError(4003, {
            message
        });
    }

    /**
     * Not found Error.
     * @returns {Object} response - response data.
     */
    public static notFoundError(message = 'Not Found'): TBasicApiResult<null> {
        return resultError(4004, {
            message
        });
    }

    /**
     * Successful server response.
     * @param {*} data - result data.
     * @returns {Object} response - response data.
     */
    public static success<Data>(data: Data): TBasicApiResult<Data> {
        return resultSuccess(data);
    }
}

export const ACCESS_TOKEN_SECRET = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
);

export const REFRESH_TOKEN_SECRET = new TextEncoder().encode(
        'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f3'
);
