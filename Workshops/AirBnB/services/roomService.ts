import Room from '../models/Room';

import { IRoom } from '../interfaces/IRoom';

import { ICreateRoomDTO } from '../interfaces/IRoom';
import { IAccomodationSearchDTO } from '../interfaces/IAccomodationSearchDTO';

export async function getAll(input?: IAccomodationSearchDTO): Promise<IRoom[]> {  
    const result = (await Room.find({}).lean()) as IRoom[];  

    // if(!input){
    //     return data;
    // }

    // const searchTerm = (input?.search ?? '').toLowerCase();
    // const city = (input?.city ?? '').toLowerCase();
    // const fromPrice = Number(input?.fromPrice) || 1;
    // const toPrice = Number(input?.toPrice) || 1000000000;

    // const result = data
    //     .filter(r => r.name.toLowerCase().includes(searchTerm) || r.description.toLowerCase().includes(searchTerm))
    //     .filter(r => r.city.toLowerCase().includes(city))
    //     .filter(r => r.price >= fromPrice && r.price <= toPrice);

    return result;
};

export async function getById(id: string): Promise<IRoom | null>{
    return (await Room.findById(id).lean()) as IRoom | null;
};

export async function create(roomData: ICreateRoomDTO): Promise<IRoom> {
    const room = {
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

    const result = (await Room.create(room)) as IRoom;    
    return result;
};
