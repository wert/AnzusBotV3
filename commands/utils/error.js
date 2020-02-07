const { RichEmbed } = require("discord.js");
const { colours } = require("../../config.json")

module.exports.noPerms = (message, perm) => {
    let embed = new RichEmbed()
        .setAuthor(message.author.username)
        .setDescription(`You are lacking the permission ${perm}`)
        .setColor(colours.red_dark);
    
    message.channel.send(embed).then(m => m.delete(5));
    message.delete();
};

module.exports.noReason = (message) => {
    let embed = new RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("Please supply a reason.")
        .setColor(colours.red_dark);

    message.channel.send(embed).then(m => m.delete(5));
    message.delete();
};

module.exports.samePerms = (message, user, perms) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription(`${user} has the same permissions as you.`)
        .setColor(colours.red_dark);

    message.channel.send(embed).then(m => m.delete(5));
    message.delete();
};