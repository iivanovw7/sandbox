/**
 * Module contains `Login` page.
 * @module src/pages/Login/Login
 */
import { useNavigate } from '@solidjs/router';

import { authStore, routePath } from '@/shared';
import { Login as LoginForm } from '@/widgets';

/**
 * `Login` page.
 * @method
 * @constructor
 * @returns Component with children.
 */
export const Login = () => {
    const navigate = useNavigate();

    createEffect(() => {
        if (authStore.state.accessToken) {
            navigate(routePath.browse, { replace: true });
        }
    });

    return <LoginForm />;
};
