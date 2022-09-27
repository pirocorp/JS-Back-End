import fs from 'fs';

const filePath = './services/data.json';
const json = fs.readFileSync(filePath);
const data: Product[] = JSON.parse(json.toString());

export function getList() {
    return data;
};

export function getById(id: string) {
    return data.find(x => x.id === id);
};

export async function create(name: string, price: number) {
    const id = 'asdf' + ('0000' + (Math.random() * 99999 | 0)).slice(-4);

    const payload = {
        id,
        name,
        price
    };

    data.push(payload);
    await persist();
};

export async function deleteById(productId: string) {
    const index = data.findIndex(p => p.id === productId);
    data.splice(index, 1);

    await persist();
};

async function persist() {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            filePath, 
            JSON.stringify(data, null, 2), 
            (err) => {
                if(err == null){                    
                    resolve(null);
                }else{
                    reject(err);
                }
            }
        );
    });
};