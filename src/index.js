require('dotenv').load();
require("babel-core/register");
require("babel-polyfill");

const clc = require("cli-color");

const commando = require('discord.js-commando');
const client = new commando.Client({
  owner: process.env.OWNER_ID,
  unknownCommandResponse: false
});

client
  .on('error', console.error)
  .on('warn', console.warn)
  .on('ready', () => {
    process.stdout.write(clc.reset);
    console.log(clc.black.bgGreen(` LIVE `) + clc.green(` Client is logged in and ready.`))
    console.log(`
  Logged in as:
  - Username: ${ client.user.tag }
  - Bot ID: ${ client.user.id }

  Process will restart when files are changed. Press ${ clc.yellow("Ctrl+C") } to end process.\n
    `);

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