const { Command } = require('discord.js-commando');
const { databaseRef } = require('../../firebase.js');

module.exports = class StrikeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pardon',
      aliases: ['clean', 'clear', 'forgive'],
      group: 'strike',
      memberName: 'pardon',
      description: 'Pardons a user.',
      examples: ['!pardon @username'],
      throttling: {
        usages: 3,
        duration: 10
      },
      args: [
        {
          key: 'username',
          prompt: 'What user would you like to pardon?',
          type: 'string',
          validate: username => {
            // Validate that the username mentioned is not the bot.
            if (username === "<@" + process.env.BOT_ID + ">") return "I'm flattered that you want to pardon me, but I don't have any strikes 😇 Mention someone else to pardon.";

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
      return (message.member.roles.some(role => process.env.ALLOWED_ROLES.includes(role.name)) || message.member.permissions.has("ADMINISTRATOR")) ? true : 
              message.member + ', The `strike` command requires you to have "Administrator" permission, or one of the following roles: ' + process.env.ALLOWED_ROLES.map(role => `"${role}"`).join(', ') + '.';
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

    // Set strikes to 0.
    db.child("strikes").transaction(s => s = 0);

    // Reply that the user has been pardoned.
    return message.say(username + " has been pardoned! 🤩 They currently have 0 strikes. ⚡");
  }
};