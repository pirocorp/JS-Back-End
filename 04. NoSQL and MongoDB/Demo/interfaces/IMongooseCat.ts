import { Types } from 'mongoose';
import { ICat } from "./ICat";

export interface IMongooseCat extends ICat {
    _id: Types.ObjectId;
}