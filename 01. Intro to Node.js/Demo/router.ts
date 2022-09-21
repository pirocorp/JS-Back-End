import { IncomingMessage, ServerResponse } from "http";
import { notFound } from "./controllers/homeController";

enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

const routes: {
    [path: string]: {
        [method in Method]?: (
            req: IncomingMessage,
            res:
                ServerResponse<IncomingMessage>
                & { req: IncomingMessage; }
        ) => void;
    }
} = {
};

export function registrer(
    path: string,
    method: Method,
    handler: (
        req: IncomingMessage,
        res:
            ServerResponse<IncomingMessage>
            & { req: IncomingMessage; }
    ) => void) {

    if (routes[path] == undefined) {
        routes[path] = {}
    }

    routes[path][method] = handler;
};

export function match(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>
        & { req: IncomingMessage; }) {

    const url = new URL(req.url ?? '', `http://${req.headers.host}`);

    const actions = routes[url.pathname];

    let handler = notFound;

    if (actions != undefined && req.method) {
        if (typeof actions[req.method as Method] == 'function') {
            handler = actions[req.method as Method] ? actions[req.method as Method]! : handler;
        }
    }

    handler(req, res);
}

export const get = (
    path: string,
    handler: (
        req: IncomingMessage,
        res:
            ServerResponse<IncomingMessage>
            & { req: IncomingMessage; }
    ) => void
) => registrer(path, Method.GET, handler);

export const post = (
    path: string,
    handler: (
        req: IncomingMessage,
        res:
            ServerResponse<IncomingMessage>
            & { req: IncomingMessage; }
    ) => void
) => registrer(path, Method.POST, handler);