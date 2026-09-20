import { faker } from '@faker-js/faker';
import ora from 'ora';
import { AttendeesFetchError, fetchAttendees } from './fetch-attendees.js';
import { errorMessage } from './utils.js';

const parseTotal = (total) => {
  const parsed = Number(total);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
};

const meetupRandom = async ({ group, event, total }) => {
  const spinner = ora('Loading attendees').start();

  let members;

  try {
    members = await fetchAttendees(group, event);
    spinner.succeed();
  } catch (err) {
    spinner.fail();

    if (err instanceof AttendeesFetchError) {
      errorMessage(err.message);
      return;
    }

    throw err;
  }

  console.log('');

  if (total) {
    faker.helpers.arrayElements(members, total).forEach((member) => console.log(member));
    return;
  }

  members.forEach((member) => console.log(member));
};

/**
 * @param {Object} cli - The cli object that returns meow()
 * @param {Array} cli.input - The cli input
 * @param {Object} cli.flags - The cli flags
 *
 * @return {Function}
 */
export const run = async ({ flags }) => {
  const { group, event, total } = flags;

  if (!group) {
    return errorMessage('You must provide a group name');
  }

  if (!event) {
    return errorMessage('You must provide an event id');
  }

  if (total === undefined) {
    return meetupRandom({ group, event });
  }

  const parsedTotal = parseTotal(total);

  if (parsedTotal === null) {
    return errorMessage('Total must be a positive integer');
  }

  return meetupRandom({ group, event, total: parsedTotal });
};
