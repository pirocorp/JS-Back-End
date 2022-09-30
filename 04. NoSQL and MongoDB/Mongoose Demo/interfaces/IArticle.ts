import { Types } from "mongoose";
import IComment from "./IComment";

interface IBaseArticle {
    _id: Types.ObjectId;
    author: string | null;
    title: string;
    content: string;
};

export default interface IArticle extends IBaseArticle {
    comments: Types.ObjectId[];
};

export interface IArticleWithCommentsDTO extends IBaseArticle {
    comments: IComment[];
};