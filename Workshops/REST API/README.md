# Rest API with Node.js, MongoDB and TypeScript

## Common Concepts

### Objects

In traditional web development, you might only use model (i.e. ORM framework) for data hosting and DB persistency. In **DDD**, there are many objects: **Data Object (DO)**, **Data Access Object (DAO)**, **Entity (Domain Model)**, **Value Object**, **Aggregate Root**, **Data Transfer Object (DTO)**, **Domain Event**.


#### Data Object (DO)

**Data Object (DO)** is a data class we defined for mongoose schema. It reflects what we stored in the DB, such as **UserDO**.


#### Data Access Object (DAO)

**Data Access Object (DAO)** is a model class provided by mongoose or other ORM with **DO** as the generic type, such as **Model\<UserDO\>**.


#### Entity (Domain Model)

**Entity (Domain Model)** is a business class object that we define to process business logics, such as **User**.


#### DTO

**DTO** is a validation class object that we define to transfer/validate request attributes, such as **CreateUserDTO** and **UpdateUserDTO**. This is because updating users and creating users might need different attributes such as **ID**.


#### Domain Event (optional)

**Domain Event (optional)** is an event class object that reflects the side effects of a business logic operation, such as **CreateUserEvent**. It’s very useful in microservices architecture.


#### Why we need so many objects? 

- **DO vs Entity**: Sometimes what we stored in **DB** is not a **business entity** and it will need some aggregation or transformation. This is very common in **SQL** **databases** such as **1:N or N:N relationships**.
- **DO vs DAO**: In DDD we can still utilize DAO to avoid write raw SQL queries even if you might use repository pattern.
- **DAO vs DTO**: A DAO is responsible for connecting to a defined database and performing CRUD operations; a DTO is an object that holds the raw data that the DAO will send to—and receive from—the database.
- **Entity vs DTO**: In most cases, when creating an entity, we won’t send all attributes in from UI or API such as primary key, IDs, created time, etc. Instead, we probably only allow users to send some non-key information such as name or title. This is way we normally separate **Entity** and **DTO**.
- **Entity vs Value Object**: **Entity** is a primary object that has significance (normally has an ID) such as **User** while **Value Object** is more like a complex attribute such as **Phone** and **Location** which can have some **validation logic inside**.
- **Aggregated Root**: In my word, you can assume an aggregate root is a top-level entity within its context. In a blog app, there might be some entities such as **Post**, **Comment**, **Like**, where **Post** is an **aggregated root** because **Comment** and **Like** normally **rely** on a **Post**.


#### Aggregated Root

An **AGGREGATE** is a cluster of associated objects that we treat as a unit for the purpose of data changes. Each **AGGREGATE** has a root and a boundary. The boundary defines what is inside the **AGGREGATE**. The root is a single, specific **ENTITY** contained in the **AGGREGATE**.

The root is the only member of the **AGGREGATE** that outside objects are allowed to hold references to.


##### Aggregated Root Repository

In the context of the repository pattern, **aggregate roots** are the only objects your client code loads from the **repository**.

**The repository encapsulates access to child objects** - from a caller's perspective it automatically loads them, either at the same time the root is loaded or when they're actually needed (as with lazy loading).

For example, you might have an **Order** object which encapsulates operations on multiple **LineItem** objects. Your client code would never load the **LineItem** objects directly, just the **Order** that contains them, which would be the **aggregate root** for that part of your domain.

