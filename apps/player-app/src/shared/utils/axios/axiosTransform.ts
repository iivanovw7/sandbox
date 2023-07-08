/**
 * Module contains axios client transformers.
 * @module src/shared/utils/axios
 */
import type { RequestOptions, Result } from '@sandbox/types';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type CreateAxiosOptions = AxiosRequestConfig & {
    requestOptions?: RequestOptions;
    transform?: AxiosTransform;
};

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 *  Contains axios interceptors.
 *  @category Axios
 */
export abstract class AxiosTransform {
    public beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

    public requestCatchHook?: (e: AxiosError, options: RequestOptions) => Promise<any>;

    public requestInterceptors?: (config: InternalAxiosRequestConfig,
        options: CreateAxiosOptions,
    ) => InternalAxiosRequestConfig;

    public requestInterceptorsCatch?: (error: AxiosError) => void;

    public responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

    public responseInterceptorsCatch?: (axiosInstance: AxiosInstance, error: AxiosError) => any;

    public transformResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
