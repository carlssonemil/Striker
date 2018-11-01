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
      userPermissions: ['ADMINISTRATOR'],
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
            return username.includes('@') ? true : "A username must be mentioned using '@'."
          }
        }
      ]
    });
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
      "avatar": "https://cdn.discordapp.com/avatars/" + member.user.id + "/" + member.user.avatar + ".jpg"
    });

    // Set strikes to 0.
    db.child("strikes").transaction(s => s = 0);

    // Reply that the user has been striked.
    return message.say(username + " has been pardoned! 🤩 They currently have 0 strikes. ⚡");
  }
};