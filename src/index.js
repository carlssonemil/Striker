require('dotenv').load();
require("babel-core/register");
require("babel-polyfill");

const commando = require('discord.js-commando');
const client = new commando.Client({
  owner: process.env.OWNER_ID,
  unknownCommandResponse: false
});

client
  .on('error', console.error)
  .on('warn', console.warn)
  .on('debug', console.log)
  .on('ready', () => {
    console.log(`Client is ready; logged in as ${ client.user.tag } (${ client.user.id })`);
    client.user.setActivity('Half Life 3'); // Easter egg 🤭
  })
  .on('disconnect', () => { console.warn('Disconnected!'); })
  .on('reconnecting', () => { console.warn('Reconnecting...'); })
  .on('commandError', (command, error) => {
    if (error instanceof commando.FriendlyError) return;
    console.error(`Error in command ${ command.groupID }:${ command.memberName }`, error);
  });

client.registry
  .registerGroups([
    ['strike', 'Strike – Commands handling the strike functionality']
  ])
  .registerDefaults()
  .registerCommandsIn(__dirname + '/commands');

client.login(process.env.BOT_TOKEN);