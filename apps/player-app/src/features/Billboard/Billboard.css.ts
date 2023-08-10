/**
 * Module contains trending billboard styles.
 * @module src/features/Billboard/Billboard.css.ts
 */
import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { position, transitions } from 'polished';

import { theme, vars } from '@/shared/ui/styles';

const poster = createVar();

const container = style([
    {
        display: 'display',
        position: 'relative',
        zIndex: vars.zIndex.content,
    }
]);

const row = style([
    position('relative', 0, 0, 0, 0),
    {
        backgroundColor: theme.background.content,
        marginBottom: 20,
        paddingBottom: '40%',
        touchAction: 'pan-y',
        userSelect: 'none',
    }
]);

const pane = style({
    background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), ${poster} 50% 50% / cover no-repeat`,
    backgroundColor: theme.background.content,
    height: '44.25vw',
    position: 'absolute',
    width: '100%',
    zIndex: vars.zIndex.default,
});

const player = recipe({
    base: [
        {
            opacity: 0
        },
        transitions(
            ['opacity'],
            vars.transition.callback
        ),
    ],
    defaultVariants: {
        isMetaFolded: false
    },
    variants: {
        isMetaFolded: {
            'true': {
                opacity: 1
            }
        }
    }
});

const video = style([
    {
        height: '100%',
        width: '100%'
    }
]);

const fillContainer = style([
    position('absolute', 0, 0, 0, 0),
    {
        height: '100%',
        width: '100%'
    }
]);

export const variables = {
    poster
};

export const styles = {
    container,
    fillContainer,
    pane,
    player,
    row,
    video,
};
