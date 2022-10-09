import { Express } from 'express';

import homeController from '../controllers/homeController';
import catalogController from '../controllers/catalogController';
import roomController from '../controllers/roomController';
import facilityController from '../controllers/facilityController';
import defaultController from '../controllers/defaultController';
import authController from '../controllers/authController';

import { hasUser } from '../middlewares/guards';

export default function routesConfig(app: Express) {
    // Register controllers
    app.use(homeController);
    app.use('/catalog', catalogController);
    app.use('/accommodation', roomController);
    app.use('/facility', hasUser(), facilityController);
    app.use('/auth', authController);

    // Not found page
    app.all('*', defaultController);
};
