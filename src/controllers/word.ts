import { BaseContext } from "koa";
import { getManager, Repository } from "typeorm";
import {Word} from "../models/word";

export default class WordController {
    public static async getWordsByTopic(ctx: BaseContext) {
        const repo: Repository<Word> = getManager().getRepository(Word);

        const words: Word[] = await repo.createQueryBuilder("words")
            .innerJoin("topics_words_words",
                         "topics_words",
                         "words.id = topics_words.wordsId AND topics_words.topicsId = :topicId",
                { topicId: ctx.params.id })
            .leftJoinAndSelect("words.meanings", "meanings")
            .getMany();

        ctx.status = 200;
        ctx.body = words;
    }
}
