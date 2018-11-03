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
            return username.includes('@') ? true : "A username must be mentioned using '@'."
          }
        }
      ]
    });
  }

  hasPermission(message) {
    return (message.member.roles.some(role => allowedRoles.includes(role.name)) || message.member.permissions.has("ADMINISTRATOR")) ? true : 
            message.member + ', The `strike` command requires you to have "Administrator" permission, or one of the following roles: ' + allowedRoles.map(role => `"${role}"`).join(', ') + '.';
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

    // Reply that the user has been striked.
    return message.say(username + " has been pardoned! 🤩 They currently have 0 strikes. ⚡");
  }
};