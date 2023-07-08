/**
 * Module contains App container.
 * @module src/app
 */
import { Routing } from '@/pages';

import { withProviders } from './providers';

/**
 * Main application component.
 * @category app
 * @constructor
 * @returns Component with children.
 */
export const App = withProviders(Routing);
