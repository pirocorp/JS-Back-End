import { Types } from "mongoose";
import { IFacility } from "./IFacility";
import { IUser } from "./IUser";

export interface IRoom {
    _id: Types.ObjectId;
    name: string;
    description: string;
    city: string;
    beds: number;
    price: number;
    imageUrl: string;
    facilities: Types.ObjectId[];
    owner: Types.ObjectId;
};

export interface IRoomDTO {
    name: string;
    description: string;
    city: string;
    beds: string;
    price: string;
    imageUrl: string;
};

export interface IDetailsRoomDTO {
    _id: Types.ObjectId;
    name: string;
    description: string;
    city: string;
    beds: number;
    price: number;
    imageUrl: string;
    facilities: IFacility[];
    owner: IUser;
}