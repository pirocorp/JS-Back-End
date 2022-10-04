import express from 'express';
import databaseConfig from './config/databaseConfig';

import expressConfig from './config/expressConfig'
import routesConfig from './config/routesConfig';

const port = 3000;
const host = "pirocorp.com";

async function start() {
    const app = express();

    databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    // start the app
    app.listen(port, host, () => console.log(`Server listening on port ${host}:${port}`));
};

start();
