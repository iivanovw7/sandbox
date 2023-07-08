/**
 * Module contains application page route component.
 * @module src/pages/Route
 */

import { Route as SolidRoute, useNavigate } from '@solidjs/router';
import type { RouteProps as SolidRouteProps } from '@solidjs/router/dist/components';

import { authStore, routePath } from '@/shared';

export type RouteProps<S extends string> = SolidRouteProps<S> & {
    protected?: boolean;
};

/**
 * Contains application page routing.
 * @method
 * @constructor
 * @param {RouteProps} props - route props.
 * @returns Component with children.
 */
export const Route = <S extends string>(props: RouteProps<S>) => {
    const navigate = useNavigate();

    createEffect(() => {
        if (props.protected && ! authStore.state.accessToken) {
            navigate(routePath.login, { replace: true });
        }
    });

    return <SolidRoute {...props} />;
};
