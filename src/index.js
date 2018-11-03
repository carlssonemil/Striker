require('dotenv').load();
require("babel-core/register");
require("babel-polyfill");

const commando = require('discord.js-commando');
const client = new commando.Client({
  owner: process.env.OWNER_ID,
  unknownCommandResponse: false
});

client.registry.registerGroup('strike', 'Strike');
client.registry.registerDefaults();
client.registry.registerCommandsIn(__dirname + "/commands");

client.login(process.env.BOT_TOKEN);