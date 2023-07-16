import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { ellipsis, margin, padding, position, rem, transitions } from 'polished';

import { iconStyles, mixins, theme, vars } from '@/shared/ui/styles';

const metaLayer = style([
    transitions(
        ['transform'],
        vars.transition.callback
    ),
    {
        width: '100%',
    }
]);

const info = style([
    position('absolute', 0, '4%', '20%'),
    {
        '@media': {
            ...mixins.media(['xs-down'], {
                ...position('absolute', 0, '4%', '5%')
            }),
            ...mixins.media(['xs-up', 'md-down'], {
                ...position('absolute', 0, '4%', '10%')
            }),
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '36%',
        zIndex: vars.zIndex['content-overlay']
    }
]);

const logo = style([
    {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: '1.2vw',
        minHeight: '13.2vw',
        position: 'relative',
        width: '90%',
    }
]);

const logoImage = style([
    {
        transformOrigin: 'bottom left',
        width: '100%',
    }
]);

const titleWrapper = recipe({
    base: [],
    defaultVariants: {
        isMetaFolded: false
    },
    variants: {
        isMetaFolded: {
            'false': {
                transformOrigin: 'left bottom 0px',
                transitionDelay: '0ms',
                transitionDuration: '1300ms',
            },
            'true': {
                transformOrigin: 'left bottom 0px',
                transitionDelay: '5000ms',
                transitionDuration: '1300ms'
            }
        }
    }
});

const supplementalMessage = style([
    margin(rem(16), 0),
    transitions(
        ['color'],
        vars.transition.callback
    ),
    {
        alignItems: 'center',
        color: theme.primary.text,
        display: 'flex',
        fontSize: '1.6vw',
        fontWeight: vars.fontWeight.bold,
        margin: '1vw 0',
        textShadow: theme.shadow['text-bold']
    }
]);

const supplementalIcon = style([
    iconStyles.icon,
    {
        display: 'flex',
        height: rem(36),
        marginRight: rem(6),
        textShadow: theme.shadow['text-bold'],
        width: rem(36),
    }
]);

const synopsisFadeContainer = style([
    padding(0),
    ellipsis('100%', 2),
    {
        color: theme.primary.text,
        fontSize: '1.2vw',
        lineHeight: 'normal',
        textShadow: theme.shadow['text-bold'],
        width: '100%',
    }
]);

const infoWrapper = recipe({
    base: [],
    defaultVariants: {
        isMetaFolded: false
    },
    variants: {
        isMetaFolded: {
            'false': {
                opacity: 1,
                transitionDelay: '0ms',
                transitionDuration: '1300ms'
            },
            'true': {
                opacity: 0,
                transitionDelay: '5000ms',
                transitionDuration: '1300ms'
            }
        }
    }
});

const infoWrapperFade = recipe({
    base: [],
    defaultVariants: {
        isMetaFolded: false
    },
    variants: {
        isMetaFolded: {
            'false': {
                opacity: 1,
                transitionDelay: '200ms',
                transitionDuration: '600ms',
            },
            'true': {
                opacity: 0,
                transitionDelay: '5000ms',
                transitionDuration: '500ms'
            }
        }
    }
});

export const styles = {
    info,
    infoWrapper,
    infoWrapperFade,
    logo,
    logoImage,
    metaLayer,
    supplementalIcon,
    supplementalMessage,
    synopsisFadeContainer,
    titleWrapper,
};
