#!/usr/bin/env node
const meow = require('meow');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');
const meetupRandom = require('./src/meetup-random');

updateNotifier({ pkg }).notify();

const cli = meow(
  `
  Usage
    $ mrandom -g [GROUP] -e [EVENT] [OPTIONS]
  Options
    --event, -e      Event ID.
    --group, -g      Group name.
    --total, -t      Total spots available for the meeting (defaults to list size).
    --version, -v    Display installed version.
  Examples
    $ mrandom -g group-name -i event-id -t 5
    $ mrandom -g group-name -i event-id
`,
  {
    flags: {
      event: { type: 'string', alias: 'e' },
      group: { type: 'string', alias: 'g' },
      total: { type: 'string', alias: 't' },
      version: { type: 'boolean', alias: 'v' },
    },
  },
);

(async () => await meetupRandom.run(cli))();
