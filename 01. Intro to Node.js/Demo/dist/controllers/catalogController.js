"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem = exports.createPage = exports.catalogPage = void 0;
const formidable_1 = require("formidable");
const until_1 = require("../until");
function catalogPage(req, res) {
    const content = `
        <h1>Catalog</h1>
        <p>List of Items</p>
        <ul>
            ${until_1.data.map(i => `<li data-id="${i.id}">${i.name} - ${i.color}</li>`).join('\n')}
        </ul>
    `;
    res.write((0, until_1.html)(content, 'Catalog'));
    res.end();
}
exports.catalogPage = catalogPage;
function createPage(req, res) {
    const content = `
    <h1>Create Item</h1>
    <form method="POST" action="/create">
        <label>Name: <input type="text" name="name"></label>
        <label>Color: 
            <select name="color">
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
            </select>
        </label>
        <input type="submit" value="Create">
    </form>
    `;
    res.write((0, until_1.html)(content, "Create Item"));
    res.end();
}
exports.createPage = createPage;
function createItem(req, res) {
    const form = new formidable_1.IncomingForm();
    form.parse(req, (err, fields) => {
        if (err != null) {
            res.writeHead(301, [
                'Location', '/error'
            ]);
            res.end();
            return;
        }
        const item = {
            id: 'asdf' + ('0000' + Math.floor(Math.random() * 9999)).slice(-4),
            name: fields.name,
            color: fields.color
        };
        until_1.data.push(item);
        res.writeHead(301, [
            'Location', '/catalog'
        ]);
        res.end();
    });
}
exports.createItem = createItem;
