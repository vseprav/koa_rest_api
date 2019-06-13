import * as bodyParser from 'koa-bodyparser';
import { postgresDB } from './databases/postgresDB';
import { qaRouter } from 'routes/qaRoutes';
import {restRouter} from 'routes/restRoutes';
const app = require('./app');

const bootstrap = async () => {
    await postgresDB();

    app.use(bodyParser());
    app.use(qaRouter.routes(), qaRouter.allowedMethods());
    app.use(restRouter.routes(), restRouter.allowedMethods());

    app.listen(3000);
};
bootstrap();
