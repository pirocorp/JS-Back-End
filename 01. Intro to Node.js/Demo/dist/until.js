"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = exports.html = void 0;
function html(body, title = 'Demo Site') {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/catalog">Catalog</a></li>
                <li><a href="/create">Create</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
        ${body}
    </body>
    </html>`;
}
exports.html = html;
;
exports.data = [
    {
        id: 'asdf0001',
        name: 'Product 1',
        color: 'Red'
    },
    {
        id: 'asdf0002',
        name: 'Product 2',
        color: 'Green'
    },
    {
        id: 'asdf0003',
        name: 'Product 3',
        color: 'Blue'
    },
];
