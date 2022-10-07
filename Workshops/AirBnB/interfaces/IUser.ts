import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    username: string;
    hashedPassword: string;
    roles: string[];
}

export interface IJwtUser {
    _id: Types.ObjectId;
    username: string;
    roles: string[];
    iat?: number;
}