/**
 * Module contains application header.
 * @module src/widgets/Header/Header
 */

import type { TProfile } from '@sandbox/player-app-server';
import type { Nullable } from '@sandbox/types';

import { ProfileLock } from '@/entities';
import { Menu, Navigation, Notifications, Search } from '@/features';
import { Img, isValidCode, profilesStore } from '@/shared';

import Logo from '../../../assets/img/logo-v7.png?w=200&png&imagetools';

import { styles } from './Header.css';

export type HeaderProps = {
    withMenu?: boolean;
    withNavigation?: boolean;
};

/**
 * Header component.
 * @method
 * @name src/widgets/Header/Header
 * @param {HeaderProps} props - contains component props.
 * @returns Component with children.
 * @constructor
 */
export const Header = (props: HeaderProps) => {
    const [profile, setProfile] = createSignal<Nullable<TProfile>>(null);

    /**
     *  If header has no navigation or menu.
     *  @returns {boolean} is empty.
     */
    const isEmpty = () => ! props.withNavigation && ! props.withMenu;

    /**
     *  If header has navigation block
     *  @returns {boolean} has navigation.
     */
    const hasNavigation = () => !! profilesStore.state.active && props.withNavigation;

    /**
     * Profile click handler.
     * @param {TProfile} newProfile - new profile to unlock.
     * @returns {Function} profile unlock method.
     */
    const handleClick = async (newProfile: TProfile) => {
        const { lock } = newProfile;

        if (lock && isValidCode(lock)) {
            setProfile(newProfile);
        }
        else {
            setProfile(null);
            await profilesStore.actions.changeUserProfile(newProfile);
        }
    };

    /**
     *  Unlocks user profile.
     */
    const handleProfileUnlock = async () => {
        await profilesStore.actions.changeUserProfile(profile());
        setProfile(null);
    };

    return (
        <div class={styles.header({ isEmpty: isEmpty() })}>
            <div class={styles.section}>
                <Img
                    alt="Netflix"
                    class={styles.logo({ isEmpty: isEmpty() })}
                    imageClass={styles.logoImage({ isEmpty: isEmpty() })}
                    src={Logo}
                />
                <Show when={hasNavigation}>
                    <Navigation />
                </Show>
            </div>
            <Show when={props.withMenu}>
                <div class={styles.section}>
                    <Search />
                    <Notifications />
                    <Menu onProfileClick={handleClick} />
                </div>
            </Show>
            <ProfileLock
                profile={profile()}
                setProfile={setProfile}
                onSuccess={handleProfileUnlock}
            />
        </div>
    );
};
