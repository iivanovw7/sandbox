/**
 * Module contains profile styles.
 * @module src/features/Profiles/ui/Profile/Profile.css
 */
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { margin, rem, transitions } from 'polished';

import { iconStyles, linkStyles, mixins, theme, vars } from '@/shared/ui/styles';

const profile = recipe({
    base: {
        ...margin(0, 0, rem(4), 0),
        display: 'inline-block',
        maxWidth: 200,
        minWidth: 84,
        paddingBottom: rem(2),
        position: 'relative',
        selectors: {
            '&:not(&:last-of-type)': {
                ...margin(0, '2vw', rem(8), 0)
            }
        },
        verticalAlign: 'top',
        width: '10vw',
    },
    variants: {
        locked: {
            'true': {
                paddingBottom: 0
            }
        }
    }
});

const profileLink = style([
    linkStyles.link({
        color: 'tertiary'
    }),
    {
        selectors: {
            '&:hover': {
                cursor: 'pointer'
            },
        }
    }
]);

const profileImageBox = style({
    display: 'flex',
});

const profileImage = style({
    ...transitions(
        ['color', 'border-color'],
        vars.transition.callback
    ),
    border: '2px solid transparent',
    borderRadius: vars.borderRadius['3x'],
    selectors: {
        [`${profileLink}:focus-visible &`]: {
            borderColor: vars.palette.white
        },
        [`${profileLink}:hover &`]: {
            borderColor: vars.palette.white
        }
    },
    width: '100%',
});

const profileIconBox = style([
    iconStyles.icon,
    {
        color: theme.tertiary.linkText,
        height: rem(24),
        width: '100%',
    }
]);

const profileIcon = style([
    {
        height: rem(24),
        width: rem(24)
    }
]);

const profileName = style([
    {
        '@media': {
            ...mixins.media(['lg-down'], {
                fontSize: '12px',
            }),
        },
        display: 'block',
        fontSize: '1.3vw',
        minHeight: rem(6),
        selectors: {
            [`${profileLink}:focus-visible &`]: {
                color: vars.palette.white
            },
            [`${profileLink}:hover &`]: {
                color: vars.palette.white
            }
        },
        textAlign: 'center',
    },
    margin(rem(6), 0),
    transitions(
        ['color', 'border-color'],
        vars.transition.callback
    ),
]);

export const styles = {
    profile,
    profileIcon,
    profileIconBox,
    profileImage,
    profileImageBox,
    profileLink,
    profileName
};
