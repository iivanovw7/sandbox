/**
 * Module contains profiles styles.
 * @module src/features/Profiles/Profiles.css.ts
 */

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { animation, margin, padding, position, rem } from 'polished';

import { buttonStyles, mixins, theme, vars } from '@/shared/ui/styles';

const page = style({
    width: '100%',
});

const pageContent = style([
    {
        alignItems: 'center',
        color: theme.primary.text,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        left: 0,
        overflow: 'hidden',
        textAlign: 'center',
        zIndex: vars.zIndex.default,
    },
    position('absolute', 0, 0),
    padding(0, '4%'),
]);

const pageContainer = recipe({
    base: {
        ...position('absolute', 0, 0, 0, 0),
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: 0,
        textAlign: 'center',
        zIndex: vars.zIndex.container,
    },
    variants: {
        loaded: {
            'true': {
                ...animation([
                    'profile-gate',
                    '0.45s',
                    'ease',
                    1,
                    'normal',
                    'forwards'
                ])
            }
        }
    }
});

const pageBox = style({
    maxWidth: '80%',
    textAlign: 'center'
});

const pageBoxTitle = style([
    {
        '@media': {
            ...mixins.media(['md-down'], {
                fontSize: '30px',
            }),
        },
        color: 'inherit',
        fontFamily: vars.fontFamily.regular,
        fontSize: '3.5vw',
        fontWeight: vars.fontWeight.thin,
        userSelect: 'none',
        width: '100%',
    },
    margin(rem(16), 0),
]);

const pageBoxList = style({
    listStyleType: 'none',
    padding: 0,
    textAlign: 'center',
});

const pageBoxFooter = style({
    ...padding(rem(24), rem(8), rem(8)),
    display: 'inline-block',
});

const pageButton = style([
    buttonStyles.button({
        color: 'tertiary',
        fill: 'outlined'
    })
]);

const pageButtonText = style([
    buttonStyles.buttonText({
        textAlign: 'center',
    })
]);

export const styles = {
    page,
    pageBox,
    pageBoxFooter,
    pageBoxList,
    pageBoxTitle,
    pageButton,
    pageButtonText,
    pageContainer,
    pageContent,
};
