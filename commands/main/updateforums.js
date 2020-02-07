const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const ipa = process.env.IPA;
const fetch = require("node-fetch");

/*
SO Guild - 661769296460120084
CG Guild - 590407544766201864
FD Guild - 650699807861506048
Gov Guild - 563058567670792209


CG Whitelister - 663351574860660766
FD Whitelister - 662664136513159178
SO Whitelister - 661786075190263808
Gov Whitelister - 663355217869537359
SO Channel - 661891978929111053
CG Channel - 615791826040913920
FD Chanel - 663352531467894809
Gov Channel - 663355423159746571

[0,0,0,0,0,0,0,0]
0 Coplvl, 1 CopDept, 2 MedicLvl, 3 MedicDept, 4 USCGlvl, 5 USCGdept, 6 DOJlvl, 7 DOJdept

*/

module.exports = {
    config: {
        name: "updateforums",
        aliases: ["uf"],
        usage: "<forumid> <rank>",
        category: "main",
        description: "ID is numbers in forums profile",
        accessableby: "SLT",
        roles_required: [],
        guilds: []
    },
    run: async (bot, message, args) => {
        if(args.length <= 0) return message.send("Valid options are; member, support, snrsupport, mod, admin, senior admin, head admin, staff manager")

        let forumid = args[0];
        var rank;
        /*
        Senior Admin - 0
        Head Admin - 1
        Staff Manager - 2
        Management - 3
        Lead Team - 4

        */
        const rankarr = [
            ["mod","snrsupport","support","member"],
            ["admin"],
            ["senior admin","head admin"],
            ["staff manager"]
        ];
        if(args.length >= 2) {
            rank = `${args[1]} ${args[2]}`;
        } else {
            rank = args[1];
        };
        var canpromote;
        if(message.author.roles.find(r => r.name == "Senior Administrator")) {
            canpromote = rankarr[0];
        } else if(message.author.roles.find(r => r.name == "Head Administrator")) {
            canpromote = rankarr[1];
            canpromote.concat(rankarr[0]);
        } else if(message.author.roles.find(r => r.name == "Staff Manager")) {
            canpromote = rankarr[2];
            canpromote.concat(rankarr[1]);
            canpromote.concat(rankarr[0]);
        } else if(message.author.roles.find(r => r.name == "Management")) {
            canpromote = rankarr[3];
            canpromote.concat(rankarr[2]);
            canpromote.concat(rankarr[1]);
            canpromote.concat(rankarr[0]);
        } else if(message.author.roles.find(r => r.name == "Lead Team")) {
            canpromote = rankarr[3];
            canpromote.concat(rankarr[2]);
            canpromote.concat(rankarr[1]);
            canpromote.concat(rankarr[0]);
        };
        if(!(canpromote.includes(rank))) return message.send(`You are not allowed to put someone to ${rank}`);
        
        const dict = {
            "member": 3,
            "support": 83,
            "snrsupport": 84,
            "mod": 6,
            "admin": 50,
            "senioradmin": 70,
            "headadmin": 67,
            "staffmanager": 71,
            "management": 75
        };

        fetch(`http://anzus.life/api/core/members/${forumid}?group=${dict[rank]}&key=${ipa}`, {
            method: "post"
        }).then(r => r.json()).then(body => {
            message.react("✅");
            embed.setAuthor("Whitelist Log",message.guild.iconURL);
            embed.setDescription(stripIndents`**Whitelister:** ${message.author.name}

            **Steam ID:** ${steamid}
            **Payload:** ${current}`);
            message.channel.send({embed: embed});
        }).catch(err => {
            message.react("❌");
        });
    }
};