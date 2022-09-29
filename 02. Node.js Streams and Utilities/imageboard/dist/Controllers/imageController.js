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
exports.uploadImage = void 0;
const redirectResponse_1 = require("../http/responses/redirectResponse");
const imageHelpers_1 = require("../utils/imageHelpers");
function uploadImage(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const tokens = (_a = req.headers['content-type']) === null || _a === void 0 ? void 0 : _a.split('boundary=');
        if (!tokens || tokens.length < 2) {
            (0, redirectResponse_1.redirectResponse)('/', res);
            return;
        }
        const boundary = tokens[1].trim();
        const data = [];
        req.on('data', chunk => data.push(chunk.toString('binary')));
        req.on('end', () => __awaiter(this, void 0, void 0, function* () {
            try {
                const file = yield (0, imageHelpers_1.uploadImage)(data, boundary);
            }
            catch (error) {
                console.error(error);
            }
            (0, redirectResponse_1.redirectResponse)('/', res);
        }));
    });
}
exports.uploadImage = uploadImage;
;
//# sourceMappingURL=imageController.js.map