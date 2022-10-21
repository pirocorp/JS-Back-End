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





























