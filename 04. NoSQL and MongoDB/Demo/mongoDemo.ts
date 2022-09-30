import * as mongodb from 'mongodb';

import { ICat } from './interfaces/ICat';

const connetctionString = "mongodb://localhost:27017";
const client = new mongodb.MongoClient(connetctionString);

export async function mongoDemo() {
    console.log('>>> Mongo Demo');    

    try {
        await client.connect();
        console.log('Database conected');

        const db = client.db('testdb');
        const collection = db.collection<ICat>('cats');
        const query = collection.find({});
        const result = await query.toArray();

        result[0]._id;

        console.log(result);        
        
    } catch (error) {
        console.error(error);
    }

    console.log('>>> End Mongo Demo');
};