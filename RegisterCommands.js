const { REST } = require('discord.js');

module.exports = async (client, commands, guildId) => {
  console.log('Registering loaded commands...');

  if (!Array.isArray(commands)) {
    console.error('Commands must be an array.');
    return;
  }

  const successfulCommands = [];
  const failedCommands = [];

  try {
    if (guildId) {
      await client.guilds.cache.get(guildId)?.commands.set(commands);
    } else {
      await client.application?.commands.set(commands);
    }

    commands.forEach((command) => {
      successfulCommands.push(command.name);
    });

    if (successfulCommands.length > 0) {
      console.log('\u001b[32m' + 'Commands registered successfully!');
    }
  } catch (error) {
    console.error('Failed to register commands:', error);
    commands.forEach((command) => {
      failedCommands.push(command.name);
    });
  }

  if (failedCommands.length > 0) {
    console.error(`Failed to register commands: ${failedCommands.join(', ')}`);
  }
};
