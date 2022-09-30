import mongooseService from "../common/services/MongooseService";

import IPerson from "../interfaces/IPerson";

const Schema = mongooseService.instance.Schema;
const model = mongooseService.instance.model;

const personSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true, min: [0, 'Age cannot be negative'] },
});

personSchema
    .virtual('name')
    .get(function() {
        return `${this.firstName} ${this.lastName}`
    })
    .set(function(name: string) {
        const [firstName, lastName] = (name).split(' ');

        this.firstName = firstName;
        this.lastName = lastName;
    });

const Person = model<IPerson>('Person', personSchema);
export default Person;
