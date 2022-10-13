import { HttpStatusCode } from "../HttpStatusCode";
import { BaseError } from "./BaseError";

export class HTTP500Error extends BaseError {
    constructor(description = 'internal server error') {
        super('INTERNAL SERVER ERROR', HttpStatusCode.INTERNAL_SERVER, description, true);
    }
}