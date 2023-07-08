/**
 * Module contains style variables.
 * @module src/shared/ui/styles/vars.css
 */

import { createGlobalTheme } from '@vanilla-extract/css';
import { rem } from 'polished';

import { palette } from './palette.css';
import { theme } from './theme.css';

export const vars = createGlobalTheme(':root', {
    borderRadius: {
        '0x': rem(2),
        '1x': rem(3),
        '2x': rem(4),
        '3x': rem(5),
        '4x': rem(5),
        '5x': rem(6),
        full: '99999px',
        rounded: '50%',
    },
    fontFamily: {
        light: "'Netflix Sans Light', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        medium: "'Netflix Sans Medium', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        regular: "'Netflix Sans Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        thin: "'Netflix Sans Thin', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    fontWeight: {
        bold: '700',
        medium: '500',
        normal: '400',
        semiBold: '600',
        thin: '300',
    },
    height: {
        header: '42px',
        'headerDesktop': '68px'
    },
    palette,
    theme,
    transition: {
        callback: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
        scale: '100ms ease-out',
    },
    zIndex: {
        container: '100',
        content: '1',
        contentOverlay: '5',
        'default': '0',
        header: '10',
        overlay: '1000',
        underlay: '-1',
    },
});
