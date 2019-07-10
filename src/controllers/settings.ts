import { BaseContext } from "koa";
import {getConnection, getManager, Repository} from "typeorm";
import { v4 as uuid } from "uuid";
import {Setting} from "../models/settings";

export default class SettingsController {
    public static async getSettings(ctx: BaseContext) {
        const repo: Repository<Setting> = getManager().getRepository(Setting);
        const setting: Setting = await repo.findOne(ctx.params.id);
        if (setting) {
            ctx.status = 200;
            ctx.body = setting;
        } else {
            ctx.status = 400;
            ctx.body = "The user you are trying to retrieve doesn't exist in the db";
        }
    }
    public static async addSettings(ctx: BaseContext) {
        let hasError: boolean = false;
        const defaultLang: string = ctx.request.body.defaultLang;
        const userId: string = ctx.request.body.userId;
        const settingId: string = uuid();
        const settingTransactionId: string = uuid();
        const userTransactionId: string = uuid();
        try {
            await this.startAddSettings(settingId, defaultLang, settingTransactionId);
        } catch (e) {
            hasError = true;
            ctx.status = 500;
            ctx.body = e.message;
        }
        if (!hasError) {
            try {
                await this.startUpdateUser(settingId, userId, userTransactionId);
                await this.commitTransaction(settingTransactionId);
                await this.commitTransaction(userTransactionId);
                ctx.status = 200;
            } catch (e) {
                await this.rollbackTransaction(settingTransactionId);
                ctx.status = 500;
                ctx.body = e.message;
            }
        }
    }
    private static async startUpdateUser(settingId: string, userId: string, transactionId: string) {
        const query = `UPDATE users SET "settingId" = '${settingId}' WHERE id = '${userId}';`;
        await getConnection().query(`begin;${query} PREPARE TRANSACTION '${transactionId}';end;`);
    }
    private static async startAddSettings(settingId: string, defaultLang: string, transactionId: string) {
        const query = `INSERT INTO settings (id, "defaultLang") VALUES ('${settingId}', '${defaultLang}');`;
        await getConnection().query(`begin;${query} PREPARE TRANSACTION '${transactionId}';end;`);
    }
    private static async commitTransaction(transactionId: string) {
        await getConnection().query(`commit prepared '${transactionId}';`);
    }
    private static async rollbackTransaction(transactionId: string) {
        await getConnection().query(`rollback prepared '${transactionId}';`);
    }
}
