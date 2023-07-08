/**
 * Module contains Modal classes.
 * @module scr/shared/style/elements/Dialog/Dialog.css
 */
import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';
import { em, transitions } from 'polished';

import { theme } from '../../theme.css';
import { vars } from '../../vars.css';
import { styles as buttonStyles } from '../Button';

const closeBtnOffset = 4;

const dialogClose = style([
    buttonStyles.button({
        color: 'secondary',
        custom: true,
        fill: 'none',
    }),
    {
        position: 'absolute',
        right: calc.add(vars.height.header, `${closeBtnOffset}px`),
        top: calc.add(vars.height.header, `${closeBtnOffset}px`),
    },
]);

const dialogCloseIconBox = style([
    buttonStyles.buttonIcon(),
]);

const dialogCloseIcon = style([
    {
        height: 34,
        width: 34
    }
]);

const dialogContent = recipe({
    base: {
        backgroundColor: theme.background.global,
        borderRadius: vars.borderRadius['1x'],
        boxShadow: theme.shadow.modal,
        margin: 'auto',
        maxHeight: '100vh',
        maxWidth: '100vw',
        outline: 0,
        overflow: 'hidden',
        position: 'relative',
        ...transitions(
            ['background-color'],
            vars.transition.callback
        )
    },
    defaultVariants: {
        outerScroll: false,
        transitionWidth: false,
        width: 'medium'
    },
    variants: {
        outerScroll: {
            'true': {
                height: 'max-content',
                maxHeight: 'none',
            }
        },
        transitionWidth: {
            'true': transitions(
                ['background-color', 'width'],
                vars.transition.callback
            )
        },
        width: {
            auto: {
                width: 'auto'
            },
            large: {
                width: 696
            },
            max: {
                width: '100%'
            },
            medium: {
                width: 496
            },
        },
    },
});

const dialogPaper = style({
    color: vars.theme.primary.text,
    marginBottom: em(8),
});

export const styles = {
    dialogClose,
    dialogCloseIcon,
    dialogCloseIconBox,
    dialogContent,
    dialogPaper
};
