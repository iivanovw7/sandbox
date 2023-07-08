/**
 * Module contains styled button elements.
 * @module scr/shared/style/elements/Input/Input.css
 */
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { padding, transitions } from 'polished';

import { mixins } from '../../mixins';
import { theme } from '../../theme.css';
import { vars } from '../../vars.css';

const container = style({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    position: 'relative',
});

const input = recipe({
    base: [
        padding(16, 20, 0),
        transitions(
            ['border-color', 'color'],
            vars.transition.callback
        ),
        {
            backgroundColor: theme.primary.textField,
            border: '1px solid',
            borderColor: 'transparent',
            borderRadius: vars.borderRadius['3x'],
            color: theme.primary.text,
            display: 'inline-flex',
            fontSize: 16,
            lineHeight: '36px',
            outline: 'none',
            selectors: {
                '&[data-invalid], &[data-warning="true"]': {
                    borderBottomColor: theme.common.warning,
                    borderBottomWidth: 2,
                },
                [`${container}:focus-within &`]: {
                    backgroundColor: theme.primary.textFieldAccent,
                }
            },
            width: 200,
        },
    ],
    defaultVariants: {
        fluid: false,
        focusOutline: false,
    },
    variants: {
        fluid: {
            'true': {
                width: '100%',
            }
        },
        focusOutline: {
            'true': {
                selectors: {
                    [`${container}:focus-within &`]: {
                        outline: '2px solid',
                        outlineColor: theme.primary.textFieldAccentOutlined,
                        outlineOffset: 2,
                    },
                },
            }
        }
    }
});

const label = style([
    mixins.centerAbsolute('Y'),
    transitions(
        ['font', 'top', 'transform'],
        vars.transition.callback
    ),
    {
        color: theme.primary.textFieldLabel,
        fontSize: 16,
        left: 20,
        selectors: {
            '&[data-has-text="true"]': {
                fontSize: 11,
                top: 12,
            },
        }
    }
]);

const helper = style([
    padding(6, 3),
    {
        fontSize: 13,
        selectors: {
            '&[data-invalid]': {
                color: theme.common.warning
            }
        }
    }
]);

const inputBox = style([
    {
        position: 'relative'
    }
]);

const inputControl = style([
    mixins.centerAbsolute('Y'),
    {
        right: 8
    }
]);

globalStyle(`${container}:focus-within ${label}`, {
    fontSize: 11,
    top: 12,
});

export const styles = {
    container,
    helper,
    input,
    inputBox,
    inputControl,
    label,
};
