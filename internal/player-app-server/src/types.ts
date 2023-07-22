import type { Nullable } from '@sandbox/types';
import type { AxiosError } from 'axios';

export type TBasicApiList<Data> = {
    count: number;
    data: Data[];
};

export type TBasicApiListResult<Data> = TBasicApiResult<TBasicApiList<Data>>;

export type TBasicApiResult<Data> = {
    code: number;
    message: string;
    result: Data;
    success: boolean;
};

export type TBasicApiError<Data> = AxiosError<TBasicApiResult<Data>>;

export type TProfile = {
    avatar: string;
    id: string;
    index: number;
    lock: Nullable<string>;
    name: string;
};

export type TLoginData = {
    password: string;
    username: string;
};

export type TLoginResult = {
    accessToken: string;
    refreshToken: string;
};

export type TBillboard = {
    description: string;
    endTime: number;
    logo: string;
    poster: string;
    startTime: number;
    title: string;
    url: string;
};
