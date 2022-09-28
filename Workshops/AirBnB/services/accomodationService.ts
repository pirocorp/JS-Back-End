import fs from 'fs';
import { Room } from '../models/Room';

const fileName = './models/data.json';
const data: Room[] = JSON.parse(fs.readFileSync(fileName).toString());

// Convert a callback into async/await (wrap it in a Promise)
async function persists() {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            fileName, 
            JSON.stringify(data), 
            (err) => {
                if(err == null){
                    resolve(null);
                } else {
                    reject(err);
                }
            }
        );
    });
};

export function getAll() {
    return data;
};

export function getById(id: string) {
    return data.find(a => a.id === id);
}