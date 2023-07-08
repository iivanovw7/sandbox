/**
 * Module contains application `withIntl` HOC.
 * @module src/app/providers/withIntl
 */

import { IntlProvider } from '@cookbook/solid-intl';
import { useAsyncState } from 'solidjs-use';

import { type LocaleMessages, importMessages, settingsStore } from '@/shared';

/**
 * Application Intl HOC.
 * @constructor
 * @param Cmp - represents child component.
 * @returns component with children.
 */
export const withIntl = (Cmp: Component) => (props) => {
    const { isReady, state: messages } = useAsyncState<LocaleMessages>(
        importMessages(settingsStore.state.locale),
        {} as LocaleMessages
    );

    return (
        <Show when={isReady()}>
            <IntlProvider locale={settingsStore.state.locale} messages={messages()}>
                <Cmp {...props} />
            </IntlProvider>
        </Show>
    );
};
