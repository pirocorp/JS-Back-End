import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    email: string;
    password: string;
    firstName: string,
    lastName: string,
    permissionFlags: number,
}