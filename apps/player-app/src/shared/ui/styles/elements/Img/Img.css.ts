/**
 * Module contains Img classes.
 * @module src/shared/style/elements/Img/Img.css
 */
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '../../vars.css';

const imageBox = recipe({
    base: {
        display: 'grid',
        height: '100%',
        overflow: 'hidden',
        placeItems: 'center',
        position: 'relative',
        width: '100%',
    },
    variants: {
        rounded: {
            'true': { borderRadius: vars.borderRadius.rounded }
        }
    }
});

const image = style({
    height: 'auto',
    maxWidth: '100%',
});

export const styles = {
    image,
    imageBox,
};
