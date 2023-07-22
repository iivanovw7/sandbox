/**
 * Module contains shared basic-api billboard methods.
 * @module src/shared/api/http/basic-api/billboardApi
 */

import type { TBasicApiResult, TBillboard } from '@sandbox/player-app-server';
import type { AxiosRequestConfig } from 'axios/index';

import { http } from './http-client';

export const billboardApi = {
    getBillboard: async (config: AxiosRequestConfig = {}) => {
        return http.get<TBasicApiResult<TBillboard>>({
            url: '/getBillboard',
            ...config
        });
    }
};
