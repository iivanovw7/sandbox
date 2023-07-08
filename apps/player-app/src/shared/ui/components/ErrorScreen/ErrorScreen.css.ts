/**
 * Module contains ErrorScreen classes.
 * @module src/shared/ui/components/ErrorScreen/ErrorScreen.css
 */

import { style } from '@vanilla-extract/css';
import { em, padding } from 'polished';

import { buttonStyles, theme, vars } from '../../styles';

const title = style([
    {
        fontSize: '6em',
        marginBottom: '2vw',
        marginTop: 0,
        textAlign: 'center',
        textShadow: theme.shadow.text,
        zIndex: vars.zIndex.content,
    },
]);

const body = style({
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexFlow: 'column-wrap',
    margin: '0 auto',
    paddingBottom: em(8),
    width: '60vw',
    zIndex: vars.zIndex.content,
});

const message = style([
    {
        color: 'inherit',
        fontSize: em(34),
        fontWeight: vars.fontWeight.thin,
        marginTop: 0,
        textAlign: 'center',
        textShadow: theme.shadow.text,
        zIndex: vars.zIndex.content
    },
]);

const footer = style({
    alignItems: 'flex-end',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginTop: em(36),
    zIndex: vars.zIndex.content,
});

const code = style([
    {
        borderLeft: `2px solid ${theme.common.alert}`,
        fontFamily: vars.fontFamily.thin,
        fontSize: em(34),
        fontWeight: vars.fontWeight.thin,
    },
    padding('0', '1vw')
]);

const strong = style({
    color: 'inherit',
    fontFamily: vars.fontFamily.regular,
    fontWeight: vars.fontWeight.bold,
    textShadow: theme.shadow.text
});

const button = style([
    buttonStyles.button({
        color: 'secondary',
        fill: 'full',
        rounded: true
    })
]);

const buttonText = style([
    buttonStyles.buttonText({
        textAlign: 'center',
    }),
]);

export const styles = {
    body,
    button,
    buttonText,
    code,
    footer,
    message,
    strong,
    title,
};
