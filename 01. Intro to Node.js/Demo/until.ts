export function html(body: string, title = 'Demo Site') {
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
};

interface IData {
    id: string;
    name: string;
    color: string;
}

export const data: IData[] = [
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