/**
 * Module contains styled `Spinner` element.
 * @module src/shared/style/elements/Spinner/Spinner.css
 */

import { recipe } from '@vanilla-extract/recipes';

import { theme } from '../../theme.css';

const spinner = recipe({
    base: {
        height: '100%',
        width: '100%',
    },
    defaultVariants: {
        color: 'primary',
    },
    variants: {
        color: {
            primary: {
                color: theme.common.primary,
            },
            secondary: {
                color: theme.common.secondary,
            },
            tertiary: {
                color: theme.common.tertiary,
            }
        },
    },
});


export const styles = {
    spinner
};
