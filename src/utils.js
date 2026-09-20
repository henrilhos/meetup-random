import chalk from 'chalk';

export const errorMessage = (message) => {
  console.error(chalk.red(`ERROR: ${message}`));
};
