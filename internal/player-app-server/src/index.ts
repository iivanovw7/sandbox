import { RestSerializer, createServer } from 'miragejs';

import { AuthController, BillboardController, ProfilesController } from './controller';

export * from './types';

export const mockServer = {
    start: () => {
        createServer({
            routes() {
                this.post('/basic-api/login', AuthController.login);
                this.post('/basic-api/refresh', AuthController.refresh);
                this.get('/basic-api/getProfiles', ProfilesController.getProfiles);
                this.get('/basic-api/getBillboard', BillboardController.getBillboard);
                this.passthrough();
                this.passthrough('https://demo.unified-streaming.com/**');
            },
            serializers: {
                application: RestSerializer,
            },
        });
    }
};
