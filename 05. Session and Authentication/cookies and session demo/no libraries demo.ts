import { createServer, IncomingMessage, ServerResponse } from "http";

import ISession from "./interfaces/ISession";

const server = createServer((req, res) => {
    if(req.url == '/'){
        action(req, res);
    } else {
        res.writeHead(404);
        res.end();
    }

}).listen(3000);

const parseCookie = (data?: string): { [key: string]: string } => {
    if(!data) {
        return {};
    }

    const tokens = data
        .split(';')
        .map(x => x.trim())
        .map(c => c.split('='));

    const cookies = Object.fromEntries(tokens);
    console.log(`>>> Cookie: ${JSON.stringify(cookies, null, "\t")}`);
    return cookies;
};

const sessions: { 
    [key: string]: ISession
} = {};

const action = (req: IncomingMessage, res: ServerResponse) => {
    const cookies = parseCookie(req.headers.cookie);
    const sessionId = cookies.sessionId || (Math.random() * 999999).toString(16);
    const session = sessions[sessionId] || {};

    session.visited = (session.visited || 0) + 1;

    sessions[sessionId] = session;

    res.writeHead(200, [
        'Set-Cookie', `sessionId=${sessionId}; httpOnly`,
        'Set-Cookie', `theme=dark`,
    ]);
    res.write(`
        <p>Hello</p>
        <p>You have visited this page ${session.visited} times.</p>
    `);
    res.end();

    console.log('>>> Sessions');    
    console.log(sessions);    
};
