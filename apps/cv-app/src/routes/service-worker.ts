import { setupServiceWorker } from '@builder.io/qwik-city/service-worker';

setupServiceWorker();

addEventListener('install', () => void self.skipWaiting());
addEventListener('activate', () => void self.clients.claim());

// eslint-disable-next-line @typescript-eslint/no-shadow
declare const self: ServiceWorkerGlobalScope;
