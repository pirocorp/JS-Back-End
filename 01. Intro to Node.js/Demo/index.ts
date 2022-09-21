import http from 'http';

import * as router from './router';

import { catalogPage, createItem, createPage } from './controllers/catalogController';
import { aboutPage, homePage } from './controllers/homeController';

router.get('/', homePage);
router.get('/catalog', catalogPage);
router.get('/about', aboutPage);
router.get('/create', createPage);
router.post('/create', createItem);

const server = http.createServer(router.match);

server.listen(3000);

