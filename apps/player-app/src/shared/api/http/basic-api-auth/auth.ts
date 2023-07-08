/**
 * Module contains shared basic-api auth methods.
 * @module src/shared/api/http/basic-api-auth/auth
 */

import type { TBasicApiResult, TLoginData, TLoginResult } from '@sandbox/player-app-server';
import type { AxiosRequestConfig } from 'axios';


import { http } from './http-client';

export const authApi = {
    login: async (data: TLoginData, config: AxiosRequestConfig = {}) => {
        return http.post<TBasicApiResult<TLoginResult>>({
            data,
            responseType: 'json',
            url: '/login',
            ...config
        });
    },
    refresh: async (config: AxiosRequestConfig = {}) => {
        return http.post<TBasicApiResult<TLoginResult>>({
            responseType: 'json',
            url: '/refresh',
            ...config
        });
    }
};
