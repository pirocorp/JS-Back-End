"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.produce = void 0;
const eventObserver_1 = __importDefault(require("./eventObserver"));
function produce() {
    let counter = 0;
    setInterval(() => {
        eventObserver_1.default.emit('message', counter++);
        //observer.publish('message', counter++);
    }, 2000);
}
exports.produce = produce;
//# sourceMappingURL=module2.js.map