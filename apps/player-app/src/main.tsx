/**
 * Module contains application main entry point.
 * @module src/main
 */
import 'virtual:fonts.css';
import 'virtual:svg-icons-register';

import { mockServer } from '@sandbox/player-app-server';

import { config, getLogger, initStores, lazyImport, setLogLevel } from '@/shared';

import '../assets/css/sanitize.css';
import './shared/ui/styles/global.css';

const { App } = lazyImport(() => import('./app'));
const { logLevel } = config;

const MOUNT_NODE = document.body;
const logger = getLogger('Main');

/** Initializes `basic-api` mock server. */
mockServer.start();

/**
 * Renders main application component.
 * @param AppComponent - application component.
 */
const renderApp = (AppComponent: Component) => {
    render(() => <AppComponent />, MOUNT_NODE);
};

if (import.meta.env.DEV && ! (MOUNT_NODE instanceof HTMLElement)) {
    logger.error('Root element not found.');
}

/** Initializes global stores. */
initStores();

/** Sets current log level. */
logger.info(`Loglevel: ${logLevel}`);
setLogLevel(logLevel);

/** Renders application at specified mount point. */
renderApp(App);

