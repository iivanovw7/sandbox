/**
 * Module contains global stores initialization method.
 * @module src/shared/stores/initStores
 */

import type { AnyFunction } from '@sandbox/types';

import { authStore } from './AuthStore';
import { controller } from './controller';
import { profilesStore } from './ProfilesStore';
import { settingsStore } from './SettingStore';

controller.onInit(authStore.actions.refreshAccessToken as AnyFunction);

export const initStores = controller.init({
    auth: authStore,
    profiles: profilesStore,
    settings: settingsStore,
});
