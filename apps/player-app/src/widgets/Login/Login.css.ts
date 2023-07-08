/**
 * Module login menu styles.
 * @module src/features/Login/Login.css.ts
 */
import { style } from '@vanilla-extract/css';
import { em, margin, padding, position } from 'polished';

import { imgStyles, linkStyles, mixins, theme, vars } from '@/shared/ui/styles';

const page = style([
    {
        backgroundColor: vars.palette.black,
        margin: 0,
        minHeight: '100%',
        padding: 0,
        position: 'relative',
        zIndex: vars.zIndex.default,
    }
]);

const background = style([
    {
        '@media': {
            ...mixins.media(['md-up'], {
                backgroundImage: 'url("../../../assets/img/bg_alpha.jpg")',
                display: 'block',
                height: '100%',
                minHeight: '100vh',
                opacity: 0.5,
                overflow: 'hidden',
                position: 'absolute',
                width: '100%',
                zIndex: vars.zIndex.underlay,
            }),
        },
    }
]);

const header = style([
    {
        '@media': {
            ...mixins.media(['md-up'], {
                ...position('absolute', 0, 0, 0, 0),
                background: 'transparent',
            }),
        },
        background: theme.background.overlay,
        borderBottom: 'transparent',
        height: 90,
        width: '100%',
    }
]);

const body = style([
    {
        '@media': {
            ...mixins.media(['md-up'], {
                '::after': {
                    content: '',
                    display: 'block',
                    height: 236
                },
                '::before': {
                    content: '',
                    display: 'block',
                    height: 91
                },
                backgroundColor: 'transparent',
                display: 'block',
                margin: '0 auto -236px',
                maxWidth: 450,
                minHeight: '100vh',
            }),
        },
        boxSizing: 'content-box',
        padding: '0 5%',
    }
]);

const divider = style([
    {
        '@media': {
            ...mixins.media(['md-up'], {
                display: 'none'
            })
        },
        borderColor: theme.border,
        borderTop: '1px solid',
        display: 'block',
        height: 1,
        width: '100%'
    }
]);

const footer = style([
    padding(30, 0),
    {
        '@media': {
            ...mixins.media(['md-up'], {
                maxWidth: 1000
            })
        },
        display: 'block',
        fontSize: '16px',
        margin: '0 auto',
        width: '90%'
    }
]);

const footerLinks = style([
    {
        display: 'block',
        listStyleType: 'none',
        margin: 0,
        maxWidth: 1000,
        padding: 0,
    }
]);

const footerLink = style([
    linkStyles.link({
        color: 'tertiary',
        noHoverAccent: false,
        underline: 'hover',
    })
]);

const footerLinkItem = style([
    padding(0, 12, 0, 0),
    {
        display: 'inline-block',
        listStyle: 'none',
        marginBottom: em(16),
        marginLeft: 0,
        minWidth: 100,
        verticalAlign: 'top',
        width: '50%'
    }
]);

const footerLinkText = style([
    linkStyles.linkText(),
    {
        fontSize: em(13)
    }
]);

const footerTop = style([
    margin(0, 0, 30),
    {
        fontSize: em(16),
        padding: 0
    }
]);

const footerWrapper = style([
    {
        backgroundColor: theme.background.overlay,
        color: theme.tertiary.text,
        fontSize: em(16),
        height: 236,
        marginTop: 0,
        minWidth: 190,
        paddingBottom: 20,
        position: 'relative',
        width: '100%',
    }
]);

const title = style([
    {
        color: theme.primary.text,
        fontFamily: vars.fontFamily.medium,
        fontSize: '32px',
        fontWeight: vars.fontWeight.medium,
    }
]);

const logo = style([
    imgStyles.imageBox(),
    {
        marginLeft: em(48),
        width: 'fit-content'
    }
]);

const logoImage = style([
    imgStyles.image
]);

export const styles = {
    background,
    body,
    divider,
    footer,
    footerLink,
    footerLinkItem,
    footerLinkText,
    footerLinks,
    footerTop,
    footerWrapper,
    header,
    logo,
    logoImage,
    page,
    title,
};
