/**
 * Module contains common styles.
 * @module src/shared/ui/styles/elements/common.css
 */

import { style } from '@vanilla-extract/css';
import { position } from 'polished';

import { theme } from '../theme.css';
import { vars } from '../vars.css';

const container = style({
    ...position('absolute', 0, 0, 0, 0),
    display: 'flex',
    flexDirection: 'column',
    zIndex: 'container',
});

const fullScreenBox = style([
    container,
    {
        '::after': {
            content: '',
            display: 'flex',
            flex: 1,
            maxHeight: '25%',
        },
        '::before': {
            content: '',
            display: 'flex',
            flex: 1,
            maxHeight: '25%',
        },
        background: theme.background.overlay,
        color: theme.primary.text,
        flexFlow: 'column nowrap',
        overflow: 'hidden',
        paddingTop: vars.height.header,
        position: 'fixed',
    }
]);

const fullScreenBoxContent = style([
    {
        '::after': {
            ...position('fixed', 0, 0, 0, 0),
            content: '',
            zIndex: vars.zIndex.underlay,
        },
        '::before': {
            ...position('absolute', '-10vw', '10vw', '-10vw', '10vw'),
            content: '',
            zIndex: vars.zIndex.default
        },
        flex: '2 0',
        margin: '0 1em',
        position: 'relative',
        userSelect: 'none',
    }
]);

export const styles = {
    container,
    fullScreenBox,
    fullScreenBoxContent
};
