/* eslint-disable class-methods-use-this */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
const axios = require('axios');
const ora = require('ora');

const MEETUP_API_URL = 'https://api.meetup.com';
const spinner = ora('Loading attendees');

class Attendees {
  constructor(group, event) {
    this._groupName = group;
    this._eventId = event;
  }

  async getAttendees() {
    this._loading();

    const attendees = await this._fetchAttendees();

    if (!this._validate(attendees)) {
      this._loadFailed();
      return null;
    }

    this._loadSucceed();

    return attendees;
  }

  async _fetchAttendees() {
    try {
      const { data } = await axios.get(
        `${MEETUP_API_URL}/${this._groupName}/events/${this._eventId}/rsvps`,
      );

      const attendees = data
        .filter((d) => d.response === 'yes')
        .map((d) => d.member.name);

      return attendees;
    } catch ({ response }) {
      const { data } = response;

      return data.errors;
    }
  }

  _loading() {
    spinner.start();
  }

  _loadFailed() {
    spinner.fail();
  }

  _loadSucceed() {
    spinner.succeed();
  }

  _validate(attendees) {
    if (Array.isArray(attendees) && attendees.length > 0 && attendees[0].code) {
      return false;
    }

    return true;
  }
}

module.exports = Attendees;
