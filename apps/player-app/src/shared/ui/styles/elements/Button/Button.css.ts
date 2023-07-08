/**
 * Module contains styled button elements.
 * @module scr/shared/style/elements/Button/Button.css
 */
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { ellipsis, padding, rem, transitions } from 'polished';

import type { Color } from '#/styles';

import { mixins } from '../../mixins';
import { theme } from '../../theme.css';
import { vars } from '../../vars.css';
import { styles as iconStyles } from '../Icon';

/**
 * Gets button full colors.
 * @param {Color} type - color scheme type.
 * @returns {CSSStyleRule} - button color according to theme parameter.
 */
const getFullColor = (type: Color) => ({
    backgroundColor: theme[type].button,
    border: 'none',
    color: theme[type].buttonText,
    selectors: {
        '&:disabled': {
            backgroundColor: theme[type].buttonDisabled,
            borderColor: theme[type].buttonDisabled,
        },
        '&:not(&:disabled)&:hover, &:not(&:disabled)&:focus-visible': {
            backgroundColor: theme[type].buttonAccent,
        }
    }
});

/**
 * Gets button fill none colors.
 * @param {Color} type - color scheme type.
 * @returns {CSSStyleRule} - button color according to theme parameter.
 */
const getFillNoneColor = (type: Color) => ({
    backgroundColor: 'transparent',
    border: 'none',
    color: theme[type].button,
    selectors: {
        '&:disabled': {
            backgroundColor: 'transparent',
            borderColor: theme[type].buttonDisabled,
        },
        '&:not(&:disabled)&:hover, &:not(&:disabled)&:focus-visible': {
            backgroundColor: 'transparent',
            borderColor: theme[type].buttonAccentFillNone
        }
    }
});

/**
 * Gets button outlined color none colors.
 * @param {Color} type - color scheme type.
 * @returns {CSSStyleRule} - button color according to theme parameter.
 */
const getOutlinedColor = (type: Color) => ({
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: theme[type].button,
    color: theme[type].buttonTextOutlined,
    selectors: {
        '&:disabled': {
            backgroundColor: 'transparent',
            borderColor: theme[type].buttonDisabled,
        },
        '&:not(&:disabled)&:hover, &:not(&:disabled)&:focus-visible': {
            backgroundColor: 'transparent',
            borderColor: theme[type].buttonAccentOutlined,
            color: theme[type].buttonTextAccent
        }
    }
});

const color = recipe({
    base: [],
    variants: {
        variant: {
            'primary-fill-none': getFillNoneColor('primary'),
            'primary-full': getFullColor('primary'),
            'primary-outlined': getOutlinedColor('primary'),
            'secondary-fill-none': getFillNoneColor('secondary'),
            'secondary-full': getFullColor('secondary'),
            'secondary-outlined': getOutlinedColor('secondary'),
            'tertiary-fill-none': getFillNoneColor('tertiary'),
            'tertiary-full': getFullColor('tertiary'),
            'tertiary-outlined': getOutlinedColor('tertiary'),
        }
    },
});

