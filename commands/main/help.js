const { RichEmbed } = require("discord.js");
const { prefix, colours } = require("../../../config.json");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags")

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "commands"],
        usage: "(command)",
        category: "misc",
        description: "Displays all commands that the bot has.",
        accessableby: "Members",
        guilds: ["532966690695151625"],
        channels: []
    },
    run: async (bot, message, args) => {
        const embed = new RichEmbed()
            .setColor(colours.cyan)
            .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
            .setThumbnail(bot.user.displayAvatarURL)

        if(!args[0]) {
            const categories = readdirSync("./commands/");

            embed.setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix is **${prefix}**`);
            embed.setFooter(`© ${message.guild.me.displayName} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);
    
            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category);
                const cap = category.slice(0, 1).toUpperCase() + category.slice(1);
                try {
                    embed.addField(`❯ ${cap} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))} catch (e) {
                    console.log(e);
                };
            });
            return message.channel.send(embed)

        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
            if(!command) return message.channel.send(embed.setTitle("Invalid command.").setDescription(`Do \`${prefix}help\ for the list of commands.`));
            command = command.config
            if(typeof command.roles_required != "undefined") {
                var check = 0;
                command.roles_required.forEach(rid => {
                    if((message.member.roles.find(r => r.id === rid)) && (command.guilds.includes(message.guild.id))) {check += 1;};
                });
                if(check == 0) return;
            };

            embed.setDescription(stripIndents`**Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No description provided"}
            **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\``: "No Usage"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`);

            return message.channel.send(embed);
        }
    }
};