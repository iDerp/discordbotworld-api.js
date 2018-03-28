var dbwapi = require('./index');
const dbw = new dbwapi();
async function test(){
    let botStats = await dbw.getBotStats("339817292659425281")
    console.log(`Bot Shards: ${botStats.shards}\nBot Guilds: ${botStats.guilds}\nBot Likes: ${botStats.likes}`);
}

test()