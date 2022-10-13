import express from 'express';
import { errorHandler } from './common/ErrorHandler';

import databaseConfig from './config/databaseConfig';
import errorHandlerConfig from './config/errorHandlerConfig';
import expressConfig from './config/expressConfig'
import routesConfig from './config/routesConfig';

const port = 3000;
const host = "pirocorp.com";

async function start() {
    const app = express();

    databaseConfig(app);
    expressConfig(app);    
    routesConfig(app);
    errorHandlerConfig(app);

    // start the app
    app.listen(port, host, () => console.log(`Server listening on port ${host}:${port}`));
};

start();

process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {  
    throw reason;
});

process.on('uncaughtException', (error: Error) => {
    errorHandler.handleError(error);    

    if (!errorHandler.isTrustedError(error)) {
        // process.exit(1);
        // and restart gracefully 
    }
});