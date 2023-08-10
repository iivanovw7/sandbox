import { component$ } from '@builder.io/qwik';

import { DATA } from '@/shared';

import { RouterHead } from './components';

import './global.css';

const { title } = DATA;

export default component$(() => (
    <QwikCityProvider>
        <head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <link href="/manifest.json" rel="manifest" />
            <RouterHead />
            <script src="/js/theme.js" type="module" />
        </head>
        <body lang="en">
            <RouterOutlet />
            <ServiceWorkerRegister />
        </body>
    </QwikCityProvider>
));
