/**
 * Module contains application providers.
 * @module src/app/providers
 */

import { compose } from 'ramda';

import { withErrorBoundary } from './withErrorBoundary';
import { withIntl } from './withIntl';
import { withRouter } from './withRouter';
import { withTheme } from './withTheme';
import { withWaitScreen } from './withWaitScreen';

/**
 * Combines application providers.
 * @function
 * @param Component - represents child component.
 * @returns all HOC`s combined.
 */
export const withProviders = compose(
    withIntl,
    withTheme,
    withRouter,
    withErrorBoundary,
    withWaitScreen
);
