const { REST } = require('discord.js');

module.exports = async (client, clientId) => {
  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put('/applications/' + clientId + '/commands', {
      body: [],
    });

    console.log('Successfully cleared application (/) commands.');
  } catch (error) {
    console.error('Failed to clear application (/) commands:', error);
  }
};
