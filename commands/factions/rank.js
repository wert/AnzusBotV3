const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const key = process.env.TOKEN;
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
        name: "rank",
        aliases: ["r"],
        usage: "<steam id> <dept/lvl> <number>",
        category: "factions",
        description: "sets dept or lvl",
        accessableby: "Whitelister",
        roles_required: ["663351574860660766","662664136513159178","661786075190263808","663355217869537359"],
        guilds: ["661769296460120084","650699807861506048","590407544766201864","563058567670792209"],
        channels: ["615791826040913920","661891978929111053","663352531467894809"]
    },
    run: async (bot, message, args) => {
        const pid = args[0];
        const what = args[1];
        const number = args[2];
        if((what != "dept") || (what != "lvl")) return message.send("For type, you must use either `dept` or `lvl`").then(m => m.delete(300));

        let embed = new RichEmbed();
        
        var coplevel;
        var uscglevel;
        var mediclevel;
        var copdept;
        var medicdept;
        var dojlevel;
        var id;


        fetch(`https://api.taxwax.me/players/${pid}`, {
            method: "get",
            headers: {
                "Authorization": `Bearer ${key}`,
            },
        }).then(r => r.json()).then(body => {
            coplevel = body.coplevel;
            uscglevel = body.uscglevel;
            mediclevel = body.mediclevel;
            dojlevel = body.dojlevel;
            copdept = body.copdept;
            medicdept = body.medicdept;
        }).catch(err => {
            message.react("❌");
            message.send(`Could not find anyone with that id`);
        });
        var bod;
        if(message.guild.id == "661769296460120084") {
            if(what == 'dept') {copdept = number};
            if(what == 'lvl') {coplevel = number};
            bod = {"coplevel":coplevel,"copdept":copdept}
        }
        else if(message.guild.id == "590407544766201864") {
            if(what == 'dept') {copdept = number};
            if(what == 'lvl') {uscglevel = number};
            bod = {"uscglevel":uscglevel,"copdept":copdept}}
        else if(message.guild.id == "650699807861506048") {
            if(what == 'dept') {medicdept = number};
            if(what == 'lvl') {mediclevel = number};
            bod = {"mediclevel":mediclevel,"medicdept":medicdept}}
        else if(message.guild.id == "563058567670792209") {
            if(what == 'dept') return message.send("Invalid type").then(m => m.delete(300));
            if(what == 'lvl') {dojlevel = number};
            bod = {"dojlevel":dojlevel}}
        else return message.send("Invalid discord").then(m => m.delete(300));

        fetch(`https://api.taxwax.me/players/u/${id}`, {
            method: "put",
            headers: {
                "Authorization": `Bearer ${key}`,
            },
            body: JSON.stringify(bod)
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