import Room from '../models/Room';

import { IDetailsRoomDTO, IRoom } from '../interfaces/IRoom';
import { IFacility } from '../interfaces/IFacility';

import { IRoomDTO } from '../interfaces/IRoom';
import { IAccomodationSearchDTO } from '../interfaces/IAccomodationSearchDTO';
import { isValidObjectId } from 'mongoose';
import { IUser } from '../interfaces/IUser';

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

    return query.lean();
};

export function getRoomById(id: string) {
    if(isValidObjectId(id)){
        return Room.findById(id).lean();        
    }

    return null;
};

export async function getRoomDetailsById(id: string): Promise<IDetailsRoomDTO | null> {
    if(isValidObjectId(id)){
        return getRoomById(id)!
            .populate<{ facilities: IFacility[] }>('facilities')
            .populate<{ owner: IUser }>('owner');        
    }

    return null;
};

export async function create(roomData: IRoomDTO, ownerId: string): Promise<IRoom> {
    const room = {
        name: roomData.name,
        description: roomData.description,
        city: roomData.city,
        beds: Number(roomData.beds),
        price: Number(roomData.price),
        imageUrl: roomData.imageUrl,
        owner: ownerId
    };

    const missing = Object.entries(room).filter(([k, v]) => !v);

    if(missing.length > 0) {
        const errorMessage = missing
            .map(m => `${m[0]} is required`)
            .join('\n');

        throw new Error(errorMessage);        
    }

    return Room.create(room);
};

export async function edit(roomData: IRoomDTO, roomId: string): Promise<IRoom | null> {
    if(!isValidObjectId(roomId)) {
        return null;
    }

    const missing = Object.entries(roomData).filter(([k, v]) => !v);

    if(missing.length > 0) {
        const errorMessage = missing
            .map(m => `${m[0]} is required`)
            .join('\n');

        throw new Error(errorMessage);        
    }  

    const room = await Room.findById(roomId);

    if(!room) {
        return null;
    }
  
    room.beds = Number(roomData.beds);
    room.price = Number(roomData.price);
    room.name = roomData.name;
    room.city = roomData.city;
    room.description = roomData.description;
    room.imageUrl = roomData.imageUrl;

    await room.save();    
    return room;
};

export async function deleteById(roomId: string): Promise<IRoom | null> {
    if(!isValidObjectId(roomId)) {
        return null;
    }

    return Room.findByIdAndRemove(roomId);
};
