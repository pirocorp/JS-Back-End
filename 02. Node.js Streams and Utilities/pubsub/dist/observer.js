"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = exports.subscribe = void 0;
let subscribers = {};
function subscribe(type, callback) {
    console.log(`>>> Subscribing for ${type}`);
    if (subscribers[type] == undefined) {
        subscribers[type] = [];
    }
    subscribers[type].push(callback);
}
exports.subscribe = subscribe;
function publish(type, data) {
    console.log(`>>> Observer received type ${type}`);
    const currentSubscribers = subscribers[type];
    if (currentSubscribers) {
        for (const subscriber of currentSubscribers) {
            subscriber(data);
        }
    }
}
exports.publish = publish;
//# sourceMappingURL=observer.js.map