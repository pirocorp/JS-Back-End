import { Types } from "mongoose";

export interface IFacility {
    _id: Types.ObjectId;
    label: string;
    iconUrl?: string;
    rooms: Types.ObjectId[];
};

export interface IAvailableFacilityDTO extends IFacility {
    isAvailable: boolean;
}