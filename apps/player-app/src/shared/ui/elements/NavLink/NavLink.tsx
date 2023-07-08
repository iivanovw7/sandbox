/**
 * Module contains `NavLink` element.
 * @module src/shared/ui/elements/NavLink/NavLink
 */
import { A, useMatch } from '@solidjs/router';

export type NavLinkProps = {
    class?: string;
    disabled?: boolean;
    href: string;
    ref?: Accessor<HTMLAnchorElement | undefined>;
    replace?: boolean;
    style?: JSX.CSSProperties;
    text: string;
    textClass?: string;
};

/**
 * Creates `NavLink` component.
 * @constructor
 * @method
 * @name src/shared/ui/elements/NavLink/NavLink
 * @param {object} props - contains component props.
 * @returns Component with children.
 */
export const NavLink = (props: NavLinkProps) => {
    /**
     * Path matcher
     * @param {string} path - path to be matched with.
     * @returns {Accessor<PathMatch | undefined>} router match result.
     */
    const match = (path: string) => useMatch(() => path)();

    return (
        <Show fallback={<NavLink.DisabledLink {...props} />} when={! props.disabled}>
            <A
                ref={props.ref}
                class={props.class}
                data-active={!! match(props.href)}
                data-disabled={props.disabled}
                href={props.href}
                style={props.style}
            >
                <span class={props.textClass}>
                    {props.text}
                </span>
            </A>
        </Show>
    );
};

NavLink.DisabledLink = (props: NavLinkProps) => (
    <div
        class={props.class}
        data-active={false}
        data-disabled={props.disabled}
        style={props.style}
    >
        <span class={props.textClass}>
            {props.text}
        </span>
    </div>
);
