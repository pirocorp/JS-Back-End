import mongooseService from "../services/common/mongooseService";

import { IRoom } from "../interfaces/IRoom";

const Schema = mongooseService.instance.Schema;
const { ObjectId } = mongooseService.instance.Types;
const model = mongooseService.instance.model;

const roomSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    city: { type: String, required: true },
    beds: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0.01 },
    imageUrl: { type: String },
    facilities: { type: [ ObjectId ], default: [], ref: 'Facility' },
    owner: { type: ObjectId, ref: 'User', required: true }
});

const Room = model<IRoom>('Room', roomSchema);
export default Room;
