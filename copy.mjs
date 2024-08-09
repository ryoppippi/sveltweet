#!/usr/bin/env node

import path from 'node:path';
import { $ } from 'dax-sh';

/** @param {...string} args */
function relativePath(...args) {
	return path.resolve(import.meta.dirname, ...args);
}

const from = relativePath('./node_modules/react-tweet/dist');
const to = relativePath('./src/lib/react-tweet');

// eslint-disable-next-line no-console
console.log(`Copying ${from} to ${to}`);

await $`mkdir -p ${to}`;
await $`cp -r ${from} ${to}`;
