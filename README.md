# JS-Back-End

- [Node.js/TypeScript REST API, MongoDB, Authentication, and Automated Tests](Workshops/REST%20API)


## Resources

[The power of Async Hooks in Node.js](https://medium.com/nmc-techblog/the-power-of-async-hooks-in-node-js-8a2a84238acb)

Request context example

```js
asyncHooks.createHook({ init, destroy }).enable();
const reqContextMap = new Map();

function createRequestContext (data) {
    reqContextMap.set(asyncHooks.executionAsyncId(), data)
}

function getRequestContext () {
    return reqContextMap.get(asyncHooks.executionAsyncId())
}

function init (asyncId, type, triggerAsyncId, resource) {
    // Store same context data for child async resources
    if (reqContextMap.has(triggerAsyncId)) {
        reqContextMap.set(asyncId, reqContextMap.get(triggerAsyncId))
    }
}

function destroy (asyncId) {
    if (reqContextMap.has(asyncId)) {
        reqContextMap.delete(asyncId)
    }
}

module.exports = { 
    createRequestContext, 
    getRequestContext 
};
```

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

[TypeScript Express](https://wanago.io/courses/typescript-express-tutorial/)

[API with NestJS](https://wanago.io/2020/12/07/api-nestjs-introduction-cqrs/)
