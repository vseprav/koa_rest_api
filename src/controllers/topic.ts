import { validate, ValidationError } from "class-validator";
import { BaseContext } from "koa";
import { Topic } from "models/topic";
import { getManager, Repository } from "typeorm";

export default class TopicController {
    public static async getTopics(ctx: BaseContext) {
        const repo: Repository<Topic> = getManager().getRepository(Topic);
        const topics: Topic[] = await repo.find();

        ctx.status = 200;
        ctx.body = topics;
    }

    public static async getTopic(ctx: BaseContext) {
        const repo: Repository<Topic> = getManager().getRepository(Topic);
        const topic: Topic = await repo.findOne(ctx.params.id);
        if (topic) {
            ctx.status = 200;
            ctx.body = topic;
        } else {
            ctx.status = 400;
            ctx.body = "The user you are trying to retrieve doesn't exist in the db";
        }
    }

    public static async createTopic(ctx: BaseContext) {
        const repo: Repository<Topic> = getManager().getRepository(Topic);
        let topic: Topic = new Topic();

        topic.title = ctx.request.body.title;

        const errors: ValidationError[] = await validate(topic,
         { skipMissingProperties: true });
        if (errors.length > 0) {
            ctx.status = 400;
            ctx.body = errors;
        } else {
            topic = await repo.save(topic);
            ctx.status = 201;
            ctx.body = topic;
        }
    }

    public static async updateTopic(ctx: BaseContext) {
        const repo: Repository<Topic> = getManager().getRepository(Topic);
        let topic: Topic = await repo.findOne(ctx.params.id);

        if (!topic) {

            ctx.status = 400;
            ctx.body = "The topic you are trying to retrieve doesn't exist in the db";
        }
        if (ctx.request.body.title) {topic.title = ctx.request.body.title; }

        const errors: ValidationError[] = await validate(topic);
        if (errors.length > 0) {
            ctx.status = 400;
            ctx.body = errors;
        } else if ( !await repo.findOne(topic.id) ) {
            ctx.status = 400;
            ctx.body = "The topic you are trying to update doesn't exist in the db";
        } else {
            topic = await repo.save(topic);
            ctx.status = 201;
            ctx.body = topic;
        }
    }

    public static async deleteTopic(ctx: BaseContext) {
        const repo: Repository<Topic> = getManager().getRepository(Topic);
        const topic: Topic = await repo.findOne(ctx.params.id);
        if (!topic) {
            ctx.status = 400;
            ctx.body = "The topic you are trying to delete doesn't exist in the db";
        } else {
            await repo.remove(topic);
            ctx.status = 204;
        }
    }
}
