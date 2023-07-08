/**
 * Module contains plain button component.
 * @module src/shared/ui/elements/Button/Button
 */

import type { Maybe } from '@sandbox/types';

import { Icon, type IconProps } from '../Icon';

type ButtonAttributes = 'id'
| 'name'
| 'onKeyDown'
| 'onMouseEnter'
| 'onMouseLeave'
| 'style'
| 'title'
| 'type';

export type ButtonProps = {
    children?: JSXElement | JSXElement[];
    class?: string;
    customIcon?: JSXElement;
    dataId?: number | string;
    disabled?: boolean;
    icon?: IconProps;
    iconClass?: string;
    isLoading?: boolean;
    loaderClass?: string;
    onClick?: (eventData: MouseEvent) => void;
    setRef?: Accessor<Maybe<HTMLButtonElement>>,
    style?: JSX.CSSProperties;
    text?: JSXElement,
    textClass?: string;
    /** @default 'button' */
    type?: 'button' | 'reset' | 'submit';
} & Pick<JSX.HTMLElementTags['button'], ButtonAttributes>;

/**
 * Creates `Button` component.
 * @constructor
 * @name src/shared/ui/elements/Button
 * @method
 * @param {ButtonProps} props - contains component props.
 * @returns Component with children.
 */
export const Button = (props: ButtonProps) => {
    /**
     *  If button has text.
     *  @returns {boolean} hasText flag.
     */
    const hasText = () => Boolean(props.text) || props.text === 0;

    return (
        <button
            id={props.id}
            ref={props.setRef}
            class={props.class}
            data-id={props.dataId}
            disabled={props.disabled}
            name={props.name}
            style={props.style}
            title={props.title}
            type={props.type}
            onClick={(eventData) => props.onClick?.(eventData)}
        >
            <Show fallback={<span class={props.loaderClass} />} when={! props.isLoading}>
                {props.children}
                {hasText() && (
                    <div class={props.textClass}>
                        {props.text}
                    </div>
                )}
            </Show>
            {props?.customIcon || (props.icon && <Icon {...props.icon} />)}
        </button>
    );
};
