import { IncomingMessage, ServerResponse } from "http";
import { HttpMethod } from "./http/httpMethod";

const router: {
    [path: string]: {
        [method in HttpMethod]?: (
            req: IncomingMessage,
            res: ServerResponse<IncomingMessage> & {
                req: IncomingMessage;
            }) => Promise<void>
    }
} = {    
};

export const getAction = (
    path: string,
    method: HttpMethod,
) => {
    
    if(!exists(path, method)){
        return null;
    }

    return router[path][method];
};

export const register = (
    route: string,
    method: HttpMethod,
    action: (
        req: IncomingMessage,
        res: ServerResponse<IncomingMessage> & {
            req: IncomingMessage;
        }) => Promise<void>
) => {
    if(router[route] == null){
        router[route] = {};
    }

    router[route][method] = action;
};

export const exists = (path: string, method: HttpMethod) => router[path] != null && router[path][method] != null;