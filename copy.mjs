#!/usr/bin/env node

import { $ } from 'dax-sh';

const from = $.path('./node_modules/react-tweet/dist');
const to = $.path('./src/lib/react-tweet/');

await $`rm -rf ${to}`;
await $`mkdir -p ${to}`;

const output = await $`ls ${from}`.lines();

for (const file of output) {
	await $`cp -r ${from.join(file)} ${to.join(file)}`;
}
