/**
 * Module contains global application profiles store.
 * @module src/shared/stores/ProfileStore
 */

import type { TProfile } from '@sandbox/player-app-server';
import type { Nullable, Voidable } from '@sandbox/types';

import { profilesApi } from '../../api/http/basic-api';
import { getLogger } from '../../log';
import { getLocalProfile, setLocalProfile } from '../../storage';
import { makeApiRequest, noop, wait } from '../../utils';
import { settingsStore } from '../SettingStore';

declare global {
    interface IGlobalStore {
        profiles: ProfilesSore;
    }
}

type ProfilesSoreState = {
    active: Nullable<TProfile>;
    availableOptions: Array<TProfile>;
    options: Array<TProfile>;
};

type ProfilesSoreActions = {
    changeUserProfile: (profile: Nullable<TProfile>) => Promise<void>;
    loadLocalProfile: () => void;
    loadProfiles: () => Promise<Voidable<true>>;
    resetActiveProfile: () => void;
    resetProfiles: () => void;
};

type ProfilesSore = {
    actions: ProfilesSoreActions;
    state: ProfilesSoreState
};

const logger = getLogger('ProfilesStore');

/**
 *  Creates profiles store instance.
 *  @returns {ProfilesSore} store, containing state and action.
 */
const createProfilesStore = (): ProfilesSore => {
    let availableOptions: Accessor<TProfile[]> = noop;

    const [state, setState] = createStore<ProfilesSoreState>({
        active: getLocalProfile(),
        /**
         * Available options getter.
         * @returns {Array<TProfile>} available options.
         */
        get availableOptions() {
            return availableOptions();
        },
        options: [],
    });

    availableOptions = createMemo(() => state.options.filter(({ id }) => id !== state.active?.id));

    /**
     *  Sets new user`s profiles.
     *  @private
     *  @param {TProfile} profile - profiles list.
     */
    const setProfile = (profile: Nullable<TProfile>) => {
        setLocalProfile(profile);
        updateProfile(profile);
    };

    /**
     *  Changes global loader state.
     *  @private
     *  @param {TProfile} profile - profiles list.
     *  @returns loader control function.
     */
    const setProfileLoader = (profile: Nullable<TProfile>) => (isLoading: boolean) => {
        if (isLoading) {
            settingsStore.actions.startWait(profile);
        }
        else {
            settingsStore.actions.stopWait();
        }
    };

    /**
     * Updates user active profiles.
     * @private
     * @param {Nullable<TProfile>} profile - represents user profile.
     */
    const updateProfile = (profile: Nullable<TProfile>) => {
        setState({
            active: profile
        });
    };

    /**
     * Updates user profiles.
     * @private
     * @param {Array.<TProfile>} profiles list
     */
    const updateOptions = (profiles: TProfile[]) => {
        setState({
            options: profiles
        });
    };

    return {
        actions: {
            /**
             * Sets new use profile.
             * @param {Object} profile - user profile.
             */
            changeUserProfile: async (profile: Nullable<TProfile>) => {
                await makeApiRequest({
                    onRequestError: () => {
                        logger.error('Failed to change profile');
                    },
                    request: async () => {
                        await wait();

                        setProfile(profile);
                    },
                    setLoading: setProfileLoader(profile)
                });
            },
            /** Loads user profile from local storage. */
            loadLocalProfile: (): void => {
                updateProfile(getLocalProfile());
            },
            /**
             * Fetches available user`s profiles.
             * @param {Function} [setLoading] - set loading method.
             * @param {Function} [onRequestError] - set loading method.
             * @returns load user profiles request.
             */
            loadProfiles: async () => {
                return makeApiRequest({
                    onRequestError: (errorData) => {
                        logger.error('Failed to load profiles list');

                        throw errorData;
                    },
                    request: async () => {
                        const { result: { data } } = await profilesApi.getProfiles();

                        updateOptions(data);
                    },
                    setLoading: setProfileLoader(null)
                });
            },
            /** Removes users active profile. */
            resetActiveProfile: (): void => {
                setProfile(null);
            },
            /** Removes users active profile with all options. */
            resetProfiles: () => {
                setProfile(null);
                updateOptions([]);
            }
        },
        state
    };
};

export const profilesStore = createRoot(createProfilesStore);

