/**
 * Module contains axios client class.
 * @module src/shared/utils/axios/Axios
 */

import type { RequestOptions, Result, UploadFileParams } from '@sandbox/types';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { clone } from 'ramda';

import { ContentType, RequestMethod } from '../http';
import { isFunction } from '../lang';

import type { CreateAxiosOptions } from './axiosTransform';

export * from './axiosTransform';

/*
    eslint-disable
    @typescript-eslint/no-unsafe-argument,
    @typescript-eslint/no-explicit-any,
    require-jsdoc
*/

/**
 * Axios client class.
 * @constructor
 * @category Axios
 */
export class AxiosClient {
    private axiosInstance: AxiosInstance;

    private readonly options: CreateAxiosOptions;

    constructor(options: CreateAxiosOptions) {
        this.options = options;
        this.axiosInstance = axios.create(options);
        this.setupInterceptors();
    }

    private createAxios(config: CreateAxiosOptions): void {
        this.axiosInstance = axios.create(config);
    }

    private getTransform() {
        return this.options.transform;
    }

    private setupInterceptors() {
        const {
            axiosInstance,
            options: { transform },
        } = this;

        if (transform) {
            const {
                requestInterceptors,
                requestInterceptorsCatch,
                responseInterceptors,
                responseInterceptorsCatch,
            } = transform;

            this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
                // If cancel repeat request is turned on, then cancel repeat request is prohibited
                if (requestInterceptors && isFunction(requestInterceptors)) {
                    config = requestInterceptors(config, this.options);
                }

                return config;
            }, undefined);

            if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
                this.axiosInstance.interceptors.request.use(
                    undefined,
                    requestInterceptorsCatch
                );
            }

            if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
                this.axiosInstance.interceptors.response.use(undefined, (error) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return responseInterceptorsCatch(axiosInstance, error);
                });
            }

            this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
                if (responseInterceptors && isFunction(responseInterceptors)) {
                    res = responseInterceptors(res);
                }

                return res;
            }, undefined);
        }
    }

    /**
     * Reconfigure axios.
     * @param {CreateAxiosOptions} config - config instance.
     */
    public configAxios(config: CreateAxiosOptions) {
        this.createAxios(config);
    }

    public delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: RequestMethod.DELETE }, options);
    }

    public get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: RequestMethod.GET }, options);
    }

    public getAxios(): AxiosInstance {
        return this.axiosInstance;
    }

    public post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: RequestMethod.POST }, options);
    }

    public put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        return this.request({ ...config, method: RequestMethod.PUT }, options);
    }

    public request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
        let conf: CreateAxiosOptions = clone(config);

        if (config.cancelToken) {
            conf.cancelToken = config.cancelToken;
        }

        const transform = this.getTransform();

        const { requestOptions } = this.options;
        const { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {};

        const opt: RequestOptions = {
            ...requestOptions,
            ...options
        };

        if (beforeRequestHook && isFunction(beforeRequestHook)) {
            conf = beforeRequestHook(conf, opt);
        }

        conf.requestOptions = { ...requestOptions, ...options };

        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request<any, AxiosResponse<Result>>(conf)
                .then((res: AxiosResponse<Result>) => {
                    if (transformResponseHook && isFunction(transformResponseHook)) {
                        try {
                            resolve(transformResponseHook(res, opt));
                        }
                        catch (err) {
                            reject(err || new Error('Request error!'));
                        }
                    }
                    else {
                        resolve(res as unknown as Promise<T>);
                    }
                })
                .catch((errorData: AxiosError | Error) => {
                    if (requestCatchHook && isFunction(requestCatchHook)) {
                        reject(requestCatchHook(errorData as AxiosError, opt));
                    }
                    else {
                        if (axios.isAxiosError(errorData)) {
                            // rewrite error message from axios in here
                        }

                        reject(errorData);
                    }
                });
        });
    }

    public setHeader(headers: any): void {
        if (this.axiosInstance) {
            Object.assign(this.axiosInstance.defaults.headers, headers);
        }
    }

    public uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
        const formData = new window.FormData();
        const customFilename = params.name || 'file';

        if (params.filename) {
            formData.append(customFilename, params.file, params.filename);
        }
        else {
            formData.append(customFilename, params.file);
        }

        if (params.data) {
            Object.keys(params.data).forEach((key) => {
                const value = params.data![key];

                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(`${key}[]`, item as Blob | string);
                    });

                    return;
                }

                formData.append(key, params.data![key]);
            });
        }

        return this.axiosInstance.request<T>({
            ...config,
            data: formData,
            headers: {
                'Content-type': ContentType.FORM_DATA,
                ignoreCancelToken: true,
            },
            method: 'POST',
        });
    }
}

/*
    eslint-enable
    @typescript-eslint/no-unsafe-argument,
    @typescript-eslint/no-explicit-any,
    require-jsdoc
*/
