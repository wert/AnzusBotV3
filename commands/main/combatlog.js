const fetch = require("node-fetch");
const { isEqual } = require("underscore");
require('dotenv').config();
const key = process.env.TOKEN;
var last = [
    {
        "id": 898224,
        "pid": "76561198089507693",
        "owner": "nil",
        "action": "combatLog",
        "info": "Tom Munky/76561198089507693 has combat logged at [1167.48,3652.32,2.08727]",
        "location": "[1167.48,3652.32,2.08727]",
        "time": "2020-01-20T21:34:25.000Z"
    },
    {
        "id": 897455,
        "pid": "76561198169526022",
        "owner": "nil",
        "action": "combatLog",
        "info": "Side: CIV Gear: [[],[],[],[KAEL_SUITS_BR_F12,[]],[],[anzus_backpack_b,[[hlc_optic_ZF95_3011,1]]],,,[],[ItemMap,,,,,]]",
        "location": "[7539.65,2448.63,-0.160305]",
        "time": "2020-01-20T21:22:08.000Z"
    },
    {
        "id": 884376,
        "pid": "76561198298689828",
        "owner": "nil",
        "action": "combatLog",
        "info": "Mir Kalb/76561198298689828 has combat logged at [6243.82,2936.69,-0.0107574]",
        "location": "[6243.82,2936.69,-0.0107574]",
        "time": "2020-01-20T16:12:26.000Z"
    },
    {
        "id": 883236,
        "pid": "76561198254185562",
        "owner": "nil",
        "action": "combatLog",
        "info": "Jacob Micheals/76561198254185562 has combat logged at [7052.15,6518.73,1.28819]",
        "location": "[7052.15,6518.73,1.28819]",
        "time": "2020-01-20T14:57:47.000Z"
    },
    {
        "id": 878818,
        "pid": "76561198101501333",
        "owner": "nil",
        "action": "combatLog",
        "info": "Gavin Button/76561198101501333 has combat logged at [9283.67,8698.45,-4.62322]",
        "location": "[9283.67,8698.45,-4.62322]",
        "time": "2020-01-20T09:16:46.000Z"
    },
    {
        "id": 878027,
        "pid": "76561198257072584",
        "owner": "nil",
        "action": "combatLog",
        "info": "Kaladin Sulzberger/76561198257072584 has combat logged at [9453.98,7458.42,-0.00436783]",
        "location": "[9453.98,7458.42,-0.00436783]",
        "time": "2020-01-20T09:00:13.000Z"
    },
    {
        "id": 874304,
        "pid": "76561198240934460",
        "owner": "nil",
        "action": "combatLog",
        "info": "Jacob King/76561198240934460 has combat logged at [472.064,4561.84,-0.0086441]",
        "location": "[472.064,4561.84,-0.0086441]",
        "time": "2020-01-20T07:09:11.000Z"
    },
    {
        "id": 868071,
        "pid": "76561199007826738",
        "owner": "nil",
        "action": "combatLog",
        "info": "Jack Hass/76561199007826738 has combat logged at [431.748,4513.78,-0.112473]",
        "location": "[431.748,4513.78,-0.112473]",
        "time": "2020-01-20T04:37:46.000Z"
    },
    {
        "id": 865162,
        "pid": "76561199007826738",
        "owner": "nil",
        "action": "combatLog",
        "info": "Jack Hass/76561199007826738 has combat logged at [7411.1,2134.95,-0.76528]",
        "location": "[7411.1,2134.95,-0.76528]",
        "time": "2020-01-20T03:52:55.000Z"
    },
    {
        "id": 863254,
        "pid": "76561198880624547",
        "owner": "nil",
        "action": "combatLog",
        "info": "Tax Wax/76561198880624547 has combat logged at [9436.35,7458.27,0.00487137]",
        "location": "[9436.35,7458.27,0.00487137]",
        "time": "2020-01-20T03:35:00.000Z"
    }
];

module.exports.CombatLog = (guild) => {
    const chan = guild.channels.get("579546309472681994");
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
    fetch(`https://api.taxwax.me/combatlog/10`, {headers: { 'Authorization': `Bearer ${key}` }}).then(r => r.json()).then(body => {
        if(isEqual(last,body)) return console.log('\x1b[34m%s\x1b[0m',"CombatLog: exact same no bother looping");
        body.forEach(element => {
            if(contains(last,element)) return console.log("\x1b[33m%s\x1b[0m",`CombatLog: ${element.info} - true`);
            var str = `${element.action} - pid ${element.owner} - ${element.info} - Date ${element.time}`;
            console.log("\x1b[32m%s\x1b[0m",`Posted ${str}`);
            chan.send(str);
        });
        last = body;
    }).catch(err => {
        console.log("\x1b[31m%s\x1b[0m",`ERROR - CombatLog: ${err}`);
    });

};