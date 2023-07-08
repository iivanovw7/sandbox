/**
 * Module contains styles for `Page` page.
 * @module src/shared/ui/components/Page/ui/Content/Content
 */
import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { commonStyles, theme } from '../../../../styles';

const backgroundUrl = createVar();

const content = recipe({
    base: [
        commonStyles.fullScreenBoxContent,
        {
            '::after': {
                backgroundAttachment: 'fixed',
                backgroundImage: backgroundUrl,
                backgroundPosition: '50%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            },
            '::before': {
                background: theme.background.backdropShadow,
            },
            display: 'flex',
            flex: '2 0',
            flexDirection: 'column',
            margin: '0 1em',
            position: 'relative',
            textAlign: 'center',
            userSelect: 'none',
        }
    ],
    defaultVariants: {
        type: 'ERROR',
    },
    variants: {
        type: {
            'ERROR': {},
            'NOT_FOUND': {},
        }
    }
});

export const variables = {
    backgroundUrl
};

export const styles = {
    content,
};
