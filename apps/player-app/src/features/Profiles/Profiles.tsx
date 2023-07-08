/**
 * Module contains `Profiles` selector component.
 * @module src/features/Profiles/Profiles
 */
import type { TProfile } from '@sandbox/player-app-server';
import type { Nullable } from '@sandbox/types';

import { ProfileLock } from '@/entities';
import { Button, type LinkButtonProps, isValidCode, profilesStore } from '@/shared';

import { styles } from './Profiles.css';
import { Profile } from './ui';

const MESSAGES = {
    button: 'Manage Profiles',
    title: "Who's watching?"
};

/**
 * `Profiles` selector component.
 * @constructor
 * @name src/features/Profiles/Profiles
 * @method
 * @returns Component with children.
 */
export const Profiles = () => {
    const [loaded, setLoaded] = createSignal(false);
    const [profile, setProfile] = createSignal<Nullable<TProfile>>(null);

    /**
     * Click handler
     * @param {TProfile} newProfile - new profile to unlock.
     * @returns {Function} profile unlock method.
     */
    const handleClick = (newProfile: TProfile): LinkButtonProps['onClick'] => async () => {
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
        <div class={styles.page}>
            <div class={styles.pageContent}>
                <div class={styles.pageContainer({ loaded: loaded() })}>
                    <div class={styles.pageBox}>
                        <h1 class={styles.pageBoxTitle}>
                            {MESSAGES.title}
                        </h1>
                        <ul class={styles.pageBoxList}>
                            <For each={profilesStore.state.options}>
                                {(profileOption) => (
                                    <Profile
                                        profile={profileOption}
                                        onClick={handleClick(profileOption)}
                                        onLoaded={() => setLoaded(true)}
                                    />
                                )}
                            </For>
                        </ul>
                        <div class={styles.pageBoxFooter}>
                            <Button
                                class={styles.pageButton}
                                text={MESSAGES.button}
                                textClass={styles.pageButtonText}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ProfileLock
                profile={profile()}
                setProfile={setProfile}
                onSuccess={handleProfileUnlock}
            />
        </div>
    );
};
