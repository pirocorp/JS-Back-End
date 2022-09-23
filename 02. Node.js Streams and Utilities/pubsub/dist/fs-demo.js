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
exports.fsDemo = void 0;
const fs_1 = __importDefault(require("fs"));
const afs = fs_1.default.promises;
function fsDemo() {
    return __awaiter(this, void 0, void 0, function* () {
        // await directoryListing();
        yield streams();
    });
}
exports.fsDemo = fsDemo;
function directoryListing() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield afs.readdir('.');
        const directories = [];
        const files = [];
        for (const item of result) {
            const isDirectory = (yield afs.stat(`./${item}`)).isDirectory();
            if (isDirectory) {
                directories.push(item);
            }
            else {
                files.push(item);
            }
        }
        const res = directories.concat(files.map(f => `>>> ${f}`)).join('\n');
        console.log(res);
        yield afs.writeFile('./summary.txt', res);
    });
}
function streams() {
    return __awaiter(this, void 0, void 0, function* () {
        const stream = fs_1.default.createReadStream('./summary.txt', {
            highWaterMark: 16
        });
        stream.pipe(process.stdout);
    });
}
//# sourceMappingURL=fs-demo.js.map