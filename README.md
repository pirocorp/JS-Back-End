# JS-Back-End

## NodeJS Architecture Series
- [Domain-Driven Design (DDD) Best Practice with Node.js and MongoDB](https://medium.com/predictivehire/domain-driven-design-ddd-best-practice-with-node-js-mongodb-and-graphql-4d4f45289153)
- [NodeJS Architecture Series Part 1](https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1)
- [NodeJS Architecture Series Part 2](https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-2)
- [NodeJS Architecture Series Part 3](https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-3)
- [Series Repo](https://github.com/makinhs/toptal-rest-series)


## Resources

[The power of Async Hooks in Node.js](https://medium.com/nmc-techblog/the-power-of-async-hooks-in-node-js-8a2a84238acb)

Example usage
```js
const express = require('express');
const ah = require('./hooks');
const app = express();
const port = 3000;

app.use((request, response, next) => {
    const data = { headers: request.headers };
    ah.createRequestContext(data);
    next();
});

const requestHandler = (request, response, next) => {
    const reqContext = ah.getRequestContext();
    response.json(reqContext);
    next()
};

app.get('/', requestHandler)

app.listen(port, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log(`server is listening on ${port}`);
});
```

[PubSub and dependency injection on NodeJS app](https://softwareontheroad.com/ideal-nodejs-project-structure/)

[NodeJS and TypeScript](https://wanago.io/2019/02/11/node-js-typescript-modules-file-system/)
