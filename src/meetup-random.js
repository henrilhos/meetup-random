import { faker } from '@faker-js/faker';
import Attendees from './attendees.js';
import { errorMessage } from './utils.js';

const meetupRandom = async ({ group, event, total }) => {
  const attendees = new Attendees(group, event);
  const members = await attendees.getAttendees();

  if (!members) {
    return;
  }

  console.log('');

  if (total) {
    for (let i = 0; i < total; i += 1) {
      const member = faker.helpers.arrayElement(members);
      members.splice(members.indexOf(member), 1);

      console.log(member);
    }
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

  return meetupRandom({ group, event, total });
};
