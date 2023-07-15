# Simple-commands-js

A module for creating and registering commands in a Discord bot.

## Installation

To install the `simple-commands-js` module, run the following command:

```shell
npm i simple-commands-js
```



## Usage

First, import the module into your code:

```js
const { commands } = require('simple-commands-js');
```
To use the module, you can make the following function calls:

```js
await commands.load(process.env.CLIENT_ID)
await commands.register(client, loadedCommands, guildId)
await commands.clear(client, process.env.CLIENT_ID)
```
The loadedCommands variable represents the result of the commands.load function:
```js
const loadedCommands = await commands.Load(process.env.CLIENT_ID);
```
Once you have set up your code correctly, you can run it. When you run the code, it will prompt you to create a commands folder.

The module will create two subfolders: "Admin" and "Entertainment". However, you are not restricted to these. You can have as many subfolders as you want with any name.


Here's an example of how to use the simple-commands-js module in your Discord bot:

```js
const { commands } = require('simple-commands-js');
const { Client, GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv');

//Load the enviroment variables from the .env file
config();

//State which intents your bot will need
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

//Login with the provided TOKEN
client.login(process.env.TOKEN).then(async () => {
//Check if the user wants the commands to be cleared from discord commands list
  if (process.env.CLEAR_COMMANDS === 'yes') {
//Use simple-commands-js to clear the commands
    await commands.Clear(client, process.env.CLIENT_ID);
  } else {
//If the user stated they do not want to clear commands 
//Then load the commands into the bot file using simple-commands-js module
    const loadedCommands = await commands.Load(process.env.CLIENT_ID); // Await the result of the Load function
    const guildId = process.env.GUILD_ID;
//Use the simple-commands-js module to finally register the commands with discord
    commands.Register(client, loadedCommands, guildId);
  }
});

```
### Configuration

Before using the `simple-commands-js` module, make sure to set the following environment variables:

- `TOKEN`: Your bot's authentication token.
- `GUILD_ID`: The ID of your bot's test server.
- `CLIENT_ID`: Your bot's client ID.
- `CLEAR_COMMANDS`: Specify whether to clear your bot's commands from the Discord commands list (set to "yes" or "no").

Make sure to set these variables in a `.env` file in the root directory of your project.


## Commands format
```js
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
  // Define the slash command data
  data: new SlashCommandBuilder()
    .setName('Command')
    .setDescription('Does command stuff')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => option
        .setName('triggerword')
        .setDescription('The word to add as a trigger word')
        .setRequired(true)
    ),

  async execute(interaction) {
    //Add in your commands code here
  },
};

```
