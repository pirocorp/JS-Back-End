import { promises as fs } from "fs";
import { IImageFile } from "../interfaces/IImageFile";

export async function uploadImage(data: Buffer[], boundary: string){    
    const file = parseImage(data, boundary!);

    if(file == null){
        return null;
    }

    const prefix = ('00000' + (Math.random() * 9999999 | 0)).slice(-5);
    await fs.writeFile(`./static/img/${prefix}-${file.name}`, file.data, 'binary');

    return file;
};

export function parseImage(
    data: Buffer[], 
    boundry: string
): IImageFile | null {
    const body = data.join('');
    const fileName = getFilename(body);

    if(fileName == null){
        return null;
    }

    const fileData = getFileData(body, boundry);
    
    if(fileData == null){
        return null;
    }

    return {
        name: fileName.trim(),
        data: fileData.trim()
    }
};

function getFilename(data: string){
    const pattern = /filename="(.+)"/;
    const matches = pattern.exec(data);

    if(matches === null || matches.length < 2){
        return null;
    }

    const fileName = matches[1];
    return fileName;
};

function getFileData(body: string, boundary: string){
    const lineIndex = body.indexOf('\n');
    const fileData = body.slice(lineIndex, body.indexOf(boundary, lineIndex));

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
