/**
 * Module contains MenuItem element.
 * @module src/shared/ui/elements/DropdownMenu/ui/MenuItem
 */
import { DropdownMenu as Dropdown } from '@kobalte/core';
import { useNavigate } from '@solidjs/router';

import type { LinkButtonProps, LinkProps } from '../../Link';
import { LinkButton } from '../../Link';
import type { NavLinkProps } from '../../NavLink';
import { NavLink } from '../../NavLink';
import { ItemType } from '../constants';

export type MenuItemBase<Type extends ItemType> = {
    class?: string;
    isActive?: boolean;
    isDisabled?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelect?: (value: any) => void;
    style?: JSX.CSSProperties;
    text?: JSXElement;
    type: Type;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any;
};

export type MenuItemButton = MenuItemBase<'button'> & Omit<
LinkButtonProps, 'dataActive' | 'disabled' | 'onClick'
>;

export type MenuItemDivider = Omit<
MenuItemBase<'divider'>, 'active' | 'disabled' | 'onClick' | 'text'
>;

export type MenuItemNavLink = MenuItemBase<'navLink'> & Omit<
LinkProps, 'dataActive' | 'disabled' | 'onClick'
>;

export type TMenuItem = MenuItemButton | MenuItemDivider | MenuItemNavLink;

export type MenuItemProps = {
    class?: string;
    dataActive?: boolean;
    item: TMenuItem;
    onSelect?: () => void;
};

/**
 * Creates `MenuItems` component.
 * @constructor
 * @method
 * @name scr/shared/ui/elements/DropdownMenu/ui/MenuItem
 * @param {object} props - contains component props.
 * @returns Component with children.
 */
export const MenuItem = (props: MenuItemProps) => {
    const navigate = useNavigate();

    /**
     * Is `not` divider item.
     * @returns {boolean} is current item is not divider.
     */
    const isNotDivider = () => props.item.type !== ItemType.divider;

    /**
     * Item click handler.
     */
    const handleSelect = () => {
        if (! props.item.isDisabled && ! props.item.isActive) {
            props.item.onSelect?.(props.item.value);

            if (props.item.type === ItemType.navLink) {
                navigate((props.item as NavLinkProps).href);
            }
        }
    };

    return (
        <Show
            fallback={<Dropdown.Separator class={props.item.class} />}
            when={isNotDivider()}
        >
            <Dropdown.Item
                closeOnSelect
                class={props.class}
                disabled={props.item.isDisabled}
                onSelect={handleSelect}
            >
                <Switch>
                    <Match when={props.item.type === ItemType.navLink}>
                        <NavLink
                            {...props.item as NavLinkProps}
                            disabled={props.item.isDisabled}
                        />
                    </Match>
                    <Match when={props.item.type === ItemType.button}>
                        <LinkButton
                            {...props.item as LinkButtonProps}
                            dataActive={props.item.isActive}
                            disabled={props.item.isDisabled}
                        />
                    </Match>
                </Switch>
            </Dropdown.Item>
        </Show>
    );
};
