import { postgresDB } from './databases/postgres-db';
const app = require('./app');
const bootstrap = async () => {
    await postgresDB();

    app.use(async ctx => {
        ctx.body = "Welcome to my Server!";
    });
    app.listen(3000);
};
bootstrap();
