import mongooseService from "../services/common/mongooseService";

import { IFacility } from "../interfaces/IFacility";

const Schema = mongooseService.instance.Schema;
const { ObjectId } = mongooseService.instance.Types;
const model = mongooseService.instance.model;

const facilitySchema = new Schema({
    label: { type: String, required: true },
    iconUrl: { type: String },
    rooms: { type: [ObjectId], default: [], ref: 'Room' },
});

const Facility = model<IFacility>('Facility', facilitySchema);
export default Facility;
