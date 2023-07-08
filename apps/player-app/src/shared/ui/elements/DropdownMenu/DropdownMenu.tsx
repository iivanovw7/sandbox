/**
 * Module contains DropdownMenu element.
 * @module src/shared/ui/elements/DropdownMenu/DropdownMenu
 */
import { DropdownMenu as Dropdown } from '@kobalte/core';
import type { DropdownMenuRootProps } from '@kobalte/core/dist/types/dropdown-menu';
import { useElementHover } from 'solidjs-use';

import { CLOSE_DELAY, ItemType, OPEN_DELAY } from './constants';
import { MenuItems, type TMenuItem } from './ui';

export type DropdownMenuProps = {
    children?: JSXElement | JSXElement[];
    classes?: {
        arrowFloating?: string,
        arrowToggle?: string,
        item?: string;
        items?: string;
        menu?: string;
        toggle?: string;
    },
    items: TMenuItem[];
    onClick?: () => void;
    onClose?: () => void;
    withArrowFloating?: boolean;
    withArrowToggle?: boolean;
} & Pick<DropdownMenuRootProps, 'gutter' | 'placement' | 'shift'>;

/**
 * Creates `DropdownMenu` component.
 * @constructor
 * @name src/shared/ui/elements/DropdownMenu/DropdownMenu
 * @method
 * @param {object} props - contains component props.
 * @returns Component with children.
 */
export const DropdownMenu = (props: DropdownMenuProps) => {
    const [toggleRef, setToggleRef] = createSignal<HTMLButtonElement>();
    const [floatingRef, setFloatingRef] = createSignal<HTMLDivElement>();

    const [isOpen, setIsOpen] = createSignal(false);

    const isToggleHovered = useElementHover(toggleRef, {
        delayEnter: OPEN_DELAY,
        delayLeave: CLOSE_DELAY
    });

    const isFloatingHovered = useElementHover(floatingRef, {
        delayEnter: OPEN_DELAY,
        delayLeave: CLOSE_DELAY
    });

    createEffect(() => {
        if (isToggleHovered()) {
            setIsOpen(true);
        }
        else if (! isFloatingHovered()) {
            setIsOpen(false);
        }
    });

    return (
        <Dropdown.Root
            gutter={props.gutter}
            modal={false}
            open={isOpen()}
            placement={props.placement}
            shift={props.shift}
            onOpenChange={setIsOpen}
        >
            <Dropdown.Trigger
                ref={setToggleRef}
                class={props.classes?.toggle}
            >
                {props.children}
                <Show when={props.withArrowToggle}>
                    <span
                        class={props.classes?.arrowToggle}
                        style={{
                            ...(isOpen() && {
                                transform: 'rotate(180deg)'
                            })
                        }}
                    />
                </Show>
            </Dropdown.Trigger>
            <Dropdown.Portal>
                <Dropdown.Content
                    ref={setFloatingRef}
                    class={props.classes?.menu}
                >
                    <MenuItems
                        class={props.classes?.items}
                        items={props.items}
                        menuItemClass={props.classes?.item}
                    />
                    <Show when={props.withArrowFloating}>
                        <Dropdown.Arrow
                            id="floating-arrow"
                            class={props.classes?.arrowFloating}
                            size={18}
                        />
                    </Show>
                </Dropdown.Content>
            </Dropdown.Portal>
        </Dropdown.Root>
    );
};

DropdownMenu.ItemType = ItemType;
