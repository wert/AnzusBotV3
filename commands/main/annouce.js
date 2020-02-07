const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    config: {
        name: "annouce",
        aliases: [],
        usage: "",
        category: "staff",
        description: "",
        accessableby: "Staff",
        guilds: ["532966690695151625"],
        channels: []
    },
    run: async (bot, message) => {
        try {
            const chan = message.guild.channels.get("573491456745013259");
            let embed = new RichEmbed();
            embed.setAuthor("Tax Wax",message.guild.iconURL)
            embed.setDescription(stripIndents`The bot is undergoing some maintenance, all missed logs will be posted`);
            chan.send({embed: embed});
        } catch(e) {
            console.log(e);
        };
    }
};