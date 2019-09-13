#!/usr/bin/env node
const meow = require('meow');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');
const utils = require('./src/utils.js');

updateNotifier({ pkg }).notify();

const cli = meow(`
  Usage
    $ mrandom [URL] [OPTIONS]
  Options
    --format, -f     Output format.
    --ignore, -i     Ignore list (comma separated and case sensitive).
    --total, -t      Total spots available for the meeting (defaults to list size).
    --version, -v    Display installed version.
  Examples
    $ mrandom https://meetup.com/pt-br/group-name/events/event-id -t 5
    $ mrandom https://meetup.com/pt-br/group-name/events/event-id -i castilh0s -f '@%s'
`, {
  flags: {
    format: { type: 'string', alias: 'f' },
    ignore: { type: 'string', alias: 'i' },
    total: { type: 'string', alias: 't' },
    version: { type: 'boolean', alias: 'v' },
  },
});

// console.log(cli);
utils.run(cli);
