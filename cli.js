#!/usr/bin/env node
'use strict';
const meow = require('meow');
const webexApiClient = require('.');

const cli = meow(`
	Usage
	  $ webex-api-client [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ webex-api-client
	  unicorns & rainbows
	  $ webex-api-client ponies
	  ponies & rainbows
`);

console.log(webexApiClient(cli.input[0] || 'unicorns'));
