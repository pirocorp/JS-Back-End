import Room from '../models/Room';

import { IRoom } from '../interfaces/IRoom';

import { ICreateRoomDTO } from '../interfaces/IRoom';
import { IAccomodationSearchDTO } from '../interfaces/IAccomodationSearchDTO';

export async function getAll(input?: IAccomodationSearchDTO): Promise<IRoom[]> {  
    let query = Room.find({});  

    if(input){
        const searchTerm = (input?.search ?? '').toLowerCase();
        const city = (input?.city ?? '').toLowerCase();
        const fromPrice = Number(input?.fromPrice) || 1;
        const toPrice = Number(input?.toPrice) || 1000000000;

        const searchRegex = new RegExp(searchTerm, 'i');
        const cityRegex = new RegExp(city, 'i');

        // query = query
        //     .regex('name', searchRegex)
        //     .regex('city', cityRegex)
        //     .where('price').gte(fromPrice).lte(toPrice);

        query = query.find({
            name: { $regex: searchRegex },
            city: { $regex: cityRegex },
            price: { $gte: fromPrice, $lte: toPrice }
        });
    }

    const result = await query.lean();
    return result as IRoom[];
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