const button = recipe({
    base: [
        {
            alignItems: 'center',
            display: 'inline-flex',
            flexDirection: 'row',
            fontFamily: vars.fontFamily.medium,
            justifyContent: 'center',
            outline: 'none',
            position: 'relative',
            selectors: {
                '&:disabled': {
                    pointerEvents: 'none'
                },
                '&:hover': {
                    cursor: 'pointer',
                },
                '&:not(&:disabled)&:focus-visible&::before': {
                    border: '2px solid',
                    borderColor: vars.palette.white,
                    boxSizing: 'content-box',
                    content: '',
                    display: 'block',
                    height: '100%',
                    left: '-4px',
                    padding: 2,
                    position: 'absolute',
                    top: '-4px',
                    width: '100%',
                }
            },
            whiteSpace: 'nowrap',
            width: 'fit-content',
        },
        transitions(
            ['border-color', 'background-color', 'border'],
            vars.transition.callback
        ),
    ],
    compoundVariants: [
        {
            style: color({ variant: 'primary-outlined' }),
            variants: { color: 'primary', fill: 'outlined' },
        },
        {
            style: color({ variant: 'primary-full' }),
            variants: { color: 'primary', fill: 'full' },
        },
        {
            style: color({ variant: 'primary-fill-none' }),
            variants: { color: 'primary', fill: 'none' },
        },
        {
            style: color({ variant: 'secondary-outlined' }),
            variants: { color: 'secondary', fill: 'outlined' },
        },
        {
            style: color({ variant: 'secondary-full' }),
            variants: { color: 'secondary', fill: 'full' },
        },
        {
            style: color({ variant: 'secondary-fill-none' }),
            variants: { color: 'secondary', fill: 'none' },
        },
        {
            style: color({ variant: 'tertiary-outlined' }),
            variants: { color: 'tertiary', fill: 'outlined' },
        },
        {
            style: color({ variant: 'tertiary-full' }),
            variants: { color: 'tertiary', fill: 'full' },
        },
        {
            style: color({ variant: 'tertiary-fill-none' }),
            variants: { color: 'tertiary', fill: 'none' },
        }
    ],
    defaultVariants: {
        color: 'primary',
        custom: false,
        fill: 'outlined',
        layout: 'horizontal',
    },
    variants: {
        color: {
            danger: {},
            primary: {},
            secondary: {},
            tertiary: {},
        },
        custom: {
            'true': {
                border: 0,
                height: 'auto',
                padding: 0,
            }
        },
        fill: {
            full: {},
            none: {},
            outlined: {},
        },
        fluid: {
            'true': {
                width: '100%'
            }
        },
        layout: {
            horizontal: {
                flexDirection: 'row',
                height: 'auto',
                ...padding(rem(14), rem(22))
            },
            vertical: {
                flexDirection: 'column',
                height: 'auto',
                ...padding(rem(14), rem(22))
            },
        },
        rounded: {
            'true': {
                borderRadius: vars.borderRadius['2x'],
                selectors: {
                    '&:not(&:disabled)&:focus-visible&::before': {
                        borderRadius: vars.borderRadius['2x'],
                    }
                }
            }
        },
    },
});

const buttonIcon = recipe({
    base: [
        iconStyles.icon,
        {
            alignItems: 'center',
            color: 'inherit',
            display: 'flex',
            gridArea: 'icon',
            justifyContent: 'center',
            zIndex: vars.zIndex.content
        }
    ],
    defaultVariants: {
        iconPosition: 'start'
    },
    variants: {
        iconPosition: {
            end: {
                order: 3
            },
            start: {
                order: 1
            },
        },
    },
});

const buttonLoader = style({
    animation: 'rotation 1s linear infinite',
    borderRadius: '50%',
    borderRight: '1px solid transparent',
    borderTop: `1px solid ${theme.primary.buttonTextAccent}`,
    boxSizing: 'border-box',
    display: 'inline-block',
    height: 24,
    width: 24,
});

const buttonText = recipe({
    base: {
        ...ellipsis(),
        '@media': {
            ...mixins.media(['lg-down'], {
                fontSize: '13px',
            })
        },
        alignItems: 'center',
        display: 'flex',
        flex: '1 1 auto',
        fontSize: '1.2vw',
        gridArea: 'text',
        justifyContent: 'center',
        marginRight: rem(4),
        order: 2,
        zIndex: vars.zIndex.content,
    },
    defaultVariants: {
        textAlign: 'center',
    },
    variants: {
        textAlign: {
            center: {
                textAlign: 'center'
            },
            left: {
                textAlign: 'left'
            },
            right: {
                textAlign: 'right'
            }
        }
    },
});

export const styles = {
    button,
    buttonIcon,
    buttonLoader,
    buttonText,
};
