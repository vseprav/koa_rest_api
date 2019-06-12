import { createConnection } from 'typeorm';
import { postgresTables } from './postrgestables'
export const postgresDB = async () => {
    return await createConnection({
        type     : 'postgres',
        host     : 'localhost',
        port     :  5432,
        username : '',
        password : '',
        database : 'koa',
        ssl: false,
        entities: postgresTables,
        logging: ['query', 'error'],
        synchronize: true,
    }).then((connection) => {
        console.log('Database connection established');

    });
};
