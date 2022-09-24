import { promises as fs } from "fs";

import { IncomingMessage, ServerResponse } from "http";
import { redirectResponse } from "../http/responses/redirectResponse";
import { parseImage } from "../utils/imageParser";

export async function createImage(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & {
        req: IncomingMessage;
    }
){
    const data: Buffer[] = [];

    req.on('data', chunk => data.push(chunk));
    req.on('end', async () => {        
        const file = parseImage(data);

        if(file == null){
            redirectResponse('/', res);
            return
        }

        const prefix = ('00000' + (Math.random() * 9999999 | 0)).slice(-5);
        await fs.writeFile(`./static/img/${prefix}-${file.fileName}`, file.fileData, 'utf8');

        redirectResponse('/', res);
    });    
};
