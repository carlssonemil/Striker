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
            return username.includes('@') ? true : "A username must be mentioned using '@'."
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
    let member = message.mentions.members.first();
    let db = databaseRef.child(member.id);

    db.update({ 
      "id": member.user.id,
      "username": member.user.username,
      "discriminator": member.user.discriminator,
      "nickname": member.nickname,
      "avatar": member.user.displayAvatarURL
    });

    return message.say(username + " has been updated! 🙌");
  }
};