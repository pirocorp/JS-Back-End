"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const fs_demo_1 = require("./fs-demo");
const module1 = __importStar(require("./module1"));
const module2 = __importStar(require("./module2"));
const module3 = __importStar(require("./module3"));
function pubsubDemo() {
    module1.listen();
    module3.listen();
    module2.produce();
}
;
//pubsubDemo();
// Stream standart input
function standartInputStreamDemo() {
    const result = [];
    process.stdin.on('data', (chunk) => {
        result.push(chunk);
        console.log();
        console.log(result.join(''));
    });
}
;
//standartInputStreamDemo();
function fileSystemDemo() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, fs_demo_1.fsDemo)();
    });
}
// fileSystemDemo();
function httpStreemDemo() {
    return __awaiter(this, void 0, void 0, function* () {
        // request is readable stream, response is writable stream 
        const server = http_1.default.createServer(requestListener);
        server.listen(3000);
    });
}
;
httpStreemDemo();
function requestListener(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method == 'GET') {
            const requestPath = req.url === '/' ? '/index.html' : req.url;
            const filePath = `./static${requestPath}`;
            let isFile = false;
            try {
                const stat = yield fs_1.default.promises.stat(filePath);
                isFile = stat.isFile();
            }
            catch (_a) {
                isFile = false;
            }
            if (isFile) {
                piepFileStream(filePath, res);
            }
            else {
                res.writeHead(404);
                res.write('404 Not Found');
                res.end();
            }
        }
        else if (req.method == 'POST') {
            const body = [];
            const dataHandler = (chunk) => {
                body.push(chunk);
            };
            const endHandler = () => {
                const result = JSON.parse(body.join(''));
                console.log(result);
                result.count = result.count + 1;
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify(result));
                res.end();
            };
            req.on('data', dataHandler);
            req.on('end', endHandler);
        }
    });
}
const sendFileSync = (path, res) => {
    const file = fs_1.default.readFileSync(path);
    res.write(file);
    res.end();
};
const sendFileAsync = (path, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield fs_1.default.promises.readFile(path);
    res.write(file);
    res.end();
});
const sendFileStream = (path, res) => {
    const fileStream = fs_1.default.createReadStream(path);
    fileStream.on('data', chunk => res.write(chunk));
    fileStream.on('end', () => res.end());
};
const piepFileStream = (path, res) => fs_1.default.createReadStream(path).pipe(res);
//# sourceMappingURL=index.js.map