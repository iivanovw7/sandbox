/**
 * Module contains trending billboard info links component.
 * @module src/features/Billboard/ui/Info/InfoLinks
 */
import { Button, noop } from '@/shared';

import { styles } from './InfoLinks.css';

/**
 * Billboard info links component.
 * @method
 * @returns Component with children.
 * @constructor
 */
export const InfoLinks = () => (
    <div class={styles.billboardLinks}>
        <Button
            class={styles.button()}
            icon={{
                'class': styles.buttonIcon,
                name: 'play'
            }}
            text="Play"
            textClass={styles.buttonText}
            onClick={noop}
        />
        <Button
            class={styles.button({ info: true })}
            icon={{
                'class': styles.buttonIcon,
                name: 'info'
            }}
            text="More Info"
            textClass={styles.buttonText}
            onClick={noop}
        />
    </div>
);
