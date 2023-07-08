/**
 * Module contains `Link` and `LinkButton` elements.
 * @module src/shared/ui/elements/Link/Link
 */
import { Icon, type IconProps } from '../Icon';
import { Img, type ImgProps } from '../Img';

export type LinkProps = {
    children?: JSXElement | JSXElement[];
    class?: string;
    dataActive?: boolean;
    dataId?: string;
    /** @default "false" */
    disabled?: boolean;
    icon?: IconProps,
    image?: ImgProps;
    onKeyDown?: (eventData: KeyboardEvent) => void;
    setRef?: Accessor<HTMLAnchorElement | undefined>;
    style?: JSX.CSSProperties;
    target?: '_blank' | '_parent' | '_self' | '_top';
    text?: JSXElement;
    textClass?: string;
} & Pick<JSX.HTMLElementTags['a'], 'download' | 'href' | 'tabIndex' | 'title'>;

/**
 * Creates `Link` component.
 * @name src/shared/ui/elements/Link
 * @method
 * @param {LinkProps} props - contains component props.
 * @returns Component with children.
 * @constructor
 */
export const Link = (props: LinkProps) => (
    <a
        ref={props.setRef}
        class={props.class}
        data-active={props.dataActive || false}
        data-disabled={props.disabled || false}
        data-id={props.dataId}
        download={props.download}
        href={props.href}
        style={props.style}
        tabIndex={props.tabIndex}
        title={props.title}
        onKeyDown={(e) => props.onKeyDown?.(e)}
    >
        {props.text && (
            <span class={props.textClass}>
                {props.text}
            </span>
        )}
        {props.icon && <Icon {...props.icon} />}
        {props.image && <Img {...props.image} />}
        {props.children}
    </a>
);

export type LinkButtonProps = Omit<LinkProps, 'download' | 'href' | 'ref' | 'tag'> & {
    onClick?: (eventData: Event) => void;
    setRef?: HTMLButtonElement;
};

/**
 * Creates `LinkButton` component.
 * @name src/shared/ui/elements/Link/LinkButton
 * @method
 * @param {LinkButtonProps} props - contains component props.
 * @returns Component with children.
 * @constructor
 */
export const LinkButton = (props: LinkButtonProps) => (
    <button
        ref={props.setRef}
        class={props.class}
        data-active={props.dataActive || false}
        data-disabled={props.disabled || false}
        data-id={props.dataId}
        tabIndex={props.tabIndex}
        title={props.title}
        onClick={(e) => props.onClick?.(e)}
        onKeyDown={(e) => props.onKeyDown?.(e)}
    >
        {props.text && (
            <span class={props.textClass}>
                {props.text}
            </span>
        )}
        {props.icon && <Icon {...props.icon} />}
        {props.image && <Img {...props.image} />}
        {props.children}
    </button>
);

