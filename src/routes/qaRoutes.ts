import * as Router from 'koa-router';
import createTestData = require('qa/createTestData');
export const qaRouter = new Router();

qaRouter.post('/qa/users', createTestData.TestData.createTestUsers);
qaRouter.post('/qa/dictionaries', createTestData.TestData.createTestDictionaryData);
