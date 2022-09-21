"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = exports.match = exports.registrer = void 0;
const homeController_1 = require("./controllers/homeController");
var Method;
(function (Method) {
    Method["GET"] = "GET";
    Method["POST"] = "POST";
    Method["PUT"] = "PUT";
    Method["DELETE"] = "DELETE";
})(Method || (Method = {}));
const routes = {};
function registrer(path, method, handler) {
    if (routes[path] == undefined) {
        routes[path] = {};
    }
    routes[path][method] = handler;
}
exports.registrer = registrer;
;
function match(req, res) {
    var _a;
    const url = new URL((_a = req.url) !== null && _a !== void 0 ? _a : '', `http://${req.headers.host}`);
    const actions = routes[url.pathname];
    let handler = homeController_1.notFound;
    if (actions != undefined && req.method) {
        if (typeof actions[req.method] == 'function') {
            handler = actions[req.method] ? actions[req.method] : handler;
        }
    }
    handler(req, res);
}
exports.match = match;
const get = (path, handler) => registrer(path, Method.GET, handler);
exports.get = get;
const post = (path, handler) => registrer(path, Method.POST, handler);
exports.post = post;
