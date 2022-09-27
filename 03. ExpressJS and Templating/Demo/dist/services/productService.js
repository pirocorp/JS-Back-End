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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.create = exports.getById = exports.getList = void 0;
const fs_1 = __importDefault(require("fs"));
const filePath = './services/data.json';
const json = fs_1.default.readFileSync(filePath);
const data = JSON.parse(json.toString());
function getList() {
    return data;
}
exports.getList = getList;
;
function getById(id) {
    return data.find(x => x.id === id);
}
exports.getById = getById;
;
function create(name, price) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = 'asdf' + ('0000' + (Math.random() * 99999 | 0)).slice(-4);
        const payload = {
            id,
            name,
            price
        };
        data.push(payload);
        yield persist();
    });
}
exports.create = create;
;
function deleteById(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const index = data.findIndex(p => p.id === productId);
        data.splice(index, 1);
        yield persist();
    });
}
exports.deleteById = deleteById;
;
function persist() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs_1.default.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
                if (err == null) {
                    resolve(null);
                }
                else {
                    reject(err);
                }
            });
        });
    });
}
;
//# sourceMappingURL=productService.js.map