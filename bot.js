const { token, prefix } = require('./config.json');
const { Client, Collection } = require('discord.js');

const bot = new Client({disableEveryone:true});

["commands", "aliases"].forEach(x => bot[x] = new Collection);
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(token);