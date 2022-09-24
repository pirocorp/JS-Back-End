"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectResponse = void 0;
function redirectResponse(location, res) {
    res.writeHead(301, {
        'Location': location
    });
    res.end();
}
exports.redirectResponse = redirectResponse;
//# sourceMappingURL=redirectResponse.js.map