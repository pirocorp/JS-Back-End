import { IncomingMessage, ServerResponse } from "http";

import { redirectResponse } from "../http/responses/redirectResponse";
import { uploadImage as imageUpload } from "../utils/imageHelpers";

export async function uploadImage(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & {
        req: IncomingMessage;
    }
){
    const file = await imageUpload(req);
    redirectResponse('/', res);  
};
