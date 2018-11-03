const { Command } = require('discord.js-commando');
const { databaseRef } = require('../../firebase.js');

module.exports = class StrikeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unstrike',
      group: 'strike',
      memberName: 'unstrike',
      description: 'Unstrikes a user.',
      examples: ['!unstrike @username'],
      throttling: {
        usages: 3,
        duration: 10
      },
      args: [
        {
          key: 'username',
          prompt: 'What user would you like to unstrike?',
          type: 'string',
          validate: username => {
            // Validate that the username mentioned is not the bot.
            if (username === "<@" + process.env.BOT_ID + ">") return "You can't strike me, silly. I am the god of strikes 😈 Mention someone else to strike.";

            // Validate that the username passed is a valid user ID.
            if (!username.includes('<@')) return "A username must be mentioned using '@'.";

            return true;
          }
        }
      ]
    });
  }
  
  hasPermission(message) {
    // Checks if command was sent from a guild (server) channel.
    if (message.guild) {
      return (message.member.roles.some(role => process.env.ALLOWED_ROLES.split(', ').includes(role.name)) || message.member.permissions.has("ADMINISTRATOR")) ? true : 
              'The `unstrike` command requires you to have "Administrator" permission, or one of the following roles: ' + process.env.ALLOWED_ROLES.split(', ').map(role => `"${role}"`).join(', ') + '.';
    }

    // Return error message if command was sent from a DM.
    return 'You have to be in a server to do this command. This is a direct message, silly 😉';
  }

  async run(message, { username }) {
    // Get member Object from the message.
    let member = message.mentions.members.first();

    // Assign database reference to variable.
    let db = databaseRef.child(member.id);

    // Update the item in the database.
    db.update({ 
      "id": member.user.id,
      "username": member.user.username,
      "discriminator": member.user.discriminator,
      "nickname": member.nickname,
      "avatar": member.user.displayAvatarURL
    });

    // Decrement the strikes by 1, or set 0 if no strikes exists or it is already 0.
    await db.child("strikes").transaction(s => (s && s != 0) ? s - 1 : 0);

    // Get number of strikes.
    let numStrikes = await databaseRef.child(member.id + "/strikes").once("value").then(snapshot => { return snapshot.val() });

    // Reply that the user has been unstriked.
    return message.say(username + " has been unstriked! 😃 They currently have " + numStrikes + " strikes. ⚡");
  }
};