const chalk = require('chalk');

const errorMessage = (message) => {
  console.error(chalk.red(`ERROR: ${message}`));
};

const meetupRandom = (url, flags) => {
  console.log(url);
  console.log(flags);
};

/**
 * @param {Object} cli - The cli object that returns meow()
 * @param {Array} cli.input - The cli input
 * @param {Object} cli.flags - The cli flags
 *
 * @return {Function}
 */
const run = ({ input, flags }) => {
  const url = input[0];

  if (!url) { return errorMessage('You must provide at least an URL'); }

  return meetupRandom(url, flags);
};

module.exports = {
  run,
};
