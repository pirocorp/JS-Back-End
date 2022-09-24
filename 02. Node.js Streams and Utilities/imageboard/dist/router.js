"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exists = exports.register = exports.getAction = void 0;
const router = {};
const getAction = (path, method) => {
    if (!(0, exports.exists)(path, method)) {
        return null;
    }
    return router[path][method];
};
exports.getAction = getAction;
const register = (route, method, action) => {
    if (router[route] == null) {
        router[route] = {};
    }
    router[route][method] = action;
};
exports.register = register;
const exists = (path, method) => router[path] != null && router[path][method] != null;
exports.exists = exists;
//# sourceMappingURL=router.js.map