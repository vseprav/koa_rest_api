import controller = require("controllers");
import * as Router from "koa-router";
export const restRouter = new Router();

restRouter.get("/users", controller.user.getUsers);
restRouter.get("/users/:id", controller.user.getUser);
restRouter.post("/users", controller.user.createUser);
restRouter.put("/users/:id", controller.user.updateUser);
restRouter.delete("/users/:id", controller.user.deleteUser);

restRouter.get("/topics", controller.topic.getTopics);
restRouter.get("/topics/:id", controller.topic.getTopic);
restRouter.post("/topics", controller.topic.createTopic);
restRouter.put("/topics/:id", controller.topic.updateTopic);
restRouter.delete("/topics/:id", controller.topic.deleteTopic);

restRouter.get("/topics/:id/words", controller.word.getWordsByTopic);
