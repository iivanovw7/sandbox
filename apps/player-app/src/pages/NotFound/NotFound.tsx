/**
 * Module contains `not found` page.
 * @module src/pages/NotFound/NotFound
 */
import { ErrorCodeMap, ErrorScreen, Page } from '@/shared';
import { Header } from '@/widgets';

const { NOT_FOUND } = ErrorCodeMap;

const MESSAGES = {
    subtitle: 'Sorry, we can`t find that page. You`ll find lots to explore on the home page.',
    title: 'Lost your way?',
};

/**
 * `404` page.
 * @method
 * @constructor
 * @returns Ccomponent with children.
 */
export const NotFound = () => (
    <Page>
        <Header/>
        <Page.Content type={Page.ContentType.NOT_FOUND}>
            <ErrorScreen
                error={NOT_FOUND}
                subtitle={MESSAGES.subtitle}
                title={MESSAGES.title}
            />
        </Page.Content>
    </Page>
);
