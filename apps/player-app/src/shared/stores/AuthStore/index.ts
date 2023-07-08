/**
 * Module contains global application auth store.
 * @module src/shared/stores/AuthStore
 */
import type { TLoginData } from '@sandbox/player-app-server';
import type { AnyFunction, Maybe, Nullable } from '@sandbox/types';
import { useIntervalFn } from 'solidjs-use';

import { getRefreshToken, setRefreshToken } from '@/shared/storage/auth';

import { authApi } from '../../api/http/basic-api-auth';
import { getLogger } from '../../log';
import { getAccessToken, setAccessToken } from '../../storage';
import { MILLISECONDS_IN_MINUTE, makeApiRequest } from '../../utils';

declare global {
    interface IGlobalStore {
        auth: AuthStore;
    }
}

export type AuthStoreActions = {
    login: (data: TLoginData) => Promise<unknown>;
    logout: () => void;
    refreshAccessToken: () => Promise<unknown>;
};

export type AuthStoreState = {
    accessToken: Nullable<string>;
    // TODO: Should be kept in http-only cookies when working with real server.
    refreshToken: Nullable<string>;
};

export type AuthStore = {
    actions: AuthStoreActions;
    state: AuthStoreState
};

const logger = getLogger('AuthStore');

/**
 *  Creates auth store instance.
 *  @returns {AuthStore} store, containing state and action.
 */
const createAuthStore = (): AuthStore => {
    const [state, setState] = createStore<AuthStoreState>({
        accessToken: getAccessToken(),
        refreshToken: getRefreshToken()
    });

    /**
     * Updates short term access token in local state.
     * @param {string} [accessToken] access token.
     */
    const updateAccessToken = (accessToken?: Maybe<string>) => {
        const token = accessToken || null;

        setAccessToken(token);

        setState({
            accessToken: token
        });
    };

    /**
     * Updates long term refresh token in local state.
     * @param {string} [refreshToken] access token.
     */
    const updateRefreshToken = (refreshToken?: Maybe<string>) => {
        const token = refreshToken || null;

        setRefreshToken(token);

        setState({
            refreshToken: token
        });
    };

    /**
     * Updates short term access token.
     */
    const refreshAccessToken = async () => {
        if (state.accessToken) {
            await makeApiRequest({
                onRequestError: () => {
                    logger.error('Refresh auth token error.');

                    updateAccessToken(null);
                },
                request: async () => {
                    const { result: { accessToken } } = await authApi.refresh();

                    updateAccessToken(accessToken);
                }
            });
        }
    };

    useIntervalFn(
        refreshAccessToken as AnyFunction,
        MILLISECONDS_IN_MINUTE,
        { immediate: true }
    );

    return {
        actions: {
            login: async ({ password, username }) => {
                await makeApiRequest({
                    onRequestError: (error) => {
                        logger.error('Failed to login user');

                        updateAccessToken(null);

                        throw error;
                    },
                    request: async () => {

                        const { result: { accessToken, refreshToken } } = await authApi.login({
                            password,
                            username
                        });

                        updateAccessToken(accessToken );
                        updateRefreshToken(refreshToken );
                    }
                });
            },
            logout: () => {
                updateAccessToken(null);
                updateRefreshToken(null);
            },
            refreshAccessToken
        },
        state
    };
};

export const authStore = createRoot(createAuthStore);
