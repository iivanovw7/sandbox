/**
 * Module contains `ProfileLock` localization messages.
 * @module src/entities/ProfileLock/lib/messages
 */

import { defineMessages } from '@cookbook/solid-intl';

export const messages = defineMessages({
    errorTitle: {
        defaultMessage: 'Whoops, wrong PIN. Please try again.',
        id: 'entities.profile.lock.error.title'
    },
    status: {
        defaultMessage: 'Profile Lock is currently on.',
        id: 'entities.profile.lock.status'
    },
    title: {
        defaultMessage: 'Enter your PIN to access this profile.',
        id: 'entities.profile.lock.title'
    },
});
