/**
 * Module contains useLocale hook.
 * @module src/shared/hooks/useLocale
 */
import { type MessageDescriptor, useIntl } from '@cookbook/solid-intl';
import type { Maybe } from '@sandbox/types';

import type { FormatXMLElementFn, PrimitiveType } from '#/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MessageValues = Record<string, FormatXMLElementFn<string, string> | PrimitiveType>;

export type GetText = {
    <T extends JSXElement>(notMessageDescriptor: T, values?: Maybe<MessageValues>, fallback?: string): T;
    <T extends MessageDescriptor>(messageDescriptor: T, values?: Maybe<MessageValues>, fallback?: string): string;
};

// eslint-disable-next-line require-jsdoc
export const useLocale = () => {
    const { formatMessage } = useIntl();

    // eslint-disable-next-line require-jsdoc
    const getText: GetText = <Key extends JSXElement | MessageDescriptor>(
        maybeMessageDescriptor: Key,
        values?: Maybe<MessageValues>
    ) => {
        return ((maybeMessageDescriptor as MessageDescriptor)?.id
            ? formatMessage(maybeMessageDescriptor as MessageDescriptor, values || {})
            : maybeMessageDescriptor) as string;
    };

    return { getText };
};
