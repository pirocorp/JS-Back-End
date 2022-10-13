import { HttpStatusCode } from "../HttpStatusCode";
import { BaseError } from "./BaseError";

export class HTTP400Error extends BaseError {
    constructor(description = 'bad request') {
        super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, description, true);
    }
}