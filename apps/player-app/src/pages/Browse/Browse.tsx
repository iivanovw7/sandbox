/**
 * Module contains `Browse` page.
 * @module src/pages/Browse/Browse
 */
import { Header } from '@/widgets';

import { withProfile } from '../withProfile';

/**
 * `Browse` page.
 * @method
 * @constructor
 * @returns Component with children.
 */
export const Browse = withProfile(() => {
    return (
        <div>
            <Header withMenu withNavigation />
        </div>
    );
});
