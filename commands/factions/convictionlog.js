const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { stripIndents } = require("common-tags");
const { isEqual } = require("underscore");
require('dotenv').config();
const key = process.env.TOKEN;
var last = [
    {
        "timestamp": "2020-01-20T21:45:55.135Z",
        "name": "Harry Lennar",
        "assisting": "Rupert Drayton, Tom Carter, George Cown",
        "timeofarrest": "8:45",
        "suspect": "Muj Santana",
        "charges": "1x Major Crime",
        "prisontime": "20",
        "pleatime": "5"
    },
    {
        "timestamp": "2020-01-20T21:42:57.368Z",
        "name": "Timothy Red",
        "assisting": "n/a",
        "timeofarrest": "3:42PM EST",
        "suspect": "Max Sulzberger",
        "charges": "1x class 3",
        "prisontime": "15",
        "pleatime": "5(CID)"
    },
    {
        "timestamp": "2020-01-20T21:41:01.683Z",
        "name": "Oliver Grogan",
        "assisting": "Jed Sanders",
        "timeofarrest": "3:40",
        "suspect": "Logan Foster",
        "charges": "1 x possession of class 3",
        "prisontime": "12",
        "pleatime": "0"
    },
    {
        "timestamp": "2020-01-20T21:36:31.395Z",
        "name": "Jay Sneddon",
        "assisting": "N/A",
        "timeofarrest": "8:36",
        "suspect": "Tofu Sulzberger",
        "charges": "1x Class 3 Firearm",
        "prisontime": "8",
        "pleatime": "4"
    },
    {
        "timestamp": "2020-01-20T21:34:51.941Z",
        "name": "Josh Evans",
        "assisting": "0",
        "timeofarrest": "20:34",
        "suspect": "John Olsen",
        "charges": "Attempted Second Degree Murder",
        "prisontime": "21",
        "pleatime": "0"
    },
    {
        "timestamp": "2020-01-20T21:22:44.808Z",
        "name": "Josh Evans",
        "assisting": "0",
        "timeofarrest": "20:22",
        "suspect": "Bobby Brown",
        "charges": "Attempted 2nd Degree Murder",
        "prisontime": "15",
        "pleatime": "0"
    },
    {
        "timestamp": "2020-01-20T21:12:18.666Z",
        "name": "Timothy Red",
        "assisting": "N/A",
        "timeofarrest": "3:11pm EST",
        "suspect": "Jimmy Sinclair",
        "charges": "1x Class 3",
        "prisontime": "15",
        "pleatime": "5"
    },
    {
        "timestamp": "2020-01-20T21:11:31.089Z",
        "name": "Jay Sneddon",
        "assisting": "N/A",
        "timeofarrest": "8:11",
        "suspect": "Frankie Rankin",
        "charges": "1x Class 3 Firearm",
        "prisontime": "5",
        "pleatime": "7"
    },
    {
        "timestamp": "2020-01-20T21:09:30.470Z",
        "name": "Jack Ryder",
        "assisting": "Chris Wilson",
        "timeofarrest": "8:08PM GMT ",
        "suspect": "Carter Jaxon",
        "charges": "1 x Possesion of Class 3 ",
        "prisontime": "20",
        "pleatime": "0"
    },
    {
        "timestamp": "2020-01-20T21:09:26.380Z",
        "name": "Harry OCallaghan",
        "assisting": "N/A",
        "timeofarrest": "20:09 GMT",
        "suspect": "Ollie Meeseeks",
        "charges": "Class 3 ",
        "prisontime": "5",
        "pleatime": "7"
    }
];
module.exports.ConLog = (guild) => {
    const chan = guild.channels.get("573491456745013259");
    let embed = new RichEmbed();
    function isIdentical(left, right){
        return JSON.stringify(left) === JSON.stringify(right);
    };
    
    function contains(array, obj){
        let count = 0;
        array.map((cur) => {
              if(isIdentical(cur, obj)) count++;
        });
        return count > 0;
    };
    fetch(`https://api.taxwax.me/conviction/6`, {headers: { 'Authorization': `Bearer ${key}` }}).then(r => r.json()).then(body => {
        if(isEqual(last,body)) return console.log('\x1b[34m%s\x1b[0m',"ConvictionLog: exact same no bother looping");
        body.forEach(element => {
            if(contains(last,element)) return console.log("\x1b[33m%s\x1b[0m",`ConvictionLog: ${element.name} - true`);
            console.log("\x1b[32m%s\x1b[0m",`Posted ${element.timeofarrest}`);
            embed.setAuthor("Conviction Log",guild.iconURL)
            embed.setDescription(stripIndents`**Name:** ${element.name}
            **Assisting Officers:** ${element.assisting}
            **Time of arrest:** ${element.timeofarrest}

            **Name of suspect:** ${element.suspect}
            **Charges:** ${element.charges}
            **Prison Time:** ${element.prisontime}
            **Plea time:** ${element.pleatime}`);
            chan.send({embed: embed});
        });
        last = body;
    }).catch(err => {
        console.log("\x1b[31m%s\x1b[0m",`ERROR - ConvictionLog: ${err}`);
    });

};