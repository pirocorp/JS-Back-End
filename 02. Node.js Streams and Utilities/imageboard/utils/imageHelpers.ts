import { IncomingMessage } from "http";
import { promises as fs } from "fs";

import { IImageFile } from "../interfaces/IImageFile";

export function uploadImage(req: IncomingMessage) {
    const data: Buffer[] = [];

    return new Promise<IImageFile>((resolve, reject) => {
        req.on('data', chunk => data.push(chunk.toString('binary')));
        req.on('end', async () => {
            const file = parseImage(data);

            if(file == null){
                reject();
                return
            }

            const prefix = ('00000' + (Math.random() * 9999999 | 0)).slice(-5);
            await fs.writeFile(`./static/img/${prefix}-${file.name}`, file.data, 'binary');

            resolve(file);
        });
    });
};

export function parseImage(data: Buffer[]): IImageFile | null {
    const body = data.join('');
    const fileName = getFilename(body);

    if(fileName == null){
        return null;
    }

    const fileData = getFileData(body);
    
    if(fileData == null){
        return null;
    }

    return {
        name: fileName.trim(),
        data: fileData.trim()
    }
};

function getFilename(body: string) {
    const pattern = /filename="(.+)"/;
    const matches = pattern.exec(body);

    if(matches === null || matches.length < 2){
        return null;
    }

    const fileName = matches[1];
    return fileName;
};

function getFileData(body: string) {
    const lineIndex = body.indexOf('\n');
    const divider = body.slice(0, lineIndex).trim();

    const fileData = body.slice(lineIndex, body.indexOf(divider, lineIndex));

    const windowsPattern = /\r\n\r\n/;
    const linuxPattern = /\n\n/;

    let match = windowsPattern.exec(fileData);

    if(match == null){
        match = linuxPattern.exec(fileData);
    }

    if(!match){
        return null;
    }

    const file = fileData.slice(match.index);
    return file;
};
