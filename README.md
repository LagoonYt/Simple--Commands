# Simple-commands Module

A module for creating and registering commands in a Discord bot.

## Installation

To install the `simple-commands-js` module, run the following command:

```shell
npm i simple-commands-js
```
## Usage

Here's an example of how to use the simple-commands-js module in your Discord bot:

```js
const { commands } = require('C:/Users/lloyd/Documents/Simple-commands/index.js');
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
And in the .env file you should have:
```env
TOKEN=(Your bots TOKEN)
GUILD_ID=(Your bots test Server)
CLIENT_ID=(Your bots client ID)
CLEAR_COMMANDS=(Clear your bots commands yes/no)
```
