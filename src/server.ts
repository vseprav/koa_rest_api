import { postgresDB } from './databases/postgresDB';
import { qaRouter } from 'routes/qaRoutes';
const app = require('./app');

const bootstrap = async () => {
    await postgresDB();

    app.use(qaRouter.routes(), qaRouter.allowedMethods());

    app.listen(3000);
};
bootstrap();
