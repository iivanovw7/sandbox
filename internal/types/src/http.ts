/*
    eslint-disable

    @typescript-eslint/no-explicit-any,
    @typescript-eslint/no-redeclare,

*/

import type { Recordable } from './utils';

export interface RequestOptions {
    apiUrl?: string;
}

export type UploadFileParams = {
    [key: string]: any;
    data?: Recordable;
    file: Blob | File;
    filename?: string;
    name?: string;
};

export type Result<T = any> = {
    code: number;
    result: T;
};

export const HttpStatus = {
    ACCEPTED: 202,
    AMBIGUOUS: 300,
    BAD_GATEWAY: 502,
    BAD_REQUEST: 400,
    CONFLICT: 409,
    CREATED: 201,
    FORBIDDEN: 403,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    INTERNAL_SERVER_ERROR: 500,
    NO_CONTENT: 204,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NOT_FOUND: 404,
    NOT_IMPLEMENTED: 501,
    OK: 200,
    PARTIAL_CONTENT: 206,
    RESET_CONTENT: 205,
    SERVICE_UNAVAILABLE: 503,
    UNAUTHORIZED: 401,
} as const;

export type HttpStatus = typeof HttpStatus[keyof typeof HttpStatus];

/*
    eslint-enable
    @typescript-eslint/no-explicit-any,
    @typescript-eslint/no-redeclare,
*/
