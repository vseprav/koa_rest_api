import { createConnection } from "typeorm";
import { postgresTables } from "./postrgestables";
export const postgresDB = async () => {
    return await createConnection({
        database : "koa",
        entities: postgresTables,
        host     : "localhost",
        logging: ["query", "error"],
        password : "",
        port     :  5432,
        ssl: false,
        synchronize: true,
        type     : "postgres",
        username : "",
    });
};
