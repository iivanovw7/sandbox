/**
 * Module contains global styles.
 * @module src/shared/ui/styles/global.css
 */
import { globalKeyframes, globalStyle } from '@vanilla-extract/css';
import { rem, transitions } from 'polished';

import { mixins } from './mixins';
import { theme } from './theme.css';
import { vars } from './vars.css';

globalStyle('*, *::before, *::after', {
    boxSizing: 'border-box',
});

globalStyle('body', {
    backgroundColor: `var(--background-global-color, ${vars.palette.black})`,
    fontFamily: vars.fontFamily.regular,
    fontWeight: vars.fontWeight.normal,
    margin: 0,
    minHeight: '100vh',
    ...transitions(
        ['background-color'],
        vars.transition.callback
    ),
});

globalStyle('html::-webkit-scrollbar', {
    height: rem(6),
    width: rem(6),
});

globalStyle('html::-webkit-scrollbar-track', {
    backgroundColor: theme.background.content,
});

globalStyle('html::-webkit-scrollbar-thumb', {
    backgroundColor: theme.primary.button,
});

globalStyle('html::-webkit-scrollbar-corner', {
    backgroundColor: theme.primary.button,
});

globalStyle('html', {
    '@media': {
        ...mixins.media(['sm-down', 'vertical'], {
            fontSize: '1.5vw',
        }),
        ...mixins.media(['sm-up', 'md-down', 'vertical'], {
            fontSize: '1vw',
        }),
        ...mixins.media(['md-up', 'xl-down', 'vertical'], {
            fontSize: '0.75vw',
        }),
        ...mixins.media(['xl-up', 'xxl-down', 'vertical'], {
            fontSize: '0.75vw',
        }),
        ...mixins.media(['xxl-up', 'vertical'], {
            fontSize: '14px',
        }),
        ...mixins.media(['sm-down', 'landscape'], {
            fontSize: '1.5vw',
        }),
        ...mixins.media(['sm-up', 'sm-down', 'landscape'], {
            fontSize: '1.2vw',
        }),
        ...mixins.media(['md-up', 'xxl-down', 'landscape'], {
            fontSize: '0.85vw',
        }),
        ...mixins.media(['xxl-up', 'xxl-down', 'landscape'], {
            fontSize: '0.75vw',
        }),
        ...mixins.media(['xxl-up', 'landscape'], {
            fontSize: '14px',
        })
    },
    fontFamily: vars.fontFamily.regular,
    fontWeight: vars.fontWeight.normal,
    scrollbarColor: `${theme.background.content} ${theme.tertiary.button}`,
});

globalKeyframes('profile-gate', {
    '0%': {
        opacity: 0,
        transform: 'scale(1.1)',
    },
    '100%': {
        opacity: 1,
        transform: 'scale(1)',
    },
});

globalKeyframes('fade-in', {
    '0%': {
        opacity: 0
    },
    '100%': {
        opacity: 1
    },
});

globalKeyframes('fade-out', {
    '0%': {
        opacity: 1
    },
    '100%': {
        opacity: 0
    },
});

globalKeyframes('shake-it', {
    '0%': {
        transform: 'translateX(-4em)'
    },
    '25%': {
        transform: 'translateX(4em)'
    },
    '50%': {
        transform: 'translateX(-4em)'
    },
    '100%': {
        transform: 'translateX(0)'
    },
});

globalKeyframes('rotation', {
    '0%': {
        transform: 'rotate(0deg)'
    },
    '100%': {
        transform: 'rotate(360deg)'
    },
});
