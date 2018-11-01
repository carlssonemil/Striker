const { Command } = require('discord.js-commando');
const { databaseRef } = require('../../firebase.js');

module.exports = class StrikesCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'strikes',
      group: 'strike',
      memberName: 'strikes',
      description: 'Sends the link to the strikes dashboard, or shows amount of strikes a user has if mentioned.',
      examples: ['!strikes'],
      throttling: {
        usages: 3,
        duration: 10
      },
      args: [
        {
          key: 'username',
          prompt: 'What user would you like to check number of strikes for?',
          type: 'string',
          default: '',
          validate: username => {
            return username.includes('@') ? true : "A username must be mentioned using '@'."
          }
        }
      ]
    });
  }

  async run(message, { username }) {
    // If passed username is not empty.
    if (username) {
      // Get member Object from the message.
      let member = message.mentions.members.first();

      // Get number of strikes.
      let numStrikes = await databaseRef.child(member.id + "/strikes").once("value").then(snapshot => { return snapshot.val() });

      // Reply with the users total amount of strikes.
      return message.say(username + " currently has " + numStrikes + " strikes. ⚡");
    }

    // If passed username is empty, reply with link to striker dashboard.
    return message.say("Strike Dashboard: https://striker-6a2ef.firebaseapp.com/");
  }
};