const express = require('express');

const expressConfig = require('./configs/express');
const databaseConfig = require('./configs/database');
const routesConfig = require('./configs/routes');
const errorConfig = require('./configs/error');

const port = 3000;

start();

async function start() {
    const app = express();

    expressConfig(app);
    await databaseConfig(app);
    routesConfig(app);
    errorConfig(app);

    app.listen(port, () => console.log(`Server listening on port ${port}`));
}

process.on('unhandledRejection', (reason, promise) => {  
    throw reason;
});

process.on('uncaughtException', (error) => {
    console.error(`>>> Uncaught Exception`);
    console.log(error);
});