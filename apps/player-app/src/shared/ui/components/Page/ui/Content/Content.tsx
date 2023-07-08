/**
 * Module contains PageContent component.
 * @module src/shared/ui/components/Page/ui/Content/Content
 */
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { always, cond, equals } from 'ramda';

import { styles, variables } from './Content.css';

export type ContentProps = {
    children?: JSXElement;
    type: ContentType;
};

export const ContentType = {
    ERROR: 'ERROR',
    NOT_FOUND: 'NOT_FOUND',
} as const;

export type ContentType = typeof ContentType[keyof typeof ContentType];

const background = cond([
    [equals<ContentType>(ContentType.NOT_FOUND), always('bg-lost-in-space.png')],
    [equals<ContentType>(ContentType.ERROR), always('bg-mindhunter-v2.png')]
]);

/**
 * PageContent component.
 * @method
 * @name src/shared/ui/components/Page/ui/Content/Content
 * @param {ContentProps} props - represents component properties.
 * @constructor
 * @returns Component with children.
 */
export const Content = (props: ContentProps) => (
    <div
        class={styles.content({ type: props.type })}
        style={assignInlineVars({
            [variables.backgroundUrl]: `url("../../../../assets/img/${background(props.type)}")`
        })}
    >
        {props.children}
    </div>
);
