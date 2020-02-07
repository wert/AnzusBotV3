const key = process.env.TOKEN;
const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "check",
        aliases: [],
        usage: "(command) <id>",
        category: "staff",
        description: "",
        accessableby: "Staff",
        guilds: ["532966690695151625"],
        channels: []
    },
    run: async (bot, message, args) => {

        let id = args[0];
        console.log(args[0]);
        if(!id) return message.channel.send("supply an id");
        if(isNaN(id)) return message.channel.send("not a number");
        let embed = new RichEmbed();
        fetch(`https://api.taxwax.me/players/${id}`, {headers: { 'Authorization': `Bearer ${key}` }}).then(r => r.json()).then(body => {
            console.log(body);
            if(body.status === 403) {
                embed.setAuthor(body.status,message.author.displayAvatarURL)
                embed.setDescription(`${body.message}`)
            } else {
                embed.setAuthor(body[0].name,message.author.displayAvatarURL)
                embed.setTitle("**Player Found**")
                embed.setDescription("You have successfully checked `" + args[0] + "`")
                embed.addField("Name", body[0].name,1)
                embed.addField("SteamID", body[0].pid,1)
                embed.addField("Aliases", body[0].aliases,1)
                embed.addField("Cash", body[0].cash,1)
                embed.addField("Bank", body[0].bankacc,1)
                embed.addField("Level", body[0].exp_level,1)
                embed.addField("XP", body[0].exp_total,1)
                embed.addField("Cop Level", body[0].coplevel,1)
                embed.addField("Cop Dept", body[0].copdept,1)
                embed.addField("Admin Level", body[0].adminlevel,1)
                embed.addField("Medic Level", body[0].mediclevel,1)
                embed.addField("Medic Dept", body[0].medicdept,1)
                embed.addField("UID", body[0].uid,1)
                embed.addField("Arrested", body[0].arrested,1)
                embed.addField("Jail Time", body[0].jail_time,1)
                embed.setFooter(`Last Seen: ${body[0].last_seen}`)
            }
                
            message.channel.send({embed: embed});
        }).catch(err => {
            embed.setAuthor(message.author.name,message.author.displayAvatarURL)
            embed.setDescription(`${err}`)
                
            message.channel.send({embed: embed});
        });
    }
};