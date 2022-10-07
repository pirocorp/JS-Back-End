import mongooseService from "../services/common/mongooseService";

import { IUser } from "../interfaces/IUser";

const Schema = mongooseService.instance.Schema;
const model = mongooseService.instance.model;

const userSchema = new Schema({
    username: { type: String, minlength: 3 },
    hashedPassword: { type: String, requiered: true },
    roles: { type: [{ type: String, enum: ['user', 'admin']}], default: ['user']}
});

const User = model<IUser>('User', userSchema);
export default User;