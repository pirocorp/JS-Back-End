import fs from 'fs';
const afs = fs.promises;

export async function fsDemo() {
    // await directoryListing();

    await streams();
}

async function directoryListing() {
    const result = await afs.readdir('.');

    const directories: string[] = [];
    const files: string[] = [];
    
    for (const item of result) { 
        const isDirectory = (await afs.stat(`./${item}`)).isDirectory();

        if(isDirectory){
            directories.push(item);
        }else{
            files.push(item)           ;
        }
    }

    const res = directories.concat(files.map(f => `>>> ${f}`)).join('\n');
    console.log(res);

    await afs.writeFile('./summary.txt', res);
}

async function streams() {
    const stream = fs.createReadStream('./summary.txt', {
        highWaterMark: 16
    });

    stream.pipe(process.stdout);
}
