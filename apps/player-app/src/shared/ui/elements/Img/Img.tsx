/**
 * Module renders an image with parameters.
 * @module src/shared/ui/elements/Img/Img
 */

import fallback from '../../../../../assets/img/placeholder-square.png';
import { isNumber } from '../../../utils';

export type ImageLoadEventData = Event & {
    currentTarget: HTMLImageElement,
    target: Element
};

export type ImgProps = {
    alt: string;
    class?: string;
    dataId?: number | string;
    height?: number | string;
    imageClass?: string;
    keepSize?: boolean;
    maxWidth?: number | string;
    noFallback?: boolean;
    onLoad?: (eventData: ImageLoadEventData) => void;
    ref?: Accessor<HTMLImageElement | undefined>;
    size?: number | string;
    src?: string;
    width?: number | string;
};

/**
 * Creates image component.
 * @name src/shared/ui/elements/Img
 * @method
 * @param {object} props - contains component props.
 * @returns Component with children.
 * @constructor
 */
export const Img = (props: ImgProps) => {
    /**
     *  Image width prop.
     *  @returns {Maybe<number>} width prop.
     */
    const width = () => props.width || props.size;

    /**
     *  Image height prop.
     *  @returns {Maybe<number>} height prop.
     */
    const height = () => props.height || props.size;

    /**
     *  Image maxWidth prop.
     *  @returns {Maybe<number>} maxWidth prop.
     */
    const maxWidth = () => props.maxWidth ?? width();

    /**
     * Error handler.
     * @param {Object} eventData - event error data.
     */
    const handleError = (eventData) => {
        const { currentTarget } = eventData;

        currentTarget.onerror = null;

        if (! props.noFallback) {
            currentTarget.src = fallback;
        }
    };

    return (
        <div
            class={props.class}
            style={{
                ...(maxWidth() && {
                    'max-width': `${String(height())}px`,
                }),
                ...(props.keepSize && {
                    height: `${String(height())}px`,
                    width: `${String(width())}px`,
                }),
                ...(isNumber(width()) && isNumber(height()) && {
                    '--aspect-ratio': Number(width()) / Number(height())
                })
            }}
        >
            <img
                ref={props.ref}
                alt={props.alt}
                class={props.imageClass}
                data-id={props.dataId}
                loading="lazy"
                src={props.src}
                onError={(e) => handleError(e)}
                onLoad={(e) => props.onLoad?.(e)}
            />
        </div>
    );
};
