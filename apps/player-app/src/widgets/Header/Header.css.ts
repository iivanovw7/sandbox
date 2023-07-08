/**
 * Module contains Header component styles.
 * @module src/widgets/Header/Header.css
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { padding, position, rem } from 'polished';

import { imgStyles, mixins, theme, vars } from '@/shared/ui/styles';

const header = recipe({
    base: [
        {
            '@media': {
                ...mixins.media(['lg-down'], {
                    height: vars.height.header,
                }),
            },
            alignItems: 'center',
            background: theme.background.header,
            bottom: 'unset',
            color: theme.primary.text,
            display: 'flex',
            flexDirection: 'row',
            height: vars.height.headerDesktop,
            justifyContent: 'space-between',
            left: 0,
            width: '100vw',
            zIndex: vars.zIndex.header,
        },
        padding(0, '4%'),
        position('fixed', 0, 0),
    ],
    defaultVariants: {
        isEmpty: false
    },
    variants: {
        isEmpty: {
            'true': {
                '@media': {
                    ...mixins.media(['lg-down'], {
                        height: vars.height.headerDesktop,
                    }),
                },
                background: theme.background.headerSolid,
                height: vars.height.headerDesktop,
            }
        }
    },
});

const section = style({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
});

const logo = recipe({
    base: [
        imgStyles.imageBox(),
        {
            marginRight: rem(18)
        }
    ],
    defaultVariants: {
        isEmpty: false
    },
    variants: {
        isEmpty: {
            'true': {
                height: 28,
                width: 96,
            }
        }
    }
});

const logoImage = recipe({
    base: [
        imgStyles.image
    ],
    defaultVariants: {
        isEmpty: false
    },
    variants: {
        isEmpty: {
            'false': {
                height: '1.8em',
            }
        }
    }
});

export const styles = {
    header,
    logo,
    logoImage,
    section,
};
