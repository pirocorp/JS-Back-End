import fs from 'fs';

import { IRoom } from '../interfaces/IRoom';

import { ICreateRoomDTO } from '../interfaces/IRoom';
import { IAccomodationSearchDTO } from '../interfaces/IAccomodationSearchDTO';

const fileName = './models/data.json';
const data: IRoom[] = JSON.parse(fs.readFileSync(fileName).toString());

// Convert a callback into async/await (wrap it in a Promise)
async function persists() {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            fileName, 
            JSON.stringify(data, null, '\t'), 
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

export function getAll(input?: IAccomodationSearchDTO) {   
    if(!input){
        return data;
    }

    const searchTerm = input?.search ?? '';
    const city = input?.city ?? '';
    const fromPrice = Number(input?.fromPrice) || 1;
    const toPrice = Number(input?.toPrice) || 1000000000;

    const result = data
        .filter(r => 
            r.name.toLowerCase().includes(searchTerm.toLowerCase())
            && r.city.toLowerCase().includes(city.toLowerCase())
            && r.price >= fromPrice && r.price <= toPrice
        );

    return result;
};

export function getById(id: string) {
    return data.find(a => a.id === id);
};

export async function create(roomData: ICreateRoomDTO): Promise<IRoom> {
    const room: IRoom = {
        id: getId(),
        name: roomData.name,
        description: roomData.description,
        city: roomData.city,
        beds: Number(roomData.beds),
        price: Number(roomData.price),
        imageUrl: roomData.imageUrl
    };

    const missing = Object.entries(room).filter(([k, v]) => !v);

    if(missing.length > 0){
        const errorMessage = missing
            .map(m => `${m[0]} is required`)
            .join('\n');

        throw new Error(errorMessage);        
    }
    
    data.push(room);
    await persists();

    return room;
};

function getId(){
    return ('000000' + (Math.random() * 999999 | 0).toString(16)).slice(-6);
};