![image](https://user-images.githubusercontent.com/34960418/197242336-ef53b98e-e04f-4e08-9b8a-effd4a70d275.png)


### Layers

Next, we will introduce some concepts regarding code structures.

**Infrastructure Layer**: handle DB persistence, cache, external service, etc, such as **DAO** and **repository**.

**Domain Layer**: handle business logics such as **domain services**, **entity (domain model)**, **domain events**, etc. Here business logic refers to some complex operations (e.g., money transfer).

**Application Layer**: handle the orchestration of domain layers, such as application service. For example, call **user.register(userInput); ** **event.dispatch(userRegisterEvent);**

**Business Logic places into two layers**, the **Domain layer** and the **Application Layer**, while they contain different kinds of business logic.

**Domain Layer** implements the core, use-case independent business logic of the domain/system.
**Application Layer** implements the use cases of the application based on the domain. A use case can be thought as a user interaction on the User Interface (UI).
**Presentation Layer** contains the UI elements (pages, components) of the application.
**Infrastructure Layer** supports other layer by implementing the abstractions and integrations to 3rd-party library and systems.

![image](https://user-images.githubusercontent.com/34960418/197245158-7e79a851-c740-4087-87a8-7f79f4a70f52.png)


#### Core Building Blocks

**DDD** mostly **focuses on the Domain & Application Layers** and ignores the Presentation and Infrastructure. They are seen as *details* and the business layers should not depend on them.


##### Domain Layer Building Blocks

- **Entity**: An Entity is an object with its own properties (state, data) and methods that implements the business logic that is executed on these properties. An entity is represented by its unique identifier (Id). Two entity object with different Ids are considered as different entities.
- **Value Object**: A Value Object is another kind of domain object that is identified by its properties rather than a unique Id. That means two Value Objects with same properties are considered as the same object. Value objects are generally implemented as immutable and mostly are much simpler than the Entities.
- **Aggregate & Aggregate Root**: An Aggregate is a cluster of objects (entities and value objects) bound together by an Aggregate Root object. The Aggregate Root is a specific type of an entity with some additional responsibilities.
- **Repository (interface)**: A Repository is a collection-like interface that is used by the Domain and Application Layers to access to the data persistence system (the database). It hides the complexity of the DBMS from the business code. Domain Layer contains the interfaces of the repositories.
- **Domain Service**: A Domain Service is a stateless service that implements core business rules of the domain. It is useful to implement domain logic that depends on multiple aggregate (entity) type or some external services.
- **Specification**: A Specification is used to define named, reusable and combinable filters for entities and other business objects.
- **Domain Event**: A Domain Event is a way of informing other services in a loosely coupled manner, when a domain specific event occurs.


##### Application Layer Building Blocks

- **Application Service**: An Application Service is a stateless service that implements use cases of the application. An application service typically gets and returns DTOs. It is used by the Presentation Layer. It uses and coordinates the domain objects to implement the use cases. A use case is typically considered as a **Unit Of Work**.
- **Data Transfer Object (DTO)**: A **DTO** is a simple object without any business logic that is used to transfer state (data) between the **Application** and **Presentation** **Layers**.
- **Unit of Work (UOW)**: A **Unit of Work** is an atomic work that should be done as a transaction unit. All the operations inside a UOW should be committed on success or rolled back on a failure.


#### Very general code infrastructure of a user management app.

![image](https://user-images.githubusercontent.com/34960418/197244636-694622a4-63c3-4c49-abe3-b088022d188f.png)

![image](https://user-images.githubusercontent.com/34960418/197244786-da679884-5255-440f-aac9-30c7b1456e40.png)


## Implementation

### Libraries used in the project

- `debug` - is a module that we will use to avoid calling ```console.log()``` while developing our application. This way, we can easily filter debug statements during troubleshooting. They can also be switched off entirely in production instead of having to be removed manually.

- `winston` - is responsible for logging requests to our API and the responses (and errors) returned. `express-winston` integrates directly with **Express.js**, so that all standard API-related `winston` logging code is already done.

- `cors` - is a piece of **Express.js** middleware that allows us to enable [cross-origin resource sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). Without this, our API would only be usable from front ends being served from the exact same subdomain as our back end.

- `mongoose` - To communicate with MongoDB, our back end will leverage an object data modeling (ODM) library called [Mongoose](https://mongoosejs.com/). While Mongoose is quite easy to use, it’s worth checking out the [documentation](https://mongoosejs.com/docs/guide.html) to learn all of the advanced possibilities it offers for real-world projects.

- `express-validator` - quite stable, easy to use, and decently documented field validation tool.

### Modules

The idea behind the project structure’s two folders (`common` and `users`) is to have individual modules that have their own responsibilities. In this sense, we are eventually going to have some or all of the following for each module:

- **Route configuration** to define the requests our API can handle
- **Services** for tasks such as connecting to our database models, doing queries, or connecting to external services that are required by the specific request
- **Middleware** for running specific request validations before the final controller of a route handles its specifics
- **Models** for defining data models matching a given database schema, to facilitate data storage and retrieval
- **Controllers** for separating the route configuration from the code that finally (after any middleware) processes a route request, calls the above service functions if necessary, and gives a response to the client


### Installing MongoDB As a Container

The only thing readers need to do is [install Docker](https://docs.docker.com/engine/install/) and then [install Docker Compose](https://docs.docker.com/compose/install/). Once installed, running ```docker -v``` in a terminal should yield a Docker version number.

Now, to run MongoDB, at the root of our project we’ll create a YAML file called `docker-compose.yml` containing the following:

```yaml
version: '3'
services:
  mongo:
    image: mongo
    volumes:
      - ./data:/data/db
    ports:
      - "27017:27017"
```

Run MongoDB without having to install it locally

```bash
docker-compose up -d
```

![image](https://user-images.githubusercontent.com/34960418/197530551-e0ff30d4-a939-40f6-8227-a40e611a2932.png)

The `up` command will start the defined container, listening on the standard MongoDB port of 27017. The `-d` switch will detach the command from the terminal. If everything runs without issue we should see a message like this:

```
Creating network "toptal-rest-series_default" with the default driver
Creating toptal-rest-series_mongo_1 ... done
```

Now, if we need to shut down our MongoDB Docker container, we just need to run ```docker-compose down``` and we should see the following output:

![image](https://user-images.githubusercontent.com/34960418/197531573-6a9a35ef-d390-430f-897f-341bc21b9180.png)

```
Stopping toptal-rest-series_mongo_1 ... done
Removing toptal-rest-series_mongo_1 ... done
Removing network toptal-rest-series_default
```

### Configure Mongoose [Options](https://mongoosejs.com/docs/connections.html#options)

- ```useNewUrlParser``` - Without this set to ```true```, Mongoose prints a deprecation warning.
- ```useUnifiedTopology``` - The Mongoose documentation recommends setting this to ```true``` to use a newer connection management engine.
- ```serverSelectionTimeoutMS``` -  For the purpose of the UX of this demo project, a shorter time than the default of 30 seconds means that any readers who forget to start MongoDB before Node.js will see helpful feedback about it sooner, instead of an apparently unresponsive back end.


### Model Validation

To set the fields we want to validate, we’ll use the ```body()``` method that we’ll import at our `users.routes.config.ts`. The ```body()``` method will validate fields and generate an errors list—stored in the ```express.Request``` object—in case of failure.