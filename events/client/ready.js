const { ConLog } = require("../../commands/factions/convictionlog");
const { CombatLog } = require("../../commands/main/combatlog");

module.exports = async bot => {
    console.log(`${bot.user.username} is online`)
    console.log(bot.commands)

   let statuses = [
       "Just testing",
   ];
   const kspg = bot.guilds.get("551762402086092800");
   const main = bot.guilds.get("421117746743476244");
   setInterval(function() {
        ConLog(kspg);
        CombatLog(main);
    }, 30000)

}