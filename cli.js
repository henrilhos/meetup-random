#!/usr/bin/env node
import meow from 'meow';
import updateNotifier from 'update-notifier';

import { run } from './src/meetup-random.js';

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
    $ mrandom -g group-name -e event-id -t 5
    $ mrandom -g group-name -e event-id
`,
  {
    importMeta: import.meta,
    flags: {
      event: { type: 'string', shortFlag: 'e' },
      group: { type: 'string', shortFlag: 'g' },
      total: { type: 'string', shortFlag: 't' },
      version: { type: 'boolean', shortFlag: 'v' },
    },
  },
);

updateNotifier({ pkg: cli.pkg }).notify();

await run(cli);
