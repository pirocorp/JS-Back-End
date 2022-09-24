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
exports.createImage = void 0;
const fs_1 = require("fs");
const redirectResponse_1 = require("../http/responses/redirectResponse");
const imageParser_1 = require("../utils/imageParser");
function createImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = [];
        req.on('data', chunk => data.push(chunk));
        req.on('end', () => __awaiter(this, void 0, void 0, function* () {
            const file = (0, imageParser_1.parseImage)(data);
            if (file == null) {
                (0, redirectResponse_1.redirectResponse)('/', res);
                return;
            }
            const prefix = ('00000' + (Math.random() * 9999999 | 0)).slice(-5);
            yield fs_1.promises.writeFile(`./static/img/${prefix}-${file.fileName}`, file.fileData, 'utf8');
            (0, redirectResponse_1.redirectResponse)('/', res);
        }));
    });
}
exports.createImage = createImage;
;
//# sourceMappingURL=imageController.js.map