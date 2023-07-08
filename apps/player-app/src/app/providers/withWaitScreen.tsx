/**
 * Module contains application `withWaitScreen` HOC.
 * @module src/app/providers/withWaitScreen
 */

import { WaitScreen, settingsStore } from '@/shared';

/**
 * Application wait screen HOC component.
 * @constructor
 * @param Cmp - represents child component.
 * @returns component with children.
 */
export const withWaitScreen = (Cmp: Component) => (props) => (
    <>
        <Cmp {...props} />
        <Show when={settingsStore.state.waitQueue}>
            <WaitScreen profile={settingsStore.state.waitProfile} />
        </Show>
    </>
);
