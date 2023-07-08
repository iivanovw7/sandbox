/**
 * Module contains profile check HOC.
 * @module src/pages/withProfile
 */
import { useAsyncState } from 'solidjs-use';

import { Profiles } from '@/features';
import { profilesStore } from '@/shared';

import { ErrorFallback } from './ErrorFallback';

/**
 * User profile check HOC.
 * @constructor
 * @param Cmp - represents child component.
 * @returns Component with children.
 */
export const withProfile = (Cmp: Component) => (props) => {
    const { error, execute: loadProfiles } = useAsyncState(
        profilesStore.actions.loadProfiles,
        null,
        {
            immediate: false
        }
    );

    createEffect(async () => {
        if (! profilesStore.state.options.length) {
            await loadProfiles();
        }
    });

    return (
        <Switch fallback={<Profiles />}>
            <Match when={error()}>
                <ErrorFallback />
            </Match>
            <Match when={!! profilesStore.state.active}>
                <Cmp {...props} />
            </Match>
        </Switch>
    );
};
