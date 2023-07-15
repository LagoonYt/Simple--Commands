const LoadCommands = require('./LoadCommands');
const RegisterCommands = require('./RegisterCommands');
const ClearCommands = require('./ClearCommands');

module.exports = {
  commands: {
    Load: LoadCommands,
    Register: RegisterCommands,
    Clear: ClearCommands,
  },
};
