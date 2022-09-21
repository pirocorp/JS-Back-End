import { IncomingMessage, ServerResponse } from "http";
import { IncomingForm } from "formidable";

import { data, html } from "../until";

export function catalogPage(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & {
        req: IncomingMessage;
    }
) {
    const content = `
        <h1>Catalog</h1>
        <p>List of Items</p>
        <ul>
            ${data.map(i => `<li data-id="${i.id}">${i.name} - ${i.color}</li>`).join('\n')}
        </ul>
    `;

    res.write(html(content, 'Catalog'));
    res.end();
}

export function createPage(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & {
        req: IncomingMessage;
    }
) {
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

    res.write(html(content, "Create Item"));
    res.end();
}

export function createItem(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & {
        req: IncomingMessage;
    }) {

    const form = new IncomingForm();

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
            name: fields.name as string,
            color: fields.color as string
        };

        data.push(item);

        res.writeHead(301, [
            'Location', '/catalog'
        ]);

        res.end();
    });
}