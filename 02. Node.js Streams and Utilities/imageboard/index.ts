import { createServer } from 'http';

import { handleRequest } from './main';
import * as router from './router';

import { HttpMethod } from './http/httpMethod';
import { homePage } from './controllers/boardController';
import { uploadImage } from './controllers/imageController';

// Register routes
(() => {
    router.register('/', HttpMethod.GET, homePage);
    router.register('/home', HttpMethod.GET, homePage);
    router.register('/upload', HttpMethod.POST, uploadImage);
})();

const server = createServer(handleRequest);
server.listen(3000);
