/**
 * Module contains application header notifications.
 * @module src/features/Notifications/Notifications
 */
import { Button } from '@/shared';

import { styles } from './Notifications.css';

/**
 * Header Notifications component.
 * @method
 * @name src/features/Notifications/Notifications
 * @returns  Component with children.
 * @constructor
 */
export const Notifications = () => (
    <Button
        class={styles.toggle}
        icon={{
            'class': styles.toggleIconBox,
            iconClass: styles.toggleIcon,
            name: 'bell',
            size: 24,
        }}
    />
);
