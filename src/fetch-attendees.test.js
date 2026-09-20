import { jest } from '@jest/globals';

const getMock = jest.fn();

jest.unstable_mockModule('axios', () => ({
  default: { get: getMock },
}));

const { fetchAttendees, AttendeesFetchError } = await import('./fetch-attendees.js');

beforeEach(() => {
  getMock.mockReset();
});

describe('fetchAttendees', () => {
  it('returns the names of members who RSVPed yes', async () => {
    getMock.mockResolvedValue({
      data: [
        { response: 'yes', member: { name: 'Ann' } },
        { response: 'no', member: { name: 'Bob' } },
        { response: 'yes', member: { name: 'Cid' } },
      ],
    });

    await expect(fetchAttendees('group', 'event')).resolves.toEqual(['Ann', 'Cid']);
  });

  it('throws with the API error message when the request fails with a structured error payload', async () => {
    getMock.mockRejectedValue({
      response: { data: { errors: [{ code: 'not_found', message: 'Event not found' }] } },
    });

    await expect(fetchAttendees('group', 'event')).rejects.toThrow(AttendeesFetchError);
    await expect(fetchAttendees('group', 'event')).rejects.toThrow('Event not found');
  });

  it('throws a generic message when the request fails without a response (network error)', async () => {
    getMock.mockRejectedValue(new Error('timeout of 1000ms exceeded'));

    await expect(fetchAttendees('group', 'event')).rejects.toThrow(AttendeesFetchError);
    await expect(fetchAttendees('group', 'event')).rejects.toThrow('Failed to load attendees');
  });
});
