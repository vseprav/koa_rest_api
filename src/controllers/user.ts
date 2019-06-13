import { validate, ValidationError } from "class-validator";
import { BaseContext } from "koa";
import { User } from "models/user";
import { Equal, getManager, Not, Repository } from "typeorm";

export default class UserController {
    public static async getUsers(ctx: BaseContext) {
        const repo: Repository<User> = getManager().getRepository(User);
        const users: User[] = await repo.find();
        ctx.status = 200;
        ctx.body = users;
    }

    public static async getUser(ctx: BaseContext) {
        const repo: Repository<User> = getManager().getRepository(User);
        const user: User = await repo.findOne(ctx.params.id);
        if (user) {
            ctx.status = 200;
            ctx.body = user;
        } else {
            ctx.status = 400;
            ctx.body = "The user you are trying to retrieve doesn't exist in the db";
        }
    }

    public static async createUser(ctx: BaseContext) {
        const repo: Repository<User> = getManager().getRepository(User);

        let user: User = new User();

        user.name = ctx.request.body.name;
        user.email = ctx.request.body.email;
        user.hashedPassword = ctx.request.body.hashedPassword;
        const errors: ValidationError[] = await validate(user,
            { skipMissingProperties: true });
        if (errors.length > 0) {
            ctx.status = 400;
            ctx.body = errors;
        } else if ( await repo.findOne({ email: user.email}) ) {
            ctx.status = 400;
            ctx.body = "The specified e-mail address already exists";
        } else {
            user = await repo.save(user);
            ctx.status = 201;
            ctx.body = user;
        }
    }

    public static async updateUser(ctx: BaseContext) {
        const repo: Repository<User> = getManager().getRepository(User);
        let user: User = await repo.findOne(ctx.params.id);

        if (!user) {

            ctx.status = 400;
            ctx.body = "The user you are trying to retrieve doesn't exist in the db";
        }
        if (ctx.request.body.name) {user.name = ctx.request.body.name; }
        if (ctx.request.body.email) {user.email = ctx.request.body.email; }
        if (ctx.request.body.hashedPassword) {user.hashedPassword = ctx.request.body.hashedPassword; }

        const errors: ValidationError[] = await validate(user);
        if (errors.length > 0) {
            ctx.status = 400;
            ctx.body = errors;
        } else if ( !await repo.findOne(user.id) ) {
            ctx.status = 400;
            ctx.body = "The user you are trying to update doesn't exist in the db";
        } else if ( await repo.findOne({ id: Not(Equal(user.id)), email: user.email}) ) {
            ctx.status = 400;
            ctx.body = "The specified e-mail address already exists";
        } else {
            user = await repo.save(user);
            ctx.status = 201;
            ctx.body = user;
        }
    }

    public static async deleteUser(ctx: BaseContext) {
        const repo: Repository<User> = getManager().getRepository(User);
        const user: User = await repo.findOne(ctx.params.id);
        if (!user) {
            ctx.status = 400;
            ctx.body = "The user you are trying to delete doesn't exist in the db";
        } else {
            await repo.remove(user);
            ctx.status = 204;
        }
    }
}
