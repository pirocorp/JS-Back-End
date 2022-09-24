import fs from 'fs';
import { IncomingMessage, ServerResponse } from "http";

import * as router from './router';

import { HttpMethod } from "./http/httpMethod";
import { notFoundResponse } from "./http/responses/notFoundResponse";

export async function handleRequest(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & {
        req: IncomingMessage;
    }
) {
    const requestPath = req.url ?? '/';
    const filePath = `./static${requestPath}`;

    let isFile;

    try {
        const stat = await fs.promises.stat(filePath);
        isFile = stat.isFile();
    } catch {
        isFile = false;
    }

    if (isFile) {
        fs.createReadStream(filePath).pipe(res);
        return;
    }

    var action = router.getAction(requestPath, req.method as HttpMethod);

    if (action == null) {
        notFoundResponse(res);
        return
    }

    await action(req, res);
}
