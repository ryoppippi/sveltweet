import { delay } from '@std/async';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { getTweet } from '$lib/api';

export async function load({ params }: RequestEvent) {
	const { id, _type } = params;

	if (id === '') {
		return error(404, 'Tweet not found');
	}

	const tweet = getTweet(id);

	return {
		tweet: _type === 'sync' ? await tweet : delay(1500).then(async () => tweet),
		type: _type,
	};
}
