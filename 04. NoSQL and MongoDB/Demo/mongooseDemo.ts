import { Schema, model, connect } from 'mongoose';

import { ICat } from './interfaces/ICat';
import { IMongooseCat } from './interfaces/IMongooseCat';

// Create a Schema corresponding to the document interface.
const catSchema = new Schema<ICat>({
    name: { type: String, required: true },
    age: { type: Number, required: true }
    // organization: { type: Schema.Types.ObjectId, ref: 'Owner' } - Foreign Key
});

// Create a Model.
const Cat = model<IMongooseCat>('cats', catSchema);

const connetctionString = "mongodb://localhost:27017/testdb";

export async function mongooseDemo() {
    // connect to MongoDB
    console.log('>>> Mongoose Demo');    

    await connect(connetctionString);

    const result = await Cat.find<IMongooseCat>({});

    result[0]._id;

    console.log(result);
    
    console.log('>>> End Mongoose Demo');
}