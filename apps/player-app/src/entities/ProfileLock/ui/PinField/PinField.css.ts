/**
 * Module contains unlock modal styles.
 * @module scr/entities/ProfileLockModal/ui/PinField.css.ts
 */
import { style } from '@vanilla-extract/css';
import { em, margin, padding, transitions } from 'polished';

import { vars } from '@/shared/ui/styles';

const pinField = style([
    {
        background: 'transparent',
        border: `1px solid ${vars.palette.white}`,
        boxShadow: 'none',
        boxSizing: 'border-box',
        color: vars.palette.white,
        fontSize: em(38),
        height: em(32),
        selectors: {
            '&:focus, &:focus-visible': {
                outline: 'none',
                transform: 'scale(1.1)'
            },
        },
        textAlign: 'center',
        width: em(32),
    },
    margin(em(4)),
    padding(em(4)),
    transitions(
        ['transform'],
        vars.transition.scale
    ),
]);

export const styles = {
    pinField
};
