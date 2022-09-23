"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
const eventObserver_1 = __importDefault(require("./eventObserver"));
function listen() {
    let runningTotal = 0;
    const type = 'message';
    console.log(`>>> Module 3 subscribed for type ${type}`);
    const callback = (data) => {
        runningTotal += data;
        console.log(`>>> Module 3: Current value ${runningTotal}`);
    };
    //observer.subscribe(type, callback);
    eventObserver_1.default.on(type, callback);
}
exports.listen = listen;
//# sourceMappingURL=module3.js.map