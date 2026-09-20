import { jest } from '@jest/globals';
import { faker } from '@faker-js/faker';

const fetchAttendeesMock = jest.fn();

class MockAttendeesFetchError extends Error {}

jest.unstable_mockModule('./fetch-attendees.js', () => ({
  fetchAttendees: fetchAttendeesMock,
  AttendeesFetchError: MockAttendeesFetchError,
}));

jest.unstable_mockModule('ora', () => ({
  default: () => ({
    start: jest.fn().mockReturnThis(),
    succeed: jest.fn(),
    fail: jest.fn(),
  }),
}));

const { run } = await import('./meetup-random.js');

let logSpy;
let errorSpy;

beforeEach(() => {
  fetchAttendeesMock.mockReset();
  logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  logSpy.mockRestore();
  errorSpy.mockRestore();
});

describe('run', () => {
  it('errors when group is missing', async () => {
    await run({ flags: { event: 'e' } });

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('group name'));
    expect(fetchAttendeesMock).not.toHaveBeenCalled();
  });

  it('errors when event is missing', async () => {
    await run({ flags: { group: 'g' } });

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('event id'));
    expect(fetchAttendeesMock).not.toHaveBeenCalled();
  });

  it('errors on a non-numeric total without calling fetchAttendees', async () => {
    await run({ flags: { group: 'g', event: 'e', total: 'abc' } });

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('positive integer'));
    expect(fetchAttendeesMock).not.toHaveBeenCalled();
  });

  it('errors on a zero or negative total without calling fetchAttendees', async () => {
    await run({ flags: { group: 'g', event: 'e', total: '0' } });

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('positive integer'));
    expect(fetchAttendeesMock).not.toHaveBeenCalled();
  });

  it('prints the full list in original order when total is absent', async () => {
    fetchAttendeesMock.mockResolvedValue(['Ann', 'Bob', 'Cid']);

    await run({ flags: { group: 'g', event: 'e' } });

    expect(logSpy.mock.calls.map(([arg]) => arg)).toEqual(['', 'Ann', 'Bob', 'Cid']);
  });

  it('prints a random subset of the requested size when total is given', async () => {
    fetchAttendeesMock.mockResolvedValue(['Ann', 'Bob', 'Cid', 'Dee']);
    faker.seed(42);

    await run({ flags: { group: 'g', event: 'e', total: '2' } });

    expect(logSpy.mock.calls.map(([arg]) => arg)).toEqual(['', 'Cid', 'Bob']);
  });

  it('shows a friendly error when fetchAttendees fails with AttendeesFetchError', async () => {
    fetchAttendeesMock.mockRejectedValue(new MockAttendeesFetchError('Event not found'));

    await run({ flags: { group: 'g', event: 'e' } });

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Event not found'));
  });

  it('rethrows unexpected errors instead of swallowing them', async () => {
    fetchAttendeesMock.mockRejectedValue(new Error('boom'));

    await expect(run({ flags: { group: 'g', event: 'e' } })).rejects.toThrow('boom');
  });
});
