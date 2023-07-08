/**
 * Module header menu styles.
 * @module src/features/Menu/Menu.css.ts
 */
import { style } from '@vanilla-extract/css';
import { em, margin, padding, rem } from 'polished';

import {
    buttonStyles,
    dropdownMenuStyles,
    iconStyles,
    imgStyles,
    linkStyles,
    theme,
    vars
} from '@/shared/ui/styles';

const menu = style([
    dropdownMenuStyles.menu,
    {
        width: 220
    }
]);

const menuItem = style([
    dropdownMenuStyles.menuItemBox,
    {
        selectors: {
            '&:last-child': {
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }
        }
    }
]);

const menuItems = style([
    dropdownMenuStyles.menuItems
]);

const menuItemLink = style([
    dropdownMenuStyles.menuItemLink,
    linkStyles.link({
        color: 'secondary',
        icon: true,
        underline: 'hover',
    }),
]);

const menuLinkText = style([
    linkStyles.linkText(),
    {
        width: '100%'
    }
]);

const menuItemLinkImage = style([
    linkStyles.linkImage(),
    imgStyles.image,
    {
        marginLeft: 0
    }
]);

const menuLinkIconBox = style([
    iconStyles.icon,
    {
        color: theme.tertiary['link-text'],
        height: 24,
        width: 24,
    }
]);

const menuLinkIcon = style([
    {
        height: 16,
        width: 16
    }
]);

const menuItemLinkImageBox = style([
    linkStyles.linkImage({
        position: 'start'
    }),
    imgStyles.imageBox(),
    {
        borderRadius: vars.borderRadius['3x'],
        height: 30,
        maxWidth: 30,
    }
]);

const menuItemLinkIcon = style([
    {
        height: 24,
        width: 24
    }
]);

const menuItemLinkIconBox = style([
    linkStyles.linkImage({
        position: 'start'
    }),
    imgStyles.imageBox(),
    margin(0, em(6)),
    {
        borderRadius: vars.borderRadius['3x'],
        height: 24,
        maxWidth: 24,
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
        marginLeft: rem(20),
        padding: 0,
        width: 'auto',
    },
]);

const menuAvatar = style([
    imgStyles.imageBox(),
    {
        borderRadius: vars.borderRadius['2x']
    }
]);

const menuAvatarImage = style([
    imgStyles.image,
]);

const menuLogout = style([
    dropdownMenuStyles.menuItemLink,
    linkStyles.link({
        align: 'center',
        color: 'secondary',
        underline: 'hover',
    }),
    padding(rem(6), rem(8))
]);

const menuDivider = style([
    dropdownMenuStyles.menuItemDivider,
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
    menuAvatar,
    menuAvatarImage,
    menuDivider,
    menuItem,
    menuItemLink,
    menuItemLinkIcon,
    menuItemLinkIconBox,
    menuItemLinkImage,
    menuItemLinkImageBox,
    menuItems,
    menuLinkIcon,
    menuLinkIconBox,
    menuLinkText,
    menuLogout,
    menuToggle,
};
