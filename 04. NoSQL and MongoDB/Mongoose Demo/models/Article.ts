import mongooseService from "../common/services/MongooseService";

import IArticle from "../interfaces/IArticle";

const Types = mongooseService.instance.Types;
const Schema = mongooseService.instance.Schema;
const model = mongooseService.instance.model;

const articleSchema =  new Schema({
    author: String,
    title: { type: String, required: true, minLength: 10 },
    content: { type: String, required: true, minLength: 10 },
    comments: { type: [Types.ObjectId], default: [], ref: "Comment" },
});

const Article = model<IArticle>("Article", articleSchema);
export default Article;