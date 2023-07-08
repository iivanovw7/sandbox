/**
 * Module contains http client lib.
 * @module src/shared/api/http/basic-api-auth/http-client
 */
import type { Recordable } from '@sandbox/types';
import type { AxiosResponse } from 'axios/index';

import { authStore } from '@/shared';

import { createAxios } from '../../../utils';

/* eslint-disable @typescript-eslint/no-explicit-any */

export const http = createAxios({
    requestOptions: {
        apiUrl: '/basic-api',
    },
    transform: {
        // TODO: Remove this interceptor when working with http-only cookies
        requestInterceptors: (config) => {
            (config as Recordable).headers.Authorization = authStore.state?.refreshToken || '1';

            return config;
        },
        responseInterceptors: <Data>(res: AxiosResponse<Data>): Data => {
            return res?.data;
        },
    }
});

/* eslint-enable @typescript-eslint/no-explicit-any */
