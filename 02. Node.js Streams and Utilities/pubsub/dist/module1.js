"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
const eventObserver_1 = __importDefault(require("./eventObserver"));
function listen() {
    const type = 'message';
    console.log(`>>> Module 1 subscribed for type ${type}`);
    const callback = (data) => {
        console.log(`>>> Module 1: received ${data}`);
    };
    //observer.subscribe(type, callback);
    eventObserver_1.default.on(type, callback);
}
exports.listen = listen;
;
//# sourceMappingURL=module1.js.map