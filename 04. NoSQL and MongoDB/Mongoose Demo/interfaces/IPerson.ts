import { Types } from "mongoose";

export default interface IPerson {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    name: string;
    age: number;
};