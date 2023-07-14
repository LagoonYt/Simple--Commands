const path = require('path');
const fs = require('fs');

module.exports = (clientId) => {
  const commands = [];
  const clearAllCommands = process.env.CLEAR_COMMANDS === 'yes';

  if (!clearAllCommands) {
    const commandsDirectory = path.join(__dirname, '../commands');
    const commandDirectories = fs.readdirSync(commandsDirectory);

    for (const directory of commandDirectories) {
      console.log('\n\u001b[33m' + directory + ':\u001b[0m');
      const commandFiles = fs.readdirSync(path.join(commandsDirectory, directory)).filter(file => file.endsWith('.js'));

      for (const file of commandFiles) {
        const command = require(`./${path.join('../commands', directory, file)}`);
        commands.push(command.data.toJSON());
        console.log('  \u001b[32m' + file + '\u001b[0m has been loaded!');
      }
    }
  }

  return commands; // Return the commands array
};
