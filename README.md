# Striker 🤖⚡
### A strike bot for Discord.

<br />

## Features:
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

## Installing

* [Node.js](https://nodejs.org/en/) needs to be installed on your computer, you can download it [here](https://nodejs.org/en/download/).
* Run ```npm install``` in the terminal to install all dependencies.

## Setup

*Will describe setup later. Tl;dr: Bot Token and Firebase config needs to be setup inside a .env file. See [.env.example](https://github.com/carlssonemil/striker-bot/blob/master/.env.example).*

## Running the bot

Run ```npm run start``` in the terminal. The bot should now be online in your Discord server if you set everything up correctly.

## License
Code released under the [MIT License](https://github.com/carlssonemil/project-boilerplate/blob/master/LICENSE).