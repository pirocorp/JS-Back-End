import { IncomingMessage, ServerResponse } from "http";

export const notFoundResponse = (
    res: ServerResponse<IncomingMessage> & {
        req: IncomingMessage;
    }
) => {
    res.writeHead(404);
    res.write('404 Not Found');
    res.end();
}