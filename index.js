const snek = require('snekfetch');
const apiEndpoint = 'https://discordbot.world/api';

class dbwapimodule {
    constructor(token, client, automate) {
        if (token != null) {
            this.token = token;
        } else {
            console.log('You need to pass the token, otherwise functions will be limited!');
        }
        if (client != null) {
            this.client = client;
        } else {
            console.log('You need to pass the client, otherwise functions will be limited!');
        }
        if (automate != null){
            if (automate == true){
                if (token == null) {
                    console.log('Automated status updating for DBW will not work unless the token is passed.');
                } else if (client == null) {
                    console.log('Automated status updating for DBW will not work unless the client is passed.');
                } else {
                    this.client.on('ready', () => { postStats(); })
                    this.client.on('guildCreate', () => { postStats(); })
                    this.client.on('guildDelete', () => { postStats(); })
                }
            }
        }
    }

    async getBotStats(botID) {
        return new Promise((resolve, reject) => {
        if (botID == null) {
            snek.get(`${apiEndpoint}/bot/${this.client.user.id}/stats`).then(r => {
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
                    return resolve({ likes: botLikes, guilds: botGuilds, shards: botShards })
                } else {
                    return reject(`No bot was found matching the ID ${this.client.user.id}.`);
                }
            }).catch(() => { return reject(`No bot was found matching the ID ${this.client.user.id}.`); })
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
                    return resolve ({likes: botLikes, guilds: botGuilds, shards: botShards})
                } else {
                    return reject (`No bot was found matching the ID ${botID}.`);
                }
            }).catch(() => { return reject(`No bot was found matching the ID ${botID}.`);})
        }
    })
    }

    async postStats(guilds) {
        if (this.client == null){
            throw new Error('Client is not defined. Make sure you pass the client variable!');
        } else if (this.token == null) {
            throw new Error('No token specified!');
        } else {
            if (guilds == null){
                let guildData;
                if (this.client.shard == null) {
                    snek.post(`${apiEndpoint}/bot/${this.client.user.id}/stats`).set("Authorization", this.token).send({ guild_count: this.client.guilds.size }).then(r => {
                        if (!r.ok) {
                            throw new Error('There was an error posting the stats!');
                        }
                    }).catch(() => { throw new Error('There was an error posting the stats!'); })
                } else {
                    this.client.shard.fetchClientValues('guilds.size')
                        .then(totalGuilds => { 
                            snek.post(`${apiEndpoint}/bot/${this.client.user.id}/stats`).set("Authorization", this.token).send({ shards: totalGuilds }).then(r => {
                                if (!r.ok) {
                                    throw new Error('There was an error posting the stats!');
                                }
                            }).catch(() => { throw new Error('There was an error posting the stats!'); })})
                }
            } else if (Array.isArray(guilds)) {
                snek.post(`${apiEndpoint}/bot/${this.client.user.id}/stats`).set("Authorization", this.token).send({ shards: guilds }).then(r => {
                    if (!r.ok) {
                        throw new Error('There was an error posting the stats!');
                    }
                }).catch(() => { throw new Error('There was an error posting the stats!'); })
            } else {
                snek.post(`${apiEndpoint}/bot/${this.client.user.id}/stats`).set("Authorization", this.token).send({ guild_count: guilds }).then(r => {
                    if (!r.ok) {
                        throw new Error('There was an error posting the stats!');
                    }
                }).catch(() => { throw new Error('There was an error posting the stats!'); })
            }
        }
    }
    async getLikes() {
        return new Promise((resolve, reject) => {
            if (this.client == null) {
                return reject ('Client is not defined. Make sure you pass the client variable!');
            } else if (this.token == null) {
                return reject ('Token Required!');
            } else {
                snek.get(`${apiEndpoint}/bot/${this.client.user.id}/likes`).set("Authorization", this.token).then(r => {
                    if (r.ok) {
                        return resolve(r.body)
                    } else {
                        return reject(`No bot was found matching the ID ${this.client.user.id}.`);
                    }
                }).catch(() => { return reject(`No bot was found matching the ID ${this.client.user.id}.`);})
            }
        })
    }
    async getAllBots() {
        return new Promise((resolve, reject) => {
                snek.get(`${apiEndpoint}/bots`).then(r => {
                    if (r.ok) {
                        return resolve(r.body)
                    } else {
                        return reject(`Error connecting to the bot list.`);
                    }
                }).catch(() => { return reject(`Error connecting to the bot list.`); })
        })
    }
    async getBotInfo(botID) {
        return new Promise((resolve, reject) => {
            if (botID == null) {
                return reject('You must supply a bot ID to get info from!');
            } else {
                snek.get(`${apiEndpoint}/bot/${botID}/info`).then(r => {
                    if (r.ok) {
                        return resolve(r.body)
                    } else {
                        return reject(`No bot was found matching the ID ${botID}.`);
                    }
                }).catch(() => { return reject(`No bot was found matching the ID ${botID}.`); })
            }
        })
    }
    async getUserInfo(userID) {
        return new Promise((resolve, reject) => {
            if (botID == null) {
                return reject('You must supply a user ID to get info from!');
            } else {
                snek.get(`${apiEndpoint}/user/${userID}`).then(r => {
                    if (r.ok) {
                        return resolve(r.body)
                    } else {
                        return reject(`No user was found matching the ID ${userID}.`);
                    }
                }).catch(() => { return reject(`No user was found matching the ID ${userID}.`); })
            }
        })
    }
}

module.exports = dbwapimodule;
