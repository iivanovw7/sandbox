/**
 * Module contains unlock modal styles.
 * @module src/entities/ProfileLock/ProfileLock.css.ts
 */
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { animation, em, margin, position } from 'polished';

import { dialogStyles, mixins, theme, vars } from '@/shared/ui/styles';

const dialogPaper = style([
    dialogStyles.dialogPaper
]);

const dialogStatus = style([
    {
        '@media': {
            ...mixins.media(['lg-down'], {
                fontSize: '14px',
            }),
        },
        color: vars.theme.tertiary.text,
        fontSize: '1.3vw',
        fontWeight: vars.fontWeight.thin,
        marginBottom: em(8),
        textAlign: 'center',
    },
]);

const dialogContent = style([
    dialogStyles.dialogContent({
        width: 'max'
    }),
    {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'center',
        zIndex: vars.zIndex.container
    },
    position('absolute', 0, 0, 0, 0),
]);

const dialogTitle = recipe({
    base: [
        {
            '@media': {
                ...mixins.media(['lg-down'], {
                    fontSize: '30px',
                }),
            },
            color: 'inherit',
            fontSize: '2.5vw',
            fontWeight: vars.fontWeight.medium,
            textAlign: 'center',
            userSelect: 'none',
            width: '100%',
        },
        margin(em(10), 0)
    ],
    defaultVariants: {
        error: false
    },
    variants: {
        error: {
            'true': {
                color: vars.theme.common.warning
            }
        }
    },
});

const dialogClose = style([
    dialogStyles.dialogClose
]);

const dialogCloseIconBox = style([
    dialogStyles.dialogCloseIconBox
]);

const dialogCloseIcon = style([
    dialogStyles.dialogCloseIcon
]);

const dialogValidation = style({
    '@media': {
        ...mixins.media(['lg-down'], {
            fontSize: '14px',
        }),
    },
    color: theme.common.alert,
    fontSize: '1.3vw',
    minHeight: 36,
    textAlign: 'center',
});

const pinPad = style({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
});

const pinPadContainer = recipe({
    base: {
        color: vars.palette.black,
        direction: 'ltr',
        display: 'flex',
        flex: '0 1 auto',
        ...margin(6),
    },
    defaultVariants: {
        error: false
    },
    variants: {
        error: {
            'true': animation(['shake-it', '0.3s', 1, '0.3s'])
        }
    },
});

export const styles = {
    dialogClose,
    dialogCloseIcon,
    dialogCloseIconBox,
    dialogContent,
    dialogPaper,
    dialogStatus,
    dialogTitle,
    dialogValidation,
    pinPad,
    pinPadContainer
};
