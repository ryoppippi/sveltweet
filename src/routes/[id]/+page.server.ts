import { getTweet } from 'react-tweet/api';
import { error } from '@sveltejs/kit';
import to from 'await-to-js';
import type { RequestEvent } from './$types';

export async function load({ params }: RequestEvent) {
	const { id } = params;

	if (id === '') {
		return error(404, 'Tweet not found');
	}

	const [err, tweet] = await to(getTweet(id));

	if (err != null) {
		return error(500, 'Could not load tweet');
	}

	if (tweet == null) {
		return error(404, 'Tweet not found');
	}

	return { tweet };
}
