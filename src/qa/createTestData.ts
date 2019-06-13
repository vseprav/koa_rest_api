import { BaseContext } from 'koa';
import {getConnection} from "typeorm";
import { User } from 'models/user';
export class TestData {
    public static async createTestUsers(ctx: BaseContext){
        try {
            await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values([
                    { name: "Michael", email: "michael@osullivan.com", hashedPassword: "pass123" },
                    { name: "Louise", email: "louise@osullivan.com", hashedPassword: "pass123" },
                    { name: "Mary", email: "mary@osullivan.com", hashedPassword: "pass123" }
                ])
                .execute();
            ctx.body = "Test users created successfully"
        }catch (err) {
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = {
                message: err.message
            };
        }
    }
};
