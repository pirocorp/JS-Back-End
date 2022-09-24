import { createReadStream, promises as fs } from 'fs';
import { IncomingMessage, ServerResponse } from "http";

export async function homePage(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & {
        req: IncomingMessage;
    }
){
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    const filePath = './views/home/index.html';

    let layout: Buffer;

    try {
        layout = await fs.readFile(filePath);
    } catch (error) {
        console.error(error);     
        return   
    }

    const content = await getImageList();

    const result = layout
        .toString()
        .replace('<%%imageboard%%>', content);

    res.write(result);
    res.end();
};

async function getImageList(): Promise<string> {
    const files = await fs.readdir('./static/img');

    return `
    <ul>
        ${files.map(imageCard).join('\n')}
    </ul>
    `;
}

function imageCard(filename: string): string {
    return `
    <li class="item">
        <img src="/img/${filename}"/>
    </li>`;
}