import { BaseContext } from 'koa';
import {getConnection} from "typeorm";
import { User } from 'models/user';
import {Topic} from "../models/topics";
import {Word} from "../models/words";
import {Meaning} from "../models/meanings";
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

    public static async createTestDictionaryData(ctx: BaseContext){
        try {
                const connection = await getConnection();
                const topic = new Topic();
                topic.title = "Songs";
                await connection.manager.save(topic);

                const word = new Word();
                word.value = "numb";
                word.topics = [topic];
                await connection.manager.save(word);

                const meaning = new Meaning();
                meaning.value = 'the feeling of feeling no feeling.';
                meaning.example = 'im jus so numb';
                meaning.word = word;
                await connection.manager.save(meaning);
                ctx.body = "Test dictionary data created successfully"
        }catch (err) {
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = {
                message: err.message
            };
        }
    }
}
