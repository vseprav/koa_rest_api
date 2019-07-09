import { BaseContext } from "koa";
import {getConnection} from "typeorm";

export default class SettingsController {
    public static async getSettings(ctx: BaseContext) {
        const users = await getConnection().query("SELECT * FROM USERS");
        ctx.status = 200;
        ctx.body = users;
    }
    public static async startInsertSettings(ctx: BaseContext) {
        await getConnection().query("begin;insert into users (name, email, \"hashedPassword\") values ('Cool', 'bam@gmail.com', 'tututut');PREPARE TRANSACTION 'locked';end;");
        ctx.status = 200;
        ctx.body = {};
    }
    public static async commitInsertSettings(ctx: BaseContext) {
        const users = await getConnection().query("commit prepared 'locked';");
        ctx.status = 200;
        ctx.body = users;
    }

    public static async rollbackInsertSettings(ctx: BaseContext) {
        const users = await getConnection().query("rollback prepared 'locked';");
        ctx.status = 200;
        ctx.body = users;
    }
}
