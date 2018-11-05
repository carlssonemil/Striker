# Striker 🤖⚡

A strike bot for Discord.

## Commands

|Command|Description|Example|Result|
|:-|:-|:-|:-|
|!strike @[username]|Strikes a user.|!strike @johndoe|@johndoe has been striked!|
|!unstrike @[username]|Unstrikes a user|!unstrike @johndoe|@johndoe has been unstriked!|
|!strikes|Returns dashboard URL link|!strikes|[url to the dashboard]|
|!strikes @[username]|Shows how many strikes a user has|!strikes @johndoe|@johndoe has 2 strikes.|
|!update @[username]|Updates a user in the database|!update @johndoe|@johndoe has been updated!|
|!pardon @[username]|Pardons a user's strikes|!pardon @johndoe|@johndoe has been pardoned!|

## About

This bot is written in [Node.js](https://nodejs.org/en/) with [Babel](https://babeljs.io/), using the module [Discord.js](https://discord.js.org/#/) for interacting with the [Discord API](https://discordapp.com/developers/docs/intro) and [Firebase](https://firebase.google.com/) for database storage.

> This bot is not publicly hosted yet, meaning it is not possible to add it to your server.

## Todo

- [ ] Add a [SettingProvider](https://discord.js.org/#/docs/commando/master/class/SettingProvider).
- [ ] Host publicly, allowing anyone to add the bot to their server.

## Installing & running

> [Node.js](https://nodejs.org/en/) needs to be installed on your computer to start the bot, you can download it [here](https://nodejs.org/en/download/).

1. Clone this repository.
    ```
    git clone https://github.com/carlssonemil/Striker.git
    ```
2. Run `npm install` to install dependencies.
3. Create `.env` file and enter the correct values, see [`.env.example`](https://github.com/carlssonemil/Striker/blob/master/.env.example).
4. Start the bot locally with `npm run start`, or `npm run dev` for development*.
5. If you set everything up correctly you should be met with the following message:
    ```
    LIVE Client is logged in and ready.

      Logged in as:
      - Username: <The bot's Discord username>
      - Bot ID: <The bot's ID>

      Process will restart when files are changed. Press Ctrl+C to end process.
    ```
6. The bot is now logged into Discord and is listening to all channels it has permission to in the server you invited it to.

( * Utilizing [nodemon](https://nodemon.io/) to restart server on filechange. )

### Environment Variables

> The bot is currently using Firebase to store and fetch data. This might change in the future.

|Name|Description|
|:--|:--|
|BOT_TOKEN|The bot token used to log into the [Discord API](https://discordapp.com/developers/docs/intro) with, see [this guide](https://anidiots.guide/getting-started/getting-started-long-version) on how to get the token.|
|BOT_ID|The client ID for the bot, follow guide mentioned above if you're unsure.|
|FIREBASE_APIKEY|The API key for your firebase project. Follow [this guide](https://firebase.google.com/docs/web/setup) on how to setup a Firebase project.|
|FIREBASE_AUTHDOMAIN|The authentication domain. (see [guide](https://firebase.google.com/docs/web/setup))|
|FIREBASE_DATABASEURL|The database URL. (see [guide](https://firebase.google.com/docs/web/setup))|
|FIREBASE_PROJECTID|The project ID. (see [guide](https://firebase.google.com/docs/web/setup))|
|FIREBASE_STORAGEBUCKET|The storage bucket. (see [guide](https://firebase.google.com/docs/web/setup))|
|FIREBASE_MESSAGINGSENDERID|The messaging sender ID. (see [guide](https://firebase.google.com/docs/web/setup))|
|ALLOWED_ROLES|The [roles](https://discordapp.com/developers/docs/topics/permissions#role-object) in your Discord server that are allowed to do commands. Default is users with the [permission](https://discordapp.com/developers/docs/topics/permissions) "Administrator". Separate by colon and space, i.e. "Admin, Raider, Casual"|
|OWNER_ID|The bot's owner ID, this is so people know who to contact if bot gets an error. *(optional)*|

## License

Code released under the [MIT License](https://github.com/carlssonemil/project-boilerplate/blob/master/LICENSE).