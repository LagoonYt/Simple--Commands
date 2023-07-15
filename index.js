const LoadCommands = require('./LoadCommands');
const RegisterCommands = require('./RegisterCommands');
const ClearCommands = require('./ClearCommands');

module.exports = {
  commands: {
    load: LoadCommands,
    register: RegisterCommands,
    clear: ClearCommands,
  },
};
