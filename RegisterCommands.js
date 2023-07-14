const registerCommands = async (client, commands, guildId) => {
    console.log('Registering loaded commands...');
  
    // Check if commands is an array
    if (!Array.isArray(commands)) {
      console.error('Commands must be an array.');
      return;
    }
  
    const successfulCommands = [];
    const failedCommands = [];
  
    // Register the bot's slash commands
    for (const command of commands) {
      try {
        if (guildId) {
          // Register command in a specific guild
          await client.guilds.cache.get(guildId)?.commands.create(command);
        } else {
          // Register command globally
          await client.application?.commands.create(command);
        }
        successfulCommands.push(command.name);
      } catch (error) {
        console.error(`Failed to register command '${command.name}':`, error);
        failedCommands.push(command.name);
      }
    }
  
    if (successfulCommands.length > 0) {
      console.log('\u001b[32m' + "Commands registered successfully!");
    }
  
    if (failedCommands.length > 0) {
      console.error(`Failed to register commands: ${failedCommands.join(', ')}`);
    }
  };
  
  module.exports = registerCommands;
  