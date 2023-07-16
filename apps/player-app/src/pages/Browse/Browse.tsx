/**
 * Module contains `Browse` page.
 * @module src/pages/Browse/Browse
 */
import { Billboard } from '@/features';
import { Header } from '@/widgets';

import { withProfile } from '../withProfile';

/**
 * `Browse` page.
 * @method
 * @constructor
 * @returns Component with children.
 */
export const Browse = withProfile(() => (
    <div>
        <Header withMenu withNavigation />
        <Billboard />
    </div>
));
