"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseImage = void 0;
function parseImage(data) {
    const body = data.join('');
    const fileName = getFilename(body);
    if (fileName == null) {
        return null;
    }
    const fileData = getFileData(body);
    if (fileData == null) {
        return null;
    }
    return {
        name: fileName.trim(),
        data: fileData.trim()
    };
}
exports.parseImage = parseImage;
;
function getFilename(body) {
    const pattern = /filename="(.+)"/;
    const matches = pattern.exec(body);
    if (matches === null || matches.length < 2) {
        return null;
    }
    const fileName = matches[1];
    return fileName;
}
;
function getFileData(body) {
    const lineIndex = body.indexOf('\n');
    const divider = body.slice(0, lineIndex).trim();
    const fileData = body.slice(lineIndex, body.indexOf(divider, lineIndex));
    const windowsPattern = /\r\n\r\n/;
    const linuxPattern = /\n\n/;
    let match = windowsPattern.exec(fileData);
    if (match == null) {
        match = linuxPattern.exec(fileData);
    }
    if (!match) {
        return null;
    }
    const file = fileData.slice(match.index);
    return file;
}
;
//# sourceMappingURL=imageParser.js.map