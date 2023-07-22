/**
 * Module contains application header menu.
 * @module src/features/Menu/Menu
 */

import type { TProfile } from '@sandbox/player-app-server';

import { DropdownMenu, Icon, Img, type LinkButtonProps, authStore, profilesStore, useBreakpoints } from '@/shared';

import { withAvatarPlaceholder } from './lib';
import { styles } from './Menu.css';

export type MenuProps = {
    onProfileClick: (newProfile: TProfile) => Promise<void>;
};

/**
 * Header Menu component.
 * @method
 * @name src/features/Menu/Menu
 * @param {ProfileProps} props - contains component props.
 * @returns React component with children.
 * @constructor
 */
export const Menu = (props: MenuProps) => {
    const { mdUp } = useBreakpoints();

    /**
     * Logout current user profile.
     */
    const handleLogout: LinkButtonProps['onClick'] = () => {
        profilesStore.actions.resetActiveProfile();
        authStore.actions.logout();
    };

    /**
     * Profile editor imitation.
     */
    const handleProfileReset = () => {
        profilesStore.actions.resetActiveProfile();
    };

    return (
        <DropdownMenu
            withArrowFloating
            classes={{
                arrowFloating: styles.menuArrowFloating,
                arrowToggle: styles.menuArrowToggle,
                item: styles.menuItem,
                items: styles.menuItems,
                menu: styles.menu,
                toggle: styles.menuToggle,
            }}
            gutter={6}
            items={[
                ...profilesStore.state.availableOptions.map((profile: TProfile) => ({
                    children: (
                        profile.lock && (
                            <Icon
                                class={styles.menuLinkIconBox}
                                iconClass={styles.menuLinkIcon}
                                name="lock"
                            />
                        )
                    ),
                    'class': styles.menuItemLink,
                    image: {
                        alt: 'avatar',
                        'class': styles.menuItemLinkImageBox,
                        imageClass: styles.menuItemLinkImage,
                        size: 30,
                        src: profile.avatar,
                    },
                    onSelect: async () => {
                        handleProfileReset();
                        await props.onProfileClick(profile);
                    },
                    text: profile.name,
                    textClass: styles.menuLinkText,
                    type: DropdownMenu.ItemType.button,
                })),
                {
                    'class': styles.menuItemLink,
                    icon: {
                        'class': styles.menuItemLinkIconBox,
                        iconClass: styles.menuItemLinkIcon,
                        name: 'edit',
                    },
                    onSelect: handleProfileReset,
                    text: 'Manage Profiles',
                    type: DropdownMenu.ItemType.button,
                },
                {
                    'class': styles.menuDivider,
                    type: DropdownMenu.ItemType.divider
                },
                {
                    'class': styles.menuLogout,
                    onSelect: handleLogout,
                    text: 'Sign out of Netflix',
                    type: DropdownMenu.ItemType.button,
                }
            ]}
            placement="bottom-start"
            shift={16}
            withArrowToggle={mdUp()}
        >
            <Img
                alt="avatar"
                class={styles.menuAvatar}
                imageClass={styles.menuAvatarImage}
                size={30}
                src={withAvatarPlaceholder(profilesStore.state.active?.avatar)}
            />
        </DropdownMenu>
    );
};

