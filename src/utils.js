const chalk = require('chalk');

const errorMessage = (message) => {
  console.error(chalk.red(`ERROR: ${message}`));
};

module.exports = {
  errorMessage,
};
