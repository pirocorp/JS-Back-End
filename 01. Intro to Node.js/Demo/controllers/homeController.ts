import { IncomingMessage, ServerResponse } from "http";
import { html } from "../until";

export function homePage(
    req: IncomingMessage, 
    res: ServerResponse<IncomingMessage> & {
        req: IncomingMessage;
    }
){
    const content = `<h1>Hello World</h1>`;

    res.write(html(content));
    res.end();
};

export function aboutPage(
    req: IncomingMessage, 
    res: ServerResponse<IncomingMessage> & {
        req: IncomingMessage;
    }
){
    const content = `
        <h1>About Us</h1>
        <p>Contact: +1 555 6598</p>`;

    res.write(html(content));
    res.end();
};

export function notFound(
    req: IncomingMessage, 
    res: ServerResponse<IncomingMessage> & {
        req: IncomingMessage;
    }
){
    const content = `
        <h1>404 Not Found</h1>
        <p>The resource you requested cannot be found</p>
    `;

    res.write(html(content));
    res.end();
};