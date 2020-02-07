const { prefix } = require("../../config.json");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

const regex = /^(.*chapo|.*alrp|.*activerp|.*activeroleplay|.*nigger|.*nig|.*n1g|.*n16|.*n19|.*n.gger|.*n.6er).*$/gi;

module.exports = async (bot, message) => {
    if(message.author.bot || message.channel.type === "dm") return;
    const maindis = bot.guilds.get("421117746743476244");
    const logchannel = maindis.channels.get("511558590902042624");
    let embed = new RichEmbed();
    
    let newmsg = message.content.replace(/\s/g, '');
    if(regex.test(newmsg)) return message.delete().then(msg => {
        embed.setAuthor("Regex Logger",guild.iconURL);
        embed.setDescription(stripIndents`**User:** ${message.author.name}
        **Message discord:** ${message.guild.name}
        **Original Message:** ${message.content}
        **Checked Message:** ${newmsg}

        **Regex:** Matched
        **Action:** Message Deleted`);
        logchannel.send({embed:embed});
    });
    if(!message.content.startsWith(prefix)) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    try {
        let cfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
        if(!(cfile.config.guilds.indexOf(message.guild.id) > -1)) return;
        if(!(cfile.config.channels.indexOf(message.channel.id) > -1)) return;

        if(typeof cfile.config.roles_required === "undefined") {
            if(cfile) cfile.run(bot, message, args);
        } else {
            cfile.config.roles_required.forEach(role => {
                if(message.member.roles.find(r => r.id === role)) return cfile.run(bot, message, args);
            });
        }
    } catch(err) {};
};