"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundResponse = void 0;
const notFoundResponse = (res) => {
    res.writeHead(404);
    res.write('404 Not Found');
    res.end();
};
exports.notFoundResponse = notFoundResponse;
//# sourceMappingURL=notFoundResponse.js.map