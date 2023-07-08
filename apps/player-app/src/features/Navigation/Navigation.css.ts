/**
 * Module navigation styles.
 * @module src/features/Navigation/Navigation.css
 */
import { style } from '@vanilla-extract/css';
import { margin, padding, rem } from 'polished';

import { buttonStyles, dropdownMenuStyles, navLinkStyles, vars } from '@/shared/ui/styles';

const nav = style([
    {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    margin(0),
    padding(0)
]);

const navLinkBox = style({
    display: 'block',
    marginLeft: rem(4),
    whiteSpace: 'nowrap',
});

const navLink = style([
    navLinkStyles.link({
        color: 'primary'
    }),
    {
        fontSize: rem(20),
    }
]);

const navLinkText = style([
    navLinkStyles.text()
]);

const menu = style([
    dropdownMenuStyles.menu,
    {
        borderTop: `1px solid ${vars.palette.white}`,
        width: 160
    }
]);

const menuItem = style([
    dropdownMenuStyles.menuItem,
    {
        cursor: 'default',
        display: 'flex',
        fontSize: 13,
        height: 48,
        lineHeight: '24px',
        padding: rem(8),
        textAlign: 'center',
    }
]);

const menuItems = style([
    dropdownMenuStyles.menuItems,
]);

const menuItemLink = style([
    navLinkStyles.link(),
    {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        outline: 'none',
        padding: 'none',
        width: '100%',
    }
]);

const menuToggle = style([
    buttonStyles.button({
        color: 'secondary',
        custom: true,
        fill: 'none',
        rounded: true,
    }),
    {
        alignItems: 'center',
        display: 'flex',
        fontFamily: vars.fontFamily.regular,
        fontSize: rem(18),
        justifyContent: 'center',
        padding: rem(4),
    },
]);

const menuArrowFloating = style([
    dropdownMenuStyles.menuArrowFloating
]);

const menuArrowToggle = style([
    dropdownMenuStyles.menuArrowToggle
]);

export const styles = {
    menu,
    menuArrowFloating,
    menuArrowToggle,
    menuItem,
    menuItemLink,
    menuItems,
    menuToggle,
    nav,
    navLink,
    navLinkBox,
    navLinkText,
};
