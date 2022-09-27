"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalLogger = void 0;
const globalLogger = () => (req, res, next) => {
    console.log(`>>> ${req.method} ${req.url}`);
    next();
};
exports.globalLogger = globalLogger;
//# sourceMappingURL=logger.js.map