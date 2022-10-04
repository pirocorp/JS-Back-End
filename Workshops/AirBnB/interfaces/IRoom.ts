import { Types } from "mongoose";

export interface IRoom {
    _id: Types.ObjectId;
    name: string;
    description: string;
    city: string;
    beds: number;
    price: number;
    imageUrl: string;
    facilities: Types.ObjectId[];
};

export interface ICreateRoomDTO {
    name: string;
    description: string;
    city: string;
    beds: string;
    price: string;
    imageUrl: string;
};