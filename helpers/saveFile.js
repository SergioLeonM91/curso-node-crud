import * as fs from 'node:fs';

const file = './db/data.json';

const saveInfo = ( data ) => {
    fs.writeFileSync( file, JSON.stringify( data ) );
}

const readFile = () => {
    if( !fs.existsSync( file ) ) {
        return null;
    }

    const info = fs.readFileSync( file, { encoding: 'utf-8' } );
    const data = JSON.parse( info );

    return data;

}

export {
    saveInfo,
    readFile
}