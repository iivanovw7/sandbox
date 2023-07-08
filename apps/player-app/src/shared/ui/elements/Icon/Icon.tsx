/**
 * Module contains SVG icon component.
 * @module src/shared/ui/elements/Icon/Icon
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import icons from 'virtual:svg-icons-names'; // eslint-disable-line import/no-unresolved

import { findOr } from '../../../utils';

export type IconProps = {
    class?: string;
    height?: number;
    iconClass?: string;
    name: string;
    ref?: Accessor<HTMLDivElement | undefined>;
    rotate?: number;
    size?: number;
    width?: number;
};

const PREFIX: Readonly<string> = 'icon';

/**
 * Gets icon file extension string.
 * @param {string} id - string representing file path.
 * @returns {string} string representing image file type.
 */
const getIcon = (id: string): string => {
    return findOr(
        `${PREFIX}-no-icon`,
        (val) => val === `${PREFIX}-${id}`,
        icons as string[]
    );
};

/**
 * Dynamically loads icon from assets.
 * @name src/shared/ui/elements/Icon
 * @method
 * @param {object} props - contains component props.
 * @returns Component with children.
 * @constructor
 */
export const Icon = (props: IconProps) => (
    <div
        ref={props.ref}
        class={props.class}
    >
        <svg aria-hidden="true" class={props.iconClass}>
            <use
                /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                // @ts-ignore
                fill="currentColor"
                href={`#${getIcon(props.name)}`}
            />
        </svg>
    </div>
);
