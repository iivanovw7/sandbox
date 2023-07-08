/**
 * Module header Notifications styles.
 * @module src/features/Notifications/Notifications.css
 */
import { style } from '@vanilla-extract/css';
import { rem } from 'polished';

import { buttonStyles } from '@/shared/ui/styles';

const toggle = style([
    buttonStyles.button({
        color: 'secondary',
        custom: true,
        fill: 'none',
        rounded: true
    }),
    {
        height: 30,
        marginLeft: rem(20),
        padding: rem(6),
        width: 30,
    },
]);

const toggleIconBox = style([
    buttonStyles.buttonIcon(),
]);

const toggleIcon = style([
    {
        height: 26,
        width: 26
    }
]);

export const styles = {
    toggle,
    toggleIcon,
    toggleIconBox
};
