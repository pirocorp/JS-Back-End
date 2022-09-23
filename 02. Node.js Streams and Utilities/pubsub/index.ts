import http, { IncomingMessage } from 'http';
import fs from 'fs';

import { fsDemo } from './fs-demo';

import * as module1 from './module1';
import * as module2 from './module2';
import * as module3 from './module3';

function pubsubDemo() {
    module1.listen();
    module3.listen();
    module2.produce();
};

//pubsubDemo();

// Stream standart input
function standartInputStreamDemo() {
    const result: Buffer[] = [];

    process.stdin.on('data', (chunk) => {
        result.push(chunk);

        console.log();
        console.log(result.join(''));
    });
};

//standartInputStreamDemo();

async function fileSystemDemo() {
    await fsDemo();
}

// fileSystemDemo();

async function httpStreemDemo() {
    // request is readable stream, response is writable stream 
    const server = http.createServer(requestListener);
    server.listen(3000);
};

httpStreemDemo();

async function requestListener(
    req: IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
    }
){
    if (req.method == 'GET') {
        const requestPath = req.url === '/' ? '/index.html' : req.url;
        const filePath = `./static${requestPath}`;

        let isFile = false;

        try{
            const stat = await fs.promises.stat(filePath);
            isFile = stat.isFile();
        }catch{
            isFile = false;
        }               

        if (isFile) {  
            piepFileStream(filePath, res);
        } else {
            res.writeHead(404);
            res.write('404 Not Found');
            res.end();
        }
    } else if (req.method == 'POST') {
        const body: Buffer[] = [];

        const dataHandler = (chunk: Buffer) => {
            body.push(chunk);
        };

        const endHandler = () => {
            const result = JSON.parse(body.join(''));

            console.log(result);

            result.count = result.count + 1;

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.write(JSON.stringify(result));
            res.end();
        }

        req.on('data', dataHandler);
        req.on('end', endHandler);
    }
}

const sendFileSync = (
    path: string,
    res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
    }
) => { 
    const file = fs.readFileSync(path);

    res.write(file);
    res.end();
}

const sendFileAsync = async (
    path: string,
    res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
    }
) => {
    const file = await fs.promises.readFile(path);

    res.write(file);
    res.end();
}

const sendFileStream = (
    path: string,
    res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
    }
) => {
    const fileStream = fs.createReadStream(path);
    fileStream.on('data', chunk => res.write(chunk));
    fileStream.on('end', () => res.end());
}

const piepFileStream = (
    path: string,
    res: http.ServerResponse<http.IncomingMessage> & {
        req: http.IncomingMessage;
    }
) => fs.createReadStream(path).pipe(res);
