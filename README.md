# Meetup Random

A CLI to fetch confirmed attendees from a Meetup event and randomly select participants.

## Installation

```sh
npm i -g meetup-random
```

## Usage

`$ mrandom -g [GROUP] -e [EVENT] [OPTIONS]`

### Options

| Option            | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `--event`, `-e`   | Event ID                                                      |
| `--group`, `-g`   | Group name                                                    |
| `--total`, `-t`   | Number of attendees to randomly select (defaults to listing all confirmed attendees) |
| `--version`, `-v` | Display installed version                                     |

### Examples

```sh
$ mrandom -g group-name -e event-id -t 5
$ mrandom -g group-name -e event-id
```
