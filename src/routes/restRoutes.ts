import * as Router from 'koa-router';
const controller = require('controllers');
export const restRouter = new Router();

restRouter.get('/users', controller.user.getUsers);
restRouter.get('/users/:id', controller.user.getUser);
restRouter.post('/users', controller.user.createUser);
restRouter.put('/users/:id', controller.user.updateUser);
restRouter.delete('/users/:id', controller.user.deleteUser);
