/**
 * Module contains application header search bar.
 * @module src/features/Search/Search
 */
import { Button, useBreakpoints } from '@/shared';

import { styles } from './Search.css';

/**
 * Header Search component.
 * @constructor
 * @method
 * @returns Component with children.
 */
export const Search = () => {
    const { xsUp } = useBreakpoints();

    return (
        <Switch>
            <Match when={xsUp()}>
                <Button
                    class={styles.toggle}
                    icon={{
                        'class': styles.toggleIconBox,
                        iconClass: styles.toggleIcon,
                        name: 'search',
                        size: 24,
                    }}
                />
            </Match>
        </Switch>
    );
};
