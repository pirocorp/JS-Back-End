import { HttpStatusCode } from "../HttpStatusCode";
import { BaseError } from "./BaseError";

export class HTTP404Error extends BaseError {
    constructor(description = 'not found') {
        super('NOT FOUND', HttpStatusCode.BAD_REQUEST, description, true);
    }
}