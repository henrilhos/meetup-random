import axios from 'axios';

const MEETUP_API_URL = 'https://api.meetup.com';

export class AttendeesFetchError extends Error {}

export const fetchAttendees = async (group, event) => {
  try {
    const { data } = await axios.get(
      `${MEETUP_API_URL}/${group}/events/${event}/rsvps`,
    );

    return data.filter((d) => d.response === 'yes').map((d) => d.member.name);
  } catch (err) {
    const apiMessage = err.response?.data?.errors?.[0]?.message;

    throw new AttendeesFetchError(apiMessage ?? 'Failed to load attendees');
  }
};
