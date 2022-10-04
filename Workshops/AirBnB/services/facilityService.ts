import { Types } from 'mongoose';

import Facility from '../models/Facility';
import Room from '../models/Room';

import { IAvailableFacilityDTO, IFacility } from '../interfaces/IFacility';

export async function getAll(): Promise<IFacility[]> {
    return Facility.find({}).lean();
};

export async function getAllAvailable(availableFacilities: string[]) {
    return (await getAll()).map(x => ({
        _id: x._id,
        label: x.label,
        iconUrl: x.iconUrl,
        rooms: x.rooms,
        isAvailable: availableFacilities.some(a => a == x._id.toString())
    } as IAvailableFacilityDTO))
}

export async function createFacility(label: string, iconUrl: string): Promise<IFacility> {
    const result = Facility.create({
        label,
        iconUrl
    });

    return result;
};

export async function addFacilitiesToRoom(roomId: string, facilitiesIds: string[]) {
    const room = await Room.findById(roomId);
    const facilities = await Facility.find();

    if(!room){
        return
    }

    room.facilities = facilitiesIds.map(x => new Types.ObjectId(x));

    const objectRoomId = new Types.ObjectId(roomId);

    for (const facility of facilities) {
        const index = facility.rooms.indexOf(objectRoomId);

        if(index >= 0){
            facility.rooms.splice(index, 1);
        }

       if(facilitiesIds.some(id => facility.id.toString() == id)){
            facility.rooms.push(objectRoomId);
       }
    }   

    room?.save();
    Facility.bulkSave(facilities);
};