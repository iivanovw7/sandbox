/**
 * Module contains application navigation.
 * @module src/features/Navigation/Navigation
 */
import { useMatch } from '@solidjs/router';

import { DropdownMenu, NavLink, menuItems, useBreakpoints } from '@/shared';

import { styles } from './Navigation.css';

/**
 * Navigation component.
 * @method
 * @name src/features/Navigation/Navigation
 * @returns Component with children.
 * @constructor
 */
export const Navigation = () => {
    const { lgDown, lgUp } = useBreakpoints();

    /**
     * Path matcher
     * @param {string} path - path to be matched with.
     * @returns {Accessor<PathMatch | undefined>} router match result.
     */
    const match = (path: string) => useMatch(() => path)();

    return (
        <Switch>
            <Match when={lgDown()}>
                <DropdownMenu
                    withArrowFloating
                    withArrowToggle
                    classes={{
                        arrowFloating: styles.menuArrowFloating,
                        arrowToggle: styles.menuArrowToggle,
                        item: styles.menuItem,
                        items: styles.menuItems,
                        menu: styles.menu,
                        toggle: styles.menuToggle,
                    }}
                    gutter={10}
                    items={menuItems.map(({ disabled, text, to }) => ({
                        'class': styles.menuItemLink,
                        href: to,
                        isActive: !! match(to),
                        isDisabled: disabled,
                        text,
                        textClass: styles.navLinkText,
                        type: DropdownMenu.ItemType.navLink,
                    }))}
                    placement="bottom"
                    shift={30}
                >
                        Browse
                </DropdownMenu>
            </Match>
            <Match when={lgUp()}>
                <For each={menuItems}>
                    {(item) => (
                        <div class={styles.navLinkBox}>
                            <NavLink
                                class={styles.navLink}
                                disabled={item.disabled}
                                href={item.to}
                                text={item.text}
                                textClass={styles.navLinkText}
                            />
                        </div>
                    )}
                </For>
            </Match>
        </Switch>
    );
};
