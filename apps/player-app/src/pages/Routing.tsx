/**
 * Module contains application routing component.
 * @module src/pages/Routing
 */

import { Navigate, Routes } from '@solidjs/router';

import { lazyImport, routePath } from '@/shared';

import { Route } from './Route';

const { Browse } = lazyImport(() => import('./Browse'));
const { Login } = lazyImport(() => import('./Login'));
const { NotFound } = lazyImport(() => import('./NotFound'));

const {
    browse,
    home,
    login,
    notFound
} = routePath;

/**
 * Contains application routing.
 * @method
 * @constructor
 * @returns Component with children.
 */
export const Routing = () => (
    <Routes>
        <Route protected component={Browse} path={browse} />
        <Route component={NotFound} path={notFound} />
        <Route component={Login} path={login} />
        <Route element={<Navigate href={browse} />} path={home} />
        <Route element={<Navigate href={notFound} />} path="/*" />
    </Routes>
);
