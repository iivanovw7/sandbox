/**
 * Module contains DropdownMenu base classes.
 * @module src/shared/style/elements/DropdownMenu.css
 */

import { globalStyle, style } from '@vanilla-extract/css';
import { margin, padding, rem, transitions, triangle } from 'polished';

import { theme } from '../../theme.css';
import { vars } from '../../vars.css';

const menu = style({
    background: theme.background.dropdown,
    border: `1px solid ${theme.border}`,
    boxSizing: 'content-box',
    outline: 'none',
    width: '100%',
    zIndex: vars.zIndex.overlay,
});

const menuArrowFloating = style({
    backgroundColor: 'transparent',
    fill: 'transparent',
    pointerEvents: 'none',
    stroke: 'none',
    zIndex: -1,
});

globalStyle(`${menuArrowFloating} path:first-of-type`, {
    stroke: 'none',
});

globalStyle(`${menuArrowFloating} path:last-of-type`, {
    fill: theme.background.contentAccent,
});

const menuArrowToggle = style({
    ...triangle({
        foregroundColor: theme.background.contentAccent,
        height: '6px',
        pointingDirection: 'top',
        width: '10px',
    }),
    ...transitions(
        ['transform'],
        vars.transition.callback
    ),
    height: 0,
    marginLeft: rem(8),
    width: 0,
});

const menuItemBox = style([
    {
        fontSize: 13,
        minHeight: 48,
    },
    padding(rem(8), rem(6)),
]);

const menuItem = style({
    boxSizing: 'border-box',
    flexShrink: 0,
    width: '100%',
});

const menuItemLink = style([
    {
        boxSizing: 'border-box',
        flexShrink: 0,
        width: '100%',
    },
    padding(0, rem(8)),
]);

const menuItemDivider = style([
    {
        backgroundColor: theme.divider,
        border: 'none',
        display: 'block',
        height: 1,
        width: '100%',
    },
    margin(rem(4), 0)
]);

const menuItems = style([
    {
        backgroundColor: theme.background.dropdown,
        display: 'flex',
        flexDirection: 'column',
        listStyleType: 'none',
        maxHeight: '100vh',
        overflow: 'hidden auto',
        transformOrigin: 'center top',
        width: '100%',
    },
    padding(rem(12), 0),
    margin(0)
]);

export const styles = {
    menu,
    menuArrowFloating,
    menuArrowToggle,
    menuItem,
    menuItemBox,
    menuItemDivider,
    menuItemLink,
    menuItems
};
