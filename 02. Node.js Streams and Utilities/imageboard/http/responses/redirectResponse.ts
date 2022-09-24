import { IncomingMessage, ServerResponse } from "http";

export function redirectResponse(
    location: string,
    res: ServerResponse<IncomingMessage> & {
        req: IncomingMessage;
    }
) {
    res.writeHead(301, {
        'Location': location
    });
    
    res.end();  
}