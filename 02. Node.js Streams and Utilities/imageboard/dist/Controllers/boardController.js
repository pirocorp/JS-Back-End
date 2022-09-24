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
exports.homePage = void 0;
const fs_1 = require("fs");
function homePage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const filePath = './views/home/index.html';
        let layout;
        try {
            layout = yield fs_1.promises.readFile(filePath);
        }
        catch (error) {
            console.error(error);
            return;
        }
        const content = yield getImageList();
        const result = layout
            .toString()
            .replace('<%%imageboard%%>', content);
        res.write(result);
        res.end();
    });
}
exports.homePage = homePage;
;
function getImageList() {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fs_1.promises.readdir('./static/img');
        return `
    <ul>
        ${files.map(imageCard).join('\n')}
    </ul>
    `;
    });
}
function imageCard(filename) {
    return `
    <li class="item">
        <img src="/img/${filename}"/>
    </li>`;
}
//# sourceMappingURL=boardController.js.map