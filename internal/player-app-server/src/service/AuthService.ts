import { HttpStatus } from '@sandbox/types';
import { SignJWT, jwtVerify } from 'jose';
import { type Request as MirageRequest, Response as MirageResponse } from 'miragejs';

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, Result } from '../utils';

const USER = {
    password: 'user',
    username: 'user@email.com'
};

// eslint-disable-next-line import/no-default-export
export default class AuthService {
    public async login(schema, request: MirageRequest) {
        const { password, username } = JSON.parse(request.requestBody);

        if (username === USER.username && password === USER.password) {
            const accessToken = await new SignJWT({ username: USER.username })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('10m')
                .sign(ACCESS_TOKEN_SECRET);

            const refreshToken = await new SignJWT({ username: USER.username })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('1d')
                .sign(REFRESH_TOKEN_SECRET);

            return new MirageResponse(
                HttpStatus.OK,
                {},
                Result.success({ accessToken, refreshToken })
            );
        }

        if (username !== USER.username) {
            return new MirageResponse(
                HttpStatus.NOT_FOUND,
                {},
                Result.notFoundError('User nor found')
            );
        }

        return new MirageResponse(
            HttpStatus.FORBIDDEN,
            {},
            Result.forbiddenError('Wrong password')
        );
    }

    public async refresh(schema, request) {
        const refreshToken = request.requestHeaders['Authorization'] as string;

        try {
            await jwtVerify(refreshToken, REFRESH_TOKEN_SECRET);

            const accessToken = await new SignJWT({ username: USER.username })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('10m')
                .sign(ACCESS_TOKEN_SECRET);

            return new MirageResponse(
                HttpStatus.OK,
                {},
                Result.success({ accessToken })
            );
        }
        catch (errorData) {
            return new MirageResponse(
                HttpStatus.UNAUTHORIZED,
                {},
                Result.authorizationError()
            );
        }
    }
}
