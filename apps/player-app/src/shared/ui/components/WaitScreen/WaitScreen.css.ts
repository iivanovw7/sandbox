/**
 * Module contains wait screen component styles.
 * @module src/shared/ui/components/WaitScreen/WaitScreen.css
 */

import { style } from '@vanilla-extract/css';

import { imgStyles, mixins, spinnerStyles, theme, vars } from '../../styles';

const overlay = style({
    background: theme.background.overlayDark,
    zIndex: vars.zIndex.overlay
});

const spinner = style([
    spinnerStyles.spinner({
        color: 'primary'
    })
]);

const spinnerContainer = style([
    mixins.centerAbsolute(),
    {
        transform: 'translate(-50%, -50%) scale(0.8)'
    }
]);

const spinnerPath = style({
    fill: theme.common.primary
});

const avatar = style([
    imgStyles.imageBox(),
    {
        borderRadius: vars.borderRadius['2x'],
        height: 56,
        maxWidth: 56,
    },
    mixins.centerAbsolute()
]);

const avatarImage = style([
    imgStyles.image
]);

export const styles = {
    avatar,
    avatarImage,
    overlay,
    spinner,
    spinnerContainer,
    spinnerPath,
};
