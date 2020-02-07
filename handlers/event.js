const { readdirSync } = require("fs");

module.exports = (bot) => {
    const load = dir => {
        const events = readdirSync(`./events/${dir}/`).filter(d => d.endsWith(".js"));
        for (let file of events) {
            const evt = require(`../events/${dir}/${file}`);
            let ename = file.split(".")[0];
            bot.on(ename, evt.bind(null, bot));

        }
    }
    ["client","guild"].forEach(x => load(x));
}