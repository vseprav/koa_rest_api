import { BaseContext } from "koa";
import fetch = require("node-fetch");
import config from "../../config";

const baseUrl = "https://od-api.oxforddictionaries.com/api/v2";

export default class OxfordDictionaryController {
    public static async getLemmas(ctx: BaseContext) {
        await fetch(`${baseUrl}/lemmas/en/${ctx.params.world_id}`, {
            headers: {
                "Content-Type": "application/json",
                "app_id": config.appId,
                "app_key": config.appKey,
            },
            method: "get",
        })
            .then(( res ) => res.json())
            .then(( json ) => {
                ctx.status = 200;
                ctx.body = json;
            });
    }

    public static async getEntries(ctx: BaseContext) {
        await fetch(`${baseUrl}/entries/en/${ctx.params.world_id}?fields=definitions`, {
            headers: {
                "Content-Type": "application/json",
                "app_id": config.appId,
                "app_key": config.appKey,
            },
            method: "get",
        })
            .then(( res ) => res.json())
            .then(( json ) => {
                ctx.status = 200;
                ctx.body = json;
            });
    }
}
