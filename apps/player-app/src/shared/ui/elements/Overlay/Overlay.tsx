/**
 * Module contains `Overlay` element.
 * @module src/shared/ui/elements/Overlay/Overlay
 */

import { env, getPlatform } from '../../../utils';

export type OverlayProps = {
    children?: JSXElement | JSXElement[];
    class?: string;
    lockScroll?: boolean;
    ref?: Accessor<HTMLDivElement | undefined>;
};

const IDENTIFIER = 'data-scroll-lock';

/**
 * Provides base styling for a fixed overlay element.
 * @constructor
 * @param {OverlayProps} props - component properties.
 * @returns overlay element.
 */
export const Overlay = (props: OverlayProps) => {
    /**
     *  Scrollbar `X`.
     *  @returns {number} size.
     */
    const scrollbarX = () => {
        return Math.round(env.html.getBoundingClientRect().left) + env.html.scrollLeft;
    };

    createEffect(() => {
        if (! props.lockScroll) {
            return;
        }

        const alreadyLocked = document.body.hasAttribute(IDENTIFIER);

        if (alreadyLocked) {
            return;
        }

        document.body.setAttribute(IDENTIFIER, '');

        const paddingProp = scrollbarX()
            ? 'padding-left'
            : 'padding-right';

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        if (! /iP(hone|ad|od)|iOS/.test(getPlatform())) {
            Object.assign(document.body.style, {
                overflow: 'hidden',
                [paddingProp]: `${scrollbarWidth}px`,
            });
        }

        const offsetLeft = window.visualViewport?.offsetLeft || 0;
        const offsetTop = window.visualViewport?.offsetTop || 0;
        const { pageXOffset: xOffset, pageYOffset: yOffset } = window;

        Object.assign(document.body.style, {
            left: `${-(xOffset - Math.floor(offsetLeft))}px`,
            overflow: 'hidden',
            'padding-prop': `${scrollbarWidth}px`,
            position: 'fixed',
            right: '0',
            top: `${-(yOffset - Math.floor(offsetTop))}px`,
        });

        onCleanup(() => {
            if (! /iP(hone|ad|od)|iOS/.test(getPlatform())) {
                document.body.removeAttribute(IDENTIFIER);

                Object.assign(document.body.style, {
                    overflow: '',
                    [paddingProp]: '',
                });
            }

            Object.assign(document.body.style, {
                left: '',
                overflow: '',
                'padding-prop': '',
                position: '',
                right: '',
                top: '',
            });

            document.body.removeAttribute(IDENTIFIER);

            window.scrollTo(pageXOffset, pageYOffset);
        });
    });

    return (
        <div
            {...props}
            style={{
                bottom: 0,
                left: 0,
                overflow: 'auto',
                position: 'fixed',
                right: 0,
                top: 0,
            }}
        />
    );
};
