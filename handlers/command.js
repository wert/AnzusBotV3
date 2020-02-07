const { readdirSync } = require("fs");

module.exports = (bot) => {
    const load = dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(d => d.endsWith(".js"));
        for (let file of commands) {
            //console.log(file)
            const pull = require(`../commands/${dir}/${file}`);
            //console.log(pull.config)
            if((file == "combatlog.js") || (file == "convictionlog.js")) return;
            bot.commands.set(pull.config.name, pull);
            if(pull.config.aliases) pull.config.aliases.forEach(a => bot.aliases.set(a, pull.config.name));

        }
    }
    ["main","factions"].forEach(x => load(x));
}