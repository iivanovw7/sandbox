/**
 * Module contains styled `NavLink` element.
 * @module src/shared/style/elements/NavLink/NavLink.css
 */

import { recipe } from '@vanilla-extract/recipes';
import { ellipsis, padding, rem, transitions } from 'polished';

import type { Color } from '#/styles';

import { theme } from '../../theme.css';
import { vars } from '../../vars.css';

/**
 * Gets navigation link full colors.
 * @param {Color} type - color scheme type.
 * @returns {CSSStyleRule} - link color according to theme parameter.
 */
const getLinkColor = (type: Color) => ({
    color: theme[type].linkText,
    selectors: {
        '&[data-active="true"]': {
            color: theme[type].linkTextAccent,
        },
        '&[data-disabled="true"]': {
            color: theme[type].linkTextDisabled,
            cursor: 'default',
        },
        ':not(&[data-disabled="true"])&:focus-visible': {
            color: theme[type].linkTextAccent,
            outline: '2px solid',
            outlineColor: theme[type].linkTextAccent,
        },
        ':not(&[data-disabled="true"])&:hover': {
            color: theme[type].linkTextAccent,
        },
    }
});

const link = recipe({
    base: {
        ...transitions(
            ['color'],
            vars.transition.callback
        ),
        display: 'flex',
        justifyContent: 'center',
        selectors: {
            '&[data-disabled="true"], &[data-active="true"]': {
                pointerEvents: 'none',
            },
        },
        textDecoration: 'none',
        width: '100%',
    },
    defaultVariants: {
        color: 'primary',
        noWrap: false,
    },
    variants: {
        color: {
            primary: getLinkColor('primary'),
            secondary: getLinkColor('secondary'),
            tertiary: getLinkColor('tertiary'),
        },
        disabled: {
            'true': {
                color: theme.primary.linkTextDisabled
            }
        },
        noWrap: {
            'true': ellipsis()
        }
    },
});

/**
 * Gets navigation link text full colors.
 * @param {Color} type - color scheme type.
 * @returns {CSSStyleRule} - link text color according to theme parameter.
 */
const getTextColor = (type: Color) => ({
    selectors: {
        '&[data-disabled="false"]&[data-active="true"]': {
            color: theme[type].linkTextAccent,
        },
    }
});

const text = recipe({
    base: [
        {
            display: 'inline',
        },
        padding(0, rem(8))
    ],
    defaultVariants: {
        color: 'primary',
        noWrap: false,
    },
    variants: {
        color: {
            primary: getTextColor('primary'),
            secondary: getTextColor('secondary'),
            tertiary: getTextColor('tertiary'),
        },
        noWrap: {
            'true': ellipsis()
        }
    },
});

export const styles = {
    link,
    text
};
