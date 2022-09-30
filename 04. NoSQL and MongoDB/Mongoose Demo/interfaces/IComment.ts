import { Types } from "mongoose";

export default interface IComment {
    _id: Types.ObjectId;
    author: string | null; 
    content: string;
}