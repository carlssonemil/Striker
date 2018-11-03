const { Command } = require('discord.js-commando');
const { databaseRef } = require('../../firebase.js');

module.exports = class StrikeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'strike',
      group: 'strike',
      memberName: 'strike',
      description: 'Strikes a user.',
      examples: ['!strike @username'],
      throttling: {
        usages: 3,
        duration: 10
      },
      args: [
        {
          key: 'username',
          prompt: 'What user would you like to strike?',
          type: 'string',
          validate: username => {
            // Validate that the username mentioned is not the bot.
            if (username === "<@" + process.env.BOT_ID + ">") return "You can't strike me, silly. I am the god of strikes 😈 Mention someone else to strike.";

            // Validate that the username passed is a valid user ID.
            if (!username.includes('<@')) return "A username must be mentioned using '@'.";

            return true;
          }
        },
        {
          key: 'reason',
          prompt: 'What is the reason for the strike?',
          type: 'string'
        }
      ]
    });
  }

  hasPermission(message) {
    // Checks if command was sent from a guild (server) channel.
    if (message.guild) {
      return (message.member.roles.some(role => process.env.ALLOWED_ROLES.split(', ').includes(role.name)) || message.member.permissions.has("ADMINISTRATOR")) ? true : 
              'The `strike` command requires you to have "Administrator" permission, or one of the following roles: ' + process.env.ALLOWED_ROLES.split(', ').map(role => `"${role}"`).join(', ') + '.';
    }

    // Return error message if command was sent from a DM.
    return 'You have to be in a server to do this command. This is a direct message, silly 😉';
  }

  async run(message, { username, reason }) {
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

    // Push the strike reason.
    db.child("reasons").push(reason);

    // Increment the strikes by 1.
    await db.child("strikes").transaction(s => (s || 0) + 1);

    // Get number of strikes.
    let numStrikes = await databaseRef.child(member.id + "/strikes").once("value").then(snapshot => { return snapshot.val() });

    // Send DM to mentioned user that they have been striked.
    member.send("You have been striked! 😠" +
                "\n\n**Striked by:** " + message.author.tag +
                "\n**Reason:** " + reason +
                "\n**Server:** " + message.guild +
                "\n**Current strikes:** " + numStrikes);

    // Reply that the user has been striked.
    return message.say(username + " has been striked! 😠" +
                      "\n\n**Striked by:** " + message.author +
                      "\n**Reason:** " + reason +
                      "\n**Current strikes:** " + numStrikes +
                      "\n\n**StrikeBot Dashboard:** https://striker-6a2ef.firebaseapp.com/");
  }
};