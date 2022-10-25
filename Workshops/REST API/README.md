# Rest API with Node.js, MongoDB and TypeScript

## Common Concepts

### Data Object (DO)

**Data Object (DO)** is a data class/interface we defined for mongoose schema. It reflects what we stored in the DB, such as **IUser**.


### Data Access Object (DAO)

**Data Access Object (DAO)** is a model class provided by mongoose or other ORM with **DO** as the generic type, such as **Model\<IUser\>**.


### DTO

**DTO** is a validation class object that we define to transfer/validate request attributes, such as **CreateUserDTO** and **UpdateUserDTO**. This is because updating users and creating users might need different attributes such as **ID**.


## Implementation

### Libraries used in the project

- `debug` - is a module that we will use to avoid calling ```console.log()``` while developing our application. This way, we can easily filter debug statements during troubleshooting. They can also be switched off entirely in production instead of having to be removed manually.

- `winston` - is responsible for logging requests to our API and the responses (and errors) returned. `express-winston` integrates directly with **Express.js**, so that all standard API-related `winston` logging code is already done.

- `cors` - is a piece of **Express.js** middleware that allows us to enable [cross-origin resource sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). Without this, our API would only be usable from front ends being served from the exact same subdomain as our back end.

- `mongoose` - To communicate with MongoDB, our back end will leverage an object data modeling (ODM) library called [Mongoose](https://mongoosejs.com/). While Mongoose is quite easy to use, it’s worth checking out the [documentation](https://mongoosejs.com/docs/guide.html) to learn all of the advanced possibilities it offers for real-world projects.

- `express-validator` - quite stable, easy to use, and decently documented field validation tool.

- `dotenv` - An easy way to load variables from `.env` file into our app is to use a library called dotenv.

### Modules

The idea behind the project structure’s two folders (`common` and `users`) is to have individual modules that have their own responsibilities. In this sense, we are eventually going to have some or all of the following for each module:

- **Route configuration** to define the requests our API can handle
- **Services** for tasks such as connecting to our database models, doing queries, or connecting to external services that are required by the specific request
- **Middleware** for running specific request validations before the final controller of a route handles its specifics
- **Models** for defining data models matching a given database schema, to facilitate data storage and retrieval
- **Controllers** for separating the route configuration from the code that finally (after any middleware) processes a route request, calls the above service functions if necessary, and gives a response to the client


### Configure Mongoose [Options](https://mongoosejs.com/docs/connections.html#options)

- ```useNewUrlParser``` - Without this set to ```true```, Mongoose prints a deprecation warning.
- ```useUnifiedTopology``` - The Mongoose documentation recommends setting this to ```true``` to use a newer connection management engine.
- ```serverSelectionTimeoutMS``` -  For the purpose of the UX of this demo project, a shorter time than the default of 30 seconds means that any readers who forget to start MongoDB before Node.js will see helpful feedback about it sooner, instead of an apparently unresponsive back end.


### Model Validation

To set the fields we want to validate, we’ll use the ```body()``` method that we’ll import at our `users.routes.config.ts`. The ```body()``` method will validate fields and generate an errors list—stored in the ```express.Request``` object—in case of failure.


### Authentication vs. Permissions (or “Authorization”) Flow

Authentication is about who the request is from and authorization is about whether they are allowed to do what they’re requesting. `401 Unauthorized` is about authentication and `403 Forbidden` is about authorization.

In this demo, we’ve picked an implementation that’s basic but scalable. It’s based on JWTs.

A JWT consists of encrypted JSON with some non-authentication-related metadata, which in our case includes the user’s email address and permissions flags. The JSON will also contain a secret to verify the integrity of the metadata.

The idea is to require clients to send a valid JWT inside each non-public request. This lets us verify that the client recently had valid credentials for the endpoint they want to use, without having to send the credentials themselves over the wire with each request.


### Storing JWT Secrets

To generate a JWT, we’ll need a JWT secret, which we’ll use to sign our generated JWTs and also to validate incoming JWTs from client requests. Rather than hard-code the value of the JWT secret within a TypeScript file, we’ll store it in a separate “environment variable” file, `.env`, which **should never be pushed to a code repository**.

As is common practice, we’ve added an `.env.example` file to the repo to help developers understand which variables are required when creating the real `.env`. In our case, we want a variable called ```JWT_SECRET``` storing our JWT secret as a string. Readers who wait until the end of this article and use the final branch of the repo will need to remember to change these values locally.

We don’t need to import the dotenv library because importing it in `app.ts` makes the contents of the `.env` file available throughout the app via the Node.js global object called ```process```.


### Auth Controller

What’s the difference between `refreshKey`, `refreshToken`, and `accessToken`? The `*Tokens` are sent to our API consumers with the idea being that the `accessToken` is used for any request beyond what’s available to the general public, and `refreshToken` is used to request a replacement for an expired `accessToken`. The `refreshKey`, on the other hand, is used to pass the salt variable—encrypted within the refreshToken—back to our refresh middleware.


### JWT Middleware

The `validRefreshNeeded()` function also verifies if the refresh token is correct for a specific user ID. If it is, then below we’ll reuse `authController.createJWT` to generate a new JWT for the user.

We also have validJWTNeeded(), which validates whether the API consumer sent a valid JWT in the HTTP headers respecting the [convention](https://jwt.io/introduction) `Authorization: Bearer <token>`. (Yes, that’s another unfortunate “auth” conflation.)


### Permission Flag Implementation

Instead of creating several similar middleware functions, we’ll use the [factory pattern](https://refactoring.guru/design-patterns/factory-method) to create a special factory method (or factory function or simply factory). Our factory function will allow us to generate—at the time of route configuration—middleware functions to check for any permission flag needed. With that, we avoid having to manually duplicate our middleware function whenever we add a new permission flag.

We want the users list to be accessible only by requests made by someone with admin permissions, but we still want the ability to create a new user to be public, as normal UX expectations flow.

Our REST API business logic allows only users with PAID_PERMISSION to update their information at all. This may or may not align with the business needs of other projects: It’s just to test the difference between paid and free permission.


### Automated Testing

We’ll use `Mocha`, `Chai`, and `SuperTest` to create our tests:

```bash
npm i --save-dev chai mocha supertest @types/chai @types/express @types/mocha @types/supertest ts-node
```

Mocha will manage our application and run the tests, Chai will allow for more readable test expression, and SuperTest will facilitate end-to-end (E2E) testing by calling our API as a REST client would.

The functions we’re passing to `before()` and `after()` get called before and after all the tests we’ll define by calling `it()` within the same `describe()` block. The function passed to `after()` takes a callback, `done`, which we ensure is only called once we’ve cleaned up both the app and its database connection.

> Note: Without our `after()` tactic, Mocha will hang even after successful test completion. The advice is often to simply always call Mocha with `--exit` to avoid this, but there’s an (often unmentioned) caveat. If the test suite would hang for other reasons—like a misconstructed Promise in the test suite or the app itself—then with `--exit`, Mocha won’t wait and will report success anyway, adding a subtle complication to debugging.


## Security 

When working with Express.js, the documentation is a must-read, particularly its [security best practices](https://expressjs.com/en/advanced/best-practice-security.html). At minimum, it’s worth pursuing:

- Configuring [TLS](https://expressjs.com/en/advanced/best-practice-security.html#use-tls) support
- Adding [rate-limiting middleware](https://github.com/nfriedly/express-rate-limit)
- Ensuring npm dependencies are secure (readers may want to start with npm audit or go deeper with [snyk](https://snyk.io/))
- Using the [Helmet](https://helmetjs.github.io/) library to help protect against common security vulnerabilities


## Containing Our REST API Project With Docker

Create a file called Dockerfile (with no extension) in the project root:

```dockerfile
FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "./dist/app.js"]
```

This configuration starts with the ```node:lts-slim``` [official image](https://hub.docker.com/_/node/) from Docker, and builds and runs our example REST API in a container. The configuration can change from case to case, but these generic-looking defaults work for our project.

To build the image, we just run this at the project root (replacing tag_your_image_here as desired):

```bash
docker build . -t tag_your_image_here
```

Then, one way to run our back end—assuming the exact same text replacement—is:

```bash
docker run -p 3000:3000 tag_your_image_here
```

## Start the application

Create `.env` file in format as in `.env.example`.

Start application with:

```bash
docker-compose up --build -d
```

Stop application with:

```bash
docker-compose down
```

Enter in stopped container: 

```bash
docker run -it --rm --entrypoint sh your_image_tag_here
```
