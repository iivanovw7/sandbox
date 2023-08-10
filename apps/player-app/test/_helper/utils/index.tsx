import { IntlProvider } from '@cookbook/solid-intl';
import { render as stlRender } from '@solidjs/testing-library';

import en from '../../../src/shared/translations/en.json';

const render: typeof stlRender = (ui: () => JSX.Element, options) => {

    const Wrapper = (props) => {
        return (
            <IntlProvider locale="en" messages={en}>
                {props.children}
            </IntlProvider>
        );
    };

    return stlRender(ui, { wrapper: Wrapper, ...options });
};

export * from './stub';
// eslint-disable-next-line import/export
export * from '@solidjs/testing-library';

// eslint-disable-next-line import/export
export { render };

