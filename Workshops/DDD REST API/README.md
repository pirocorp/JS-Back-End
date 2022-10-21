# Domain-Driven Design (DDD) with Node.js and MongoDB

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


### Why we need so many objects? 

- **DO vs Entity**: Sometimes what we stored in **DB** is not a **business entity** and it will need some aggregation or transformation. This is very common in **SQL** **databases** such as **1:N or N:N relationships**.
- **DO vs DAO**: In DDD we can still utilize DAO to avoid write raw SQL queries even if you might use repository pattern.
- **Entity vs DTO**: In most cases, when creating an entity, we won’t send all attributes in from UI or API such as primary key, IDs, created time, etc. Instead, we probably only allow users to send some non-key information such as name or title. This is way we normally separate **Entity** and **DTO**.
- **Entity vs Value Object**: **Entity** is a primary object that has significance (normally has an ID) such as **User** while **Value Object** is more like a complex attribute such as **Phone** and **Location** which can have some **validation logic inside**.
- **Aggregated Root**: In my word, you can assume an aggregate root is a top-level entity within its context. In a blog app, there might be some entities such as **Post**, **Comment**, **Like**, where **Post** is an **aggregated root** because **Comment** and **Like** normally **rely** on a **Post**.


### Aggregated Root

An **AGGREGATE** is a cluster of associated objects that we treat as a unit for the purpose of data changes. Each **AGGREGATE** has a root and a boundary. The boundary defines what is inside the **AGGREGATE**. The root is a single, specific **ENTITY** contained in the **AGGREGATE**.

The root is the only member of the **AGGREGATE** that outside objects are allowed to hold references to.


#### Aggregated Root Repository

In the context of the repository pattern, **aggregate roots** are the only objects your client code loads from the **repository**.

**The repository encapsulates access to child objects** - from a caller's perspective it automatically loads them, either at the same time the root is loaded or when they're actually needed (as with lazy loading).

For example, you might have an **Order** object which encapsulates operations on multiple **LineItem** objects. Your client code would never load the **LineItem** objects directly, just the **Order** that contains them, which would be the **aggregate root** for that part of your domain.























