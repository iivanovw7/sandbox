/**
 * Module contains application main entry point.
 * @module src/main
 */
import 'virtual:fonts.css';
import 'virtual:svg-icons-register';

import { mockServer } from '@sandbox/player-app-server';
import { attachDevtoolsOverlay } from '@solid-devtools/overlay';

import { config, getLogger, initStores, lazyImport, setLogLevel } from '@/shared';

import '../assets/css/sanitize.css';
import './shared/ui/styles/global.css';


const { App } = lazyImport(() => import('./app'));
const { logLevel } = config;

const MOUNT_NODE = document.body;
const logger = getLogger('Main');

attachDevtoolsOverlay();

/** Initializes `basic-api` mock server. */
mockServer.start();

/** Initializes global stores. */
initStores();

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

/** Sets current log level. */
logger.info(`Loglevel: ${logLevel}`);
setLogLevel(logLevel);

/** Renders application at specified mount point. */
renderApp(App);

