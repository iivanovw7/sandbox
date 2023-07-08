/**
 * Module login FormFooter styles.
 * @module src/features/Login/ui/FormField/FormFooter.css.ts
 */
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { em, transitions } from 'polished';

import { linkStyles, theme, vars } from '@/shared/ui/styles';

const footer = style([
    {
        color: theme.tertiary.text,
        display: 'block',
        fontSize: 16,
    }
]);

const footerSignup = style([
    {
        marginTop: em(12)
    }
]);

const footerSignupLink = style([
    linkStyles.link({
        color: 'secondary',
        noHoverAccent: false,
        underline: 'hover',
    }),
    {
        marginLeft: em(8)
    }
]);

const footerLink = recipe({
    base: [
        transitions(
            ['opacity', 'visibility'],
            vars.transition.callback
        ),
        linkStyles.link({
            color: 'secondary',
            noHoverAccent: false,
            underline: 'hover',
        }),
        {
            display: 'inline-block',
            lineHeight: '16px',
            marginLeft: em(4),
            opacity: 1
        }
    ],
    defaultVariants: {
        showMore: false
    },
    variants: {
        showMore: {
            'true': {
                opacity: 0,
                visibility: 'hidden',
            }
        }
    },
});

const footerTermsOfUse = style([
    {
        color: theme.tertiary.text,
        fontSize: 14,
        marginTop: em(8),
    }
]);

const footerTermsOfUseMore = recipe({
    base: [
        transitions(
            ['opacity', 'visibility'],
            vars.transition.callback
        ),
        {
            fontSize: 13,
            letterSpacing: 0,
            marginTop: em(8),
            opacity: 0,
            textAlign: 'left',
            visibility: 'hidden',
        }
    ],
    defaultVariants: {
        showMore: false
    },
    variants: {
        showMore: {
            'true': {
                opacity: 1,
                visibility: 'visible',
            }
        }
    },
});

export const styles = {
    footer,
    footerLink,
    footerSignup,
    footerSignupLink,
    footerTermsOfUse,
    footerTermsOfUseMore
};

