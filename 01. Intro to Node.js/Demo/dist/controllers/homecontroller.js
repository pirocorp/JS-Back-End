"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.aboutPage = exports.homePage = void 0;
const until_1 = require("../until");
function homePage(req, res) {
    const content = `<h1>Hello World</h1>`;
    res.write((0, until_1.html)(content));
    res.end();
}
exports.homePage = homePage;
;
function aboutPage(req, res) {
    const content = `
        <h1>About Us</h1>
        <p>Contact: +1 555 6598</p>`;
    res.write((0, until_1.html)(content));
    res.end();
}
exports.aboutPage = aboutPage;
;
function notFound(req, res) {
    const content = `
        <h1>404 Not Found</h1>
        <p>The resource you requested cannot be found</p>
    `;
    res.write((0, until_1.html)(content));
    res.end();
}
exports.notFound = notFound;
;
