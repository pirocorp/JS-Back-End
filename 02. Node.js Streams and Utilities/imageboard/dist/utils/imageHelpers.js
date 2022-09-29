"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseImage = exports.uploadImage = void 0;
const fs_1 = require("fs");
function uploadImage(data, boundary) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = parseImage(data, boundary);
        if (file == null) {
            return null;
        }
        const prefix = ('00000' + (Math.random() * 9999999 | 0)).slice(-5);
        yield fs_1.promises.writeFile(`./static/img/${prefix}-${file.name}`, file.data, 'binary');
        return file;
    });
}
exports.uploadImage = uploadImage;
;
function parseImage(data, boundry) {
    const body = data.join('');
    const fileName = getFilename(body);
    if (fileName == null) {
        return null;
    }
    const fileData = getFileData(body, boundry);
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
function getFilename(data) {
    const pattern = /filename="(.+)"/;
    const matches = pattern.exec(data);
    if (matches === null || matches.length < 2) {
        return null;
    }
    const fileName = matches[1];
    return fileName;
}
;
function getFileData(body, boundary) {
    const lineIndex = body.indexOf('\n');
    const fileData = body.slice(lineIndex, body.indexOf(boundary, lineIndex));
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
//# sourceMappingURL=imageHelpers.js.map