import fs from 'fs';
import { Room } from '../models/Entities/Room';

import { CreateRoomFormModel } from '../models/Rooms/CreateRoomFormModel';

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
};

export async function create(roomData: CreateRoomFormModel): Promise<Room> {
    const room: Room = {
        id: getId(),
        name: roomData.name,
        description: roomData.description,
        city: roomData.city,
        beds: Number(roomData.beds),
        price: Number(roomData.price),
        imageUrl: roomData.imageUrl
    };
    
    data.push(room);
    await persists();

    return room;
};

function getId(){
    return ('000000' + (Math.random() * 999999 | 0).toString(16)).slice(-6);
};
