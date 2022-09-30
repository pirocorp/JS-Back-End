import mongooseService from "../common/services/MongooseService";

import IComment from "../interfaces/IComment";

const Schema = mongooseService.instance.Schema;
const model = mongooseService.instance.model;

const commentSchema = new Schema({
    author: String,
    content: { type: String, required: true },
});

const Comment = model<IComment>('Comment', commentSchema);
export default Comment;
