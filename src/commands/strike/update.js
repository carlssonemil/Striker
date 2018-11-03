const { Command } = require('discord.js-commando');
const { databaseRef } = require('../../firebase.js');

module.exports = class UpdateCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'update',
      group: 'strike',
      memberName: 'update',
      description: 'Updates a users nickname and avatar in database.',
      examples: ['!update @username'],
      throttling: {
        usages: 3,
        duration: 10
      },
      args: [
        {
          key: 'username',
          prompt: 'What user would you like to update?',
          type: 'string',
          validate: username => {
            // Validate that the username mentioned is not the bot.
            if (username === "<@" + process.env.BOT_ID + ">") return "I am always up to date, I'm a bot 🤖 Mention someone else to update.";

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
    return message.guild ? true : 'You have to be in a server to do this command. This is a direct message, silly 😉';
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

    // Reply that the user has been updated.
    return message.say(username + " has been updated! 🙌");
  }
};