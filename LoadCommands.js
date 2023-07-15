const path = require('path');
const fs = require('fs');
const readline = require('readline');

const createCommandsFolder = (folderPath) => {
  fs.mkdirSync(folderPath);
  console.log(`Created 'commands' folder at ${folderPath}`);
};

const createSubfolders = (folderPath, subfolders) => {
  for (const subfolder of subfolders) {
    const subfolderPath = path.join(folderPath, subfolder);
    fs.mkdirSync(subfolderPath);
    console.log(`Created '${subfolder}' subfolder at ${subfolderPath}`);
  }
};

const promptConfirmation = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('Commands folder does not exist. Do you want to create it? (yes/no): ', (answer) => {
      rl.close();
      resolve(answer === 'yes');
    });
  });
};

module.exports = async (clientId) => {
  const commands = [];
  const clearAllCommands = process.env.CLEAR_COMMANDS === 'yes';

  if (!clearAllCommands) {
    const botRootDirectory = path.resolve(process.cwd());
    const commandsDirectory = path.join(botRootDirectory, 'commands');

    if (!fs.existsSync(commandsDirectory)) {
      console.error('Commands directory not found.');

      const shouldCreateFolder = await promptConfirmation();

      if (shouldCreateFolder) {
        createCommandsFolder(commandsDirectory);
        createSubfolders(commandsDirectory, ['admin', 'entertainment']);
        return commands;
      } else {
        return commands;
      }
    } else {
      const commandDirectories = fs.readdirSync(commandsDirectory);

      for (const directory of commandDirectories) {
        console.log('\n\u001b[33m' + directory + ':\u001b[0m');
        const commandFiles = fs.readdirSync(path.join(commandsDirectory, directory)).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
          const commandPath = path.join(commandsDirectory, directory, file);
          // console.log('Loading command:', commandPath); // Add this line to track the loaded command file
          const command = require(commandPath);
          commands.push(command.data.toJSON());
          console.log('  \u001b[32m' + file + '\u001b[0m has been loaded!');
        }
      }
    }
  }



  return commands;
};
