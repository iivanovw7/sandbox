/**
 * Module contains DropdownMenu MenuItems element.
 * @module src/shared/ui/elements/DropdownMenu/ui/MenuItem
 */
import type { TMenuItem } from './MenuItem';
import { MenuItem } from './MenuItem';

export type MenuItemsProps = {
    class?: string;
    items?: TMenuItem[];
    menuItemClass?: string;
    style?: JSX.CSSProperties;
};

/**
 * Creates `MenuItems` component.
 * @constructor
 * @name src/shared/ui/elements/DropdownMenu/ui/MenuItems
 * @method
 * @param {object} props - contains component props.
 *
 * @returns Component with children.
 */
export const MenuItems = (props: MenuItemsProps) => (
    <ul class={props.class} style={props.style}>
        <For each={props.items}>
            {(item) => (
                <MenuItem
                    class={props.menuItemClass}
                    item={item}
                />
            )}
        </For>
    </ul>
);
