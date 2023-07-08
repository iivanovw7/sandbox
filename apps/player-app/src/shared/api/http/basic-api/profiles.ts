/**
 * Module contains shared basic-api profiles methods.
 * @module src/shared/api/http/basic-api/profiles
 */

import type { TBasicApiListResult, TProfile } from '@sandbox/player-app-server';
import type { AxiosRequestConfig } from 'axios/index';


import { http } from './http-client';

export const profilesApi = {
    getProfiles: async (config: AxiosRequestConfig = {}) => {
        return http.get<TBasicApiListResult<TProfile>>({
            url: '/getProfiles',
            ...config
        });
    }
};
