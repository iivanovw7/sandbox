import { RestSerializer, createServer } from 'miragejs';

import { AuthController, ProfilesController } from './controller';

export * from './types';

export const mockServer = {
    start: () => {
        createServer({
            routes() {
                this.post('/basic-api/login', AuthController.login);
                this.post('/basic-api/refresh', AuthController.refresh);
                this.get('/basic-api/getProfiles', ProfilesController.getProfiles);
            },
            serializers: {
                application: RestSerializer,
            },
        });
    }
};
