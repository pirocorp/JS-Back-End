import { IncomingMessage, ServerResponse } from "http";

import { redirectResponse } from "../http/responses/redirectResponse";
import { uploadImage as imageUpload } from "../utils/imageHelpers";

export async function uploadImage(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & {
        req: IncomingMessage;
    }
){
    const tokens = req.headers['content-type']?.split('boundary=');    

    if(!tokens || tokens.length < 2){
        redirectResponse('/', res);  
        return
    }    

    const boundary = tokens![1].trim();
    const data: Buffer[] = [];   

    req.on('data', chunk => data.push(chunk.toString('binary')));

    req.on('end', async () => {
        try {
            const file = await imageUpload(data, boundary);
        } catch (error) {
            console.error(error);
        }
    
        redirectResponse('/', res);  
    });
};
