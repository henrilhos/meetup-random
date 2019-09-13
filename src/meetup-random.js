const { random } = require('faker');
const Attendees = require('./attendees');
const { errorMessage } = require('./utils');

const meetupRandom = async ({ group, event, total }) => {
  const attendees = new Attendees(group, event);
  const members = await attendees.getAttendees();

  if (!members) {
    return;
  }

  console.log('');

  if (total) {
    for (let i = 0; i < total; i += 1) {
      const member = random.arrayElement(members);
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
const run = async ({ flags }) => {
  const { group, event, total } = flags;

  if (!group) {
    return errorMessage('You must provide a group name');
  }

  if (!event) {
    return errorMessage('You must provide an event id');
  }

  return meetupRandom({ group, event, total });
};

module.exports = { run };
