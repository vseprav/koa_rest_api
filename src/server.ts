import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import { qaRouter } from "routes/qaRoutes";
import {restRouter} from "routes/restRoutes";
import { postgresDB } from "./databases/postgresDB";

const app = new Koa();

const bootstrap = async () => {
    await postgresDB();

    app.use(bodyParser());
    app.use(qaRouter.routes(), qaRouter.allowedMethods());
    app.use(restRouter.routes(), restRouter.allowedMethods());

    app.listen(3000);
};
bootstrap();
