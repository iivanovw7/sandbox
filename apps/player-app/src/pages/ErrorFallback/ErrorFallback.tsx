/**
 * Module contains `ErrorFallback` page.
 * @module src/pages/ErrorFallback/ErrorFallback
 */
import { type ErrorData, ErrorScreen, Page } from '@/shared';
import { Header } from '@/widgets';

const MESSAGES = {
    subtitle: 'Sorry, we`re having trouble with your request.',
    title: 'Sorry for interruption'
};

export type ErrorFallbackProps = {
    error?: ErrorData | number;
};

/**
 * ErrorFallback page.
 * @method
 * @constructor
 * @param {ErrorFallbackProps} props - contains component props.
 * @returns Component with children.
 */
export const ErrorFallback = (props: ErrorFallbackProps) => (
    <Page>
        <Header />
        <Page.Content type={Page.ContentType.ERROR}>
            <ErrorScreen
                error={props.error}
                subtitle={MESSAGES.subtitle}
                title={MESSAGES.title}
                onClick={() => location.reload()}
            />
        </Page.Content>
    </Page>
);
