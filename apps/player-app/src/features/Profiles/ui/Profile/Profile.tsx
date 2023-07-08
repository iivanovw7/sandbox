/**
 * Module contains `Profile` component.
 * @module src/features/Profiles/ui/Profile/Profile
 */
import type { TProfile } from '@sandbox/player-app-server';

import { Icon, Img, LinkButton, type LinkButtonProps } from '@/shared';

import { styles } from './Profile.css';

export type ProfileProps = Pick<LinkButtonProps, 'onClick'> & {
    onLoaded: () => void;
    profile: TProfile
};

/**
 * `Profile` component.
 * @constructor
 * @name src/features/Profiles/ui/Profile/Profile
 * @method
 * @param {ProfileProps} props - contains component props.
 * @returns component with children.
 */
export const Profile = (props: ProfileProps) => {
    const [locked, setLocked] = createSignal(false);

    createEffect(() => {
        setLocked(Boolean(props.profile.lock));
    });

    return (
        <li class={styles.profile({ locked: locked() })}>
            <LinkButton
                class={styles.profileLink}
                onClick={props.onClick}
            >
                <Img
                    alt="avatar"
                    class={styles.profileImageBox}
                    imageClass={styles.profileImage}
                    src={props.profile.avatar}
                    onLoad={() => props.onLoaded()}
                />
                <span class={styles.profileName}>
                    {props.profile.name}
                </span>
            </LinkButton>
            {locked() && (
                <Icon
                    class={styles.profileIconBox}
                    iconClass={styles.profileIcon}
                    name="lock"
                />
            )}
        </li>
    );
};
