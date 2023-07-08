import { ACCESS_TOKEN_SECRET, Result } from '../utils';
import { jwtVerify } from 'jose';
import { Response as MirageResponse } from 'miragejs';
import { type AnyFunction, HttpStatus } from '@sandbox/types';


export const authorize = (handler?: AnyFunction) => {
    return async (schema, request, ...restArgs) => {
        const accessToken = request.requestHeaders['Authorization'] as string;

        try {
            await jwtVerify(accessToken, ACCESS_TOKEN_SECRET);

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            return handler?.(schema, request, ...restArgs) as AnyFunction;
        }
        catch (errorData) {
            return new MirageResponse(
                HttpStatus.UNAUTHORIZED,
                {},
                Result.authorizationError()
            );
        }
    };
};
