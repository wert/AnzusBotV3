const { RichEmbed } = module.require("discord.js");

module.exports = {
    config: {
        name: "userinfo",
        aliases: ["ui"],
        usage: "(command)",
        category: "misc",
        description: "",
        accessableby: "Members",
        guilds: ["532966690695151625"]
    },
    run: async (bot, message, args) => {
        let embed = new RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("users info")
            .setColor("#9B59B6")
            .addField("Full username", message.author.tag)
            .addField("ID",message.author.id)
            .addField("Created at", message.author.createdAt);

        message.channel.send({embed: embed});
    }
};