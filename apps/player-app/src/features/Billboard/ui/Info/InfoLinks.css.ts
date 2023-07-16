import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { padding, rem } from 'polished';

import { buttonStyles } from '@/shared/ui/styles';

const billboardLinks = style([
    {
        display: 'flex',
        gap: 8,
        lineHeight: '88%',
        marginTop: '1.5vw',
        whiteSpace: 'nowrap'
    }
]);

const button = recipe({
    base: [
        buttonStyles.button({
            color: 'secondary',
            fill: 'full',
            rounded: true,
        }),
        padding(rem(12), rem(24)),
        {
            appearance: 'none',
            border: 'none',
            fontSize: '1.5vw',
            gap: 8
        }
    ],
    defaultVariants: {
        info: false
    },
    variants: {
        info: {
            'true': [
                buttonStyles.button({
                    color: 'tertiary',
                    fill: 'full',
                    rounded: true,
                })
            ]
        }
    }
});

const buttonText = style([
    buttonStyles.buttonText({
        textAlign: 'center',
    }),
    {
        fontSize: rem(24),
        lineHeight: rem(24),
        margin: 0,
    }
]);

const buttonIcon = style({
    display: 'flex'
});

globalStyle(`${buttonIcon} > svg`, {
    height: rem(28),
    margin: '0 auto',
    width: rem(28),
});

export const styles = {
    billboardLinks,
    button,
    buttonIcon,
    buttonText,
};
