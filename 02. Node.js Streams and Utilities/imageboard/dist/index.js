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
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const main_1 = require("./main");
const router = __importStar(require("./router"));
const httpMethod_1 = require("./http/httpMethod");
const boardController_1 = require("./controllers/boardController");
const imageController_1 = require("./controllers/imageController");
// Register routes
(() => {
    router.register('/', httpMethod_1.HttpMethod.GET, boardController_1.homePage);
    router.register('/home', httpMethod_1.HttpMethod.GET, boardController_1.homePage);
    router.register('/upload', httpMethod_1.HttpMethod.POST, imageController_1.createImage);
})();
const server = (0, http_1.createServer)(main_1.handleRequest);
server.listen(3000);
//# sourceMappingURL=index.js.map