import { IRoom } from "../interfaces/IRoom";
import mongooseService from "../services/common/mongooseService";

const Schema = mongooseService.instance.Schema;
const model = mongooseService.instance.model;

const roomSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    beds: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0.01 },
    imageUrl: { type: String },
});

const Room = model<IRoom>('Room', roomSchema);
export default Room;