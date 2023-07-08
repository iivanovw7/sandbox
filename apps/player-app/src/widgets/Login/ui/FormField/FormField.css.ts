/**
 * Module login FormField styles.
 * @module src/features/Login/ui/FormField/FormField.css.ts
 */
import { globalStyle, style } from '@vanilla-extract/css';

import { inputStyles } from '@/shared/ui/styles';

const container = style([
    inputStyles.container,
]);

const input = style([
    inputStyles.input({
        fluid: true
    }),
]);

const inputBox = style([
    inputStyles.inputBox,
]);

const inputControl = style([
    inputStyles.inputControl,
    {
        visibility: 'hidden',
    }
]);

const formElement = style({
    paddingBottom: 16,
    position: 'relative'
});

const label = style([
    inputStyles.label
]);

const helper = style([
    inputStyles.helper
]);

globalStyle(`${container}:focus-within ${inputControl}`, {
    visibility: 'visible'
});

export const styles = {
    container,
    formElement,
    helper,
    input,
    inputBox,
    inputControl,
    label,
};
