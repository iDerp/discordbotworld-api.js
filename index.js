const snek = require('snekfetch');
const apiEndpoint = 'https://discordbot.world/api';

class dbwapimodule {
    constructor(token, client, automate) {
        this.token = token;
        if (client != null) {
            this.client = client;
        }
        if (automate != null){
            if (automate == true){
                
            }
        }
    }

    getBotStats(botID, advanced) {
        if (botID == null) {
            throw new Error('You must supply a bot ID to get stats from!');
        } else {
            snek.get(`${apiEndpoint}/bot/${botID}/stats`).then(r => {
                if (r.ok) {
                        let botGuilds = null;
                        let botShards = null;
                        let botLikes = null;
                        if (r.body.guilds != null) {
                            botGuilds = r.body.guilds;
                        }
                        if (r.body.shards != null) {
                            botShards = r.body.shards;
                        }
                        if (r.body.likes != null) {
                            botLikes = r.body.likes;
                        }
                        return {likes: botLikes, guilds: botGuilds, shards: botShards}
                } else {
                    throw new Error(`No bot was found matching the ID ${botID}.`);
                }
            })
        }
    }

    postStats(botID) {
        snek.get(`${apiEndpoint}/bot/${botID}/stats`).set("Authorization", AuthorizationKey).then(r => {

        })
    }
}

module.exports = dbwapimodule;