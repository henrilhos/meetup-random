# Meetup Random

## Installation

```sh
npm i -g meetup-random
```

## Usage

`$ mrandom -g [GROUP] -e [EVENT] [OPTIONS]`

### Options

`--event`, `-e`: Event ID.
`--group`, `-g` Group name.
`--total`, `-t` Total spots available for the meeting (defaults to list size).
`--version`, `-v` Display installed version.

### Examples

```sh
$ mrandom -g group-name -i event-id -t 5
$ mrandom -g group-name -i event-id
```
